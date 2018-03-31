export abstract class PageController {

    pageName: string;

    abstract onEnter(): void;
    abstract onLeave(): void;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}