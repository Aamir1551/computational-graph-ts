export class Matrix {
    private _values:Array<Array<number>> = [[]];
    private readonly shape:string = "";

    constructor(public readonly rows:number, public readonly columns:number, d:number = 0) {
        this._values = new Array(rows).fill(0).map(a=>new Array(columns).fill(d));
        this.shape = rows + ":" + columns;
    }

    get values():Array<Array<number>> {
        return this._values
    }

    static arange(rows:number, columns:number) : Matrix {
        let c = new Matrix(rows, columns, 0);
        for(let i=0; i<rows; i++) {
            for(let j=0; j<columns; j++) {
                c._values[i][j] = i*columns + j + 1;
            }
        }
        return c;
    }

    static randMatrix(rows:number, columns:number, min:number, max:number) : Matrix{
        let c = new Matrix(rows, columns, 0);
        for(let i=0; i<rows; i++) {
            for(let j=0; j<columns; j++) {
                c._values[i][j] = min + Math.random()*(max-min);
            }
        }
        return c;
    }

    static randNormMatrix(rows:number, columns:number) : Matrix {
        let c = new Matrix(rows, columns);
        for(let i=0; i<rows; i++) {
            for(let j=0; j<columns; j++) {
                let rand = Math.random();
                let z = Math.sqrt(-2 * Math.log(rand)) * Math.sin(2 * Math.PI * rand);
                c._values[i][j] = z;
            }
        }
        return c;
    }

    static matmul(a:Matrix, b:Matrix) : Matrix {
        if(a.columns != b.rows) {
            throw new Error("Shapes do not conform for matrix multiplication");
        }
        let c:Matrix = new Matrix(a.rows, b.columns);
        for(let i=0; i<a.rows;i++) {
            for(let j=0; j<b.columns;j++) {
                let temp = 0;
                for(let k=0; k<a.columns;k++) {
                    temp += a._values[i][k] * b._values[k][j]; 
                }
                c._values[i][j] = temp;
            }
        }
        return c;
    }
    static add(a:Matrix, b:Matrix) : Matrix {
        if(a.shape != b.shape) {
            throw new Error("Shapes do not conform for matrix addition");
        }
        let c:Matrix = new Matrix(a.rows, a.columns);
        for(let i=0; i<a.rows; i++) {
            for(let j=0; j<a.columns;j++) {
                c._values[i][j] = a._values[i][j] + b._values[i][j];
            }
        }
        return c;
    }

    static subtract(a:Matrix, b:Matrix) : Matrix {
        if(a.shape != b.shape) {
            throw new Error("Shapes do not conform for matrix addition");
        }
        let c:Matrix = new Matrix(a.rows, a.columns);
        for(let i=0; i<a.rows; i++) {
            for(let j=0; j<a.columns;j++) {
                c._values[i][j] = a._values[i][j] - b._values[i][j];
            }
        }
        return c;
    }

    static multiply(a:Matrix, b:Matrix) : Matrix {
        if(a.shape != b.shape) {
            throw new Error("Shapes do not conform for matrix multiplication");
        }
        let c:Matrix = new Matrix(a.rows, a.columns);
        for(let i=0; i<a.rows; i++) {
            for(let j=0; j<a.columns;j++) {
                c._values[i][j] = a._values[i][j] * b._values[i][j];
            }
        }
        return c;
    }

    static scalerMultiply(a:Matrix, b:number) : Matrix {
        let c:Matrix = new Matrix(a.rows, a.columns);
        for(let i=0; i<a.rows; i++) {
            for(let j=0; j<a.columns;j++) {
                c._values[i][j] = a._values[i][j] * b;
            }
        }
        return c;
    }

    static divide(a:Matrix, b:Matrix) : Matrix {
        if(a.shape != b.shape) {
            throw new Error("Shapes do not conform");
        }
        let c : Matrix = new Matrix(a.rows, a.columns);

        for(let i=0; i<a.rows; i++) {
            for(let j=0; j<a.columns; j++) {
                c._values[i][j] = a._values[i][j] / b._values[i][j];
            }
        }
        return c;
    }

    static determinant(a:Matrix) : number{
        throw new Error("Method not implemented");
    }

    static inverse(a:Matrix) : Matrix {
        throw new Error("Method not implemented");
    }

    static transpose(a:Matrix) : Matrix {
        let c = new Matrix(a.columns, a.rows, 0);
        for(let i=0; i<a.columns; i++) {
            for(let j=0; j<a.rows;j++) {
                c._values[i][j] = a._values[j][i];
            }
        }
        return c;
    }


}