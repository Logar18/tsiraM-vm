"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MMU = void 0;
const Hardware_1 = require("./Hardware");
class MMU extends Hardware_1.Hardware {
    constructor(memory) {
        super("MMU", 1);
        this.memory = memory;
        this.HOB = 0x00;
        this.LOB = 0x00;
        //UN-COMMENT A PROGRAM TO TEST
        // this.loadDefault();
        // this.loadSystemCall();
        // this.loadPowersProgram();
    }
    //calling MAR setter from memory instance
    setMAR(address) {
        this.memory.setMAR(address);
    }
    //calling MDR setter from memory instance
    setMDR(data) {
        this.memory.setMDR(data);
    }
    //calling MAR getter from memory instance
    getMAR() {
        return (this.memory.getMAR);
    }
    //calling MDR getter from memory instance
    getMDR() {
        return (this.memory.getMDR);
    }
    //setter for high order byte
    setHOB(hob) {
        this.HOB = hob;
    }
    //setter for low order byte
    setLOB(lob) {
        this.LOB = lob;
    }
    //getter for high order byte
    getHOB() {
        return this.HOB;
    }
    //getter for low order byte
    getLOB() {
        return this.LOB;
    }
    //prints memory from on address to another
    //params:
    //add1: starting address
    //add2: ending address
    memoryDump(add1, add2) {
        for (let i = add1; i <= add2; i++)
            this.memory.log(super.hexValue(i, 4) + ":   | " + super.hexValue(this.memory.displayMemory(i), 2));
    }
    //takes in address to read from and returns the data in memory from
    //that address
    //param: address in memory to read from
    //returns: contents of MDR after read
    handleRead(address) {
        this.setMAR(address);
        //console.log(this.getMAR());
        this.memory.read();
        return (this.memory.getMDR());
    }
    //handles writing immediatley to memory
    //param address: address in memory to write to
    //param data: data you want to write to specified address
    writeImmediate(address, data) {
        this.memory.setMAR(address);
        this.memory.setMDR(data);
        this.memory.write();
    }
    loadDefault() {
        //writing some random data to use for test cases
        this.writeImmediate(0x00A1, 0x48);
        this.writeImmediate(0x00A2, 0x65);
        this.writeImmediate(0x00A3, 0x6C);
        this.writeImmediate(0x00A4, 0x6C);
        this.writeImmediate(0x00A5, 0x6F);
        this.writeImmediate(0x00A6, 0x00);
        let defaultProgram = [0xA9, 0xFF, 0x8D, 0x41, 0x00, 0xA9, 0x00, 0x8D, 0x42, 0x00, 0xA9, 0x0A, 0x8D, 0x40, 0x00, 0x6D, 0x41, 0x00, 0xA8,
            0xA2, 0x01, 0xFF, 0xAA, 0xEC, 0x42, 0x00, 0xD0, 0xF3, 0x00];
        for (let i = 0x0000; i < defaultProgram.length; i++) {
            this.writeImmediate(i, defaultProgram[i]);
        }
    }
    loadProgram(program, vars, varStart) {
        for (let i = 0; i < program.length; i++) {
            this.writeImmediate(i, program[i]);
        }
        for (let j = varStart; j < vars.length; j++) {
            this.writeImmediate(j, vars[j]);
        }
    }
    loadSystemCall() {
        // load constant 3
        this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x0A);
        // write acc (3) to 0040
        this.writeImmediate(0x0002, 0x8D);
        this.writeImmediate(0x0003, 0x40);
        this.writeImmediate(0x0004, 0x00);
        // :loop
        // Load y from memory (3)
        this.writeImmediate(0x0005, 0xAC);
        this.writeImmediate(0x0006, 0x40);
        this.writeImmediate(0x0007, 0x00);
        // Load x with constant (1) (to make the first system call)
        this.writeImmediate(0x0008, 0xA2);
        this.writeImmediate(0x0009, 0x01);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x000A, 0xFF);
        // Load x with constant (2) (to make the second system call for the string)
        this.writeImmediate(0x000B, 0xA2);
        this.writeImmediate(0x000C, 0x02);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x000D, 0xFF);
        this.writeImmediate(0x000E, 0x50);
        this.writeImmediate(0x000F, 0x00);
        // load the string
        // 0A 48 65 6c 6c 6f 20 57 6f 72 6c 64 21
        this.writeImmediate(0x0050, 0x0A);
        this.writeImmediate(0x0051, 0x48);
        this.writeImmediate(0x0052, 0x65);
        this.writeImmediate(0x0053, 0x6C);
        this.writeImmediate(0x0054, 0x6C);
        this.writeImmediate(0x0055, 0x6F);
        this.writeImmediate(0x0056, 0x20);
        this.writeImmediate(0x0057, 0x57);
        this.writeImmediate(0x0058, 0x6F);
        this.writeImmediate(0x0059, 0x72);
        this.writeImmediate(0x005A, 0x6C);
        this.writeImmediate(0x005B, 0x64);
        this.writeImmediate(0x005C, 0x21);
        this.writeImmediate(0x005D, 0x0A);
        this.writeImmediate(0x005E, 0x00);
        this.memoryDump(0x0000, 0x0010);
        console.log("---------------------------");
        this.memoryDump(0x0040, 0x0043);
        console.log("---------------------------");
        this.memoryDump(0x0050, 0x005C);
    }
    loadPowersProgram() {
        // load constant 0
        this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this.writeImmediate(0x0002, 0x8D);
        this.writeImmediate(0x0003, 0x40);
        this.writeImmediate(0x0004, 0x00);
        // load constant 1
        this.writeImmediate(0x0005, 0xA9);
        this.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this.writeImmediate(0x0007, 0x6D);
        this.writeImmediate(0x0008, 0x40);
        this.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this.writeImmediate(0x000A, 0x8D);
        this.writeImmediate(0x000B, 0x40);
        this.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this.writeImmediate(0x000D, 0xAC);
        this.writeImmediate(0x000E, 0x40);
        this.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this.writeImmediate(0x0010, 0xA2);
        this.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0012, 0xFF);
        // Load x with constant (2) (to make the second system call for the string)
        this.writeImmediate(0x0013, 0xA2);
        this.writeImmediate(0x0014, 0x02);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0015, 0xFF);
        this.writeImmediate(0x0016, 0x50);
        this.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this.writeImmediate(0x0018, 0xD0);
        this.writeImmediate(0x0019, 0xED);
        // globals
        this.writeImmediate(0x0050, 0x2C);
        this.writeImmediate(0x0052, 0x00);
        this.memoryDump(0x0000, 0x001A);
        console.log("---------------------------");
        this.memoryDump(0x0050, 0x0053);
    }
}
exports.MMU = MMU;
//# sourceMappingURL=MMU.js.map