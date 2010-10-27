# MathPlus

MathPlus is a small Javascript library that aims to provide common mathematics functions.

Everything lives under the M object. Functions include:

- log: Default base is 10, not e like Javascript's native Math.log.
- ln: Log base e. Simply an alias for Javascript's native Math.log.
- round: Default number of significant digits is 2.
- factorial: Returns NaN for negative numbers. Thanks to @Kambfhase for his 4x speed-up! Recursion may be elegant but it's slow.
- limit: Provides an approximation. Works in some cases with +/- Infinity. Needs some additional tweaking.
- derivative: Given f and x, will provide an approximation of the derivative of function f at point x. Round the result to get integers for derivatives of common functions, e.g. of f(x) = 3*x.

## Vectors

A stand-alone three dimensional vector class is included in `vector.js`. It has methods for common operations such as calculating a vector's length or dot product. The code is based upon Glenn Fielder's C implementation.

For example:

    var v1 = new Vector(1, 2, 3)
    var v2 = new Vector(3, 2, 1)
    var v3 = new Vector(-4, 8, -4)
    v1.multiply(v2).equals(v3) // -> true

## Matrices

As with vectors, there is a four dimensional matrix class included in a file called `matrix.js`. Again, it is a adaption of Glenn Fielder's C implementation.
