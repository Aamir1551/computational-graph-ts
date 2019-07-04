import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";
import { CompNode } from "../scripts/comp_node";
import { Multiply } from "../scripts/multiply";
import { Matmul } from "../scripts/matmul";

describe("Matmul Node creation", ()=> {
    let m:Array<Matmul> = []
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

describe("Matmul node graph (a**b = y)", () => {
    let m:Array<CompNode> = [], a:Variable, b:Variable;
    beforeAll(() => {
        a = new Variable(new Matrix(2, 8, 3));
        b = new Variable(new Matrix(8, 3, 7));
        m.push(new Matmul(a, b)); //m[0] = a**b shape(m[0]) = 2x3
    })   

    test("Testing compute", () => {
        m[0].computeNew();
        let t = Matrix.matmul(a.value, b.value);
        for(let i=0; i<m[0].value.rows; i++) {
            for(let j=0; j<m[0].value.columns; j++) {
                expect(m[0].value.values[i][j]).toBeCloseTo(t.values[i][j]);
            }
        }
    })

    test("Testing backprop", ()=> {

        //compare backrpop against tensorflow values
        m[0].resetDelta(1); 
        m[0].initialiseBackProp();
        expect(a.delta).toEqual(new Matrix(2, 8, 0));
        expect(b.delta).toEqual(new Matrix(8, 3, 0));
        m[0].addDirsPropagate();
        //console.log(Matrix.subtract(a.value, Matrix.scalerMultiply(a.delta, 0.01)));
        //console.log(Matrix.subtract(b.value, Matrix.scalerMultiply(b.delta, 0.01)));
        //test using tensorflow (been tested and works)

    })

    test("reset deltas", ()=> {
        m[0].resetDelta(0);
        m[0].initialiseBackProp();
        m.forEach(x=>expect(x.delta).toEqual(new Matrix(2, 3, 0)));
        m[0].resetDelta(1);
    })
})