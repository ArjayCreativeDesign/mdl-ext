(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("mdl-ext", [], factory);
	else if(typeof exports === 'object')
		exports["mdl-ext"] = factory();
	else
		root["mdl-ext"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(44);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(37)('wks')
	  , uid        = __webpack_require__(39)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(1)
	  , ctx       = __webpack_require__(30)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createCustomEvent = createCustomEvent;
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/**
	 * Due to a bug in mdl-1.1.3 it is not possible to use a globally polyfilled CustomEvent constructor
	 * Since I do not care too much about IE11, a brute force approach is sufficient.
	 *
	 * @param {string} typeArg Is a String representing the name of the event.
	 * @param {Object} customEventInit Is an EventInit dictionary, having the following fields:
	 *        "bubbles", optional and defaulting to false, of type Boolean, indicating if the event bubbles or not.
	 *        "cancelable", optional and defaulting to false, of type Boolean, indicating if the event can be canceled or not.
	 *        "detail", optional and defaulting to null, of type any, that is an event-dependent value associated with the event.
	 */
	
	function createCustomEvent(typeArg) {
	  'use strict';
	
	  var customEventInit = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false, detail: null } : arguments[1];
	  try {
	    // Modern browsers
	    return new window.CustomEvent(typeArg, customEventInit);
	  } catch (e) {
	    // Copied from https://github.com/webcomponents/webcomponentsjs/blob/v0.7.12/CustomElements.js#L950
	    // Copied from http://stackoverflow.com/questions/23349191/event-preventdefault-is-not-working-in-ie-11-for-custom-events
	    var ce = document.createEvent('CustomEvent');
	    ce.initCustomEvent(typeArg, customEventInit.bubbles, customEventInit.cancelable, customEventInit.detail);
	
	    ce.preventDefault = function () {
	      Object.defineProperty(this, 'defaultPrevented', {
	        get: function get() {
	          return true;
	        }
	      });
	    };
	    return ce;
	  }
	  // Let old browsers throw whatewer they want to throw
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(8) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(7)
	  , IE8_DOM_DEFINE = __webpack_require__(69)
	  , toPrimitive    = __webpack_require__(87)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	 * Code pulled from:
	 * https://github.com/jonathantneal/closest/blob/master/closest.js
	 * https://plainjs.com/javascript/traversing/get-closest-element-by-selector-39/
	 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
	 * http://stackoverflow.com/questions/18663941/finding-closest-element-without-jquery
	 */
	
	/**
	 * Element.matches() polyfill
	 * The Element.matches() method returns true if the element would be selected by the specified selector string;
	 * otherwise, returns false.
	 */
	if (typeof Element.prototype.matches !== 'function') {
	  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches(selector) {
	    var element = this;
	    var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
	    var i = elements.length;
	    while (--i >= 0 && elements.item(i) !== element) {}
	    return i > -1;
	  };
	}
	
	/**
	 * Element.closest() polyfill
	 * The Element.closest() method returns the closest ancestor of the current element (or the current element itself)
	 * which matches the selectors given in parameter. If there isn't such an ancestor, it returns null.
	 */
	if (typeof Element.prototype.closest !== 'function') {
	  Element.prototype.closest = function closest(selector) {
	    var element = this;
	
	    while (element && element.nodeType === Node.ELEMENT_NODE) {
	      if (element.matches(selector)) {
	        return element;
	      }
	      element = element.parentNode;
	    }
	    return null;
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(49);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(16);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(82)
	  , enumBugKeys = __webpack_require__(32);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(37)('keys')
	  , uid    = __webpack_require__(39);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(85)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(34)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _classCallCheck2 = __webpack_require__(54);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(55);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/**
	 * rAF based animation loop
	 */
	
	var MdlExtAnimationLoop = function () {
	
	  /**
	   * @constructor
	   *
	   * @param interval
	   */
	
	  function MdlExtAnimationLoop() {
	    var interval = arguments.length <= 0 || arguments[0] === undefined ? 17 : arguments[0];
	    (0, _classCallCheck3.default)(this, MdlExtAnimationLoop);
	
	    this.interval = interval;
	    this.running_ = false;
	    this.rAFId_ = 0;
	    this.timeElapsed_ = 0;
	  }
	
	  /**
	   * Set interval between each rAF tick
	   * @param interval
	   */
	
	
	  (0, _createClass3.default)(MdlExtAnimationLoop, [{
	    key: "cancelRAF",
	
	
	    /**
	     * Cancels animation loop
	     */
	    value: function cancelRAF() {
	      if (this.rAFId_ !== 0) {
	        window.cancelAnimationFrame(this.rAFId_);
	        this.rAFId_ = 0;
	      }
	      this.running_ = false;
	      this.timeElapsed_ = 0;
	    }
	
	    /**
	     * Start rAF animation loop
	     * @param tick callback function
	     */
	
	  }, {
	    key: "start",
	    value: function start(tick) {
	      var _this = this;
	
	      this.running_ = true;
	      var timeStart = Date.now();
	
	      var loop = function loop(now) {
	        if (_this.running_) {
	          _this.rAFId_ = window.requestAnimationFrame(function () {
	            return loop(Date.now());
	          });
	          _this.timeElapsed_ += now - timeStart;
	
	          if (_this.timeElapsed_ >= _this.interval_) {
	            _this.running_ = tick(_this.timeElapsed_);
	            if ((_this.timeElapsed_ -= _this.interval_) > _this.interval_) {
	              // time elapsed - interval > interval , indicates inactivity
	              // Could be due to browser minimized, tab changed, screen saver started, computer sleep, and so on
	              _this.timeElapsed_ = 0;
	            }
	          }
	          timeStart = now;
	        }
	      };
	      loop(timeStart);
	      return this;
	    }
	
	    /**
	     * Stops animation
	     */
	
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.cancelRAF();
	      return this;
	    }
	  }, {
	    key: "interval",
	    set: function set(interval) {
	      this.interval_ = interval < 17 ? 17 : interval; // 17 ~ 60fps
	    }
	
	    /**
	     * @returns {boolean|*} true if animation is running
	     */
	
	  }, {
	    key: "running",
	    get: function get() {
	      return this.running_;
	    }
	  }]);
	  return MdlExtAnimationLoop;
	}();
	
	exports.default = MdlExtAnimationLoop;
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// See: http://robertpenner.com/easing/
	
	var easeInOutQuad = exports.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	
	var inOutQuintic = exports.inOutQuintic = function inOutQuintic(t, b, c, d) {
	  var ts = (t /= d) * t;
	  var tc = ts * t;
	  return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(60), __esModule: true };

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(29)
	  , TAG = __webpack_require__(2)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(64);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(29);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(76)
	  , $export        = __webpack_require__(3)
	  , redefine       = __webpack_require__(84)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(13)
	  , Iterators      = __webpack_require__(5)
	  , $iterCreate    = __webpack_require__(73)
	  , setToStringTag = __webpack_require__(36)
	  , getPrototypeOf = __webpack_require__(81)
	  , ITERATOR       = __webpack_require__(2)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(13)
	  , TAG = __webpack_require__(2)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(21)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(28)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(5);
	module.exports = __webpack_require__(1).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91);
	var global        = __webpack_require__(4)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(5)
	  , TO_STRING_TAG = __webpack_require__(2)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _customEvent = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function () {
	  'use strict';
	
	  var RIPPLE_COMPONENT = 'MaterialRipple';
	  var VK_TAB = 9;
	  var VK_ENTER = 13;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var PANEL = 'mdlext-accordion__panel';
	  var HEADER = 'mdlext-accordion__panel__header';
	  var HEADER_TABSTOP = 'mdlext-accordion__panel__header__tabstop';
	  var IS_UPGRADED = 'is-upgraded';
	  var RIPPLE = 'mdl-ripple';
	  var RIPPLE_CONTAINER = 'mdlext-accordion__panel__header__ripple-container';
	  var RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	  var RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	  /**
	   * Class constructor for Accordion MDLEXT component.
	   * Implements MDL component design pattern defined at:
	   * https://github.com/jasonmayes/mdl-component-design-pattern
	   *
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtAccordion = function MaterialExtAccordion(element) {
	    // Stores the Accordion HTML element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	
	  window['MaterialExtAccordion'] = MaterialExtAccordion;
	
	  /**
	   * Handles custom command event, 'open', 'close', or 'toggle'
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtAccordion.prototype.commandHandler_ = function (event) {
	    var _this = this;
	
	    event.preventDefault();
	    event.stopPropagation();
	
	    if (event.detail && event.detail.action) {
	      (function () {
	        var action = event.detail.action.toLowerCase();
	
	        if ('open' === action || 'close' === action || 'toggle' === action) {
	
	          if (event.detail.target === undefined) {
	
	            if (_this.element_.hasAttribute('aria-multiselectable') && 'false' !== _this.element_.getAttribute('aria-multiselectable').toLowerCase()) {
	
	              [].concat((0, _toConsumableArray3.default)(_this.element_.querySelectorAll('.' + PANEL))).forEach(function (panel) {
	                panel.dispatchEvent((0, _customEvent.createCustomEvent)('command_', {
	                  detail: { action: action }
	                }));
	              });
	            }
	          } else if (event.detail.target !== null) {
	
	            event.detail.target.dispatchEvent(
	            // Let the even bubble, in case the evnt is dispatched to a child element of the panel
	            (0, _customEvent.createCustomEvent)('command_', {
	              bubbles: true, detail: { action: action }
	            }));
	          }
	        }
	      })();
	    }
	  };
	
	  /**
	   * Initialize accordion's panels
	   *
	   * @private
	   */
	  MaterialExtAccordion.prototype.initAccordion_ = function () {
	    var _this2 = this;
	
	    this.element_.setAttribute('role', 'tablist');
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
	    }
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + PANEL))).forEach(function (panel) {
	      new MaterialExtAccordionPanel(panel, _this2);
	    });
	
	    this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	
	    this.element_.classList.add(IS_UPGRADED);
	  };
	
	  /**
	   * Initialize Accordion element.
	   */
	  MaterialExtAccordion.prototype.init = function () {
	    if (this.element_) {
	      this.initAccordion_();
	    }
	  };
	
	  /**
	   * Constructor for an individual accordion panel.
	   *
	   * @constructor
	   * @param {Element} panel The HTML element for the tab.
	   * @param {MaterialExtAccordion} ctx The MaterialExtAccordion object that owns the panel.
	   */
	  function MaterialExtAccordionPanel(panel, ctx) {
	
	    var header = panel.querySelector('.' + HEADER);
	    if (header === null) {
	      throw new Error('There must be a header element for each accordion panel.');
	    }
	
	    header.setAttribute('role', 'tab');
	
	    var a = header.querySelector('a.' + HEADER_TABSTOP);
	    if (a === null) {
	      // An anchor is required for focus/tab stop
	      a = document.createElement('a');
	      a.href = '#';
	      a.classList.add(HEADER_TABSTOP);
	      header.appendChild(a);
	    }
	
	    panel.setAttribute('role', 'tabpanel');
	
	    if (panel.hasAttribute('open')) {
	      header.setAttribute('aria-expanded', '');
	    } else {
	      header.setAttribute('aria-hidden', '');
	    }
	
	    if (ctx.element_.classList.contains(RIPPLE_EFFECT)) {
	      var rippleContainer = a;
	      rippleContainer.classList.add(RIPPLE_CONTAINER);
	      rippleContainer.classList.add(RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(RIPPLE);
	      rippleContainer.appendChild(ripple);
	      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
	    }
	
	    header.addEventListener('click', function (event) {
	
	      event.preventDefault();
	      event.stopPropagation();
	
	      if (!panel.hasAttribute('disabled')) {
	
	        if (panel.hasAttribute('open')) {
	
	          closePanel(panel, header);
	
	          // Dispatch toggle event to accordion element
	          dispatchToggleEvent('close', panel, ctx.element_);
	        } else {
	          if (ctx.element_.hasAttribute('aria-multiselectable') && 'false' === ctx.element_.getAttribute('aria-multiselectable').toLowerCase()) {
	
	            var _openPanel = ctx.element_.querySelector('.' + PANEL + '[open]');
	            if (_openPanel) {
	              closePanel(_openPanel, _openPanel.querySelector('.' + HEADER));
	
	              // Dispatch toggle event to accordion element
	              dispatchToggleEvent('close', _openPanel, ctx.element_);
	            }
	            removeAriaSelectedAttribute();
	          }
	
	          openPanel(panel, header);
	
	          // Dispatch toggle event to accordion element
	          dispatchToggleEvent('open', panel, ctx.element_);
	        }
	        focus(panel);
	      }
	    }, true);
	
	    header.addEventListener('keydown', function (event) {
	      if (event.keyCode === VK_TAB || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        var panels = panel.parentNode.children;
	        var nextPanel = null;
	        var n = panel.parentNode.childElementCount - 1;
	
	        for (var i = 0; i <= n; i++) {
	
	          if (event.keyCode === VK_HOME) {
	            nextPanel = panels[0];
	            break;
	          } else if (event.keyCode === VK_END) {
	            nextPanel = panels[n];
	            break;
	          }
	
	          if (panels[i] == panel) {
	            if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	              nextPanel = i > 0 ? panels[i - 1] : panels[n];
	            } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	              nextPanel = i < n ? panels[i + 1] : panels[0];
	            } else if (event.keyCode === VK_TAB) {
	              if (event.shiftKey) {
	                if (i > 0 && !panels[i - 1].hasAttribute('open')) {
	                  nextPanel = panels[i - 1];
	                }
	              } else if (i < n) {
	                if (!panel.hasAttribute('open')) {
	                  nextPanel = panels[i + 1];
	                }
	              }
	            } else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
	              event.preventDefault();
	              event.stopPropagation();
	
	              // Trigger mouse click event for any attached listeners.
	              var evt = new MouseEvent('click', {
	                bubbles: true,
	                cancelable: true,
	                view: window
	              });
	              header.dispatchEvent(evt);
	            }
	            break;
	          }
	        }
	        if (nextPanel) {
	          event.preventDefault();
	          event.stopPropagation();
	          focus(nextPanel);
	        }
	      }
	    }, true);
	
	    panel.addEventListener('command_', function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      if (event.detail && event.detail.action) {
	        var action = event.detail.action.toLowerCase();
	        switch (action) {
	          case 'open':
	            openPanel(panel, header);
	            break;
	          case 'close':
	            closePanel(panel, header);
	            break;
	          case 'toggle':
	            togglePanel(panel, header);
	            break;
	        }
	      }
	    });
	
	    function togglePanel(panel, header) {
	      if (panel.hasAttribute('open')) {
	        closePanel(panel, header);
	      } else {
	        openPanel(panel, header);
	      }
	    }
	
	    function openPanel(panel, header) {
	      if (!panel.hasAttribute('disabled')) {
	        panel.setAttribute('open', '');
	        header.setAttribute('aria-expanded', '');
	        header.setAttribute('aria-selected', '');
	        header.removeAttribute('aria-hidden', '');
	      }
	    }
	
	    function closePanel(panel, header) {
	      if (!panel.hasAttribute('disabled')) {
	        panel.removeAttribute('open');
	        header.removeAttribute('aria-expanded');
	        header.setAttribute('aria-hidden', '');
	      }
	    }
	
	    function removeAriaSelectedAttribute() {
	      var selectedHeader = ctx.element_.querySelector('.' + HEADER + '[aria-selected]');
	      if (selectedHeader) {
	        selectedHeader.removeAttribute('aria-selected');
	      }
	    }
	
	    function focus(nextPanel) {
	      var a = nextPanel.querySelector('.' + HEADER + ' a');
	      if (a) {
	        removeAriaSelectedAttribute();
	        a.focus();
	        nextPanel.querySelector('.' + HEADER).setAttribute('aria-selected', '');
	      }
	    }
	
	    function dispatchToggleEvent(state, source, target) {
	      var evt = (0, _customEvent.createCustomEvent)('toggle', {
	        bubbles: true,
	        cancelable: true,
	        detail: { state: state, source: source }
	      });
	      target.dispatchEvent(evt);
	    }
	  }
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtAccordion,
	    classAsString: 'MaterialExtAccordion',
	    cssClass: 'mdlext-js-accordion',
	    widget: true
	  });
	})(); /**
	       * @license
	       * Copyright 2016 Leif Olsen. All Rights Reserved.
	       *
	       * Licensed under the Apache License, Version 2.0 (the "License");
	       * you may not use this file except in compliance with the License.
	       * You may obtain a copy of the License at
	       *
	       *      http://www.apache.org/licenses/LICENSE-2.0
	       *
	       * Unless required by applicable law or agreed to in writing, software
	       * distributed under the License is distributed on an "AS IS" BASIS,
	       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	       * See the License for the specific language governing permissions and
	       * limitations under the License.
	       *
	       * This code is built with Google Material Design Lite,
	       * which is Licensed under the Apache License, Version 2.0
	       */

	/**
	 * A WAI-ARIA friendly accordion component.
	 * An accordion is a collection of expandable panels associated with a common outer container. Panels consist
	 * of a header and an associated content region or panel. The primary use of an Accordion is to present multiple sections
	 * of content on a single page without scrolling, where all of the sections are peers in the application or object hierarchy.
	 * The general look is similar to a tree where each root tree node is an expandable accordion header. The user navigates
	 * and makes the contents of each panel visible (or not) by interacting with the Accordion Header
	 */

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _isInteger = __webpack_require__(27);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _assign = __webpack_require__(51);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	__webpack_require__(11);
	
	var _customEvent = __webpack_require__(6);
	
	var _animationloop = __webpack_require__(24);
	
	var _animationloop2 = _interopRequireDefault(_animationloop);
	
	var _easing = __webpack_require__(25);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/**
	 * Image carousel
	 */
	
	(function () {
	  'use strict';
	
	  var VK_TAB = 9;
	  var VK_ENTER = 13;
	  var VK_ESC = 27;
	  var VK_SPACE = 32;
	  var VK_PAGE_UP = 33;
	  var VK_PAGE_DOWN = 34;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var IS_UPGRADED = 'is-upgraded';
	  var IS_FOCUSED = 'is-focused';
	  //const CAROUSEL       = 'mdlext-carousel';
	  var SLIDE = 'mdlext-carousel__slide';
	  var ROLE = 'list';
	  var SLIDE_ROLE = 'listitem';
	
	  var RIPPLE = 'mdl-ripple';
	  var RIPPLE_COMPONENT = 'MaterialRipple';
	  var RIPPLE_CONTAINER = 'mdlext-carousel__slide__ripple-container';
	  var RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	  var RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtCarousel = function MaterialExtCarousel(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // Default config
	    this.config_ = {
	      interactive: true,
	      autostart: false,
	      type: 'slide',
	      interval: 1000,
	      animationLoop: new _animationloop2.default(1000)
	    };
	
	    this.scrollAnimation_ = new _animationloop2.default(33);
	
	    this.drawing_ = false; // Used by MutationObserver
	
	    // Initialize instance.
	    this.init();
	  };
	
	  window['MaterialExtCarousel'] = MaterialExtCarousel;
	
	  /**
	   * Start slideshow animation
	   * @private
	   */
	  MaterialExtCarousel.prototype.startSlideShow_ = function () {
	    var _this = this;
	
	    var nextSlide = function nextSlide() {
	      var slide = _this.element_.querySelector('.' + SLIDE + '[aria-selected]');
	      if (slide) {
	        slide.removeAttribute('aria-selected');
	        slide = slide.nextElementSibling;
	      }
	      if (!slide) {
	        slide = _this.element_.querySelector('.' + SLIDE + ':first-child');
	        _this.animateScroll_(0);
	      }
	      if (slide) {
	        _this.moveSlideIntoViewport_(slide);
	        slide.setAttribute('aria-selected', '');
	        _this.emitSelectEvent_('next', null, slide);
	        return true;
	      }
	      return false;
	    };
	
	    var nextScroll = function nextScroll(direction) {
	      var nextDirection = direction;
	
	      if ('next' === direction && _this.element_.scrollLeft === _this.element_.scrollWidth - _this.element_.clientWidth) {
	        nextDirection = 'prev';
	      } else if (_this.element_.scrollLeft === 0) {
	        nextDirection = 'next';
	      }
	      var x = 'next' === nextDirection ? Math.min(_this.element_.scrollLeft + _this.element_.clientWidth, _this.element_.scrollWidth - _this.element_.clientWidth) : Math.max(_this.element_.scrollLeft - _this.element_.clientWidth, 0);
	
	      _this.animateScroll_(x, 1000);
	      return nextDirection;
	    };
	
	    if (!this.config_.animationLoop.running) {
	      (function () {
	        _this.config_.animationLoop.interval = _this.config_.interval;
	        var direction = 'next';
	
	        if ('scroll' === _this.config_.type) {
	          _this.config_.animationLoop.start(function () {
	            direction = nextScroll(direction);
	            return true; // It runs until cancelSlideShow_ is triggered
	          });
	        } else {
	            nextSlide();
	            _this.config_.animationLoop.start(function () {
	              return nextSlide(); // It runs until cancelSlideShow_ is triggered
	            });
	          }
	      })();
	    }
	
	    // TODO: Pause animation when carousel is not in browser viewport or user changes tab
	  };
	
	  /**
	   * Cancel slideshow if running. Emmits a 'pause' event
	   * @private
	   */
	  MaterialExtCarousel.prototype.cancelSlideShow_ = function () {
	    if (this.config_.animationLoop.running) {
	      this.config_.animationLoop.stop();
	      this.emitSelectEvent_('pause', VK_ESC, this.element_.querySelector('.' + SLIDE + '[aria-selected]'));
	    }
	  };
	
	  /**
	   * Animate scroll
	   * @param newPosition
	   * @param newDuration
	   * @param completedCallback
	   * @private
	   */
	  MaterialExtCarousel.prototype.animateScroll_ = function (newPosition, newDuration, completedCallback) {
	    var _this2 = this;
	
	    var start = this.element_.scrollLeft;
	    var distance = newPosition - start;
	
	    if (distance !== 0) {
	      (function () {
	        var duration = Math.max(Math.min(Math.abs(distance), newDuration || 400), 100); // duration is between 100 and newDuration||400ms||distance
	        var t = 0;
	        _this2.scrollAnimation_.stop().start(function (timeElapsed) {
	          t += timeElapsed;
	          if (t < duration) {
	            _this2.element_.scrollLeft = (0, _easing.inOutQuintic)(t, start, distance, duration);
	            return true;
	          } else {
	            _this2.element_.scrollLeft = newPosition;
	            if (completedCallback) {
	              completedCallback();
	            }
	            return false;
	          }
	        });
	      })();
	    } else {
	      if (completedCallback) {
	        completedCallback();
	      }
	    }
	  };
	
	  /**
	   * Execute commend
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.command_ = function (event) {
	    var _this3 = this;
	
	    var x = 0;
	    var slide = null;
	    var a = event.detail.action.toLowerCase();
	
	    // Cancel slideshow if running
	    this.cancelSlideShow_();
	
	    switch (a) {
	      case 'first':
	        slide = this.element_.querySelector('.' + SLIDE + ':first-child');
	        break;
	
	      case 'last':
	        x = this.element_.scrollWidth - this.element_.clientWidth;
	        slide = this.element_.querySelector('.' + SLIDE + ':last-child');
	        break;
	
	      case 'scroll-prev':
	        x = Math.max(this.element_.scrollLeft - this.element_.clientWidth, 0);
	        break;
	
	      case 'scroll-next':
	        x = Math.min(this.element_.scrollLeft + this.element_.clientWidth, this.element_.scrollWidth - this.element_.clientWidth);
	        break;
	
	      case 'next':
	      case 'prev':
	        slide = this.element_.querySelector('.' + SLIDE + '[aria-selected]');
	        if (slide) {
	          slide = a === 'next' ? slide.nextElementSibling : slide.previousElementSibling;
	          this.setAriaSelected_(slide);
	          this.emitSelectEvent_(a, null, slide);
	        }
	        return;
	
	      case 'play':
	        (0, _assign2.default)(this.config_, event.detail);
	        this.startSlideShow_();
	        return;
	
	      case 'pause':
	        return;
	
	      default:
	        return;
	    }
	
	    this.animateScroll_(x, undefined, function () {
	      if ('scroll-next' === a || 'scroll-prev' === a) {
	        var slides = _this3.getSlidesInViewport_();
	        if (slides.length > 0) {
	          slide = 'scroll-next' === a ? slides[0] : slides[slides.length - 1];
	        }
	      }
	      _this3.setAriaSelected_(slide);
	      _this3.emitSelectEvent_(a, null, slide);
	    });
	  };
	
	  /**
	   * Handles custom command event, 'scroll-prev', 'scroll-next', 'first', 'last', next, prev, play, pause
	   * @param event. A custom event
	   * @private
	   */
	  MaterialExtCarousel.prototype.commandHandler_ = function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    if (event.detail && event.detail.action) {
	      this.command_(event);
	    }
	  };
	
	  /**
	   * Handle keypress
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.keyDownHandler_ = function (event) {
	
	    if (event && event.target && event.target !== this.element_) {
	
	      var action = 'first';
	
	      if (event.keyCode === VK_HOME || event.keyCode === VK_END || event.keyCode === VK_PAGE_UP || event.keyCode === VK_PAGE_DOWN) {
	
	        event.preventDefault();
	        if (event.keyCode === VK_END) {
	          action = 'last';
	        } else if (event.keyCode === VK_PAGE_UP) {
	          action = 'scroll-prev';
	        } else if (event.keyCode === VK_PAGE_DOWN) {
	          action = 'scroll-next';
	        }
	        this.command_(action);
	      } else if (event.keyCode === VK_TAB || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        var slide = getSlide_(event.target);
	
	        if (!slide) {
	          return;
	        }
	
	        // Cancel slideshow if running
	        this.cancelSlideShow_();
	
	        switch (event.keyCode) {
	          case VK_ARROW_UP:
	          case VK_ARROW_LEFT:
	            action = 'prev';
	            slide = slide.previousElementSibling;
	            break;
	
	          case VK_ARROW_DOWN:
	          case VK_ARROW_RIGHT:
	            action = 'next';
	            slide = slide.nextElementSibling;
	            break;
	
	          case VK_TAB:
	            if (event.shiftKey) {
	              action = 'prev';
	              slide = slide.previousElementSibling;
	            } else {
	              action = 'next';
	              slide = slide.nextElementSibling;
	            }
	            break;
	
	          case VK_SPACE:
	          case VK_ENTER:
	            action = 'select';
	            break;
	        }
	
	        if (slide) {
	          event.preventDefault();
	          setFocus_(slide);
	          this.emitSelectEvent_(action, event.keyCode, slide);
	        }
	      }
	    }
	  };
	
	  /**
	   * Handle dragging
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.dragHandler_ = function (event) {
	    var _this4 = this;
	
	    event.preventDefault();
	
	    // Cancel slideshow if running
	    this.cancelSlideShow_();
	
	    var updating = false;
	    var rAFDragId = 0;
	
	    var startX = event.clientX || (event.touches !== undefined ? event.touches[0].clientX : 0);
	    var prevX = startX;
	    var targetElement = event.target;
	
	    var update = function update(e) {
	      var currentX = e.clientX || (e.touches !== undefined ? e.touches[0].clientX : 0);
	      var dx = prevX - currentX;
	
	      if (dx < 0) {
	        _this4.element_.scrollLeft = Math.max(_this4.element_.scrollLeft + dx, 0);
	      } else if (dx > 0) {
	        _this4.element_.scrollLeft = Math.min(_this4.element_.scrollLeft + dx, _this4.element_.scrollWidth - _this4.element_.clientWidth);
	      }
	
	      prevX = currentX;
	      updating = false;
	    };
	
	    // drag handler
	    var drag = function drag(e) {
	      e.preventDefault();
	
	      if (!updating) {
	        rAFDragId = window.requestAnimationFrame(function () {
	          return update(e);
	        });
	        updating = true;
	      }
	    };
	
	    // end drag handler
	    var endDrag = function endDrag(e) {
	      e.preventDefault();
	
	      _this4.element_.removeEventListener('mousemove', drag);
	      _this4.element_.removeEventListener('touchmove', drag);
	      window.removeEventListener('mouseup', endDrag);
	      window.removeEventListener('touchend', endDrag);
	
	      // cancel any existing drag rAF, see: http://www.html5rocks.com/en/tutorials/speed/animations/
	      window.cancelAnimationFrame(rAFDragId);
	
	      var slide = getSlide_(targetElement);
	      setFocus_(slide);
	      _this4.emitSelectEvent_('click', null, slide);
	    };
	
	    this.element_.addEventListener('mousemove', drag);
	    this.element_.addEventListener('touchmove', drag);
	    window.addEventListener('mouseup', endDrag);
	    window.addEventListener('touchend', endDrag);
	  };
	
	  /**
	   * Handle focus
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.focusHandler_ = function (event) {
	    var slide = getSlide_(event.target);
	    if (slide) {
	      // The last focused/selected slide has 'aria-selected', even if focus is lost
	      this.setAriaSelected_(slide);
	      slide.classList.add(IS_FOCUSED);
	    }
	  };
	
	  /**
	   * Handle blur
	   * @param event
	   * @private
	   */
	  MaterialExtCarousel.prototype.blurHandler_ = function (event) {
	    var slide = getSlide_(event.target);
	    if (slide) {
	      slide.classList.remove(IS_FOCUSED);
	    }
	  };
	
	  /**
	   * Emits a custeom 'select' event
	   * @param command
	   * @param keyCode
	   * @param slide
	   * @private
	   */
	  MaterialExtCarousel.prototype.emitSelectEvent_ = function (command, keyCode, slide) {
	
	    if (slide) {
	      this.moveSlideIntoViewport_(slide);
	
	      var evt = (0, _customEvent.createCustomEvent)('select', {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          command: command,
	          keyCode: keyCode,
	          source: slide
	        }
	      });
	      this.element_.dispatchEvent(evt);
	    }
	  };
	
	  /**
	   * Get the first visible slide in component viewport
	   * @private
	   */
	  MaterialExtCarousel.prototype.getSlidesInViewport_ = function () {
	    var carouselRect = this.element_.getBoundingClientRect();
	
	    var slidesInViewport = [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).filter(function (slide) {
	      var slideRect = slide.getBoundingClientRect();
	      return slideRect.left >= carouselRect.left && slideRect.right <= carouselRect.right;
	    });
	    return slidesInViewport;
	  };
	
	  /**
	   * Move slide into component viewport - if needed
	   * @param slide
	   * @private
	   */
	  MaterialExtCarousel.prototype.moveSlideIntoViewport_ = function (slide) {
	    var carouselRect = this.element_.getBoundingClientRect();
	    var slideRect = slide.getBoundingClientRect();
	
	    if (slideRect.left < carouselRect.left) {
	      var x = this.element_.scrollLeft - (carouselRect.left - slideRect.left);
	      this.animateScroll_(x);
	    } else if (slideRect.right > carouselRect.right) {
	      var _x = this.element_.scrollLeft - (carouselRect.right - slideRect.right);
	      this.animateScroll_(_x);
	    }
	  };
	
	  /**
	   * Removes 'aria-selected' from all slides in carousel
	   * @private
	   */
	  MaterialExtCarousel.prototype.setAriaSelected_ = function (slide) {
	    if (slide) {
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE + '[aria-selected]'))).forEach(function (slide) {
	        return slide.removeAttribute('aria-selected');
	      });
	      slide.setAttribute('aria-selected', '');
	    }
	  };
	
	  // Helpers
	  var getSlide_ = function getSlide_(element) {
	    return element.closest('.' + SLIDE);
	  };
	
	  var setFocus_ = function setFocus_(slide) {
	    if (slide) {
	      slide.focus();
	    }
	  };
	
	  var addRipple_ = function addRipple_(slide) {
	    if (!slide.querySelector('.' + RIPPLE_CONTAINER)) {
	      var rippleContainer = document.createElement('span');
	      rippleContainer.classList.add(RIPPLE_CONTAINER);
	      rippleContainer.classList.add(RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(RIPPLE);
	      rippleContainer.appendChild(ripple);
	
	      var img = slide.querySelector('img');
	      if (img) {
	        // rippleContainer blocks image title
	        rippleContainer.title = img.title;
	      }
	      slide.appendChild(rippleContainer);
	      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
	    }
	  };
	  // End helpers
	
	  // Public methods.
	
	  /**
	   * Cancel animation - if running.
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.stopAnimation = function () {
	    this.config_.animationLoop.stop();
	  };
	  MaterialExtCarousel.prototype['stopAnimation'] = MaterialExtCarousel.prototype.stopAnimation;
	
	  /**
	   * Upgrade slides
	   * Use if more list elements are added later (dynamically)
	   * @TODO Use mutation observer
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.upgradeSlides = function () {
	    var _this5 = this;
	
	    var hasRippleEffect = this.element_.classList.contains(RIPPLE_EFFECT);
	
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	
	      slide.setAttribute('role', SLIDE_ROLE);
	
	      if (_this5.config_.interactive) {
	        if (!(0, _isInteger2.default)(slide.getAttribute('tabindex'))) {
	          slide.setAttribute('tabindex', 0);
	        }
	        if (hasRippleEffect) {
	          addRipple_(slide);
	        }
	      } else {
	        slide.setAttribute('tabindex', -1);
	      }
	    });
	  };
	  MaterialExtCarousel.prototype['upgradeSlides'] = MaterialExtCarousel.prototype.upgradeSlides;
	
	  /**
	   * Get config object
	   *
	   * @public
	   */
	  MaterialExtCarousel.prototype.getConfig = function () {
	    return this.config_;
	  };
	  MaterialExtCarousel.prototype['getConfig'] = MaterialExtCarousel.prototype.getConfig;
	
	  /**
	   * Initialize component
	   */
	  MaterialExtCarousel.prototype.init = function () {
	    var _this6 = this;
	
	    if (this.element_) {
	      // Config
	      if (this.element_.hasAttribute('data-config')) {
	        var s = this.element_.getAttribute('data-config').replace(/'/g, '"');
	        try {
	          var c = JSON.parse(s);
	          (0, _assign2.default)(this.config_, c);
	        } catch (e) {
	          throw new Error('Failed to parse "data-config = ' + s + '". Error: ' + e.message);
	        }
	      }
	
	      // Wai-Aria
	      this.element_.setAttribute('role', ROLE);
	
	      // Prefer tabindex -1
	      if (!(0, _isInteger2.default)(this.element_.getAttribute('tabindex'))) {
	        this.element_.setAttribute('tabindex', -1);
	      }
	
	      if (this.config_.interactive) {
	
	        // Ripple
	        var hasRippleEffect = this.element_.classList.contains(RIPPLE_EFFECT);
	        if (hasRippleEffect) {
	          this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
	        }
	
	        // Listen to focus/blur events
	        this.element_.addEventListener('focus', this.focusHandler_.bind(this), true);
	        this.element_.addEventListener('blur', this.blurHandler_.bind(this), true);
	
	        // Listen to keyboard events
	        this.element_.addEventListener('keydown', this.keyDownHandler_.bind(this), false);
	
	        // Listen to drag events
	        this.element_.addEventListener('mousedown', this.dragHandler_.bind(this), false);
	        this.element_.addEventListener('touchstart', this.dragHandler_.bind(this), false);
	
	        // Click is handled by drag
	        this.element_.addEventListener('click', function (e) {
	          return e.preventDefault();
	        }, false);
	      }
	
	      // Listen to custom 'command' event
	      this.element_.addEventListener('command', this.commandHandler_.bind(this), false);
	
	      // Detect insertions into components DOM
	      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	
	      // jsdom does not support MutationObserver - so this is not testable
	      /* istanbul ignore next */
	      new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutation) {
	          if (mutation.addedNodes.length > 0) {
	            window.requestAnimationFrame(function () {
	              return _this6.upgradeSlides();
	            });
	          }
	        });
	      }).observe(this.element_, {
	        attributes: false,
	        childList: true,
	        characterData: false,
	        subtree: false
	      });
	
	      // Slides collection
	      this.upgradeSlides();
	
	      // Set upgraded flag
	      this.element_.classList.add(IS_UPGRADED);
	
	      if (this.config_.autostart) {
	        // Start slideshow
	        this.startSlideShow_();
	      }
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   *
	   * Note: There is a bug i material component container; downgrade is never called!
	   * Disables method temporarly to keep code coverage at 100% for functions.
	   *
	  MaterialExtCarousel.prototype.mdlDowngrade_ = function() {
	    'use strict';
	    console.log('***** MaterialExtCarousel.mdlDowngrade');
	  };
	   */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtCarousel,
	    classAsString: 'MaterialExtCarousel',
	    cssClass: 'mdlext-js-carousel',
	    widget: true
	  });
	})();

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(11);
	
	__webpack_require__(6);
	
	__webpack_require__(24);
	
	__webpack_require__(25);
	
	__webpack_require__(48);
	
	__webpack_require__(47);
	
	__webpack_require__(42);
	
	__webpack_require__(45);
	
	__webpack_require__(46);
	
	__webpack_require__(43);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	__webpack_require__(11);
	
	var _customEvent = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/**
	 * A lightboard is a translucent surface illuminated from behind, used for situations
	 * where a shape laid upon the surface needs to be seen with high contrast. In the "old days" of photography
	 * photograpers used a lightboard to get a quick view of their slides. The goal is to create a responsive lightbox
	 * design, based on flex layout, similar to what is used in Adobe LightRoom to browse images.
	 */
	
	(function () {
	  'use strict';
	
	  var VK_TAB = 9;
	  var VK_ENTER = 13;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var IS_UPGRADED = 'is-upgraded';
	  //const LIGHTBOARD = 'mdlext-lightboard';
	  var SLIDE = 'mdlext-lightboard__slide';
	  var SLIDE_TABSTOP = 'mdlext-lightboard__slide__frame';
	  var RIPPLE_COMPONENT = 'MaterialRipple';
	  var RIPPLE = 'mdl-ripple';
	  var RIPPLE_CONTAINER = 'mdlext-lightboard__slide__ripple-container';
	  var RIPPLE_EFFECT = 'mdl-js-ripple-effect';
	  var RIPPLE_EFFECT_IGNORE_EVENTS = 'mdl-js-ripple-effect--ignore-events';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtLightboard = function MaterialExtLightboard(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtLightboard'] = MaterialExtLightboard;
	
	  /**
	   * Initialize lightboard slides
	   *
	   * @private
	   */
	  MaterialExtLightboard.prototype.initLightboard_ = function () {
	
	    this.element_.setAttribute('role', 'grid');
	    [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	      return slide.setAttribute('role', 'cell');
	    });
	
	    if (this.element_.classList.contains(RIPPLE_EFFECT)) {
	      this.element_.classList.add(RIPPLE_EFFECT_IGNORE_EVENTS);
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + SLIDE))).forEach(function (slide) {
	        return addRipple(slide);
	      });
	    }
	
	    /**
	     * Trigger when user cliks on a slide
	     */
	    this.element_.addEventListener('click', function (event) {
	      event.preventDefault();
	      event.stopPropagation();
	      var slide = getSlide(event.target);
	
	      if (event.target !== this) {
	        focus(slide);
	
	        // Remove 'aria-selected' attribute
	        [].concat((0, _toConsumableArray3.default)(this.children)) // Should I use querySelectorAll ???
	        .filter(function (panel) {
	          return panel.hasAttribute('aria-selected');
	        }).forEach(function (selected) {
	          return selected.removeAttribute('aria-selected');
	        });
	
	        // Set 'aria-selected' on current slide
	        slide.setAttribute('aria-selected', '');
	
	        var evt = (0, _customEvent.createCustomEvent)('select', {
	          bubbles: true,
	          cancelable: true,
	          detail: { source: slide }
	        });
	        this.dispatchEvent(evt);
	      }
	    }.bind(this.element_), true);
	
	    /**
	     * Trigger when user presses a keboard key
	     */
	    this.element_.addEventListener('keydown', function (event) {
	      // Maybe this function should be throttled??
	      if (event.keyCode === VK_TAB || event.keyCode === VK_ENTER || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        if (event.target !== this) {
	          var panel = getSlide(event.target);
	          var panels = this.children;
	          var nextPanel = null;
	          var n = this.childElementCount - 1;
	
	          for (var i = 0; i <= n; i++) {
	            if (event.keyCode === VK_HOME) {
	              nextPanel = panels[0];
	              break;
	            } else if (event.keyCode === VK_END) {
	              nextPanel = panels[n];
	              break;
	            }
	
	            if (panels[i] === panel) {
	              if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	                nextPanel = i > 0 ? panels[i - 1] : panels[n];
	              } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	                nextPanel = i < n ? panels[i + 1] : panels[0];
	              } else if (event.keyCode === VK_TAB) {
	                if (event.shiftKey) {
	                  if (i > 0) {
	                    nextPanel = panels[i - 1];
	                  }
	                } else if (i < n) {
	                  nextPanel = panels[i + 1];
	                }
	              } else if (event.keyCode === VK_ENTER || event.keyCode === VK_SPACE) {
	                event.preventDefault();
	                event.stopPropagation();
	
	                // Trigger mouse click event for any attached listeners.
	                var evt = new MouseEvent('click', {
	                  bubbles: true,
	                  cancelable: true,
	                  view: window
	                });
	                panel.dispatchEvent(evt);
	              }
	              break;
	            }
	          }
	          if (nextPanel) {
	            event.preventDefault();
	            event.stopPropagation();
	            focus(nextPanel);
	          }
	        }
	      }
	    }.bind(this.element_), true);
	
	    this.element_.classList.add(IS_UPGRADED);
	  };
	
	  function getSlide(element) {
	    return element.closest('.' + SLIDE);
	  }
	
	  function focus(slide) {
	    if (slide) {
	      var a = slide.querySelector('a.' + SLIDE_TABSTOP);
	      if (a) {
	        a.focus();
	      }
	    }
	  }
	
	  function addRipple(slide) {
	    // Use anchor as ripple container
	    var a = slide.querySelector('a.' + SLIDE_TABSTOP);
	    if (a) {
	      var rippleContainer = a;
	      rippleContainer.classList.add(RIPPLE_CONTAINER);
	      rippleContainer.classList.add(RIPPLE_EFFECT);
	      var ripple = document.createElement('span');
	      ripple.classList.add(RIPPLE);
	      rippleContainer.appendChild(ripple);
	      componentHandler.upgradeElement(rippleContainer, RIPPLE_COMPONENT);
	    }
	  }
	
	  /**
	   * Initialize component
	   */
	  MaterialExtLightboard.prototype.init = function () {
	    if (this.element_) {
	      this.initLightboard_();
	    }
	  };
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  /* jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtLightboard,
	    classAsString: 'MaterialExtLightboard',
	    cssClass: 'mdlext-js-lightboard',
	    widget: true
	  });
	})();

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray2 = __webpack_require__(12);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _isInteger = __webpack_require__(27);
	
	var _isInteger2 = _interopRequireDefault(_isInteger);
	
	var _slicedToArray2 = __webpack_require__(56);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _entries = __webpack_require__(53);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _getIterator2 = __webpack_require__(26);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	__webpack_require__(11);
	
	var _customEvent = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/**
	 * Responsive Lightbox
	 */
	
	(function () {
	  'use strict';
	
	  var VK_ESC = 27;
	  var VK_SPACE = 32;
	  var VK_END = 35;
	  var VK_HOME = 36;
	  var VK_ARROW_LEFT = 37;
	  var VK_ARROW_UP = 38;
	  var VK_ARROW_RIGHT = 39;
	  var VK_ARROW_DOWN = 40;
	
	  var IS_UPGRADED = 'is-upgraded';
	  var LIGHTBOX = 'mdlext-lightbox';
	  var LIGHTBOX_SLIDER = 'mdlext-lightbox__slider';
	  var LIGHTBOX_SLIDER_SLIDE = 'mdlext-lightbox__slider__slide';
	  var STICKY_FOOTER = 'mdlext-lightbox--sticky-footer';
	  var BUTTON = 'mdl-button';
	
	  /**
	   * https://github.com/google/material-design-lite/issues/4205
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtLightbox = function MaterialExtLightbox(element) {
	    // Stores the element.
	    this.element_ = element;
	
	    // false: allow rAF to be called, true: blocks rAF
	    this.drawing_ = false;
	
	    // Initialize instance.
	    this.init();
	  };
	  window['MaterialExtLightbox'] = MaterialExtLightbox;
	
	  /**
	   * Handle keypress
	   * @param event
	   * @private
	   */
	  MaterialExtLightbox.prototype.keyDownHandler_ = function (event) {
	
	    if (event) {
	      if (event.keyCode === VK_ESC || event.keyCode === VK_SPACE || event.keyCode === VK_END || event.keyCode === VK_HOME || event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT || event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	
	        if (event.keyCode !== VK_ESC) {
	          event.preventDefault();
	          event.stopPropagation();
	        }
	
	        var action = 'first';
	        if (event.keyCode === VK_END) {
	          action = 'last';
	        } else if (event.keyCode === VK_ARROW_UP || event.keyCode === VK_ARROW_LEFT) {
	          action = 'prev';
	        } else if (event.keyCode === VK_ARROW_DOWN || event.keyCode === VK_ARROW_RIGHT) {
	          action = 'next';
	        } else if (event.keyCode === VK_SPACE) {
	          action = 'select';
	        } else if (event.keyCode === VK_ESC) {
	          action = 'cancel';
	        }
	
	        dispatchAction_(action, this);
	      }
	    }
	  };
	
	  /**
	   * Handle button clicks
	   * @param event
	   * @private
	   */
	  MaterialExtLightbox.prototype.buttonClickHandler_ = function (event) {
	
	    if (event) {
	      event.preventDefault();
	      event.stopPropagation();
	
	      dispatchAction_(this.getAttribute('data-action') || '', this);
	
	      var n = this.closest('.' + LIGHTBOX);
	      if (n) {
	        n.focus();
	      }
	    }
	  };
	
	  /**
	   * Dispatches an action custom event
	   * @param action
	   * @param source
	   * @param target
	   * @private
	   */
	  var dispatchAction_ = function dispatchAction_(action, source) {
	    var target = arguments.length <= 2 || arguments[2] === undefined ? source : arguments[2];
	
	
	    target.dispatchEvent((0, _customEvent.createCustomEvent)('action', {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        action: action || '',
	        source: source
	      }
	    }));
	  };
	
	  /**
	   * Reposition dialog if component parent element is "DIALOG"
	   * @param lightboxElement
	   * @private
	   */
	  var repositionDialog_ = function repositionDialog_(lightboxElement) {
	    var footerHeight = function footerHeight(footer, isSticky) {
	      return isSticky && footer ? footer.offsetHeight : 0;
	    };
	
	    var reposition = function reposition(dialog, fh) {
	      if (window.getComputedStyle(dialog).position === 'absolute') {
	        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	        var topValue = scrollTop + (window.innerHeight - dialog.offsetHeight - fh) / 2;
	        dialog.style.top = Math.max(scrollTop, topValue) + 'px';
	      }
	    };
	
	    var dialog = lightboxElement.parentNode.nodeName === 'DIALOG' ? lightboxElement.parentNode : null;
	    if (dialog && dialog.hasAttribute('open')) {
	      lightboxElement.style.width = 'auto';
	      lightboxElement.style.maxWidth = '100%';
	      var img = lightboxElement.querySelector('img');
	      if (img) {
	        lightboxElement.style.maxWidth = img.naturalWidth !== 'undefined' ? img.naturalWidth + 'px' : img.width + 'px' || '100%';
	      }
	
	      var fh = footerHeight(lightboxElement.querySelector('footer'), lightboxElement.classList.contains(STICKY_FOOTER));
	      var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - fh;
	      if (dialog.offsetHeight > vh) {
	        var n = 0;
	        while (dialog.offsetHeight > vh && ++n < 4) {
	          lightboxElement.style.width = lightboxElement.offsetWidth * vh / lightboxElement.offsetHeight + 'px';
	        }
	      }
	      reposition(dialog, fh);
	    }
	  };
	
	  /**
	   * Handle image load
	   * @param event
	   * @private
	   */
	
	  MaterialExtLightbox.prototype.imgLoadHandler_ = function () /*event*/{
	    repositionDialog_(this);
	  };
	
	  /**
	   * Handle image drag
	   * @param event
	   * @private
	     */
	  MaterialExtLightbox.prototype.imgDragHandler_ = function (event) {
	
	    var setStyles = function setStyles(element, properties) {
	      //noinspection JSAnnotator
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(properties)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = (0, _slicedToArray3.default)(_step.value, 2);
	
	          var key = _step$value[0];
	          var value = _step$value[1];
	
	          element.style[key] = value;
	        }
	        // ... or:
	        //for (const key in properties) {
	        //  element.style[key] = properties[key];
	        //}
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };
	
	    event.preventDefault();
	    //event.stopPropagation();
	
	    var x = event.clientX || (event.touches !== undefined ? event.touches[0].clientX : 0);
	
	    var img = this;
	    img.style.opacity = '0.2';
	
	    var slider = document.createElement('div');
	    slider.classList.add(LIGHTBOX_SLIDER);
	    setStyles(slider, { 'width': img.offsetWidth + 'px', 'height': img.offsetHeight + 'px' });
	
	    var slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    slide.textContent = '>';
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'line-height': img.offsetHeight + 'px',
	      'font-size': img.offsetHeight / 4 + 'px',
	      'text-align': 'right',
	      'background-image': 'url("' + (img.getAttribute('data-img-url-prev') || '') + '")'
	    });
	    slider.appendChild(slide);
	
	    slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'background-image': 'url("' + img.src + '")'
	    });
	    slider.appendChild(slide);
	
	    slide = document.createElement('div');
	    slide.classList.add(LIGHTBOX_SLIDER_SLIDE);
	    slide.textContent = '<';
	    setStyles(slide, {
	      'width': img.offsetWidth + 'px',
	      'height': img.offsetHeight + 'px',
	      'line-height': img.offsetHeight + 'px',
	      'font-size': img.offsetHeight / 4 + 'px',
	      'text-align': 'left',
	      'background-image': 'url("' + (img.getAttribute('data-img-url-next') || '') + '")'
	    });
	    slider.appendChild(slide);
	
	    img.parentNode.appendChild(slider);
	
	    // drag handler
	    var drag = function drag(e) {
	      e.preventDefault();
	      var dx = (e.clientX || (e.touches !== undefined ? e.touches[0].clientX : 0)) - x; // TODO: maybe rewrite to improve performance
	
	      if (slider.offsetWidth - Math.abs(dx) > 19) {
	        slider.style.left = dx + 'px';
	      }
	    };
	
	    // end drag handler
	    var endDrag = function endDrag(e) {
	      e.preventDefault();
	      //e.stopPropagation();
	
	      window.removeEventListener('mousemove', drag);
	      window.removeEventListener('touchmove', drag);
	      window.removeEventListener('mouseup', endDrag);
	      window.removeEventListener('touchend', endDrag);
	
	      var dx = slider.offsetLeft;
	      img.parentNode.removeChild(slider);
	      img.style.opacity = '1.0';
	
	      if (Math.abs(dx) > 19) {
	        dispatchAction_(dx > 0 ? 'prev' : 'next', img);
	      }
	    };
	
	    window.addEventListener('mousemove', drag);
	    window.addEventListener('touchmove', drag);
	    window.addEventListener('mouseup', endDrag); // .bind(this) does not work here
	    window.addEventListener('touchend', endDrag);
	  };
	
	  /**
	   * Initialize component
	   */
	  MaterialExtLightbox.prototype.init = function () {
	    var _this = this;
	
	    if (this.element_) {
	      // Do the init required for this component to work
	      this.element_.addEventListener('keydown', this.keyDownHandler_.bind(this.element_), true);
	
	      if (!(0, _isInteger2.default)(this.element_.getAttribute('tabindex'))) {
	        this.element_.setAttribute('tabindex', 1);
	      }
	
	      [].concat((0, _toConsumableArray3.default)(this.element_.querySelectorAll('.' + BUTTON))).forEach(function (button) {
	        return button.addEventListener('click', _this.buttonClickHandler_.bind(button), false);
	      });
	
	      var figcaption = this.element_.querySelector('figcaption');
	      if (figcaption) {
	        figcaption.addEventListener('click', this.buttonClickHandler_.bind(figcaption), false);
	      }
	
	      var footer = this.element_.querySelector('footer');
	      if (footer) {
	        footer.addEventListener('click', this.buttonClickHandler_.bind(footer), false);
	      }
	
	      var img = this.element_.querySelector('img');
	      if (img) {
	        img.addEventListener('load', this.imgLoadHandler_.bind(this.element_), false);
	        img.addEventListener('click', function (e) {
	          return e.preventDefault();
	        }, true);
	        img.addEventListener('mousedown', this.imgDragHandler_.bind(img), true);
	        img.addEventListener('touchstart', this.imgDragHandler_.bind(img), true);
	      }
	
	      // See: https://developer.mozilla.org/ru/docs/Web/Events/resize
	      window.addEventListener('resize', function () {
	        if (!_this.drawing_) {
	          // Assumes MDL has polyfilled rAF
	          window.requestAnimationFrame(function () {
	            repositionDialog_(_this.element_);
	            _this.drawing_ = false;
	          });
	        }
	        _this.drawing_ = true;
	      });
	
	      window.addEventListener('orientationchange', function () {
	        return repositionDialog_(_this.element_);
	      });
	
	      // Set upgraded flag
	      this.element_.classList.add(IS_UPGRADED);
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   * Note: There is a bug i material component container; downgrade is never called!
	   * Disables method temporarly to keep code coverage at 100% for functions.
	   *
	   MaterialExtLightbox.prototype.mdlDowngrade_ = function() {
	     if (this.element_) {
	      [...this.element_.querySelectorAll(`.${BUTTON}`)].forEach(
	        button => button.removeEventListener('click', this.buttonClickHandler_)
	      );
	       this.element_.removeEventListener('keydown', this.keyDownHandler_);
	    }
	  };
	  */
	
	  /**
	   * The component registers itself. It can assume componentHandler is available in the global scope.
	   */
	  /* jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtLightbox,
	    classAsString: 'MaterialExtLightbox',
	    cssClass: 'mdlext-js-lightbox'
	  });
	})();

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/*
	 * Copied/Modified from https://github.com/google/material-design-lite/tree/master/src/textfield
	 */
	
	(function () {
	  'use strict';
	
	  /**
	   * Class constructor for Selectfield MDLEXT component.
	   * Implements MDL component design pattern defined at:
	   * https://github.com/jasonmayes/mdl-component-design-pattern
	   *
	   * @constructor
	   * @param {HTMLElement} element The element that will be upgraded.
	   */
	
	  var MaterialExtSelectfield = function MaterialExtSelectfield(element) {
	    this.element_ = element;
	    this.init(); // Initialize instance.
	  };
	
	  window['MaterialExtSelectfield'] = MaterialExtSelectfield;
	
	  /**
	   * Store constants in one place so they can be updated easily.
	   *
	   * @enum {string | number}
	   * @private
	   */
	  MaterialExtSelectfield.prototype.Constant_ = {};
	
	  /**
	   * Store strings for class names defined by this component that are used in
	   * JavaScript. This allows us to simply change it in one place should we
	   * decide to modify at a later date.
	   *
	   * @enum {string}
	   * @private
	   */
	  MaterialExtSelectfield.prototype.CssClasses_ = {
	    LABEL: 'mdlext-selectfield__label',
	    INPUT: 'mdlext-selectfield__select',
	    IS_DIRTY: 'is-dirty',
	    IS_FOCUSED: 'is-focused',
	    IS_DISABLED: 'is-disabled',
	    IS_INVALID: 'is-invalid',
	    IS_UPGRADED: 'is-upgraded'
	  };
	
	  /**
	   * Handle focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onFocus_ = function (event) {
	    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
	  };
	
	  /**
	   * Handle lost focus.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  /*eslint no-unused-vars: 0*/
	  MaterialExtSelectfield.prototype.onBlur_ = function (event) {
	    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
	  };
	
	  /**
	   * Handle reset event from out side.
	   *
	   * @param {Event} event The event that fired.
	   * @private
	   */
	  MaterialExtSelectfield.prototype.onReset_ = function (event) {
	    this.updateClasses_();
	  };
	
	  /**
	   * Handle class updates.
	   *
	   * @private
	   */
	  MaterialExtSelectfield.prototype.updateClasses_ = function () {
	    this.checkDisabled();
	    this.checkValidity();
	    this.checkDirty();
	    this.checkFocus();
	  };
	
	  // Public methods.
	
	  /**
	   * Check the disabled state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkDisabled = function () {
	    if (this.select_.disabled) {
	      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
	    }
	  };
	  MaterialExtSelectfield.prototype['checkDisabled'] = MaterialExtSelectfield.prototype.checkDisabled;
	
	  /**
	   * Check the focus state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkFocus = function () {
	    /*eslint no-extra-boolean-cast: 0*/
	    if (Boolean(this.element_.querySelector(':focus'))) {
	      this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkFocus'] = MaterialExtSelectfield.prototype.checkFocus;
	
	  /**
	   * Check the validity state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkValidity = function () {
	
	    /* Don't think it makes any sense to check validity.
	       Tests I've done, so far, indicates that setting an illegal value via JS returns selectedIndex=0
	     if (this.select_.validity) {
	      if (this.select_.validity.valid) {
	        this.element_.classList.remove(this.CssClasses_.IS_INVALID);
	      } else {
	        this.element_.classList.add(this.CssClasses_.IS_INVALID);
	      }
	    }
	    */
	  };
	
	  MaterialExtSelectfield.prototype['checkValidity'] = MaterialExtSelectfield.prototype.checkValidity;
	
	  /**
	   * Check the dirty state and update field accordingly.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.checkDirty = function () {
	    if (this.select_.value && this.select_.value.length > 0) {
	      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
	    } else {
	      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
	    }
	  };
	
	  MaterialExtSelectfield.prototype['checkDirty'] = MaterialExtSelectfield.prototype.checkDirty;
	
	  /**
	   * Disable select field.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.disable = function () {
	    this.select_.disabled = true;
	    this.updateClasses_();
	  };
	
	  MaterialExtSelectfield.prototype['disable'] = MaterialExtSelectfield.prototype.disable;
	
	  /**
	   * Enable select field.
	   *
	   * @public
	   */
	  MaterialExtSelectfield.prototype.enable = function () {
	    this.select_.disabled = false;
	    this.updateClasses_();
	  };
	
	  MaterialExtSelectfield.prototype['enable'] = MaterialExtSelectfield.prototype.enable;
	
	  /**
	   * Update select field value.
	   *
	   * @param {string} value The value to which to set the control (optional).
	   * @public
	   */
	  MaterialExtSelectfield.prototype.change = function (value) {
	    this.select_.value = value || '';
	    this.updateClasses_();
	  };
	  MaterialExtSelectfield.prototype['change'] = MaterialExtSelectfield.prototype.change;
	
	  /**
	   * Initialize element.
	   */
	  MaterialExtSelectfield.prototype.init = function () {
	    if (this.element_) {
	      this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
	      this.select_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);
	
	      if (this.select_) {
	        this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
	        this.boundFocusHandler = this.onFocus_.bind(this);
	        this.boundBlurHandler = this.onBlur_.bind(this);
	        this.boundResetHandler = this.onReset_.bind(this);
	        this.select_.addEventListener('change', this.boundUpdateClassesHandler);
	        this.select_.addEventListener('focus', this.boundFocusHandler);
	        this.select_.addEventListener('blur', this.boundBlurHandler);
	        this.select_.addEventListener('reset', this.boundResetHandler);
	
	        var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
	        this.updateClasses_();
	        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
	
	        if (invalid) {
	          this.element_.classList.add(this.CssClasses_.IS_INVALID);
	        }
	        if (this.select_.hasAttribute('autofocus')) {
	          this.element_.focus();
	          this.checkFocus();
	        }
	      }
	    }
	  };
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /*eslint no-undef: 0*/
	  /*jshint undef:false */
	  componentHandler.register({
	    constructor: MaterialExtSelectfield,
	    classAsString: 'MaterialExtSelectfield',
	    cssClass: 'mdlext-js-selectfield',
	    widget: true
	  });
	})();

/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * @license
	 * Copyright 2016 Leif Olsen. All Rights Reserved.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *      http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * This code is built with Google Material Design Lite,
	 * which is Licensed under the Apache License, Version 2.0
	 */
	
	/**
	 * A sticky header makes site navigation easily accessible anywhere on the page and saves content space at the same.
	 * The header should auto-hide, i.e. hiding the header automatically when a user starts scrolling down the page and
	 * bringing the header back when a user might need it: they reach the bottom of the page or start scrolling up.
	 */
	
	(function () {
	  'use strict';
	
	  var IS_UPGRADED = 'is-upgraded';
	  var CONTENT_CLASS = 'mdl-layout__content';
	  var IS_SCROLL_CLASS = 'mdlext-is-scroll';
	  //const STICKY_HEADER_CLASS  = 'mdlext-layout__sticky-header';
	
	  /**
	   * @constructor
	   * @param {Element} element The element that will be upgraded.
	   */
	  var MaterialExtStickyHeader = function MaterialExtStickyHeader(element) {
	    // Stores the element.
	    this.header_ = element;
	
	    // Heder listens to scroll events from content
	    this.content_ = null;
	    this.lastScrollTop_ = 0;
	
	    // false: allow rAF to be called, true: blocks rAF
	    this.drawing_ = false;
	
	    // Initialize instance.
	    this.init();
	  };
	
	  window['MaterialExtStickyHeader'] = MaterialExtStickyHeader;
	
	  /**
	   * Update header width
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.recalcWidth_ = function () {
	    this.header_.style.width = this.content_.clientWidth + 'px';
	  };
	
	  /**
	   * Adjust header width when window resizes or oreientation changes
	   * @param event
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.resizeHandler_ = function () /* event */{
	    var _this = this;
	
	    // See: https://developer.mozilla.org/ru/docs/Web/Events/resize
	    if (!this.drawing_) {
	      // Assumes MDL has polyfilled rAF
	      window.requestAnimationFrame(function () {
	        _this.recalcWidth_();
	        _this.drawing_ = false;
	      });
	    }
	    this.drawing_ = true;
	  };
	
	  /**
	   * Update header position
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.reposition_ = function () {
	
	    var currentContentScrollTop = this.content_.scrollTop;
	    var scrollDiff = this.lastScrollTop_ - currentContentScrollTop;
	
	    if (currentContentScrollTop <= 0) {
	      // Scrolled to the top. Header sticks to the top
	      this.header_.style.top = '0';
	      this.header_.classList.remove(IS_SCROLL_CLASS);
	    } else if (scrollDiff > 0) {
	
	      if (scrollDiff >= this.header_.offsetHeight) {
	
	        // Scrolled up. Header slides in
	        var headerTop = parseInt(window.getComputedStyle(this.header_).getPropertyValue('top')) || 0;
	        if (headerTop != 0) {
	          this.header_.style.top = '0';
	          this.header_.classList.add(IS_SCROLL_CLASS);
	        }
	        this.lastScrollTop_ = currentContentScrollTop;
	      }
	      return;
	    } else if (scrollDiff < 0) {
	      // Scrolled down
	      this.header_.classList.add(IS_SCROLL_CLASS);
	      var _headerTop = parseInt(window.getComputedStyle(this.header_).getPropertyValue('top')) || 0;
	
	      if (this.content_.scrollHeight - this.content_.scrollTop <= this.content_.offsetHeight) {
	        // Bottom of content
	        if (_headerTop != 0) {
	          this.header_.style.top = '0';
	        }
	      } else {
	        _headerTop += scrollDiff;
	        var offsetHeight = this.header_.offsetHeight;
	        this.header_.style.top = (Math.abs(_headerTop) > offsetHeight ? -offsetHeight : _headerTop) + 'px';
	      }
	    }
	
	    this.lastScrollTop_ = currentContentScrollTop;
	  };
	
	  /**
	   * Scroll header when content scrolls
	   * @param event
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.scrollHandler_ = function () /* event */{
	    var _this2 = this;
	
	    // See: https://developer.mozilla.org/ru/docs/Web/Events/resize
	    if (!this.drawing_) {
	      window.requestAnimationFrame(function () {
	        _this2.reposition_();
	        _this2.drawing_ = false;
	      });
	    }
	    this.drawing_ = true;
	  };
	
	  /**
	   * Init header position
	   * @private
	   */
	  MaterialExtStickyHeader.prototype.updatePosition_ = function () /* event */{
	    this.recalcWidth_();
	    this.reposition_();
	  };
	
	  /**
	   * Initialize component
	   */
	  MaterialExtStickyHeader.prototype.init = function () {
	    var _this3 = this;
	
	    if (this.header_) {
	      this.content_ = this.header_.parentNode.querySelector('.' + CONTENT_CLASS) || null;
	
	      if (this.content_) {
	        this.content_.style.paddingTop = this.header_.offsetHeight + 'px'; // Make room for sticky header
	        this.lastScrollTop_ = this.content_.scrollTop;
	
	        this.content_.addEventListener('scroll', this.scrollHandler_.bind(this));
	        window.addEventListener('resize', this.resizeHandler_.bind(this));
	        window.addEventListener('orientationchange', this.resizeHandler_.bind(this));
	
	        // Adjust header width if content changes (e.g. in a SPA)
	        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	
	        // jsdom does not support MutationObserver - so this is not testable
	        /* istanbul ignore next */
	        new MutationObserver(function () /*mutations*/{
	
	          if (!_this3.drawing_) {
	            window.requestAnimationFrame(function () {
	              _this3.updatePosition_();
	              _this3.drawing_ = false;
	            });
	          }
	          _this3.drawing_ = true;
	        }).observe(this.content_, {
	          attributes: false,
	          childList: true,
	          characterData: false,
	          subtree: true
	        });
	
	        // Set initial position
	        this.updatePosition_();
	
	        // Set upgraded flag
	        this.header_.classList.add(IS_UPGRADED);
	      }
	    }
	  };
	
	  /*
	   * Downgrade component
	   * E.g remove listeners and clean up resources
	   * Note: There is a bug i material component container; downgrade is never called!
	   * Disables method temporarly to keep code coverage at 100% for functions.
	   *
	   MaterialExtStickyHeader.prototype.mdlDowngrade_ = function() {
	     'use strict';
	   };
	  */
	
	  // The component registers itself. It can assume componentHandler is available
	  // in the global scope.
	  /* eslint no-undef: 0 */
	  componentHandler.register({
	    constructor: MaterialExtStickyHeader,
	    classAsString: 'MaterialExtStickyHeader',
	    cssClass: 'mdlext-js-sticky-header'
	  });
	})();

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(59), __esModule: true };

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(52);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(50);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(26);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	__webpack_require__(90);
	module.exports = __webpack_require__(1).Array.from;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(41);
	__webpack_require__(23);
	module.exports = __webpack_require__(88);

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(41);
	__webpack_require__(23);
	module.exports = __webpack_require__(89);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(92);
	module.exports = __webpack_require__(1).Number.isInteger;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	module.exports = __webpack_require__(1).Object.assign;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(94);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	module.exports = __webpack_require__(1).Object.entries;

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(15)
	  , toLength  = __webpack_require__(38)
	  , toIndex   = __webpack_require__(86);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(10)
	  , createDesc      = __webpack_require__(19);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(8) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(31)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(5)
	  , ITERATOR   = __webpack_require__(2)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(14)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(7);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(78)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(36)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(2)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(18)
	  , gOPS     = __webpack_require__(80)
	  , pIE      = __webpack_require__(35)
	  , toObject = __webpack_require__(22)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(17)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(7)
	  , dPs         = __webpack_require__(79)
	  , enumBugKeys = __webpack_require__(32)
	  , IE_PROTO    = __webpack_require__(20)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(31)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(68).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(7)
	  , getKeys  = __webpack_require__(18);
	
	module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(13)
	  , toObject    = __webpack_require__(22)
	  , IE_PROTO    = __webpack_require__(20)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(13)
	  , toIObject    = __webpack_require__(15)
	  , arrayIndexOf = __webpack_require__(66)(false)
	  , IE_PROTO     = __webpack_require__(20)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(18)
	  , toIObject = __webpack_require__(15)
	  , isEnum    = __webpack_require__(35).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(21)
	  , defined   = __webpack_require__(16);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(21)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(7)
	  , get      = __webpack_require__(40);
	module.exports = __webpack_require__(1).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(28)
	  , ITERATOR  = __webpack_require__(2)('iterator')
	  , Iterators = __webpack_require__(5);
	module.exports = __webpack_require__(1).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(30)
	  , $export        = __webpack_require__(3)
	  , toObject       = __webpack_require__(22)
	  , call           = __webpack_require__(72)
	  , isArrayIter    = __webpack_require__(70)
	  , toLength       = __webpack_require__(38)
	  , createProperty = __webpack_require__(67)
	  , getIterFn      = __webpack_require__(40);
	
	$export($export.S + $export.F * !__webpack_require__(74)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(65)
	  , step             = __webpack_require__(75)
	  , Iterators        = __webpack_require__(5)
	  , toIObject        = __webpack_require__(15);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(34)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(3);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(71)});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(3);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(77)});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(3);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(8), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(3)
	  , $entries = __webpack_require__(83)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 96 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mdl-ext.js.map