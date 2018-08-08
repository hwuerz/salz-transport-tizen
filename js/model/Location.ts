
export class Location {

    readonly lat: number;

    readonly long: number;

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
    }

    static fromCompanionResponse(jsonObject: any) {
        return new Location(
            jsonObject.latitude,
            jsonObject.longitude
        );
    }
}