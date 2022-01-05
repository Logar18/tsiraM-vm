import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener {

    //this is the array of bits in the memory
    private mem: Array<number>;
    private range: number;
    private MAR: number;
    private MDR: number;

    constructor(range: number) {
        super("Memory", 1);
        this.mem = [];
        this.range = range;
        this.MAR = 0x0000;
        this.MDR = 0x00;
    }

    //this initializes all mem in the memory to 0x00
    //used on startup
    //param range: the range of usable memory space (in 6502's case, 0xFF)
    initialize() {
        console.log("INITIALIZED");
        let val = 0x00;
        for (let i = 0x0; i <= this.range; i++) {
            this.mem[i] = val;
            //console.log(this.mem[i] + " " + i);
            //val++;
        }
    }

    //displays the data in a given memory address
    //param: the address of the data to be displayed
    displayMemory(address: number) {
        if (address > this.range)
            return (-1);
        return this.mem[address];
    }

    //does nothing for right now
    pulse() {
        //super.log("recieved clock pulse");
    }

    //resets all memory to 0x00
    reset() {
        console.log("RESET");
        for (let i=0; i <= this.range; i++) {
            this.mem[i] = 0x00;
        }
    }

    //sets the contents of the MDR to the contents of memory 
    //address stored in the MAR
    read() {
        this.setMDR(this.mem[this.getMAR()]);
        //console.log(this.MDR)
    }

    //writes the contents of the MDR to the address in the MAR
    write() {
        this.mem[this.getMAR()] = this.MDR;
    }

    //getter for memory address register
    getMAR() {
        return this.MAR;
    }

    //setter for memory address register
    setMAR(address: number) {
        this.MAR = address;
    }

    //getter for memory data register
    getMDR() {
        return this.MDR;
    }

    //setter for memory data register
    setMDR(data: number) {
        this.MDR = data;
    }

    //getter for range
    getRange() {
        return this.range;
    }
}

