# Computational-Graph
A computational graph (numerical library) made in TS (for future use in genetic algorithms)


basic usage:

a = ml.variable(new Matrix(1, 1, 2))
b = ml.variable(new Matrix(1, 1, 4))
c = ml.add(a, b);
c.gradientDescentMinimiser(0.01);
Minimiser.minimiseNode(c, [a, b], 0.01, 100);


Available on npm here https://www.npmjs.com/package/computational-graph


