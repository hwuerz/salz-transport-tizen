
import {Departure} from "../model/Departure";
import {Helper} from "../Helper";
import {StationDepartures} from "../model/StationDepartures";
import {LiteEvent} from "../event/LiteEvent";
import {CompanionService} from "./CompanionService";
import {NearService} from "./NearService";

export class DepartureService {

    private static REQUEST_DEPARTURES = 'requestDepartures';
    private static RESPONSE_DEPARTURES = 'departures';

    private static stationDepartures: {[key: string]: StationDepartures} = {};

    private static readonly onChange = new LiteEvent<StationDepartures>();
    public static get changeEvent() { return DepartureService.onChange.expose(); }

    static init() {
        CompanionService.onMessage(DepartureService.RESPONSE_DEPARTURES, DepartureService.handleDeparturesResponse);
    }

    private static handleDeparturesResponse(response: any) {
        const departures = Array();
        for (let elem of response.departures) {
            const departure = Departure.fromCompanionResponse(elem);
            departures.push(departure);
        }
        if (DepartureService.stationDepartures[response.stationId]) {
            DepartureService.stationDepartures[response.stationId].update(departures)
        } else {
            DepartureService.stationDepartures[response.stationId] = new StationDepartures(response.stationId, departures)
        }

        DepartureService.onChange.trigger(DepartureService.stationDepartures[response.stationId]);

    }

    static getDepartures(stationId: string) {
        if (this.stationDepartures[stationId]) {
            DepartureService.onChange.trigger(this.stationDepartures[stationId]);
        }
        CompanionService.send(DepartureService.REQUEST_DEPARTURES, stationId);
    }
}
