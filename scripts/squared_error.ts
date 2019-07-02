import {CostFunction} from "./cost_function"
import {Matrix} from "./matrix";

export class SquaredError extends CostFunction {

    constructor(ypred:Matrix, y:Matrix) {
        super(ypred, y);
    }
    
    public calculateDy(): void {
        this._dy = Matrix.subtract(this.ypred, this.y);
    }

    public calculateError(ypred: Matrix, y: Matrix): Matrix {
        let diff = Matrix.subtract(ypred, y)
        return Matrix.multiply(diff, diff);
    }

    public averageError(ypred: Matrix, y: Matrix): Matrix {
        let error = this.calculateError(ypred, y);
        let avg = new Matrix(ypred.rows, 1, 0);
        for(let i=0; i<ypred.rows; i++) {
            for(let j=0; j<ypred.columns;j++) {
               avg[i][0] += error[i][j]; 
            }
            avg[i][0] /= ypred.columns;
        }
        return avg;
    }

}