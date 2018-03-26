import {Helper} from "../Helper";

export class Departure {

    startStation: string;

    plannedTime: number;

    predictedTime: number;

    product: string;

    label: string;

    destinationPlace: string;

    destinationName: string;

    constructor(startStation: string, plannedTime: number, predictedTime: number, product: string, label: string, destinationPlace: string, destinationName: string) {
        this.startStation = startStation;
        this.plannedTime = plannedTime;
        this.predictedTime = predictedTime;
        this.product = product;
        this.label = label;
        this.destinationPlace = destinationPlace;
        this.destinationName = destinationName;
    }

    static fromServerResponse(obj: any) {
        return new Departure(
            obj.startStation,
            obj.plannedTime,
            obj.predictedTime,
            obj.product,
            obj.label,
            obj.destinationPlace,
            obj.destinationName
        );
    }

    getLineOutput() {
        return this.label;
    }

    getDestinationOutput() {
        return Helper.mapStationName(this.destinationName);
    }

    getTimeOutput() {

        const timeMilliseconds = this.getDepartureTime() - (new Date()).getTime();
        const timeMinutes = Math.round(timeMilliseconds / 1000 / 60);

        let timeOutput = timeMinutes.toString();
        if (timeMinutes < -1 * 60 * 24 * 7) {
            timeOutput = '?';
        }
        return timeOutput;
    }

    getDelayOutput() {

        const delayMilliseconds = this.getDepartureTime() - this.plannedTime;
        const delayMinutes = Math.round(delayMilliseconds / 1000 / 60);

        let delayOutput = '';
        if (delayMinutes !== 0) {
            delayOutput = delayMilliseconds > 0 ? '+' + delayMinutes : delayMinutes.toString(); // Add sign
            delayOutput = " (" + delayOutput + "'')";
        }
        return delayOutput;
    }

    private getDepartureTime() {
        return this.predictedTime != null ? this.predictedTime : this.plannedTime;
    }
}