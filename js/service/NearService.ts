
import {Helper} from "../Helper";
import {Near} from "../model/Near";
import {LiteEvent} from "../event/LiteEvent";
import {LocationService} from "./LocationService";

export class NearService {

    private static nearStations: Near[] = Array();
    private static fetched: Date = new Date();
    private static error: string = '';

    private static readonly onChange = new LiteEvent<Near[]>();
    public static get changeEvent() { return NearService.onChange.expose(); }

    static init() {
        LocationService.changeEvent.on( (location) => {
            // Helper.showPopUp("Fetch near stations");
            this.requestNear(location.lat, location.long);
        });
    }

    static getNearStations() {
        return this.nearStations;
    }

    private static requestNear(lat: number, long: number) {

        const self = this;

        Helper.request(
            {
                near: {
                    lat: lat,
                    long: long
                }
            },
            (response: any) => {
                console.info(response);

                self.nearStations.length = 0; // Clear old data.

                for (let elem of response.data.near) {
                    console.log(elem);
                    const nearStation = Near.fromServerResponse(elem);
                    self.nearStations.push(nearStation);
                }

                self.fetched = new Date();

                self.onChange.trigger(self.nearStations);
            },
            (data: any) => {
                console.log('Request failed');
                console.info(JSON.stringify(data));

                self.nearStations.length = 0;
                self.error = JSON.stringify(data);

                self.onChange.trigger(self.nearStations);
                Helper.showPopUp(self.error);
            })
    }

    /*
       private static errorCallback(error: PositionError) {
           console.log("Request location --> ERROR");

           switch (error.code) {
               case error.PERMISSION_DENIED:
                   Helper.showPopUp('User denied the request for Geolocation.');
                   break;
               case error.POSITION_UNAVAILABLE:
                   Helper.showPopUp('Location information is unavailable.');
                   break;
               case error.TIMEOUT:
                   Helper.showPopUp('The request to get user location timed out.');
                break;
           }
       }

       /*
       private static oneShotFunc() {
           if (navigator.geolocation) {
               console.log("Request location");
               navigator.geolocation.getCurrentPosition(
                   position => NearService.requestNear(position.coords.latitude, position.coords.longitude),
                   error => NearService.errorCallback(error),
                   {maximumAge: 60000, timeout: 100000});
           } else {
               document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
           }
       }
       */
}