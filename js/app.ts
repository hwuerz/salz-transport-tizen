import $ = require('jquery');

import angular = require('angular');

import {CONFIG} from "./config";
import {BackNavigation} from "./BackNavigation";
import Controller from "./controller/index";

declare var tau:any; // From Tizen SDK

(function () {

    const list = $('#departure-list');

    function init() {

        if (!CONFIG.endpoint || !CONFIG.token) {
            list.html('');
            list.append("<li>No endpoint / token defined</li>");
            return;
        }

        // Handle hardware key input for back navigation.
        BackNavigation.startListener();

        const extensionApp = angular.module('SalzTransportTizenApp', [
            Controller
        ]);
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