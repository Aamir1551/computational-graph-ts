import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";

describe("Add Node creation", ()=> {
    let m:Array<Add> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Add(m[0], m[1]));
    })
    test("Testing value shape", () => {
        expect(m[2].value.rows).toBe(3)
        expect(m[2].value.columns).toBe(8)
    })

    test("Testing delta shape", () => {
        expect(m[2].delta.rows).toBe(3)
        expect(m[2].delta.columns).toBe(8)
    })
})

describe("Add node graph", () => {
    //test for inference
    //test for dirivatives
    //test to see if delta can be set back to zero after a backprop

    let m:Array<Add> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true)); //a
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true)); //b
        m.push(new Variable(new Matrix(3, 8, 3), false)); //c = constant
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true)); //d
        m.push(new Add(m[0], m[1])); //m[4]
        m.push(new Add(m[0], m[3])); //m[5]
        m.push(new Add(m[2], m[3])); //m[6]
        m.push(new Add(m[4], m[5])); //m[7]
        m.push(new Add(m[5], m[6])); //m[8]
        m.push(new Add(m[7], m[8])); //m[9]
    })   

    test("Testing compute", () => {

    })

    test("Testing backprop", ()=> {

    })

    test("reset deltas", ()=> {

    })

    test("second iteration", ()=> {

    })

    test("Minimise iteration", ()=> {

    })
})