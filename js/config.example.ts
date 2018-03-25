
import {IrrelevantStationNamePart} from "./IrrelevantStationNamePart";

const CONFIG = {
    endpoint: 'https://YOUR-ID.execute-api.eu-west-1.amazonaws.com/prod',
    token: 'YOUR-TOKEN8ZdlLVwwPpv8shJK7WBGOBa6gKKBFt',
    station: 'YOUR-STATION-ID',
    irrelevantStationNameParts: [
        new IrrelevantStationNamePart('YOUR-LONG-CITY-PREFIX','YLCP')
    ]
};

export {CONFIG}