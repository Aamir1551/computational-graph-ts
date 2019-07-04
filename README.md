# Computational-Graph
A comutational graph (numerical library) made in TS (for future use in genetic algorithms)


basic usage:

a = ml.variable(new Matrix(1, 1, 2))
b = ml.variable(new Matrix(1, 1, 4))
c = ml.add(a, b);
c.gradientDescentMinimiser(0.01);
Minimiser.minimiseNode(c, [a, b], 0.01, 100);

webpack/tsconfig/package.json need to be reorganised to allow for running
