
import {Departure} from "./Departure";

export class StationDepartures {

    private readonly stationId: string;
    private departures: Departure[];
    private fetched: Date;

    constructor(stationId: string, departures: Departure[]) {
        this.stationId = stationId;
        this.departures = departures;
        this.fetched = new Date();
    }

    getStationId() {
        return this.stationId;
    }

    getDepartures() {
        return this.departures;
    }

    getFetched() {
        return this.fetched;
    }

    update(departures: Departure[]) {
        this.departures = departures;
        this.fetched = new Date();
    }
}