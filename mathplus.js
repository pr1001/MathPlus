/*
 * By Peter Robinett, peter@bubblefoundry.com
 * A better mathematics library for Javascript.
 */

var MP = {
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
    // if there's no difference between the two points
    if (rangeStart == rangeEnd) {
      // throw new Error("The start and end points of the range in which the random number is to be found are the same, meaning that no random number can be generated.");
      return rangeStart;
    }
    if (typeof rangeStart != "number" && !(rangeStart instanceof Number)) {
    	rangeStart = 0;
  	}
  	if (typeof rangeEnd != "number" && !(rangeEnd instanceof Number)) {
    	rangeEnd = 1;
  	}
  	// make sure rangeEnd > rangeStart
  	if (rangeEnd < rangeStart) {
    	var tmp = rangeEnd;
    	rangeEnd = rangeStart;
    	rangeStart = tmp;
  	}
    return ((Math.random() * (rangeEnd - rangeStart)) + rangeStart);
  },
  // NOTE: The number is always converted to a non-negative integer
  'factorial': function factorial(num) {
    num = Math.abs(parseInt(num))
    if (num <= 1) {
      return 1;
    }
    return (num * this.factorial(num - 1));
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
  }
};