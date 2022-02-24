import { Clock } from "./hardware/Clock";
// import statements for hardware
import {Cpu} from "./hardware/Cpu";
import { Hardware } from "./hardware/Hardware";
import { Memory } from "./hardware/Memory";
import { MMU } from "./hardware/MMU";

// CONSTANTS:
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL = 100;              
//  This is in ms (milliseconds)
//  1000 = 1 second, 100 = 1/10 second
//  100 = 10hz, 1 = 1,000hz or 1khz
// .001 = 1,000,000 or 1mhz. 
//  Obviously you will want to keep this small, I recommend a 
//  setting of 100, if you want to slow things down make it larger.



export class System extends Hardware {

    private _CPU : Cpu = null;
    private _MEMORY: Memory = null;
    public running: boolean = false;
    private _CLOCK: Clock = null;
    private _MMU: MMU = null;

    constructor() {
        super("System", 0);
        this._MEMORY = new Memory(0xFFFF);
        this._MEMORY.initialize();
        this._MMU = new MMU(this._MEMORY);
        this._CPU = new Cpu(this._MMU);
        this._CLOCK = new Clock(this._MEMORY, this._CPU)
        //Start the system (Analogous to pressing the power button and having voltages flow through the components)
        //When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        //components so they can act on each clock cycle.       
        this.startSystem();
        this._CLOCK.cycleClock(CLOCK_INTERVAL);
    }

    public startSystem(): boolean {
        super.log("Created");
        this._CPU.log("Created");
        this._MEMORY.log("Created - Adressable Space: " + this._MEMORY.getRange());
        return true;
    }

    public stopSystem(): boolean {
        return false;
    }  

    public loadProgram(program:number[], vars:number[], varStart:number) {
        this._MMU.loadProgram(program, vars, varStart);
        // this._MMU.memoryDump
    }
}


// let system: System = new System();
// let prog = [0xA9, 0x0A, 0x8D, 0x40, 0x00, 0xAC, 0x40, 0x00, 0xA2, 0x01, 0xFF, 0xA2, 0x02, 0xFF, 0x50, 0x00];
// let vars = [0x0A, 0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x20, 0x57, 0x6F, 0x72, 0x6C, 0x64, 0x21, 0x0A, 0x00];
// system.loadProgram(prog, vars, 0x0050)
