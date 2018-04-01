
import {Helper} from "../Helper";
import {ListPageController} from "./ListPageController";
import {StationDepartures} from "../model/StationDepartures";
import {DepartureService} from "../service/DepartureService";
import {ListEntry} from "../model/ListEntry";
import {Departure} from "../model/Departure";
import {ListPageStatus} from "../ListPageStatus";

declare var tau: any; // From Tizen SDK

export class DepartureController extends ListPageController {

    /**
     * The station which is currently displayed by the controller
     * @type {string}
     */
    private stationId: string = '-1';

    /**
     * All currently displayed departures.
     * @type {Departure[]}
     */
    private departures: Departure[] = Array();

    /**
     * The listener which handles updates in the departures for this station.
     * @param stationDepartures
     */
    readonly listener = (stationDepartures: StationDepartures) => {
        if (stationDepartures.getStationId() === this.stationId) { // This is interesting
            this.departures = stationDepartures.getDepartures();
            this.status = ListPageStatus.DATA;
            super.listRefresh();
        }
    };

    getData(): ListEntry[] {
        return this.departures;
    }

    onEnter(parameters: any) {
        super.onEnter(parameters);

        // Fetch departure data.
        if (parameters && parameters.stationId) {
            this.status = ListPageStatus.LOADING;
            this.listRefresh();

            this.stationId = parameters.stationId;
            DepartureService.changeEvent.on(this.listener);
            DepartureService.getDepartures(this.stationId);

        } else { // No stationID was passed --> No departures can be fetched.
            this.status = ListPageStatus.ERROR;
            this.listRefresh();

            Helper.showPopUp("stationId parameter <br> is missing");
        }
    }

    onLeave() {
        super.onLeave();
        DepartureService.changeEvent.off(this.listener);
    }

}
