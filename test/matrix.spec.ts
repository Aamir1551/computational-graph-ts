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
            [[0, 1, 2, 3, 4, 5, 6], 
            [7, 8, 9, 10, 11, 12, 13], 
            [14, 15, 16, 17, 18, 19, 20]]);
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

describe("Testing Matrix operations", function() {
    var m:Array<Matrix> = [];
    beforeAll(()=>{
        m.push(Matrix.randMatrix(6, 8, -10, 10));
        m.push(Matrix.randMatrix(8, 13, -10, 10));
        m.push(Matrix.randMatrix(8, 13, -10, 10));
        m.push(Matrix.arange(8, 3));
        m.push(Matrix.arange(3, 16));
    })

    test("Transpose", ()=>{
        let transposed = Matrix.transpose(m[0]);
        for(let i=0;i<m[0].columns;i++) {
            for(let j=0; j<m[0].rows; j++) {
                expect(transposed.values[i][j]).toBe(m[0].values[j][i]); 
            }
        }
    })

    test("Addition", ()=> {
        let r = Matrix.add(m[1], m[2]);
        for(let i=0; i<r.rows; i++) {
            for(let j=0; j<r.columns; j++) {
                expect(r.values[i][j]).toBeCloseTo(m[1].values[i][j] + m[2].values[i][j]);
            }
        }
    })

    test("Multiplication-elementwise", ()=> {
        let r = Matrix.multiply(m[1], m[2]);
        for(let i=0; i<r.rows; i++) {
            for(let j=0; j<r.columns; j++) {
                expect(r.values[i][j]).toBeCloseTo(m[1].values[i][j] * m[2].values[i][j]);
            }
        }
    })

    test("Subtraction", ()=> {
        let r = Matrix.subtract(m[1], m[2]);
        for(let i=0; i<r.rows; i++) {
            for(let j=0; j<r.columns; j++) {
                expect(r.values[i][j]).toBeCloseTo(m[1].values[i][j] - m[2].values[i][j]);
            }
        }
    })

    test("Division", ()=> {
        let r = Matrix.divide(m[1], m[2]);
        for(let i=0; i<r.rows; i++) {
            for(let j=0; j<r.columns; j++) {
                expect(r.values[i][j]).toBeCloseTo(m[1].values[i][j] / m[2].values[i][j]);
            }
        }
    })

    test("Scaler Multiplicaiton", ()=> {
        let s: number = 8
        let r = Matrix.scalerMultiply(m[1], s);
        for(let i=0; i<r.rows; i++) {
            for(let j=0; j<r.columns; j++) {
                expect(r.values[i][j]).toBeCloseTo(m[1].values[i][j] * s);
            }
        }
    })

    test("Matrix multiplication", () => {
        let s:Matrix = Matrix.matmul(m[3], m[4]);
        //been tested using numpy
        //console.log(s.values);
    })

    test("Determinent", () => {

    })

    test("Inverse", () => {

    })

})