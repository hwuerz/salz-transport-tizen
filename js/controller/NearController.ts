
import angular = require('angular');
import {Helper} from "../Helper";
import {Near} from "../model/Near";

declare var tau:any; // From Tizen SDK

interface INearScope extends angular.IScope {
    nearStations: Near[];
    controller: NearController;
    fetched: Date;
    error: string;
}

export class NearController {

    lat: number;
    long: number;

    static $inject = ['$scope'];
    constructor(
        private $scope: INearScope
    ) {
        $scope.nearStations = Array();
        $scope.controller = this;
        this.oneShotFunc();
    }

    private requestNear(lat: number, long: number) {

        const self = this;

        Helper.request(
            {
                near: {
                    lat: lat,
                    long: long
                }
            },
            function (response: any) {
                console.info(response);

                self.$scope.nearStations.length = 0; // Clear old data.

                for (let elem of response.data.near) {
                    console.log(elem);
                    self.$scope.nearStations.push(Near.fromServerResponse(elem));
                }

                self.$scope.fetched = new Date();
                self.$scope.$apply();
                // self.listWidget.refresh();
            },
            function(data: any) {
                console.log('Request failed');
                console.info(JSON.stringify(data));
                self.$scope.nearStations.length = 0;
                self.$scope.error = JSON.stringify(data);
            })
    }

    private errorCallback(error: PositionError) {
        console.log("Request location --> ERROR");
        let errorInfo = document.getElementById('locationInfo');

        switch (error.code) {
            case error.PERMISSION_DENIED:
                errorInfo.innerHTML = 'User denied the request for Geolocation.';
                break;
            case error.POSITION_UNAVAILABLE:
                errorInfo.innerHTML = 'Location information is unavailable.';
                break;
            case error.TIMEOUT:
                errorInfo.innerHTML = 'The request to get user location timed out.';
                break;
        }
    }

    private oneShotFunc() {
        if (navigator.geolocation) {
            console.log("Request location");
            navigator.geolocation.getCurrentPosition(
                position => this.requestNear(position.coords.latitude, position.coords.longitude),
                error => this.errorCallback(error),
                {maximumAge: 60000, timeout: 100000});
        } else {
            document.getElementById('locationInfo').innerHTML = 'Geolocation is not supported.';
        }
    }

}

const moduleName = 'NearController';
export default moduleName
angular.module(moduleName, [])
    .controller(moduleName, NearController);