
import {IrrelevantStationNamePart} from "./IrrelevantStationNamePart";
import {Near} from "./model/Near";

const CONFIG = {
    topPage: 'top-menu',
    startPage: 'favourite',
    endpoint: 'https://YOUR-ID.execute-api.eu-west-1.amazonaws.com/prod',
    token: 'YOUR-TOKEN8ZdlLVwwPpv8shJK7WBGOBa6gKKBFt',
    favouriteStation: [
        Near.fromFavourite('3000010', 'FRA Hauptbahnhof', 50.106817, 8.662662),
    ],
    debugLocation: {
        latitude: 50.106608,
        longitude: 8.663194
    },
    irrelevantStationNameParts: [
        new IrrelevantStationNamePart('YOUR-LONG-CITY-PREFIX','YLCP')
    ]
};

export {CONFIG}