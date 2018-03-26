import $ = require('jquery');

import angular = require('angular');

import {CONFIG} from "./config";
import {BackNavigation} from "./BackNavigation";
import Controller from "./controller/index";

declare var tau:any; // From Tizen SDK

(function () {

    const list = $('#departure-list');

    function init() {

        if (!CONFIG.endpoint || !CONFIG.token) {
            list.html('');
            list.append("<li>No endpoint / token defined</li>");
            return;
        }

        // Handle hardware key input for back navigation.
        BackNavigation.startListener();

        const extensionApp = angular.module('SalzTransportTizenApp', [
            Controller
        ]);
    }

    init();

}());