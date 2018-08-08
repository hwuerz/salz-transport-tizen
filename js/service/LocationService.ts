
import {LiteEvent} from "../event/LiteEvent";
import {Location} from "../model/Location";
import {CompanionService} from "./CompanionService";
import {Navigation} from "../Navigation";

export class LocationService {

    private static LOCATION_UPDATE_KEY = "location";
    private static REQUEST_LOCATION_START = "requestLocationStart";
    private static REQUEST_LOCATION_FINISH = "requestLocationFinish";

    private static location: Location = null;

    private static readonly onChange = new LiteEvent<Location>();
    public static get changeEvent() { return LocationService.onChange.expose(); }

    static init() {
        document.addEventListener(Navigation.EXIT_APPLICATION_EVENT, function() {
            CompanionService.send(LocationService.REQUEST_LOCATION_FINISH);
        });
        CompanionService.onMessage(LocationService.LOCATION_UPDATE_KEY, function (jsonObject: any) {
            LocationService.setLocation(Location.fromCompanionResponse(jsonObject));
        });
        CompanionService.connectEvent.on(() => {
            CompanionService.send(LocationService.REQUEST_LOCATION_START);
        });
    }

    static getLocation() {
        return LocationService.location;
    }

    static setLocation(location: Location) {
        LocationService.location = location;
        LocationService.onChange.trigger(location);
    }
}