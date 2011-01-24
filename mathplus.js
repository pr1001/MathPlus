/*
 * By Peter Robinett, peter@bubblefoundry.com
 * A better mathematics library for Javascript.
 */

var M = {
  // constant used in approximations
  'SMALL_NUMBER': 1e-10,
  // Created 1997 by Brian Risk.  http://brianrisk.com
  // from http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
  'log': function log(x, base) {
  	if (typeof base != "number" && !(base instanceof Number)) {
    	base = 10;
  	}
  	return (Math.log(x) / Math.log(base));
  },
  // Created 1997 by Brian Risk.  http://brianrisk.com
  // from http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
  'round': function round(x, places) {
    if (typeof places != "number" && !(places instanceof Number)) {
    	places = 2;
  	}
    return (Math.round(x * Math.pow(10, places)) / Math.pow(10,places));
  },
  // Created 1997 by Brian Risk.  http://brianrisk.com
  // from http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
  'approximateFraction': function approximateFraction(x, maxDenominator) {
  	maxDenominator = parseInt(maxDenominator);
  	if (typeof maxDenominator != "number" && !(maxDenominator instanceof Number)) {
    	maxDenominator = 16;
  	}
  	var approx = 0;
  	var error = 0;
  	var best = 0;
  	var besterror = 0;
  	for (var i = 1; i <= maxDenominator; i++) {
  		approx = Math.round(x / (1 / i));
  		error = (x - (approx / i))
  		if (i==1) {
    		best = i;
    		besterror = error;
  		}
  		if (Math.abs(error) < Math.abs(besterror)) {
    		best = i;
    		besterror = error;
  		}
  	}
  	
  	// return x/1 instead of 0/0 if a better solution can't be found
  	var solution = (Math.round(x / (1 / best)) + "/" + best)
  	if (solution == "0/0") {
    	solution = x + "/" + 1
  	}
  	return solution;
  },
  // Created 1997 by Brian Risk.  http://brianrisk.com
  // from http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
  'convertBase': function convertBase (number, ob, nb) {
  	number = number.toUpperCase();
  	var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  	var dec = 0;
  	for (var i = 0; i <=  number.length; i++) {
  		dec += (list.indexOf(number.charAt(i)) * Math.pow(ob, (number.length - i - 1)));
  	}
  	number = "";
  	var magnitude = Math.floor(Math.log(dec) / Math.log(nb));
  	for (var i = magnitude; i >= 0; i--) {
  		var amount = Math.floor(dec / Math.pow(nb, i));
  		number = number + list.charAt(amount);
  		dec -= amount * Math.pow(nb, i);
  	}
  	return number;
  },
  'ln': function(x) {
    return Math.log(x);
  },
  'toDegrees': function toDegrees(radians) {
    return (radians / (Math.PI / 180));
  },
  'toRadians': function toRadians(degrees) {
    return (degrees * (Math.PI / 180));
  },
  'random': function random(rangeStart, rangeEnd) {
    if (typeof rangeStart != "number" && !(rangeStart instanceof Number)) {
    	rangeStart = 0;
  	}
  	if (typeof rangeEnd != "number" && !(rangeEnd instanceof Number)) {
    	rangeEnd = 1;
  	}
  	
    // if there's no difference between the two points
    if (rangeStart == rangeEnd) {
      // throw new Error("The start and end points of the range in which the random number is to be found are the same, meaning that no random number can be generated.");
      return rangeStart;
    }
  	
  	// make sure rangeEnd > rangeStart
  	if (rangeEnd < rangeStart) {
    	var tmp = rangeEnd;
    	rangeEnd = rangeStart;
    	rangeStart = tmp;
  	}
    return ((Math.random() * (rangeEnd - rangeStart)) + rangeStart);
  },
  // NOTE: The number is always converted to an integer
  'factorial': function factorial(num) {
    num = parseInt(num)
    if (num < 0) {
      return NaN;
    }
    if (num == 0 || num == 1) {
      return 1;
    }
    
    var result = 1;
    do {
      result *= num;
    } while (--num > 1)
    return result;
  },
  // from http://www.merlyn.demon.co.uk/js-maths.htm#BF
  // "Since the JavaScript Number type is an IEEE Double, it can hold factorials only up to 170! (and exactly only up to about 18!). Strings approximating to larger values can be constructed."
  'bigFactorial': function bigFactorial(num) {
    var result = 0
    for (var k = 1; k <= num; k++) {
      result += Math.log(k);
    }
    result *= Math.LOG10E;
    return Math.exp((result % 1) / Math.LOG10E) + 'e' + Math.floor(result);
  },
  // alteration of function from http://www.ideashower.com/our_solutions/leastgreatest-common-mulitple-lcmgcm-in-php-and-javascript/
  'gcd': function gcd() {
  	var args = Array.prototype.slice.call(arguments);
  	
  	function __gcd(a, b) {
    	return (b == 0) ? a : __gcd(b, a % b);
    }
  	
  	if (args.length > 1) {
  		args.push(__gcd(args.shift(), args.shift()));
  		return gcd.apply(this, args);
  	}
		return args[0];
  },
  // alteration of function from http://www.ideashower.com/our_solutions/leastgreatest-common-mulitple-lcmgcm-in-php-and-javascript/
  'lcm': function lcm() {
  	var args = Array.prototype.slice.call(arguments);
  	
  	function __lcm(a, b) {
    	return (a / gcd(a,b) * b);
    }
  	
  	if (args.length > 1) {
  		args.push(__lcm(args.shift(), args.shift()));
  		return lcm.apply(this, args);
  	}
		return args[0];
  },
  'limit': function limit(f, x, places) {
    if (typeof places != "number" && !(places instanceof Number)) {
    	places = 10;
  	}
    
    var atX = f(x);
    // we assume that if it's not a NaN that Javascript has correctly calculated the function
    if (!isNaN(atX)) {
      return atX;
    } else { // else we got a NaN
      // we need to approach x in order to make an approximation of f(x)
      // if x is Infinity
      if (x === Number.POSITIVE_INFINITY) {
        // approach from the left
        return this.limitLeft(f, x, places);
      // else if x is -Infinity
      } else if (x === Number.NEGATIVE_INFINITY) {
        // approach from the right
        return this.limitRight(f, x, places);
      // else if we don't have a number
      } else if (isNaN(x)) {
        // not sure why this would happen... the user being stupid I guess
        return Number.NaN;
      // else we have a number (-Infinity, Infinity)
      } else {
        // approach from both left and right
        var left = this.limitLeft(f, x, places);
        var right = this.limitRight(f, x, places);
        // if left and right values match, return
        if (left == right) {
          return left;
        }
        // else, there's no convergence. This is a sign to the user they may want to try the limit from only one side
        return Number.NaN;
      }
    }
  },
  // approach x from values greater than x
  'limitRight': function limitRight(f, x, places) {
    if (typeof places != "number" && !(places instanceof Number)) {
    	places = 10;
  	}
  	
  	// populate test numbers
  	var testNums = [];
  	var testResults = [];
  	// use x as the input seed for the numbers used in our approximation
  	var testNumber = x;
  	if (x === Number.POSITIVE_INFINITY) {
    	// can't approach from the right
    	return Number.NaN;
  	} else if (x === Number.NEGATIVE_INFINITY) {
    	// use the smallest number possible to approach -Infinity
    	// PROTIP: Number.MIN_VALUE is the smallest possible number __greater than zero__
    	// FIXME: Number.MAX_VALUE plus or multiplied by anything (i.e. in f) = Infinity... use Number.MAX_VALUE/2?
    	testNumber = -Number.MAX_VALUE / 10;
  	}
  	
  	var verySmallNumber = M.SMALL_NUMBER;
  	if (places > 10) {
    	verySmallNumber = eval("1e-" + places);
  	}
  	
  	// check five times against our numbers very slightly different from x
  	for (var k = 0; k < 5; k++) {
    	testNumber += verySmallNumber;
    	testNums.push(testNumber);
    	testResults.push(f(testNumber));
  	}
  	
  	var allRounded = testResults.map(function(a) {
    	return M.round(a, places);
  	});
  	var allEqual = true;
    for (var k = 1; k < allRounded.length; k++) {
      allEqual = allEqual && (allRounded[k-1] == allRounded[k]);
    }
    // if all the rounded values are equal
    if (allEqual == true) {
      // return the rounded value
      return allRounded[0];
    }
    return Number.NaN;
  },
  // approach x from values less than x
  'limitLeft': function limitLeft(f, x, places) {
    if (typeof places != "number" && !(places instanceof Number)) {
    	places = 10;
  	}
  	
  	// populate test numbers
  	var testNums = [];
  	var testResults = [];
  	// use x as the input seed for the numbers used in our approximation
  	var testNumber = x;
  	if (x === Number.NEGATIVE_INFINITY) {
    	// can't approach from the left
    	return Number.NaN;
  	} else if (x === Number.POSITIVE_INFINITY) {
    	// use the largest number possible to approach Infinity
    	// FIXME: Number.MAX_VALUE plus or multiplied by anything (i.e. in f) = Infinity... use Number.MAX_VALUE/2?
    	testNumber = Number.MAX_VALUE / 10;
  	}
  	
  	var verySmallNumber = M.SMALL_NUMBER;
  	if (places > 10) {
    	verySmallNumber = eval("1e-" + places);
  	}
  	
  	// check five times against our numbers very slightly different from x
  	for (var k = 0; k < 5; k++) {
    	testNumber -= verySmallNumber;
    	testNums.push(testNumber);
    	testResults.push(f(testNumber));
  	}
  	
  	var allRounded = testResults.map(function(a) {
    	return M.round(a, places);
  	});
    var allEqual = true;
    for (var k = 1; k < allRounded.length; k++) {
      allEqual = allEqual && (allRounded[k-1] == allRounded[k]);
    }
    // if all the rounded values are equal
    if (allEqual == true) {
      // return the rounded value
      return allRounded[0];
    }
    return Number.NaN;
  },
  // an approximation of a derivative, round to something like 6 decimal places if you want to avoid noise
  // based on an equation on Wikipedia: http://en.wikipedia.org/wiki/Closure_(computer_science)
  'derivative': function derivative(f, x) {
    return (f(x + M.SMALL_NUMBER) - f(x)) / M.SMALL_NUMBER;
  }
};
