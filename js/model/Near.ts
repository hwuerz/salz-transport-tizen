import {Helper} from "../Helper";

export class Near {

    private readonly id: string;

    private readonly destinationPlace: string;

    private readonly destinationName: string;

    private readonly distance: number;

    constructor(id: string, destinationPlace: string, destinationName: string, distance: number) {
        this.id = id;
        this.destinationPlace = destinationPlace;
        this.destinationName = destinationName;
        this.distance = distance;
    }

    static fromServerResponse(obj: any) {
        return new Near(obj.id, obj.destinationPlace, obj.destinationName, obj.distance);
    }

    private getNameOutput() {
        return Helper.mapStationName(this.destinationName);
    }

    private getDistanceOutput() {
        return Math.round(this.distance);
    }

    toHtml() {
        return `
            <a href="#departure">
                <span class="row1">
                    ${this.getNameOutput()}
                </span>
                <span class="row2">
                    ${this.getDistanceOutput()}m
                </span>
            </a>
        `
    }
}