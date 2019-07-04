import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Exponent extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    addDirivatives(): void {
        let da:Matrix = Matrix.multiply(Matrix.multiply(this.feeders[1].value, Matrix.divide(this.value, this.feeders[0].value)), this._delta);
        CompNode.updateDelta(this.feeders[0], da);
        CompNode.updateDelta(this.feeders[1], Matrix.multiply(Matrix.multiply(this.value, Matrix.applyFunction(Math.log, this.feeders[0].value)), this._delta))
    }

    public compute() : void{
        this._value = Matrix.power(this.feeders[0].value, this.feeders[1].value);
    }
    
}