import { Variable } from "../scripts/variable";
import { Matrix } from "../scripts/matrix";

describe("Variable Node creation", ()=> {
    let m:Array<Variable> = []
    beforeAll(() => {
        m.push(new Variable(Matrix.arange(3, 8), true));
    })
    test("Testing value shape", () => {
        expect(m[0].value.rows).toBe(3)
        expect(m[0].value.columns).toBe(8)
    })

    test("Testing delta shape", () => {
        expect(m[0].delta.rows).toBe(3)
        expect(m[0].delta.columns).toBe(8)
    })
})