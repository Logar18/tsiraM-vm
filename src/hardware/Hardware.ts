export class Hardware {

    //class variables
    public name: string = "";
    public id: number;
    public debug: boolean = false;
    public cpuDebug: boolean;

    //params: name and id for the component
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.debug = false;
    }


    //param: name of component that is toggling debug
    toggleDebug(component: string) {
        this.debug = !this.debug;
        console.log((this.debug ? component + " debug on" : component + " debug off"));
    }

    //param: message from the component to be displated to the console
    log(message: string) {
        console.log(
            "[" + this.name + 
            " | ID: " + this.id +
            " | Debug:" + (!this.debug ? " OFF" : " ON" ) + "]: " + message);
    }

    //param val: number to be formatted into hexadecimal
    //param size: size of the hexidecimal number
    public hexValue(val: number, size: number) {
        let string = val.toString(16).toUpperCase();
        while (string.length < (size || 2))
            string = "0" + string;
        return ("0x" + string)
    }

    public littleEndianValue(hob: number, lob: number) {
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

    public getDebug() {
        return this.debug;
    }
    
}