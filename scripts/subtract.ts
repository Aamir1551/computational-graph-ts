import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class subtract extends CompNode {

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, 1), this.delta));
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, -1), this.delta));
    }

    resetDelta(d:number = 0) {
        this.delta = new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, d);
    }

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
    }

    public compute() : void{
        this._value = Matrix.subtract(this.feeders[0].value, this.feeders[1].value);
    }
    
}