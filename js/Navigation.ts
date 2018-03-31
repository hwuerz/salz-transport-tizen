import $ = require('jquery');
import {PageController} from "./controller/PageController";

declare var tau:any; // From Tizen SDK

import {CONFIG} from "./config";
import {DepartureController} from "./controller/DepartureController";
import {NearController} from "./controller/NearController";

export class Navigation {

    private static page = CONFIG.mainPage;

    static init() {

        let controller: {[key: string]: PageController} = {};

        // Generate controllers.
        $('.ui-page').each(function() {
            const id = $(this).attr('id');
            controller[id] = Navigation.generateController(id);
        });

        document.addEventListener("pagebeforeshow", function (e) {
            Navigation.page = $(e.target).attr('id');
            console.log("Enter " + Navigation.page);
            if (controller[Navigation.page]) {
                controller[Navigation.page].onEnter();
            } else {
                console.error("Missing controller for page " + Navigation.page);
            }
        });

        document.addEventListener("pagebeforehide", function () {
            console.log("Leave " + Navigation.page);
            if (controller[Navigation.page]) {
                controller[Navigation.page].onLeave();
            } else {
                console.error("Missing controller for page " + Navigation.page);
            }
        });

        $('#' + Navigation.page).addClass('ui-page-active');
    }

    private static generateController(page: string) {
        switch (page) {
            case 'near': return new NearController('near');
            case 'departure': return new DepartureController('departure');
            default: throw new Error("No Controller found for page " + page);
        }
    }

    static getCurrentPage() {
        return Navigation.page;
    }
}