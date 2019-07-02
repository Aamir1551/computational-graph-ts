import "../scripts/matrix";
import {Variable} from "../scripts/variable";
import { Matrix } from "../scripts/matrix";
import {Add} from "../scripts/add";
import {Matmul} from "../scripts/matmul";
import {Multiply} from "../scripts/multiply";
import { subtract } from "../scripts/subtract";
import { Minimiser } from "../scripts/minimiser";

//division, matmul and variable needs their addDirivatives doing (recheck if addirs is done right)


//3x^2 + 4x -9

console.log("testing console");
let x = new Variable(Matrix.randNormMatrix(1, 1));
let a = new Multiply(new Multiply(x, x), new Variable(new Matrix(1, 1, 3), false));
let b = new Multiply(x, new Variable(new Matrix(1, 1, 4), false));
let c = new Variable(new Matrix(1, 1, 9));

let y = new subtract(new Add(a, b), c);
//Minimiser.MinimiseNode(y, [x], 0.01, 100);

