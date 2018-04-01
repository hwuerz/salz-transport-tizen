
import $ = require('jquery');

import {PageController} from "./PageController";
import {ListEntry} from "../model/ListEntry";
import {ListPageStatus} from "../ListPageStatus";

declare var tau:any; // From Tizen SDK

export abstract class ListPageController extends PageController {

    /**
     * The current status. Determines what will be displayed.
     * @type {ListPageStatus}
     */
    protected status: ListPageStatus = ListPageStatus.DATA;

    private readonly list: JQuery = null;
    private listHelper: any = null;

    constructor(pageName: string) {
        super(pageName);

        this.list = $('#' + pageName).find('.ui-listview');
    }

    onEnter(parameters: any) {
        super.onEnter(parameters);
        this.createListHelper();
    }

    onLeave() {
        super.onLeave();
        this.destroyListHelper();
    }

    abstract getData(): ListEntry[];

    protected listRefresh() {
        this.destroyListHelper();
        this.listClear();

        switch (this.status) {
            case ListPageStatus.DATA: {
                const data = this.getData();
                if (data.length === 0) {
                    this.displayNoData();
                } else  {
                    this.displayData();
                }
                break;
            }
            case ListPageStatus.LOADING: {
                this.displayLoading();
                break;
            }
            case ListPageStatus.ERROR: {
                this.displayError();
                break;
            }
        }

        this.createListHelper();
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

    private listClear() {
        this.list.html('');
    }

    private displayData() {

        const sorted = this.getData()
            .sort((entry1, entry2) => entry1.getSortingValue() - entry2.getSortingValue());

        for (let entry of sorted) {
            const elem = $("<li>" + entry.toHtml() + "</li>");
            elem.appendTo(this.list);
            if (entry.getCallback()) {
                elem.on("click", () => {
                    entry.getCallback()(event);
                })
            }
        }

        console.log("Displayed data in list page " + this.pageName);
    }

    private displayNoData() {
        $("<li>No data</li>").appendTo(this.list);
    }

    private displayLoading() {
        $("<li>Loading</li>").appendTo(this.list);
    }

    private displayError() {
        $("<li>Error</li>").appendTo(this.list);
    }
}