import {CompNode} from "./comp_node";
import { Matrix } from "./matrix";
import {CostFunction} from "./cost_function"
import {Variable} from "./variable"

export class Minimiser {

    constructor() {}
    
    static gradientDescentMinimiser(learningRate:number, y:CompNode, iterations:number, costFunction:CostFunction, batch:[Matrix, Matrix], x:Variable, vars:Array<Variable>) {
        x.initialValue = batch[0];

        for(let i=0;i<iterations; i++) {
            y.computeNew();
            costFunction.initialize(y.value, batch[1]);
            costFunction.calculateDy();
            y.initializeDelta(costFunction.dy);
            y.addDirsPropagate();
            vars.forEach(x=>x.update(learningRate));
        }

    }

    static MinimiseNode(y:CompNode, vars:Array<Variable>, learningRate:number, iterations:number) {
        for(let i=0; i<iterations; i++) {
            y.computeNew();
            console.log(y.value);
            y.resetDelta(1);
            y.addDirsPropagate();
            vars.forEach(x=>x.update(learningRate));
        }
    }

}