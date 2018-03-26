
import angular = require('angular');
import {CONFIG} from "../config";
import {Departure} from "../Departure";
import {DepartureResponse} from "../DepartureResponse";
import {Helper} from "../Helper";
declare var tau: any; // From Tizen SDK

interface IDepartureScope extends angular.IScope {
    hallo: string;
    fnk: any;
    dep: DepartureController;

    departures: Departure[];
    fetched: Date;
    error: string;
}

class DepartureController {

    listWidget: any = null;

    static $inject = ['$scope'];
    constructor(
        private $scope: IDepartureScope
    ) {
        $scope.departures = Array();
        this.listWidget = tau.widget.SnapListview(document.querySelector("#departure-list")); // for call refresh()
        this.requestDepartures(CONFIG.station)
    }

    private requestDepartures(station: string) {

        const self = this;

        Helper.request({
                station: station
            },
            function (response: any) {
                console.info(response);

                self.$scope.departures.length = 0; // Clear old data.
                const data: DepartureResponse[] = response.data.departures as DepartureResponse[];

                for (let elem of data) {
                    console.log(elem);

                    const line = elem.label;

                    const destination = Helper.mapStationName(elem.destinationName);

                    let time = elem.predictedTime != null ? elem.predictedTime : elem.plannedTime;
                    let delay = time - elem.plannedTime;

                    time = (new Date(time)).getTime() - (new Date()).getTime();
                    time = Math.round(time / 1000 / 60);

                    delay = delay / 1000 / 60;

                    self.$scope.departures.push(new Departure(line, destination, time, delay));
                }

                self.$scope.fetched = new Date();
                self.$scope.$apply();
                self.listWidget.refresh();
            },
            function(data: any) {
                console.log('Request failed');
                console.info(JSON.stringify(data));
                self.$scope.departures.length = 0;
                self.$scope.error = JSON.stringify(data);
            })

    }

}

const moduleName = 'DepartureController';
export default moduleName
angular.module(moduleName, [])
    .controller(moduleName, DepartureController);