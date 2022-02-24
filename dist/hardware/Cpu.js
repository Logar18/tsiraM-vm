"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cpu = void 0;
const Hardware_1 = require("./Hardware");
const Ascii_1 = require("../util/Ascii");
class Cpu extends Hardware_1.Hardware {
    constructor(sysMMU) {
        super('CPU', 0);
        this.programCounter = 0;
        this.MMU = sysMMU;
        this.InstructionRegister = 0x00;
        this.xReg = 0x00;
        this.yReg = 0x00;
        this.zFlag = 0x00;
        this.cycleStatus = 'fetch';
        this.accumulator = null;
        this.noOpInstructions = new Set();
        this.oneOpInstructions = new Set();
        this.twoOpInstructions = new Set();
        this.populateInstructionSets();
        this.Ascii = new Ascii_1.Ascii();
        // this.toggleDebug();
    }
    //debug toggler
    toggleDebug() {
        super.toggleDebug('CPU');
    }
    pulse() {
        //displays message every pulse if debug is on
        if (super.getDebug()) {
            super.log('PC: ' + this.programCounter
                + ' | IR: ' + super.hexValue(this.InstructionRegister, 2)
                + ' | Acc: ' + this.accumulator
                + ' | xReg: ' + this.xReg
                + ' | yReg: ' + this.yReg
                + ' | zFlag: ' + this.zFlag
                + ' | Cycle Status: ' + this.cycleStatus);
        }
        switch (this.cycleStatus) {
            case ('fetch'): {
                this.InstructionRegister = this.MMU.handleRead(this.programCounter);
                //instructions with no operands
                if (this.noOpInstructions.has(this.InstructionRegister)) {
                    this.cycleStatus = 'decode0';
                }
                //instructions with one operand
                if (this.oneOpInstructions.has(this.InstructionRegister)) {
                    this.cycleStatus = 'decode1';
                }
                //instructions with two operands
                if (this.twoOpInstructions.has(this.InstructionRegister)) {
                    this.cycleStatus = 'decode2';
                }
                //number output system call
                if (this.InstructionRegister == 0xFF && this.xReg == 0x01) {
                    this.execute(0xFF, 1);
                }
                //string output system call
                if (this.InstructionRegister == 0xFF && this.xReg == 0x02) {
                    this.cycleStatus = 'decode2';
                }
                this.programCounter++;
                break;
            }
            //can immediately execute these instructions as there are no operands and the next value in memory
            //is guaranteed to be an instruction
            case ('decode0'): {
                this.execute(this.InstructionRegister, 0);
                this.cycleStatus = 'interruptCheck';
                break;
            }
            //in the case of single operand instructions, the CPU will use the HOB to store the single
            //byte operand to use for execution
            case ('decode1'): {
                this.MMU.setHOB(this.MMU.handleRead(this.programCounter));
                this.cycleStatus = 'execute';
                this.programCounter++;
                break;
            }
            case ('decode2'): {
                this.MMU.setLOB(this.MMU.handleRead(this.programCounter));
                this.cycleStatus = 'decode3';
                this.programCounter++;
                break;
            }
            case ('decode3'): {
                this.MMU.setHOB(this.MMU.handleRead(this.programCounter));
                this.cycleStatus = 'execute';
                this.programCounter++;
            }
            case ('execute'): {
                this.execute(this.InstructionRegister, 0);
                this.cycleStatus = 'interruptCheck';
                break;
            }
            case ('interruptCheck'): {
                this.cycleStatus = 'fetch';
                break;
            }
        }
    }
    //writeback function (exactly what is looks like)
    writeBack() {
        let address = super.littleEndianValue(this.MMU.getHOB(), this.MMU.getLOB());
        this.MMU.writeImmediate(address, this.accumulator);
    }
    //params:
    //instruction: the hex value of the instruction that is to be executed
    //step: the step of the instruction that is being executed
    //for most instructions, this is irrelevant. In the case of increment, it is used
    //to determine what step of the execute the increment is on. In the case of a system call,
    //it is used to differentiate between a string output and a number output
    execute(instruction, step) {
        let address = super.littleEndianValue(this.MMU.getHOB(), this.MMU.getLOB());
        // console.log('executing: ' + super.hexValue(instruction, 2));
        switch (instruction) {
            //load the accumulator with a constant
            case (0xA9): {
                this.accumulator = this.MMU.getHOB();
                //console.log(this.accumulator);
                break;
            }
            //load the accumulator from memory
            case (0xAD): {
                this.accumulator = this.MMU.handleRead(address);
                //console.log(this.accumulator);
                break;
            }
            //store the accumulator in memory
            case (0x8D): {
                // console.log('old value: ' + this.MMU.handleRead(address));
                this.MMU.writeImmediate(address, this.accumulator);
                // console.log('new value: ' + this.MMU.handleRead(address));
                break;
            }
            //load the accumulator from the X register
            case (0x8A): {
                this.accumulator = this.xReg;
                break;
            }
            //load the accumulator from the Y register
            case (0x98): {
                this.accumulator = this.yReg;
                break;
            }
            //add with carry: Adds contents of an address to the accumulator
            //and keeps the result in the accumulator
            case (0x6D): {
                let byte = this.MMU.handleRead(address);
                if (byte <= 0x7f) {
                    this.accumulator += byte;
                }
                else if (byte >= 0x80) {
                    let n = ((0xFF - byte) + 1);
                    this.accumulator -= n;
                }
                break;
            }
            //load the X register with a constant
            case (0xA2): {
                this.xReg = this.MMU.getHOB();
                break;
            }
            //load the x register from memory
            case (0xAE): {
                this.xReg = this.MMU.handleRead(address);
                break;
            }
            //load the x register from the accumulator
            case (0xAA): {
                this.xReg = this.accumulator;
                break;
            }
            //load the y register with a constant
            case (0xA0): {
                this.yReg = this.MMU.getHOB();
                break;
            }
            //load the y register from memory
            case (0xAC): {
                this.yReg = this.MMU.handleRead(address);
                break;
            }
            //load the y register from the accumulaotr
            case (0xA8): {
                this.yReg = this.accumulator;
                break;
            }
            //no operation
            case (0xEA): {
                break;
            }
            //break
            case (0x00): {
                process.exit();
            }
            //compare a byte in memory to the xReg. Set the z (zero) flag if equal
            case (0xEC): {
                let byte = this.MMU.handleRead(address);
                console.log(byte);
                if (byte == this.xReg)
                    this.zFlag = 1;
                else
                    this.zFlag = 0;
                break;
            }
            //branch n bytes if zFlag = 0
            case (0xD0): {
                if (this.zFlag == 0) {
                    if (this.MMU.getHOB() <= 0x7f) {
                        this.programCounter += this.MMU.getHOB();
                    }
                    else if (this.MMU.getHOB() >= 0x80) {
                        let n = (0xFF - this.MMU.getHOB()) + 1;
                        this.programCounter -= n;
                    }
                }
                else
                    break;
                break;
            }
            //increment the value of a byte
            case (0xEE): {
                if (step == 0) {
                    // console.log(this.MMU.handleRead(address))
                    this.accumulator = this.MMU.handleRead(address);
                    this.execute(this.InstructionRegister, 1);
                }
                if (step == 1) {
                    this.accumulator++;
                    this.writeBack();
                    break;
                }
                else
                    break;
            }
            //system call
            case (0xFF): {
                if (step == 1) {
                    process.stdout.write((this.yReg).toString(16));
                }
                if (step == 0) {
                    let hexChar = this.MMU.handleRead(address);
                    while (hexChar != 0x00) {
                        process.stdout.write(this.Ascii.convert(hexChar));
                        address++;
                        hexChar = this.MMU.handleRead(address);
                    }
                }
                break;
            }
            default: {
                console.log('UNRECOGNIZED INSTRUCTION');
            }
        }
        return null;
    }
    //fills sets with instuctions for decode purposes
    populateInstructionSets() {
        this.noOpInstructions
            .add(0x8A).add(0x98)
            .add(0xAA).add(0xA8)
            .add(0xEA).add(0x00);
        this.oneOpInstructions
            .add(0xA9).add(0xA2)
            .add(0xA0).add(0xD0);
        this.twoOpInstructions
            .add(0xAD).add(0x8D)
            .add(0x6D).add(0xAE)
            .add(0xAC).add(0xEC)
            .add(0xEE);
    }
}
exports.Cpu = Cpu;
//# sourceMappingURL=Cpu.js.map