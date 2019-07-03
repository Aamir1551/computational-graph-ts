import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";
import { CompNode } from "../scripts/comp_node";
import { Minimiser } from "../scripts/minimiser";
import { Multiply } from "../scripts/multiply";

describe("Multiply Node creation", ()=> {
    let m:Array<Multiply> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Multiply(m[0], m[1]));
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

    test("Testing compute", () => {
        expect(m[2].value).toEqual(Matrix.multiply(m[0].value, m[1].value));
    })

})

describe("Multiply node graph (4x^3 - 6x^2 - 11x + 5 = y)", () => {
    let m:Array<CompNode> = []
    let x:Variable;
    beforeAll(() => {
        x = new Variable(Matrix.randMatrix(2, 3, -3, 3));
        m.push(new Multiply(x, x)); //m[0] = x^2
        m.push(new Multiply(m[0], x)); //m[1] = x^3
        m.push(new Multiply(m[1], new Variable(new Matrix(2, 3, 4), false))); //m[2] = 4x^3
        m.push(new Multiply(m[0], new Variable(new Matrix(2, 3, -6), false))); //m[3] = -6x^2
        m.push(new Multiply(x, new Variable(new Matrix(2, 3, -11), false))); //m[4] = -11x
        m.push(new Add(m[2], m[3])); //m[5] = 4x^3 - 6x^2
        m.push(new Add(m[4], new Variable(new Matrix(2, 3, 5)))) //m[6] = -11x + 5
        m.push(new Add(m[5], m[6])); //m[7] = 4x^3 - 6x^2 -11x + 5
    })   

    test("Testing compute", () => {
        m[7].computeNew();
        let t = x.value.values[0][0];
        expect(m[7].value.values[0][0]).toBeCloseTo(4 * t*t*t - 6 * t*t - 11 * t + 5);
    })

    test("Testing backprop", ()=> {
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


describe("Multiply node graph (ab^2 + ab + 5 - 3a^2b)", () => {
    let m:Array<CompNode> = []
    let x:Variable;
    let a:Variable;
    let b:Variable;
    beforeAll(() => {
        a = new Variable(Matrix.randMatrix(2, 3, -3, 3));
        b = new Variable(Matrix.randMatrix(2, 3, -3, 3));
        m.push(new Multiply(a, b)); //m[0] = ab
        m.push(new Multiply(m[0], b)); //m[1] = ab^2
        m.push(new Multiply(m[0], a)); //m[2] = ba^2
        m.push(new Multiply(m[2], new Variable(new Matrix(2, 3, -3), false))); //m[3] = -3ba^2
        m.push(new Add(m[1], m[0])); //m[4] = ab^2 + ab
        m.push(new Add(new Variable(new Matrix(2, 3, 5), false), m[3])); //m[5] = 5 - 3ba^2
        m.push(new Add(m[4], m[5])); //m[6] = ab^2 + ab + 5 - 3ba^2
    })

    test("Testing compute", () => {
        m[6].computeNew();
        let t = a.value.values[0][0];
        let w = b.value.values[0][0];
        expect(m[6].value.values[0][0]).toBeCloseTo(t*(w*w) + t*w + 5 - 3*(t*t) * w);
    })

    test("Testing backprop", ()=> {
        m[6].resetDelta(1); 
        m[6].initialiseBackProp();
        expect(m[0].delta).toEqual(new Matrix(2, 3, 0));
        expect(a.delta).toEqual(new Matrix(2, 3, 0));
        expect(b.delta).toEqual(new Matrix(2, 3, 0));
        m[6].addDirsPropagate();

        let t = a.value.values[0][0];
        let w = b.value.values[0][0];
        expect(a.delta.values[0][0]).toBeCloseTo(w * w + w - 6 * t * w);
        expect(b.delta.values[0][0]).toBeCloseTo(2 * t * w + t - 3 * t * t);
    })

    test("reset deltas", ()=> {
        m[6].resetDelta(0);
        m[6].initialiseBackProp();
        m.forEach(x=>expect(x.delta).toEqual(new Matrix(2, 3, 0)));
        expect(a.delta).toEqual(new Matrix(2, 3, 0));
        expect(b.delta).toEqual(new Matrix(2, 3, 0));
        m[6].resetDelta(1);
    })
})