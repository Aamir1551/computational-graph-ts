import {Matrix} from './matrix';
//research modules and types(common js and others) (and namespaces)

export abstract class CompNode {
    
    protected _value:Matrix;
    protected feeders:Array<CompNode> = [];
    protected numFeeders:number = 0;
    protected _delta:Matrix;
    protected deltasCollected:number = 0;

    public constructor() {}

    //computes a value for that node (using its feeders value and its operation)
    public abstract compute() : void;
    
    public computeNew() : void {
        this.feeders.forEach(x=>x.computeNew());
        this.compute();
    } //computers a new value for that node and for its feeeders (recursively)

    public static addFeeds(feeder : CompNode, leacher : CompNode) : void {
        feeder.numFeeders++;
    }

    get value() {
        return this._value;
    }

    get delta() {
        return this._delta;
    }

    protected static updateDelta(n:CompNode, dx:Matrix) : void {
        n.deltasCollected++;
        n._delta = Matrix.add(n._delta, dx);
    }
    
    public resetDelta(d:number = 0):void {
        this._delta = new Matrix(this.value.rows, this.value.columns, d);
    }; 

    public initializeDelta(d:Matrix):void {
        this.deltasCollected = 0;
        this._delta = d;
    }

    public initialiseBackProp(): void {
        this.feeders.forEach(x=>{x.resetDelta(0), x.initialiseBackProp(), x.deltasCollected = 0;});
    }

    abstract addDirivatives():void; //calculates new derivatives for itself (using its feeders values)

    public addDirsPropagate() : void { //calculates new derivatives for itself and its feeders (recursively)
        this.addDirivatives();
        this.feeders.forEach(x=>{if(x.deltasCollected == x.numFeeders){x.addDirsPropagate()}});
    }
}
