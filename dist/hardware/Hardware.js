"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hardware = void 0;
class Hardware {
    //params: name and id for the component
    constructor(name, id) {
        //class variables
        this.name = "";
        this.debug = false;
        this.name = name;
        this.id = id;
        this.debug = false;
    }
    //param: name of component that is toggling debug
    toggleDebug(component) {
        this.debug = !this.debug;
        console.log((this.debug ? component + " debug on" : component + " debug off"));
    }
    //param: message from the component to be displated to the console
    log(message) {
        console.log("[" + this.name +
            " | ID: " + this.id +
            " | Debug:" + (!this.debug ? " OFF" : " ON") + "]: " + message);
    }
    //param val: number to be formatted into hexadecimal
    //param size: size of the hexidecimal number
    hexValue(val, size) {
        let string = val.toString(16).toUpperCase();
        while (string.length < (size || 2))
            string = "0" + string;
        return ("0x" + string);
    }
    littleEndianValue(hob, lob) {
        let hobS = hob.toString(16);
        let lobS = lob.toString(16);
        return parseInt(("0x" + hobS + lobS));
    }
    //getter for name
    getName() {
        return this.name;
    }
    //getter of ID
    getID() {
        return this.id;
    }
    getDebug() {
        return this.debug;
    }
}
exports.Hardware = Hardware;
//# sourceMappingURL=Hardware.js.map