import $ = require('jquery');

import {CONFIG} from "./config";
import {Navigation} from "./Navigation";

import {Location} from "./model/Location";
import {CompanionService} from "./service/CompanionService";
import {LocationService} from "./service/LocationService";
import {NearService} from "./service/NearService";
import {DepartureService} from "./service/DepartureService";

declare var tau:any; // From Tizen SDK
declare var webapis:any; // From Tizen SDK

(function () {

    const list = $('#departure-list');

    function init() {

        if (!CONFIG.endpoint || !CONFIG.token) {
            list.html('');
            list.append("<li>No endpoint / token defined</li>");
            return;
        }

        Navigation.init();

        LocationService.init();

        NearService.init();

        DepartureService.init();

        CompanionService.connect();

        // The app is running in the browser. Simulate a location.
        if (typeof webapis === 'undefined') {
            LocationService.setLocation(new Location(CONFIG.debugLocation.latitude, CONFIG.debugLocation.longitude));
        }

        // Helper.showPopUp("Init");

    }

    init();

}());