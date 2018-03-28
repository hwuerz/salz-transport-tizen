import $ = require('jquery');
import angular = require('angular');
import {CONFIG} from "../config";
import {Departure} from "../model/Departure";
import {Helper} from "../Helper";
declare var tau: any; // From Tizen SDK

interface IDepartureScope extends angular.IScope {
    departures: Departure[];
    fetched: Date;
    error: string;
}

class DepartureController {

    listWidget: any;

    static $inject = ['$scope'];
    constructor(
        private $scope: IDepartureScope
    ) {
        $scope.departures = Array();

        const self = this;
        document.addEventListener("pagebeforeshow", function (e) {
            const page = $(e.target).attr('id');
            if (page === 'departure') {
                self.requestDepartures(CONFIG.station);
            }
        });
    }

    private requestDepartures(station: string) {

        const self = this;

        Helper.request({
                station: station
            },
            function (response: any) {
                console.info(response);

                self.$scope.departures.length = 0; // Clear old data.

                for (let elem of response.data.departures) {
                    console.log(elem);
                    self.$scope.departures.push(Departure.fromServerResponse(elem));
                }

                self.$scope.fetched = new Date();
                self.$scope.$apply();
                // self.listWidget.refresh();
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