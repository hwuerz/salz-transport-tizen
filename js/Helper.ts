
import $ = require('jquery');
declare var tau:any; // From Tizen SDK

import {CONFIG} from "./config";

export class Helper {

    /**
     * The currently displayed page.
     * @type {string}
     */
    private static page = '';

    /**
     * The text element of the popup. Change the displayed text via popupText.html('YOUR-TEXT')
     * @type {JQuery<TElement extends Node>}
     */
    private static popupText = $('#popupToast .ui-popup-content');

    /**
     * The tau popup.
     * Use popup.open() and popup.close()
     */
    private static popup = tau.widget.Popup(document.getElementById("popupToast"));

    static getCurrentPage() {
        return Helper.page;
    }

    static request(data: object, success: any, error: any) {
        $.ajax({
            url: CONFIG.endpoint,
            type: 'post',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CONFIG.token
            },
            dataType: 'json',
            success: success,
            error: error
        });

    }

    static mapStationName(name: string) {
        let response = name;
        for (let part of CONFIG.irrelevantStationNameParts) {
            response = response.replace(part.name, part.replacement)
        }

        return response;
    }

    static showPopUp(text: string, duration: number = 3000) {
        this.popupText.html(text);
        this.popup.open();
        setTimeout(() => {
            Helper.popup.close()
        }, duration);
    }
}