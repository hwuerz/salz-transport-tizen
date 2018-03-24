export class Departure {

    line: string;

    destination: string;

    time: number;

    delay: number;

    constructor(line: string, destination: string, time: number, delay: number) {
        this.line = line;
        this.destination = destination;
        this.time = time;
        this.delay = delay;
    }
}