export class IrrelevantStationNamePart {
    name: string | RegExp;
    replacement: string;


    constructor(name: string | RegExp, replacement: string) {
        this.name = name;
        this.replacement = replacement;
    }
}
