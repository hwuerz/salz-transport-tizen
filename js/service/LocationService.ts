
import {LiteEvent} from "../event/LiteEvent";
import {Location} from "../model/Location";
import {CompanionService} from "./CompanionService";

export class LocationService {

    private static location: Location = null;

    private static readonly onChange = new LiteEvent<Location>();
    public static get changeEvent() { return LocationService.onChange.expose(); }

    static init() {
        CompanionService.connectEvent.on(() => {
            // Helper.showPopUp("XConnection Event", 1000);
            CompanionService.fetch();
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