
export class Error {

    private readonly message: string;

    constructor(message: string) {
        this.message = message;
    }

    static fromCompanionResponse(obj: any) {
        return new Error(
            obj.message
        );
    }

    getMessage() {
        return this.message;
    }
}