
import $ = require('jquery');
declare var tau:any; // From Tizen SDK

import {CONFIG} from "./config";

export class Helper {

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
}