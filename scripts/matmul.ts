import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Matmul extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.matmul(this._delta, Matrix.transpose(this.feeders[1].value)));
        CompNode.updateDelta(this.feeders[1], Matrix.matmul(Matrix.transpose(this.feeders[0].value) , this._delta));
    }

    public compute() : void{
        this._value = Matrix.matmul(this.feeders[0].value, this.feeders[1].value);
    }
    
}