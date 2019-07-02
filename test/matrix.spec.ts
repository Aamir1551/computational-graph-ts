import {Matrix} from "../scripts/matrix";

describe("Testing Matrix Creation", function() {
    var m:Array<Matrix> = [];

    beforeAll(()=>{
        m.push(new Matrix(3, 9, 1));
        m.push(Matrix.arange(3, 7));
        m.push(Matrix.randMatrix(5, 3, -4, 10));
        m.push(Matrix.randNormMatrix(8, 2));
    });

    test("Create new Matrix of size 3x9 to equal Matrix of shape 3x9", () => {
        expect(m[0].rows).toBe(3);
        expect(m[0].columns).toBe(9);
        expect(m[0].values[2][5]).toBe(1);
        expect(m[0].values[4]).toBe(undefined);
    })

    test("Creates matrix where each index is assigned a value in ascending order", () => {
        expect(m[1].values).toEqual(
            [[1, 2, 3, 4, 5, 6, 7], 
            [8, 9, 10, 11, 12, 13, 14], 
            [15, 16, 17, 18, 19, 20, 21]]);
    })

    test("Creates matrix where each element is chosen randomly from -4-10", ()=>{
        expect(m[2].rows).toBe(5);
        expect(m[2].columns).toBe(3);
        for(let i=0; i<m[2].rows; i++) {
            for(let j=0; j<m[2].columns; j++) {
                expect(m[2].values[i][j]).toBeGreaterThanOrEqual(-4);
                expect(m[2].values[i][j]).toBeLessThanOrEqual(10);
            }
        }
    })

    test("Creates matrix where each element is normally chosen from 0-1", ()=>{
        expect(m[3].rows).toBe(8);
        expect(m[3].columns).toBe(2);
        for(let i=0; i<m[3].rows; i++) {
            for(let j=0; j<m[3].columns; j++) {
                expect(m[3].values[i][j]).not.toBeUndefined();
            }
        }
    })
})

describe("testing Matrix operations", function() {

})