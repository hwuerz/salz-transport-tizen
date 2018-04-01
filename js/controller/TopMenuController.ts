
import {ListPageController} from "./ListPageController";
import {ListEntry} from "../model/ListEntry";

export class TopMenuController extends ListPageController {

    onEnter(parameters: any) {
        super.onEnter(parameters);
    }

    onLeave() {
        super.onLeave();
    }

    getData(): ListEntry[] {
        return Array();
    }
}
