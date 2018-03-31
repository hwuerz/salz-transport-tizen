
import {IrrelevantStationNamePart} from "./IrrelevantStationNamePart";

const CONFIG = {
    mainPage: 'departure',
    endpoint: 'https://YOUR-ID.execute-api.eu-west-1.amazonaws.com/prod',
    token: 'YOUR-TOKEN8ZdlLVwwPpv8shJK7WBGOBa6gKKBFt',
    debugLocation: {
        latitude: 50.106608,
        longitude: 8.663194
    },
    irrelevantStationNameParts: [
        new IrrelevantStationNamePart('YOUR-LONG-CITY-PREFIX','YLCP')
    ]
};

export {CONFIG}