# MathPlus

MathPlus is a small Javascript library that aims to provide common mathematics functions.

Everything lives under the M object. Functions include:

- log: Default base is 10, not e like Javascript's native Math.log.
- ln: Log base e. Simply an alias for Javascript's native Math.log.
- round: Default number of significant digits is 2.
- factorial: Returns NaN for negative numbers. Thanks to @Kambfhase for passing along @nikic's significant speed-up! Recursion may be elegant but it's slow.
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

## Credits

By Peter Robinett of [Bubble Foundry](http://www.bubblefoundry.com). MathPlus is available under the MIT license:

Copyright (c) 2010 Peter Robinett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.