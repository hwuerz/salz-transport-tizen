import {Helper} from "../Helper";
import {LocationService} from "../service/LocationService";
import {ListEntry} from "./ListEntry";
import {Navigation} from "../Navigation";

export class Near implements ListEntry {

    private readonly id: string;

    private readonly destinationPlace: string;

    private readonly destinationName: string;

    private readonly distance: number;

    private readonly latitude: number;

    private readonly longitude: number;

    private constructor(id: string, destinationPlace: string, destinationName: string, location: number|{latitude:number, longitude:number}) {
        this.id = id;
        this.destinationPlace = destinationPlace;
        this.destinationName = destinationName;
        if (isNaN(Number(location))) { // Latitude longitude are given
            this.distance = -1;
            this.latitude = (location as any).latitude;
            this.longitude = (location as any).longitude;
        } else { // distance is given
            this.distance = Number(location);
            this.latitude = -1;
            this.longitude = -1;
        }
    }

    static fromServerResponse(obj: any) {
        return new Near(obj.id, obj.destinationPlace, obj.destinationName, obj.distance);
    }

    static fromFavourite(id: string, name: string, latitude: number, longitude: number) {
        return new Near(id, "", name, {latitude: latitude, longitude: longitude});
    }

    toHtml() {
        return `
            <span class="row1">
                ${this.getNameOutput()}
            </span>
            <span class="row2">
                ${this.getDistanceOutput()}m
            </span>
        `
    }

    getCallback() {
        return () => Navigation.open('departure', {
            title: this.getNameOutput(),
            stationId: this.id,
        })
    }

    getSortingValue() {
        return this.getDistance();
    }

    private getNameOutput() {
        return Helper.mapStationName(this.destinationName);
    }

    private getDistance(): number {
        if (this.distance >= 0) { // This attribute is given --> Use it
            return this.distance;
        } else {
            const location = LocationService.getLocation();
            if (location == null) {
                return -1;
            } else {
                return Near.distFrom(location.lat, location.long, this.latitude, this.longitude);
            }
        }
    }

    private getDistanceOutput() {
        const distance = this.getDistance();
        if (distance < 0) {
            return '? ';
        } else {
            return Math.round(distance);
        }
    }

    /**
     * Get the distance between to geo-coord.
     * Taken from https://stackoverflow.com/a/837957
     */
    private static distFrom(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const toRadians = (degrees: number) => degrees * Math.PI / 180;
        const earthRadius = 6371000.0; //meters
        const dLat = toRadians((lat2 - lat1));
        const dLng = toRadians((lng2 - lng1));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }
}