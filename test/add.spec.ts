import { Add } from "../scripts/add";
import { Matrix } from "../scripts/matrix";
import { Variable } from "../scripts/variable";
import { CompNode } from "../scripts/comp_node";
import { Minimiser } from "../scripts/minimiser";

describe("Add Node creation", ()=> {
    let m:Array<Add> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Variable(Matrix.randMatrix(3, 8, -10, 10), true));
        m.push(new Add(m[0], m[1]));
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

})

describe("Add node graph", () => {
    let m:Array<CompNode> = []
    let a:Matrix, b:Matrix, c:Matrix, d:Matrix = undefined;
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
        m[9].computeNew();
        a = m[0].value, b = m[1].value, c = m[2].value, d = m[3].value;
        let m4 = Matrix.add(a, b), m5 = Matrix.add(a, d), m6 = Matrix.add(c, d), m7 = Matrix.add(m4, m5);
        let m8 = Matrix.add(m5, m6), m9 = Matrix.add(m7, m8);
        expect([m9, m8, m7, m6, m5, m4]).toEqual([m[9], m[8], m[7], m[6], m[5], m[4]].map(x=>x.value));
    })

    test("Testing backprop", ()=> {
        m[9].resetDelta(1);
        m[9].initialiseBackProp();
        expect(m[0].delta).toEqual(new Matrix(3, 8, 0));
        m[9].resetDelta(1);
        m[9].addDirsPropagate();
        expect(m[1].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[4].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[5].delta).toEqual(new Matrix(3, 8, 2));
        expect(m[2].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[3].delta).toEqual(new Matrix(3, 8, 3)); 
        expect(m[0].delta).toEqual(new Matrix(3, 8, 3)); 
    })

    test("updates", ()=> {
        (m[0] as Variable).update(0.01);
        expect(m[0].value).toEqual(Matrix.subtract(a, Matrix.scalerMultiply(m[0].delta, 0.01)));
        (m[1] as Variable).update(0.01);
        expect(m[1].value).toEqual(Matrix.subtract(b, Matrix.scalerMultiply(m[1].delta, 0.01)));
    })

    test("reset deltas", ()=> {
        m[9].resetDelta(0);
        m[9].initialiseBackProp();
        m.forEach(x=>expect(x.delta).toEqual(new Matrix(3, 8, 0)));
        m[9].resetDelta(1);
    })

    test("second iteration", ()=> {
        m[9].resetDelta(1);
        m[9].initialiseBackProp();
        expect(m[0].delta).toEqual(new Matrix(3, 8, 0));
        m[9].addDirsPropagate();
        expect(m[1].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[4].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[5].delta).toEqual(new Matrix(3, 8, 2));
        expect(m[2].delta).toEqual(new Matrix(3, 8, 1));
        expect(m[3].delta).toEqual(new Matrix(3, 8, 3)); 
        expect(m[0].delta).toEqual(new Matrix(3, 8, 3));
    })

    test("Minimise iteration", ()=> {
        let before = m[9].value.values;
        Minimiser.MinimiseNode(m[9], [m[0] as Variable, m[1] as Variable, m[2] as Variable, m[3] as Variable], 
            0.01, 100);
        expect(m[9].value.values[0][0]).toBeLessThan(before[0][0]);
    })
})