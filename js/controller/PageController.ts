export abstract class PageController {

    pageName: string;

    abstract onEnter(parameters: any): void;
    abstract onLeave(): void;

    constructor(pageName: string) {
        this.pageName = pageName;
    }
}