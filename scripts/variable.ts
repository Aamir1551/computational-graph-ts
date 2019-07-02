import { Matrix } from "./matrix";
import { CompNode } from "./comp_node";

export class Variable extends CompNode {

    addDirivatives(): void {
        throw new Error("Method not implemented.");
    }

    resetDelta(d:number = 0) {
        this.delta = new Matrix(this.initialValue.rows, this.initialValue.columns, d);
    }
    
    constructor(public initialValue:Matrix, public optimise=true) {
        super();
        this._value = this.initialValue;
        this.delta = new Matrix(initialValue.rows, initialValue.columns, 0); 
    }

    compute(): void {
        this._value = this.initialValue;
    }

    update(learningRate:number) : void {
        if(this.optimise == true) {
            this._value = Matrix.subtract(this._value, Matrix.scalerMultiply(this.delta, learningRate));
        }
    }

}