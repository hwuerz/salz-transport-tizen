
import $ = require('jquery');

import {PageController} from "./PageController";

declare var tau:any; // From Tizen SDK

export abstract class ListPageController extends PageController {

    private readonly list: JQuery = null;
    private listHelper: any = null;

    constructor(pageName: string) {
        super(pageName);

        this.list = $('#' + pageName).find('.ui-listview');
    }

    onEnter(parameters: any) {
        this.createListHelper();
    }

    onLeave() {
        this.destroyListHelper();
    }

    private createListHelper() {
        if (this.list) {
            this.listHelper = tau.helper.SnapListStyle.create(this.list.get(0), {animate: "scale"});
        }
    }

    private destroyListHelper() {
        if (this.listHelper) {
            this.listHelper.destroy();
        }
        this.listHelper = null;
    }

    protected listRefresh() {
        this.destroyListHelper();
        this.createListHelper();
    }

    protected listClear() {
        this.list.html('');
    }

    protected listAdd(content: string, handler: {(event: Event): void} = undefined) {
        const elem = $("<li>" + content + "</li>");
        elem.appendTo(this.list);
        console.log("Added", elem);
        if (handler) {
            elem.on("click", () => {
                handler(event);
            })
        }
    }
}