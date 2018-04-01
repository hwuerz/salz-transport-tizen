
import {ListPageController} from "./ListPageController";
import {Navigation} from "../Navigation";
import {LocationService} from "../service/LocationService";
import {CONFIG} from "../config";

declare var tau:any; // From Tizen SDK

export class FavouriteController extends ListPageController {

    readonly listener = () => {
        this.display();
    };

    onEnter(parameters: any) {
        super.onEnter(parameters);
        this.display();
        LocationService.changeEvent.on(this.listener);
    }

    onLeave() {
        super.onLeave();
        LocationService.changeEvent.off(this.listener);
    }

    /**
     * Displays the favourite stations ordered by their distance.
     */
    private display() {
        const sorted = CONFIG
            .favouriteStation
            .sort((station1, station2) => station1.getDistance() - station2.getDistance());

        super.listClear();

        for (let station of sorted) {
            super.listAdd(station.toHtml(), () =>
                Navigation.open('departure', {stationId: station.getId()}));
        }
        super.listRefresh();
    }
}
