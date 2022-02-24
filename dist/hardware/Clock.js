"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const Hardware_1 = require("./Hardware");
class Clock extends Hardware_1.Hardware {
    constructor(memory, cpu) {
        super("Clock", 1);
        this._MEMORY = memory;
        this._CPU = cpu;
        this._compARRAY = new Array();
        this._compARRAY.push(this._MEMORY, this._CPU);
    }
    //this method sends a pulse to any component that is registered 
    //as a clock listener. 
    pulse() {
        this._compARRAY.forEach((element) => {
            element.pulse();
        });
        //this._CPU.pulse();
        //this._MEMORY.pulse();
    }
    cycleClock(interval) {
        setInterval(() => this.pulse(), interval);
    }
}
exports.Clock = Clock;
//# sourceMappingURL=Clock.js.map