
import {Error} from "../model/Error";
import {Helper} from "../Helper";
import {CompanionService} from "./CompanionService";

export class ErrorService {

    private static RESPONSE_ERROR = 'error';

    static init() {
        CompanionService.onMessage(ErrorService.RESPONSE_ERROR, ErrorService.handleErrorResponse);
    }

    private static handleErrorResponse(response: any) {
        const error  = Error.fromCompanionResponse(response);
        Helper.showPopUp(error.getMessage())
    }
}
