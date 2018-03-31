
import {ListPageController} from "./ListPageController";
import {NearService} from "../service/NearService";

declare var tau:any; // From Tizen SDK

export class NearController extends ListPageController {

    onEnter() {
        super.onEnter();

        NearService.changeEvent.on((stations) => {
            // Helper.showPopUp("Found " + stations.length + " stations.");
            super.listClear();
            for (let station of NearService.getNearStations()) {
                super.listAdd(station.toHtml())
            }
            super.listRefresh();
        });

        super.listClear();
        super.listAdd("<li>Loading</li>");
        super.listRefresh();
    }
}
