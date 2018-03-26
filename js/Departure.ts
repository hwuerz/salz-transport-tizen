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

    getTimeOutput() {
        let timeOutput = this.time.toString();
        if (this.time < -1 * 60 * 24 * 7) {
            timeOutput = '?';
        }
        return timeOutput;
    }

    getDelayOutput() {
        let delayOutput = '';
        if (this.delay !== 0) {
            delayOutput = this.delay > 0 ? '+' + this.delay : this.delay.toString(); // Add sign
            delayOutput = " (" + delayOutput + "'')";
        }
        return delayOutput;
    }
}