import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Log extends CompNode {

    addDirivatives(): void {
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(Matrix.divideScaler(1, this.feeders[0].value), this._delta));
    }

    public constructor(a:CompNode) {
       super();
       this.feeders.push(a);
       CompNode.addFeeds(a, this);
    }

    public compute() : void{
        this._value = Matrix.applyFunction(Math.log, this.feeders[0].value);
    }
    
}