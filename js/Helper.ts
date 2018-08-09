
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
     */
    private static popupText = $('#popupToast .ui-popup-content');

    /**
     * The tau popup.
     * Use popup.open() and popup.close()
     */
    private static popup = tau.widget.Popup(document.getElementById("popupToast"));

    /**
     * A pipeline with all popup messages which should be opened.
     * @type {any[]}
     */
    private static pipeline: any = [];

    /**
     * Flag whether a popup is currently displayed or not.
     * @type {boolean}
     */
    private static popupOpen: boolean = false;

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

    private static displayFirstPopup() {
        if (this.pipeline.length == 0) { // If no popup is left in the pipeline --> close the last one and finish.
            Helper.popup.close();
            this.popupOpen = false;
            return;
        }

        // Get the first popup data.
        const popup = this.pipeline.shift();
        const text = popup.text;
        const duration = popup.duration;

        // Show the popup.
        this.popupText.html(text);
        this.popup.open();
        setTimeout(() => {
            this.displayFirstPopup(); // Display the next popup in the pipeline as soon as this one is finished.
        }, duration);
    }

    static showPopUp(text: string, duration: number = 3000) {
        this.pipeline.push({text: text, duration: duration});
        // Only invoke rendering if no popup is currently displayed.
        // Otherwise it will be opened automatically after the current one.
        if (!this.popupOpen) {
            this.popupOpen = true;
            this.displayFirstPopup();
        }
    }
}