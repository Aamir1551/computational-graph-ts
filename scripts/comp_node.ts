import {Matrix} from './matrix';
//research modules and types(common js and others) (and namespaces)

export abstract class CompNode {
    
    protected _value:Matrix;
    protected feeders:Array<CompNode> = [];
    protected _delta:Matrix;

    public constructor() {}

    //comuters a value for that node (using its feeders value and its operation)
    public abstract compute() : void;
    
    public computeNew() : void {
        this.feeders.forEach(x=>x.computeNew());
        this.compute();
    } //computers a new value for that node and for its feeeders (recursively)

    get value() {
        return this._value;
    }

    get delta() {
        return this._delta;
    }

    protected static updateDelta(n:CompNode, dx:Matrix) : void {
        n._delta = Matrix.add(n._delta, dx);
    }
    
    abstract resetDelta(d:number):void; 

    public initializeDelta(d:Matrix):void {
        this._delta = d;
    }

    public initialiseBackProp(): void {
        this.feeders.forEach(x=>{x.resetDelta(0), x.initialiseBackProp()});
    }

    abstract addDirivatives():void; //calculates new derivatives for itself (using its feeders values)

    public addDirsPropagate() : void { //calculates new derivatives for itself and its feeders (recursively)
        this.addDirivatives();
        this.feeders.forEach(x=>x.addDirsPropagate());
    }
}
