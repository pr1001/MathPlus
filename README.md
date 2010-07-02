# MathPlus

MathPlus is a small Javascript library that aims to provide common mathematics functions.

Everything lives under the M object. Functions include:

- log: Default base is 10, not e like Javascript's native Math.log.
- ln: Log base e. Simply an alias for Javscript's native Math.log.
- round: Default significant digitis is 2.
- factorial: Returns NaN for NaN for negative numbers.
- limit: Provides an approximation. Works in some cases with +/- Infitity. Needs some additional tweaking.