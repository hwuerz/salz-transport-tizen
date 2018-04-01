
import {ListPageController} from "./ListPageController";
import {NearService} from "../service/NearService";
import {Navigation} from "../Navigation";
import {Near} from "../model/Near";

declare var tau:any; // From Tizen SDK

export class NearController extends ListPageController {

    readonly listener = (stations: Near[]) => {
        // Helper.showPopUp("Found " + stations.length + " stations.");
        super.listClear();
        for (let station of NearService.getNearStations()) {
            super.listAdd(station.toHtml(), () =>
                Navigation.open('departure', {stationId: station.getId()}));
        }
        super.listRefresh();
    };

    onEnter(parameters: any) {
        super.onEnter(parameters);

        NearService.changeEvent.on(this.listener);

        // TODO Request a location update.
        if (NearService.getNearStations().length == 0) {
            super.listClear();
            super.listAdd("Loading");
            super.listRefresh();
        }
    }

    onLeave() {
        super.onLeave();
        NearService.changeEvent.off(this.listener);
    }
}
