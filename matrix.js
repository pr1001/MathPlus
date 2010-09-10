// 4x4 matrix class.
//
// The convention here is post-multiplication by a column vector.
// ie. x = Ab, where x and b are column vectors.
//
// Please note that in cases where a matrix is pre-multiplied by a 
// vector, we then assume that the vector is a row vector.
// This operation is then equivalent to post multiplying the column
// vector by the transpose of the actual matrix.
//
// If you wish to think of this matrix in terms of basis vectors,
// then by convention, the rows of this matrix form the set of
// basis vectors.
//
// When composing matrix transforms A * B * C * D, note that the
// actual order of operations as visible in the resultant matrix
// is D, C, B, A. Alternatively, you can view transforms as changing
// coordinate system, then the coordinate systems are changed 
// in order A, B, C, D.
function Matrix() {
	var args = Array.prototype.slice.call(arguments);
	// construct a matrix from three basis vectors.
	// the x,y,z values from each of these basis vectors map to rows in the 3x3 sub matrix.
	// note: the rest of the matrix (row 4 and column 4 are set to identity)
	// ax ay az 0
	// bx by bz 0
	// cx cy cz 0
	// 0  0  0  1
	if (args.length == 3) {
		this.m11 = args[0].x;
		this.m12 = args[0].y;
		this.m13 = args[0].z;
		this.m14 = 0;
		this.m21 = args[1].x;
		this.m22 = args[1].y;
		this.m23 = args[1].z;
		this.m24 = 0;
		this.m31 = args[2].x;
		this.m32 = args[2].y;
		this.m33 = args[2].z;
		this.m34 = 0;
		this.m41 = 0;
		this.m42 = 0;
		this.m43 = 0;
		this.m44 = 1;
	}
	// construct a matrix from explicit values for the 3x3 sub matrix.
	// note: the rest of the matrix (row 4 and column 4 are set to identity)
	else if (args.length == 9) {
		var m11 = args[0];
		var m12 = args[1];
		var m13 = args[2];
		var m21 = args[3];
		var m22 = args[4];
		var m23 = args[5];
		var m31 = args[6];
		var m32 = args[7];
		var m33 = args[8];
		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m14 = 0;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m24 = 0;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;
		this.m34 = 0;
		this.m41 = 0;
		this.m42 = 0;
		this.m43 = 0;
		this.m44 = 1;
	}
	// construct a matrix from explicit entry values for the whole 4x4 matrix.
	else if (args.length == 16){
		this.m11 = args[0];
		this.m12 = args[1];
		this.m13 = args[2];
		this.m14 = args[3];
		this.m21 = args[4];
		this.m22 = args[5];
		this.m23 = args[6];
		this.m24 = args[7];
		this.m31 = args[8];
		this.m32 = args[9];
		this.m33 = args[10];
		this.m34 = args[11];
		this.m41 = args[12];
		this.m42 = args[13];
		this.m43 = args[14];
		this.m44 = args[15];
	}
	// load matrix from raw float array.
	// data is assumed to be stored linearly in memory in row order, from left to right, top to bottom.
	else if (args.length == 0 && args[0] instanceof Array && args[0].length == 16) {
		this.m11 = args[0][0];
		this.m12 = args[0][1];
		this.m13 = args[0][2];
		this.m14 = args[0][3];
		this.m21 = args[0][4];
		this.m22 = args[0][5];
		this.m23 = args[0][6];
		this.m24 = args[0][7];
		this.m31 = args[0][8];
		this.m32 = args[0][9];
		this.m33 = args[0][10];
		this.m34 = args[0][11];
		this.m41 = args[0][12];
		this.m42 = args[0][13];
		this.m43 = args[0][14];
		this.m44 = args[0][15];
	}
	//
	else {
		this.m11 = 0;
		this.m12 = 0;
		this.m13 = 0;
		this.m14 = 0;
		this.m21 = 0;
		this.m22 = 0;
		this.m23 = 0;
		this.m24 = 0;
		this.m31 = 0;
		this.m32 = 0;
		this.m33 = 0;
		this.m34 = 0;
		this.m41 = 0;
		this.m42 = 0;
		this.m43 = 0;
		this.m44 = 0;
	}
}

