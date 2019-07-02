import { Matrix } from "./matrix";

export abstract class CostFunction {

    public abstract calculateError(ypred:Matrix, y:Matrix) : Matrix;

    protected _dy : Matrix;
    protected ypred : Matrix;
    protected y:Matrix;

    constructor(ypred:Matrix, y:Matrix){
        this.initialize(ypred, y);
    };

    public initialize(ypred:Matrix, y:Matrix):void {
        this.ypred = ypred;
        this.y = y;
    }

    public abstract calculateDy() : void;

    get dy() {
        return this._dy;
    }


}