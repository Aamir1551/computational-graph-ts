import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Matmul extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
    }

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.matmul(this.delta, Matrix.transpose(this.feeders[1].value)));
        CompNode.updateDelta(this.feeders[1], Matrix.matmul(Matrix.transpose(this.feeders[0].value) , this.delta));
    }

    resetDelta(d:number = 0) {
        this.delta = new Matrix(this.feeders[0].value.rows, this.feeders[1].value.columns, d);
    }

    public compute() : void{
        this._value = Matrix.matmul(this.feeders[0].value, this.feeders[1].value);
    }
    
}