import $ = require('jquery');
import {PageController} from "./controller/PageController";

declare var tau:any; // From Tizen SDK

import {CONFIG} from "./config";
import {DepartureController} from "./controller/DepartureController";
import {NearController} from "./controller/NearController";

export class Navigation {

    /**
     * The currently displayed page.
     * @type {string}
     */
    private static page = CONFIG.mainPage;

    /**
     * Object of parameters for the next page.
     * @type {object}
     */
    private static parameters: object = null;

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
                controller[Navigation.page].onEnter(Navigation.parameters);
                Navigation.parameters = null;
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

    static getCurrentPage() {
        return Navigation.page;
    }

    static open(page: string, parameters: any = null) {
        this.parameters = parameters;
        console.log("Register parameter", JSON.stringify(parameters));
        window.location.hash = page;
    }

    private static generateController(page: string) {
        switch (page) {
            case 'near': return new NearController('near');
            case 'departure': return new DepartureController('departure');
            default: throw new Error("No Controller found for page " + page);
        }
    }
}