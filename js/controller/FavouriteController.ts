
import {ListPageController} from "./ListPageController";
import {LocationService} from "../service/LocationService";
import {CONFIG} from "../config";
import {ListEntry} from "../model/ListEntry";

declare var tau:any; // From Tizen SDK

export class FavouriteController extends ListPageController {

    readonly listener = () => {
        this.listRefresh();
    };

    onEnter(parameters: any) {
        super.onEnter(parameters);
        this.listRefresh();
        LocationService.changeEvent.on(this.listener);
    }

    onLeave() {
        super.onLeave();
        LocationService.changeEvent.off(this.listener);
    }

    getData(): ListEntry[] {
        return CONFIG.favouriteStation;
    }
}
