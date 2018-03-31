
import {Helper} from "../Helper";
import {ListPageController} from "./ListPageController";
import {StationDepartures} from "../model/StationDepartures";
import {DepartureService} from "../service/DepartureService";

declare var tau: any; // From Tizen SDK

export class DepartureController extends ListPageController {

    stationId: string = '-1';

    readonly listener = (stationDepartures: StationDepartures) => {
        if (stationDepartures.getStationId() === this.stationId) { // This is interesting
            super.listClear();
            for (let departure of stationDepartures.getDepartures()) {
                super.listAdd(departure.toHtml());
            }
            if (stationDepartures.getDepartures().length == 0) {
                super.listAdd("No data found");
            }
            super.listRefresh();
        }
    };

    onEnter(parameters: any) {
        super.onEnter(parameters);

        if (parameters && parameters.stationId) {
            this.loading();
            this.stationId = parameters.stationId;
            DepartureService.changeEvent.on(this.listener);
            DepartureService.getDepartures(this.stationId);

        } else {
            Helper.showPopUp("stationId parameter <br> is missing");
        }
    }

    onLeave() {
        super.onLeave();
        DepartureService.changeEvent.off(this.listener);
    }

    private loading() {
        super.listClear();
        super.listAdd("Loading");
        super.listRefresh();
    }

}
