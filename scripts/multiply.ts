import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Multiply extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
    }

    addDirivatives(): void {
        Multiply.updateDelta(this.feeders[0], Matrix.multiply(this.feeders[1].value, this.delta));
        Multiply.updateDelta(this.feeders[1], Matrix.multiply(this.feeders[0].value, this.delta));
    }

    resetDelta(d:number=0) {
        this.delta = new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, d);
    }

    public compute() : void{
        this._value = Matrix.multiply(this.feeders[0].value, this.feeders[1].value);
    }
    
}