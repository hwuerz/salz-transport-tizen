
export class Location {

    readonly lat: number;

    readonly long: number;

    readonly accuracy: number;

    readonly timestamp: number;


    constructor(lat: number, long: number, accuracy: number, timestamp: number) {
        this.lat = lat;
        this.long = long;
        this.accuracy = accuracy;
        this.timestamp = timestamp;
    }

    static fromCompanionResponse(json: string) {
        const obj = JSON.parse(json);
        return new Location(
            obj.latitude,
            obj.longitude,
            obj.accuracy,
            obj.timestamp
        );
    }
}