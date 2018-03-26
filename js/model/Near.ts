import {Helper} from "../Helper";

export class Near {

    id: string;

    destinationPlace: string;

    destinationName: string;

    distance: number;

    constructor(id: string, destinationPlace: string, destinationName: string, distance: number) {
        this.id = id;
        this.destinationPlace = destinationPlace;
        this.destinationName = destinationName;
        this.distance = distance;
    }

    static fromServerResponse(obj: any) {
        return new Near(obj.id, obj.destinationPlace, obj.destinationName, obj.distance);
    }

    getNameOutput() {
        return Helper.mapStationName(this.destinationName);
    }

    getDistanceOutput() {
        return Math.round(this.distance);
    }
}