Matrix.epsilon = 0.00001; // floating point epsilon for single precision.
Matrix.epsilonSquared = Matrix.epsilon * Matrix.epsilon;

Matrix.prototype.toString = function toString(singleLine) {
    singleLine = singleLine || false;
    if (singleLine) {
        return "Matrix(" + this.m11 + ", " + this.m12 + ", " + this.m13 + ", " + this.m14 + ", " + this.m21 + ", " + this.m22 + ", " + this.m23 + ", " + this.m24 + ", " + this.m31 + ", " + this.m32 + ", " + this.m33 + ", " + this.m34 + ", " + this.m41 + ", " + this.m42 + ", " + this.m43 + ", " + this.m44 + ")";
    } else {
        return "Matrix: " + this.m11 + ", " + this.m12 + ", " + this.m13 + ", " + this.m14 + "\n        " + this.m21 + ", " + this.m22 + ", " + this.m23 + ", " + this.m24 + "\n        " + this.m31 + ", " + this.m32 + ", " + this.m33 + ", " + this.m34 + "\n        " + this.m41 + ", " + this.m42 + ", " + this.m43 + ", " + this.m44;
    }
}

// get a zero, or null, Matrix
Matrix.zero =  new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
Matrix.prototype.zero = function zero() {
    return Matrix.zero;
}

// get an identity Maxtrix
Matrix.identity = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
Matrix.prototype.identity = function identity() {
	return Matrix.identity;
}
    
// set to a translation matrix.
// 1 0 0 x 
// 0 1 0 y
// 0 0 1 z
// 0 0 0 1
Matrix.translate = function translate() {
    var args = Array.prototype.slice.call(arguments);
    // float x, float y, float z
    if (args.length == 3) {
    	return new Matrix(1, 0, 0, args[0], 0, 1, 0, args[1], 0, 0, 1, args[2], 0, 0, 0, 1);
    } else if (args.length == 1 && args[0] instanceof Vector) {
    	return new Matrix(1, 0, 0, args[0].x, 0, 1, 0, args[0].y, 0, 0, 1, args[0].z, 0, 0, 0, 1);
    }
    return Matrix.identity;
}
Matrix.prototype.translate = Matrix.translate;

// set to a scale matrix.
Matrix.scale = function scale(s) {
    return new Matrix(s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1);
}
Matrix.prototype.scale = Matrix.scale;

// set to a diagonal matrix.
Matrix.diagonal = function diagonal(a, b, c, d) {
    // d defaults to 1
    d = isNaN(d) ? 1 : d;
    return new Matrix(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, d);
}
Matrix.prototype.diagonal = Matrix.diagonal;

// set to a rotation matrix about a specified (float) axis / (Vector) angle.
Matrix.rotate = function rotate(angle, axis) {
	// note: adapted from david eberly's code with permission
	if (axis.lengthSquared() < Matrix.epsilonSquared)
	{
		return this.identity();
	}
	else
	{
		var normalizedAxis = axis.normalize();

		var fCos = Math.cos(angle);
		var fSin = Math.sin(angle);
		var fOneMinusCos = 1.0 - fCos;
		var fX2 = normalizedAxis.x * normalizedAxis.x;
		var fY2 = normalizedAxis.y * normalizedAxis.y;
		var fZ2 = normalizedAxis.z * normalizedAxis.z;
		var fXYM = normalizedAxis.x * normalizedAxis.y * fOneMinusCos;
		var fXZM = normalizedAxis.x * normalizedAxis.z * fOneMinusCos;
		var fYZM = normalizedAxis.y * normalizedAxis.z * fOneMinusCos;
		var fXSin = normalizedAxis.x * fSin;
		var fYSin = normalizedAxis.y * fSin;
		var fZSin = normalizedAxis.z * fSin;

        return new Matrix(
    		fX2 * fOneMinusCos + fCos,
    		fXYM - fZSin,
    		fXZM + fYSin,
    		0,
    		fXYM + fZSin,
    		fY2 * fOneMinusCos + fCos,
    		fYZM - fXSin,
    		0,
    		fXZM - fYSin,
    		fYZM + fXSin,
    		fZ2 * fOneMinusCos + fCos,
    		0,
    		0,
    		0,
    		0,
    		1
		);
	}
}
Matrix.prototype.rotate = Matrix.rotate;
    
