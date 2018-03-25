import $ = require('jquery');

import {CONFIG} from "./config";

import {BackNavigation} from "./BackNavigation";
import {Departure} from "./Departure";
import {DepartureResponse} from "./DepartureResponse";

declare var tau:any; // From Tizen SDK

(function () {

    const list = $('#departure-list');
    const listWidget = tau.widget.SnapListview(document.querySelector("#departure-list")); // for call refresh()

    function init() {

        if (!CONFIG.endpoint || !CONFIG.token) {
            list.html('');
            list.append("<li>No endpoint / token defined</li>");
            return;
        }

        // Handle hardware key input for back navigation.
        BackNavigation.startListener();

        insertDummyData();
        requestDepartures(CONFIG.station);
    }

    function mapDestinationName(name: string) {
        let response = name;
        for (let station of CONFIG.knownStations) {
            if (name.indexOf(station) >= 0) {
                response = station;
            }
        }

        return response;
    }

    function addEntry(line: string, destination: string, time: number, delay: number) {

        let delayOutput = '';
        if (delay !== 0) {
            delayOutput = delay > 0 ? '+' + delay : delay.toString(); // Add sign
            delayOutput = " (" + delayOutput + "'')";
        }

        let timeOutput = time.toString();
        if (time < -1 * 60 * 24 * 7) {
            timeOutput = '?';
        }

        list.append(
            "<li>" +
            "<span class=\"row1\">" +
            "<span class=\"line-name\">" + line + "</span>" +
            destination +
            "</span>" +
            "<span class=\"row2\">" +
            timeOutput + "''" + delayOutput +
            "</span>" +
            "</li>");
    }

    function displayDepartures(departures: Departure[]) {
        list.html('');
        for (let departure of departures) {
            addEntry(departure.line, departure.destination, departure.time, departure.delay);
        }
        listWidget.refresh();
    }

    function insertDummyData() {
        displayDepartures([
            new Departure('9', 'Schloss', 6, 2),
            new Departure('2', 'Hauptbahnhof', 14, 9),
            new Departure('9', 'Schloss', 36, -1),
            new Departure('2', 'Hauptbahnhof', 44, 0)
        ]);
    }

    function requestDepartures(station: string) {

        $.ajax({
            url: CONFIG.endpoint,
            type: 'post',
            data: JSON.stringify({
                station: station
            }),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CONFIG.token
            },
            dataType: 'json',
            success: function (response: any) {
                console.info(response);

                list.html('');

                const data: DepartureResponse[] = response.data.departures as DepartureResponse[];

                const departures = data.map(function(elem: DepartureResponse) {
                    console.log(elem);

                    const line = elem.label;

                    const destination = mapDestinationName(elem.destinationName);

                    let time = elem.predictedTime != null ? elem.predictedTime : elem.plannedTime;
                    let delay = time - elem.plannedTime;

                    time = (new Date(time)).getTime() - (new Date()).getTime();
                    time = Math.round(time / 1000 / 60);

                    delay = delay / 1000 / 60;

                    return new Departure(line, destination, time, delay);
                });

                displayDepartures(departures);

                // TODO Find better place
                list.append("<li>Fetched " + (new Date()).getHours() + ":" + (new Date()).getMinutes() + "</li>");
                listWidget.refresh();
            },
            error: function(data: any) {
                console.log('Request failed');
                console.info(JSON.stringify(data));

                // TODO Find better place
                list.html('');
                list.append("<li>Request failed " + JSON.stringify(data) + "</li>");
                listWidget.refresh();
            }
        });

    }

    // ********************************
    // Example code to request geo location.

    function successCallback(position: Position) {
        document.getElementById('locationInfo').innerHTML = 'Latitude: ' + position.coords.latitude +
            '<br/>Longitude: ' + position.coords.longitude;
    }

    function errorCallback(error: PositionError) {
        let errorInfo = document.getElementById('locationInfo');

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorInfo.innerHTML = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorInfo.innerHTML = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorInfo.innerHTML = 'The request to get user location timed out.';
                break;
        }
    }

    function oneShotFunc() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback,
                {maximumAge: 60000});
        } else {
            document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
        }
    }

    oneShotFunc();

    init();

}());