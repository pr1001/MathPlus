/*
 * A vector in 3-space.
 *
 * A vector is a geometric object that has both a magnitude (or length) and direction. This implementation is a direct port of Glenn Fiedler's C implementation with the notable difference that Vectors here are immutable: once initized the x, y, and z values will not change and methods such as dot() will return new Vectors.
 *
 * See http://en.wikipedia.org/wiki/Vector_(geometry) and http://gafferongames.com/game-physics/physics-in-3d/ for more information.
 */
function Vector(x, y, z) {
    this.x = isNaN(x) ? 0.0: x;
    this.y = isNaN(y) ? 0.0 : y;
    this.z = isNaN(z) ? 0.0 : z;
}

Vector.prototype.toString = function toString() {
    return "Vector(" + this.x + ", " + this.y + ", " + this.z + ")";
}

// zero, or null, vector
Vector.zero = new Vector(0.0, 0.0, 0.0);
Vector.prototype.zero = function zero() {
    return Vector.zero;
}

// negate vector.
Vector.prototype.negate = function negate() {
    return new Vector(-this.x, -this.y, -this.z);
}

// add another vector to this vector.
Vector.prototype.add = function add(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
}

// subtract another vector from this vector.
Vector.prototype.subtract = function subtract(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
}

// multiply this vector by a vector or a scalar.
Vector.prototype.multiply = function multiply(input) {
    if (input instanceof Vector) {
        return this.cross(input);
    }
    return new Vector(this.x * input, this.y * input, this.z * input);
}

// divide this vector by a scalar.
Vector.prototype.divide = function divide(scalar) {
    // assert(scalar!=0);
    var inv = 1.0 / scalar;
    return this.multiply(inv);
}

// calculate dot product of this vector with another vector.
Vector.prototype.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
}

// calculate cross product of this vector with another vector.
Vector.prototype.cross = function cross(vector) {
    return new Vector(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
}

// calculate length of vector squared
Vector.prototype.lengthSquared = function lengthSquared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
}

// calculate length of vector.
Vector.prototype.length = function length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

// normalize vector and return reference to normalized self.
Vector.prototype.normalize = function normalize() {
    var magnitude = this.length();
    if (magnitude > 0.0) {
        return this.divide(magnitude);
    }
    return this;
}

// the unit length for of the vector, ie an alias for normalize()
Vector.prototype.unit = Vector.prototype.normalize;

// test if vector is normalized.
Vector.prototype.normalized = function normalized() {
    return this.length() == 1;
}

// equals method
Vector.prototype.equals = function equals(other) {
    return (this.x == other.x && this.y == other.y && this.z == other.z); 
}

// not equals method
Vector.prototype.notEquals = function notEquals(other) {
    return !this.equals(other);
}