// set to a look at matrix.
//   takes three Vectors as parameters
Matrix.lookat = function lookat(eye, at, up) {
	// left handed

	var z_axis = at.subtract(eye);
	var x_axis = up.cross(z_axis);
	var y_axis = z_axis.cross(x_axis);

	var newX = x_axis.normalize();
	var newY = y_axis.normalize();
	var newZ = z_axis.normalize();

    return new Matrix(
        x_axis.x,
        x_axis.y,
        x_axis.z,
        - x_axis.dot(eye),
        y_axis.x,
        y_axis.y,
        y_axis.z,
        - y_axis.dot(eye),
        z_axis.x,
        z_axis.y,
        z_axis.z,
        - z_axis.dot(eye),
        0,
        0,
        0,
        1
    );
}
Matrix.prototype.lookat = Matrix.lookat;

// set to an orthographic projection matrix.
//   takes 6 floats
Matrix.orthographic = function orthographic(l, r, b, t, n, f) {
	var sx = 1 / (r - l);
	var sy = 1 / (t - b);
	var sz = 1 / (f - n);
	return new Matrix(
        2 * sx,
        0,
        0,
        - (r + l) * sx,
        0,
        2 * sy,
        0,
        - (t + b) * sy,
        0,
        0,
        -2 * sz,
        - (n + f) * sz,
        0,
        0,
        0,
        1
    );
}
Matrix.prototype.orthographic = Matrix.orthographic;

// set to a perspective projection matrix.
Matrix.perspective = function perspective() {
	var args = Array.prototype.slice.call(arguments);
	// function perspective(float l, float r, float t, float b, float n, float f)
	if (args.length == 6) {
    	return new Matrix(
        	2 * args[4] / (args[1] - args[0]),
            0,
            0,
            0,
            0,
            2 * args[4] / (args[2] - args[3]),
            0,
            0,
            0,
            0,
            args[5] / (args[5] - args[4]),
            args[4] * args[5] / (args[4] - args[5]),
            0,
            0,
            1,
            0
    	);
	}
    // set to a perspective projection matrix specified in terms of field of view and aspect ratio.
    // float fov, float aspect, float n, float f
	else if (args.length == 4) {
    	var t = Math.tan(args[0] * 0.5) * args[2];
    	var b = -t;
    	var l = args[1] * b;
    	var r = args[1] * t;
    	return Math.perspective(l, r, t, b, args[2], args[3]);
    }
}
Matrix.prototype.perspective = Matrix.perspective;

// calculate determinant of 3x3 sub matrix.
Matrix.prototype.determinant = function determinant() {
	return -this.m13 * this.m22 * this.m31 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32 - this.m11 * this.m23 * this.m32 - this.m12 * this.m21 * this.m33 + this.m11 * this.m22 * this.m33;
}
    
// determine if matrix is invertible.
// note: currently only checks 3x3 sub matrix determinant.
Matrix.prototype.invertible = function invertible() {
	return (this.determinant() != 0);
}

// calculate inverse of matrix and write result to parameter matrix.
Matrix.prototype.inverse = function inverse() {
	var determinant = this.determinant();

	if (determinant == 0) {
    	throw "Cannot calculate the inverse of the matrix because its determinant is 0.";
	}

	var k = 1.0 / determinant;

	var newM11 = (this.m22 * this.m33 - this.m32 * this.m23) * k;
	var newM12 = (this.m32 * this.m13 - this.m12 * this.m33) * k;
	var newM13 = (this.m12 * this.m23 - this.m22 * this.m13) * k;
	var newM21 = (this.m23 * this.m31 - this.m33 * this.m21) * k;
	var newM22 = (this.m33 * this.m11 - this.m13 * this.m31) * k;
	var newM23 = (this.m13 * this.m21 - this.m23 * this.m11) * k;
	var newM31 = (this.m21 * this.m32 - this.m31 * this.m22) * k;
	var newM32 = (this.m31 * this.m12 - this.m11 * this.m32) * k;
	var newM33 = (this.m11 * this.m22 - this.m21 * this.m12) * k;

	var newM14 = -(newM11 * this.m14 + newM12 * this.m24 + newM13 * this.m34);
	var newM24 = -(newM21 * this.m14 + newM22 * this.m24 + newM23 * this.m34);
	var newM34 = -(newM31 * this.m14 + newM32 * this.m24 + newM33 * this.m34);

	var newM41 = this.m41;
	var newM42 = this.m42;
	var newM43 = this.m43;
	var newM44 = this.m44;
	
	return new Matrix(newM11, newM12, newM13, newM14, newM21, newM22, newM23, newM24, newM31, newM32, newM33, newM34, newM41, newM42, newM43, newM44);
}

