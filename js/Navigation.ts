import $ = require('jquery');
import {PageController} from "./controller/PageController";

declare var tau:any; // From Tizen SDK
declare var tizen:any; // From Tizen SDK

import {CONFIG} from "./config";
import {DepartureController} from "./controller/DepartureController";
import {NearController} from "./controller/NearController";
import {FavouriteController} from "./controller/FavouriteController";
import {TopMenuController} from "./controller/TopMenuController";

export class Navigation {

    private static controller: {[key: string]: PageController} = {
        'departure': new DepartureController('departure'),
        'favourite': new FavouriteController('favourite'),
        'near': new NearController('near'),
        'top-menu': new TopMenuController('top-menu')
    };

    /**
     * The currently displayed page.
     * @type {string}
     */
    private static page = CONFIG.startPage;

    /**
     * Object of parameters for the next page.
     * @type {object}
     */
    private static parameters: object = null;

    static init() {

        this.startPageBeforeHideListener();

        this.startPageBeforeShowListener();

        this.startBackListener();

        $('#' + CONFIG.startPage).addClass('ui-page-active');
    }

    private static startPageBeforeShowListener() {
        document.addEventListener("pagebeforeshow", function (e) {
            Navigation.page = $(e.target).attr('id');
            console.log("Enter " + Navigation.page);
            if (Navigation.controller[Navigation.page]) {
                Navigation.controller[Navigation.page].onEnter(Navigation.parameters);
                Navigation.parameters = null;
            } else {
                console.error("Missing controller for page " + Navigation.page);
            }
        });
    }

    private static startPageBeforeHideListener() {
        document.addEventListener("pagebeforehide", function () {
            console.log("Leave " + Navigation.page);
            if (Navigation.controller[Navigation.page]) {
                Navigation.controller[Navigation.page].onLeave();
            } else {
                console.error("Missing controller for page " + Navigation.page);
            }
        });
    }

    private static startBackListener() {
        window.addEventListener("tizenhwkey", function (ev:any) {
            let activePopup: any = null,
                page: any = null,
                pageId:string = "";

            if (ev.keyName === "back") {
                activePopup = document.querySelector(".ui-popup-active");
                page = document.getElementsByClassName("ui-page-active")[0];
                pageId = page ? page.id : "";

                if (pageId === CONFIG.topPage && !activePopup) {
                    try {
                        tizen.application.getCurrentApplication().exit();
                    } catch (ignore) {
                    }
                } else {
                    if (window.location.hash === '') {
                        Navigation.open(CONFIG.topPage);
                    } else {
                        window.history.back();
                    }
                }
            }
        });
    }

    static getCurrentPage() {
        return Navigation.page;
    }

    static open(page: string, parameters: any = null) {
        this.parameters = parameters;
        console.log("Register parameter", JSON.stringify(parameters));
        window.location.hash = page;
    }
}