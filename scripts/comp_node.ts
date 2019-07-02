import {Matrix} from './matrix';
//research modules and types(common js and others) (and namespaces)

export abstract class CompNode {
    
    protected _value:Matrix;
    protected feeders:Array<CompNode> = [];
    protected delta:Matrix;

    public abstract compute() : void;
    
    public computeNew() : void {
        this.feeders.forEach(x=>x.computeNew());
        this.compute();
    }

    get value() {
        return this._value;
    }

    protected static updateDelta(n:CompNode, dx:Matrix) : void {
        n.delta = Matrix.add(n.delta, dx);
    }
    
    abstract resetDelta(d:number):void; 

    public initializeDelta(d:Matrix):void {
        this.delta = d;
    }

    abstract addDirivatives():void;        

    public addDirsPropagate() : void {
        this.addDirivatives();
        this.feeders.forEach(x=>x.addDirivatives());
        this.feeders.forEach(x=>this.addDirsPropagate());
    }
}
