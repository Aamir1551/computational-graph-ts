import {Matrix} from "./matrix";
import {CompNode} from "./comp_node";

export class Divide extends CompNode {

    public constructor(a:CompNode, b:CompNode) {
       super();
       this.feeders.push(a);
       this.feeders.push(b); 
       CompNode.addFeeds(a, this);
       CompNode.addFeeds(b, this);
    }

    addDirivatives(): void {

        //maybe add scaler division as matrix operation
        let bReciprocal = Matrix.divide(new Matrix(this.feeders[1].value.rows, this.feeders[1].value.columns, 1), this.feeders[1].value)
        let bReciprocalSquared = Matrix.multiply(bReciprocal, bReciprocal);
        let negativeX = Matrix.scalerMultiply(this.feeders[0].value, -1);
        CompNode.updateDelta(this.feeders[0], Matrix.multiply(Matrix.multiply(bReciprocal, this.feeders[0].value), this._delta));
        CompNode.updateDelta(this.feeders[1], Matrix.multiply(negativeX, Matrix.multiply(bReciprocalSquared, this._delta)));
    }

    public compute() : void {
        this._value = Matrix.divide(this.feeders[0].value, this.feeders[1].value);
    }

    resetDelta() {
        //maybe add inverse matrix operation
    }   
}