
import {CONFIG} from "../config";
import {Departure} from "../model/Departure";
import {Helper} from "../Helper";
import {CompanionService} from "../service/CompanionService";
import {ListPageController} from "./ListPageController";
declare var tau: any; // From Tizen SDK

export class DepartureController extends ListPageController {

    departures: Departure[];
    fetched: Date;
    error: string;

    onEnter() {
        super.onEnter();
        this.departures = Array();
        // this.requestDepartures(CONFIG.station);
        // Companion.createHTML("Hallo Welt");
    }

    private requestDepartures(station: string) {

        const self = this;

        Helper.request({
                station: station
            },
            (response: any) => {
                console.info(response);

                self.departures.length = 0; // Clear old data.

                for (let elem of response.data.departures) {
                    console.log(elem);
                    const departure = Departure.fromServerResponse(elem);
                    self.departures.push(departure);
                    super.listAdd(departure.toHtml());
                }

                self.fetched = new Date();
                window.setTimeout(() => super.listRefresh(), 1000);
                // super.listRefresh();
            },
            (data: any) => {
                console.log('Request failed');
                console.info(JSON.stringify(data));
                self.departures.length = 0;
                self.error = JSON.stringify(data);
            })
    }

    private apply() {

        for (let departure of this.departures) {
        }
    }
}
