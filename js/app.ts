import $ = require('jquery');

import {CONFIG} from "./config";
import {BackNavigation} from "./BackNavigation";
import {Navigation} from "./Navigation";

import {NearController} from "./controller/NearController";
import {DepartureController} from "./controller/DepartureController";
import {PageController} from "./controller/PageController";
import {Departure} from "./model/Departure";
import {CompanionService} from "./service/CompanionService";
import {Helper} from "./Helper";
import {LocationService} from "./service/LocationService";
import {NearService} from "./service/NearService";

declare var tau:any; // From Tizen SDK

(function () {

    const list = $('#departure-list');

    function init() {

        if (!CONFIG.endpoint || !CONFIG.token) {
            list.html('');
            list.append("<li>No endpoint / token defined</li>");
            return;
        }

        Navigation.init();

        // Handle hardware key input for back navigation.
        BackNavigation.startListener();

        LocationService.init();

        NearService.init();

        // Helper.showPopUp("Init", 3000);

        // CompanionService.connectEvent.on(() => {
        //     CompanionService.fetch();
        // });

        // LocationService.changeEvent.on( (location) => {
        //     setTimeout(() => {
        //         const delay = (new Date()).getTime() - location.timestamp;
        //         Helper.showPopUp("Lat=" + location.lat + " Long=" + location.long + " Delay=" + delay);
        //     }, 0);
        // });

        CompanionService.connect();


        // Helper.showPopUp("Init");

    }

    init();

}());