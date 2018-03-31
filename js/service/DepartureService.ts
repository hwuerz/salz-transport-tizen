
import {Departure} from "../model/Departure";
import {Helper} from "../Helper";
import {StationDepartures} from "../model/StationDepartures";
import {LiteEvent} from "../event/LiteEvent";

export class DepartureService {

    private static stationDepartures: {[key: string]: StationDepartures} = {};

    private static readonly onChange = new LiteEvent<StationDepartures>();
    public static get changeEvent() { return DepartureService.onChange.expose(); }

    private static requestDepartures(stationId: string) {

        Helper.request({
                station: stationId
            },
            (response: any) => {
                console.info(response);

                const departures = Array();
                for (let elem of response.data.departures) {
                    console.log(elem);
                    const departure = Departure.fromServerResponse(elem);
                    departures.push(departure);
                }

                if (this.stationDepartures[stationId]) {
                    this.stationDepartures[stationId].update(departures)
                } else {
                    this.stationDepartures[stationId] = new StationDepartures(stationId, departures)
                }

                DepartureService.onChange.trigger(this.stationDepartures[stationId]);
            },
            (data: any) => {
                console.log('Request failed', JSON.stringify(data));
                Helper.showPopUp('Request for station ' + stationId + ' failed <br> ' + JSON.stringify(data));
            })
    }

    static getDepartures(stationId: string) {
        if (this.stationDepartures[stationId]) {
            DepartureService.onChange.trigger(this.stationDepartures[stationId]);
            this.requestDepartures(stationId);
        } else {
            this.requestDepartures(stationId);
        }
    }
}