// calculate transpose of matrix.
// NOTE: No transpose() method because our Matrices are immutable


// transform a vector by this matrix, return new Vector
// the convention used is post-multiplication by a column vector: x=Ab.
// NOTE: It may make sense to have this as a method on Vector but Glenn Fielder put it here and it avoids circular dependencies between Vector and Matrix
Matrix.prototype.transform = function transform(vector) {
	var x = vector.x * this.m11 + vector.y * this.m12 + vector.z * this.m13 + this.m14;
	var y = vector.x * this.m21 + vector.y * this.m22 + vector.z * this.m23 + this.m24;
	var z = vector.x * this.m31 + vector.y * this.m32 + vector.z * this.m33 + this.m34;
	return new Vector(x, y, z);
}

// transform a vector by this matrix using only the 3x3 rotation submatrix.
// the convention used is post-multiplication by a column vector: x=Ab.
Matrix.prototype.transform3x3 = function transform3x3(vector) {
	var x = vector.x * this.m11 + vector.y * this.m12 + vector.z * this.m13;
	var y = vector.x * this.m21 + vector.y * this.m22 + vector.z * this.m23;
	var z = vector.x * this.m31 + vector.y * this.m32 + vector.z * this.m33;
	return new Vector(x, y, z);
}

// add another matrix to this matrix.
Matrix.prototype.add = function add(matrix) {
	return new Matrix(
    	this.m11 + matrix.m11,
    	this.m12 + matrix.m12,
    	this.m13 + matrix.m13,
    	this.m14 + matrix.m14,
    	this.m21 + matrix.m21,
    	this.m22 + matrix.m22,
    	this.m23 + matrix.m23,
    	this.m24 + matrix.m24,
    	this.m31 + matrix.m31,
    	this.m32 + matrix.m32,
    	this.m33 + matrix.m33,
    	this.m34 + matrix.m34,
    	this.m41 + matrix.m41,
    	this.m42 + matrix.m42,
    	this.m43 + matrix.m43,
    	this.m44 + matrix.m44
	);
}

// subtract a matrix from this matrix.
Matrix.prototype.subtract = function subtract(matrix) {
	return new Matrix(
    	this.m11 - matrix.m11,
    	this.m12 - matrix.m12,
    	this.m13 - matrix.m13,
    	this.m14 - matrix.m14,
    	this.m21 - matrix.m21,
    	this.m22 - matrix.m22,
    	this.m23 - matrix.m23,
    	this.m24 - matrix.m24,
    	this.m31 - matrix.m31,
    	this.m32 - matrix.m32,
    	this.m33 - matrix.m33,
    	this.m34 - matrix.m34,
    	this.m41 - matrix.m41,
    	this.m42 - matrix.m42,
    	this.m43 - matrix.m43,
    	this.m44 - matrix.m44
	);
}

