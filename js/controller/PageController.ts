
import $ = require('jquery');

export abstract class PageController {

    pageName: string;

    private readonly titleElement: JQuery;

    constructor(pageName: string) {
        this.pageName = pageName;
        this.titleElement = $('#' + pageName).find('.ui-title');
    }

    onEnter(parameters: any) {

        // Update the title if known.
        if (parameters && parameters.title) {
            this.titleElement.html(parameters.title)
        }
    }

    onLeave() {

    }
}