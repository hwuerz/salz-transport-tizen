
import {ListPageController} from "./ListPageController";
import {NearService} from "../service/NearService";
import {ListEntry} from "../model/ListEntry";

declare var tau:any; // From Tizen SDK

export class NearController extends ListPageController {

    readonly listener = () => {
        super.listRefresh();
    };

    getData(): ListEntry[] {
        return NearService.getNearStations();
    }

    onEnter(parameters: any) {
        super.onEnter(parameters);

        NearService.changeEvent.on(this.listener);

        // TODO Request a location update.
        super.listRefresh();
    }

    onLeave() {
        super.onLeave();
        NearService.changeEvent.off(this.listener);
    }
}
