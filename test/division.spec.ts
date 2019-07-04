import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";
import { CompNode } from "../scripts/comp_node";
import { Divide } from "../scripts/division";
import { Multiply } from "../scripts/multiply";

describe("Division Node creation", ()=> {
    let m:Array<Divide> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Divide(m[0], m[1]));
        m[2].computeNew();
    })
    test("Testing value shape", () => {
        expect(m[2].value.rows).toBe(3)
        expect(m[2].value.columns).toBe(8)
    })

    test("Testing delta shape", () => {
        m[2].resetDelta();
        expect(m[2].delta.rows).toBe(3)
        expect(m[2].delta.columns).toBe(8)
    })

    test("simple compute", ()=> {
        expect(m[2].value.values[0][0]).toBeCloseTo(m[0].value.values[0][0] / m[1].value.values[0][0]);
    })

})

describe("Division node graph ((-8x)/(ax^4) + (2ax)/(x^2)", () => {
    let m:Array<CompNode> = []
    let a:Matrix, b:Matrix, c:Matrix, d:Matrix = undefined;
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true)); //a
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true)); //x

        m.push(new Multiply(new Variable(new Matrix(3, 8, -8), false), m[1])); //m[2] = -8x
        m.push(new Multiply(m[0], m[1])); //m[3] = ax
        m.push(new Multiply(m[3], m[1])); //m[4] = ax^2
        m.push(new Multiply(m[1], m[1])); //m[5] = x^2
        m.push(new Multiply(m[5], m[4])); //m[6] = ax^4
        m.push(new Multiply(new Variable(new Matrix(3, 8, 2), false), m[3])); //m[7] = 2ax

        m.push(new Divide(m[2], m[6])); //m[8] = (-8x)/(ax^4)
        m.push(new Divide(m[7], m[5])); //m[9] = (2ax)/(x^2)

        m.push(new Add(m[8], m[9])); //m[10] = (-8x)/(ax^4) + (2ax)/(x^2)
    })   

    test("Testing compute", () => {
        m[10].computeNew();
        let t = m[0].value.values[0][0]; //a
        let w = m[1].value.values[0][0]; //x
        expect(m[10].value.values[0][0]).toBeCloseTo(2*t/w-8/(t*w*w*w));
    })

    test("Testing backprop", ()=> {
        m[10].resetDelta(1);
        m[10].initialiseBackProp();
        expect(m[0].delta).toEqual(new Matrix(3, 8, 0));
        m[10].resetDelta(1);
        m[10].addDirsPropagate();

        let t = m[0].value.values[0][0]; //a
        let w = m[1].value.values[0][0]; //x
        expect(m[0].delta.values[0][0]).toBeCloseTo(8/(w*w*w*t*t) + 2/w); //testing da
        expect(m[1].delta.values[0][0]).toBeCloseTo(24/(t*w*w*w*w) - (2*t)/(w*w)); //testing dx
    })

    test("reset deltas", ()=> {
        m[10].resetDelta(0);
        m[10].initialiseBackProp();
        m.forEach(x=>expect(x.delta).toEqual(new Matrix(3, 8, 0)));
        m[10].resetDelta(1);
    })

});