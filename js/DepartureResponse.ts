export class DepartureResponse {

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
}