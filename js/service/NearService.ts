
import {Near} from "../model/Near";
import {LiteEvent} from "../event/LiteEvent";
import {LocationService} from "./LocationService";
import {CompanionService} from "./CompanionService";

export class NearService {

    private static REQUEST_NEAR = 'requestNear';
    private static RESPONSE_NEAR = 'near';

    /**
     * The timestamp when the last near request was performed.
     * Will be used to avoid too many requests.
     * @type {number}
     */
    private static lastNearRequest = 0;

    /**
     * All near stations which are displayed at the moment.
     */
    private static nearStations: Near[] = Array();

    /**
     * Event which will be fired when the list of near stations becomes updated.
     * @type {LiteEvent<Near[]>}
     */
    private static readonly onChange = new LiteEvent<Near[]>();

    /**
     * Event which will be fired when the list of near stations becomes updated.
     * @type {LiteEvent<Near[]>}
     */
    public static get changeEvent() { return NearService.onChange.expose(); }

    /**
     * Setup the listener of this service.
     */
    static init() {
        LocationService.changeEvent.on( (location) => {
            const now = (new Date()).getTime();
            if (this.lastNearRequest < now - 1000 * 20) {
                // Helper.showPopUp("Fetch near stations<br>" + this.lastNearRequest + " " + (now - 1000 * 20));
                this.lastNearRequest = now;
                CompanionService.send(NearService.REQUEST_NEAR);
            }
        });
        CompanionService.onMessage(NearService.RESPONSE_NEAR, NearService.handleNearResponse);
    }

    /**
     * Handles the response from the companion app with new near stations data.
     * @param response The parsed JSON object with the new data.
     */
    private static handleNearResponse(response: any) {
        NearService.nearStations.length = 0; // Clear old data.
        for (let elem of response) {
            const nearStation = Near.fromCompanionResponse(elem);
            NearService.nearStations.push(nearStation);
        }
        NearService.onChange.trigger(NearService.nearStations);
    }

    static getNearStations() {
        return this.nearStations;
    }
}