import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class subtract extends CompNode {

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, 1), this._delta));
        CompNode.updateDelta(this.feeders[1], Matrix.multiply(new Matrix(this.feeders[0].value.rows, this.feeders[0].value.columns, -1), this._delta));
    }

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    public compute() : void{
        this._value = Matrix.subtract(this.feeders[0].value, this.feeders[1].value);
    }
    
}