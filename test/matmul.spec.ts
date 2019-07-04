import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";
import { CompNode } from "../scripts/comp_node";
import { Multiply } from "../scripts/multiply";
import { Matmul } from "../scripts/matmul";

describe("Matmul Node creation", ()=> {
    let m:Array<Multiply> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Variable(Matrix.randMatrix(8, 7, -10, 10), true));
        m.push(new Matmul(m[0], m[1]));
        m[2].computeNew();
    })

    test("Testing value shape", () => {
        expect(m[2].value.rows).toBe(3)
        expect(m[2].value.columns).toBe(7)
    })

    test("Testing delta shape", () => {
        m[2].resetDelta();
        expect(m[2].delta.rows).toBe(3)
        expect(m[2].delta.columns).toBe(7)
    })

    test("Testing compute", () => {
        expect(m[2].value).toEqual(Matrix.matmul(m[0].value, m[1].value));
    })

})

describe("Matmul node graph (4x^3 - 6x^2 - 11x + 5 = y)", () => {
    let m:Array<CompNode> = []
    let x:Variable;
    beforeAll(() => {
        x = new Variable(Matrix.randMatrix(2, 3, -3, 3));
        
    
    })   

    test("Testing compute", () => {
        m[7].computeNew();
        let t = x.value.values[0][0];
        expect(m[7].value.values[0][0]).toBeCloseTo(4 * t*t*t - 6 * t*t - 11 * t + 5);
    })

    test("Testing backprop", ()=> {

        //compare backrpop against tensorflow values
        m[7].resetDelta(1); 
        m[7].initialiseBackProp();
        expect(m[0].delta).toEqual(new Matrix(2, 3, 0));
        m[7].addDirsPropagate();

        let a = Matrix.scalerMultiply(Matrix.multiply(x.value, x.value), 12);
        let b = Matrix.scalerMultiply(x.value, -12);
        let c = new Matrix(2, 3, -11);
        let y = Matrix.add(Matrix.add(a, b), c);
        expect(x.delta.values[0][0]).toBeCloseTo(y.values[0][0]);
    })

    test("reset deltas", ()=> {
        m[7].resetDelta(0);
        m[7].initialiseBackProp();
        m.forEach(x=>expect(x.delta).toEqual(new Matrix(2, 3, 0)));
        m[7].resetDelta(1);
    })
})