// multiply this matrix by a value
Matrix.prototype.multiply = function multiply(arg) {
	// multiply two matrices.
	if (arg instanceof Matrix) {
        return new Matrix(
        	this.m11 * arg.m11 + this.m12 * arg.m21 + this.m13 * arg.m31 + this.m14 * arg.m41,
        	this.m11 * arg.m12 + this.m12 * arg.m22 + this.m13 * arg.m32 + this.m14 * arg.m42,
        	this.m11 * arg.m13 + this.m12 * arg.m23 + this.m13 * arg.m33 + this.m14 * arg.m43,
        	this.m11 * arg.m14 + this.m12 * arg.m24 + this.m13 * arg.m34 + this.m14 * arg.m44,
        	this.m21 * arg.m11 + this.m22 * arg.m21 + this.m23 * arg.m31 + this.m24 * arg.m41,
        	this.m21 * arg.m12 + this.m22 * arg.m22 + this.m23 * arg.m32 + this.m24 * arg.m42,
        	this.m21 * arg.m13 + this.m22 * arg.m23 + this.m23 * arg.m33 + this.m24 * arg.m43,
        	this.m21 * arg.m14 + this.m22 * arg.m24 + this.m23 * arg.m34 + this.m24 * arg.m44,
        	this.m31 * arg.m11 + this.m32 * arg.m21 + this.m33 * arg.m31 + this.m34 * arg.m41,
        	this.m31 * arg.m12 + this.m32 * arg.m22 + this.m33 * arg.m32 + this.m34 * arg.m42,
        	this.m31 * arg.m13 + this.m32 * arg.m23 + this.m33 * arg.m33 + this.m34 * arg.m43,
        	this.m31 * arg.m14 + this.m32 * arg.m24 + this.m33 * arg.m34 + this.m34 * arg.m44,
        	this.m41 * arg.m11 + this.m42 * arg.m21 + this.m43 * arg.m31 + this.m44 * arg.m41,
        	this.m41 * arg.m12 + this.m42 * arg.m22 + this.m43 * arg.m32 + this.m44 * arg.m42,
        	this.m41 * arg.m13 + this.m42 * arg.m23 + this.m43 * arg.m33 + this.m44 * arg.m43,
        	this.m41 * arg.m14 + this.m42 * arg.m24 + this.m43 * arg.m34 + this.m44 * arg.m44
        );
	}
	// multiply this matrix by a scalar.
	else {
    	return new Matrix(
        	this.m11 * arg,
        	this.m12 * arg,
        	this.m13 * arg,
        	this.m14 * arg,
        	this.m21 * arg,
        	this.m22 * arg,
        	this.m23 * arg,
        	this.m24 * arg,
        	this.m31 * arg,
        	this.m32 * arg,
        	this.m33 * arg,
        	this.m34 * arg,
        	this.m41 * arg,
        	this.m42 * arg,
        	this.m43 * arg,
        	this.m44 * arg
    	);
	}
}

// equals operator
Matrix.prototype.equals = function equals(other) {
	return (
    	(this.m11 == other.m11) &&
		(this.m12 == other.m12) &&
		(this.m13 == other.m13) &&
		(this.m14 == other.m14) &&
		(this.m21 == other.m21) &&
		(this.m22 == other.m22) &&
		(this.m23 == other.m23) &&
		(this.m24 == other.m24) &&
		(this.m31 == other.m31) &&
		(this.m32 == other.m32) &&
		(this.m33 == other.m33) &&
		(this.m34 == other.m34) &&
		(this.m41 == other.m41) &&
		(this.m42 == other.m42) &&
		(this.m43 == other.m43) &&
		(this.m44 == other.m44)
	);
}

// not equals operator
Matrix.prototype.notEquals = function notEquals(other) {
	return !this.equals(other);
}

/*
    // cute access to matrix elements via overloaded () operator.
    // use it like this: Matrix matrix; float element = matrix(row, column);
    
    float& operator()(int i, int j)
    {
    	assert(i>=0);
    	assert(i<=3);
    	assert(j>=0);
    	assert(j<=3);
    	float *data = &m11;
    	return data[(i<<2) + j];
    }
    
    // const version of element access above.
    
    const float& operator()(int i, int j) const
    {
    	assert(i>=0);
    	assert(i<=3);
    	assert(j>=0);
    	assert(j<=3);
    	const float *data = &m11;
    	return data[(i<<2) + j];
    }
*/
    
// data accessor for easy conversion to float for OpenGL
Matrix.prototype.data = function data() {
	return this.m11;
}

Matrix.prototype.divide = function divide(s) {
    if (s == 0) {
        throw "You cannot divide a matrix by 0.";
    }
    var inv = 1.0 / s;
    return this.multiply(inv);
}
