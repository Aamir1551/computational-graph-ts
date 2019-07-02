import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Divide extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
    }

    addDirivatives(): void {
        throw new Error("Method not implemented.");
    }

    public compute() : void {
        this._value = Matrix.divide(this.feeders[0].value, this.feeders[1].value);
    }

    resetDelta() {
        //maybe add inverse matrix operation
    }   
}