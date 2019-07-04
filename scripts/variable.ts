import { Matrix } from "./matrix";
import { CompNode } from "./comp_node";

export class Variable extends CompNode {

    addDirivatives(): void {}

    constructor(public initialValue:Matrix, public optimise=true) {
        super();
        this._value = this.initialValue;
        this._delta = new Matrix(initialValue.rows, initialValue.columns, 0); 
    }

    compute(): void {}

    update(learningRate:number) : void {
        if(this.optimise == true) {
            this._value = Matrix.subtract(this._value, Matrix.scalerMultiply(this._delta, learningRate));
        }
    }

}