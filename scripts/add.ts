import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Add extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0],  this._delta);
        CompNode.updateDelta(this.feeders[1],  this._delta);
    }

    resetDelta(d:number = 0) {
        this._delta = new Matrix(this.feeders[0].value.rows, this.feeders[1].value.columns, d);
    }

    public compute() : void{
        this._value = Matrix.add(this.feeders[0].value, this.feeders[1].value);
    }
    
}