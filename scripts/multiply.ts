import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Multiply extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(this.feeders[1].value, this._delta));
        CompNode.updateDelta(this.feeders[1], Matrix.multiply(this.feeders[0].value, this._delta));
    }

    public compute() : void{
        this._value = Matrix.multiply(this.feeders[0].value, this.feeders[1].value);
    }
    
}