
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

    static getNearStations() {
        return this.nearStations;
    }
}