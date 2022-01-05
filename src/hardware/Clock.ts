import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";
import { Memory } from "./Memory";

export class Clock extends Hardware {

    private _MEMORY: Memory;
    private _CPU: Cpu;
    private _compARRAY: Array<object>;

    constructor(memory: Memory, cpu: Cpu) {
        super("Clock", 1);
        this._MEMORY = memory;
        this._CPU = cpu;
        this._compARRAY = new Array();
        this._compARRAY.push(this._MEMORY, this._CPU);
    }

    //this method sends a pulse to any component that is registered 
    //as a clock listener. 
    pulse() {
        this._compARRAY.forEach( (element) => {
            element.pulse();
        })
        //this._CPU.pulse();
        //this._MEMORY.pulse();
    }

    public cycleClock(interval: number) {
        setInterval( () =>
            this.pulse(), interval)
    }

}