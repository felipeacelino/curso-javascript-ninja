(function(win, doc) {
    'use strinct';

    function DOM(elements) {
        if (!(this instanceof DOM)) {
            return new DOM(elements);
        }  
        this.element = doc.querySelectorAll(elements);
    }
        
    DOM.prototype.on = function on(events, callback) {
        var events = events.split(' ');
        Array.prototype.forEach.call(this.element, function(element) {
            events.forEach((event) => {
                element.addEventListener(event, callback, false);
            });
        });
    };
    
    DOM.prototype.off = function off(event, callback) {
        Array.prototype.forEach.call(this.element, function(element) {
            element.removeEventListener(event, callback, false);
        });
    };
    
    DOM.prototype.get = function get() {
        if (this.element.length === 1) {
            return this.element[0];
        }
        return this.element;
    };
    
    DOM.prototype.forEach = function forEach() {
        return Array.prototype.forEach.apply(this.element, arguments);
    }
    
    DOM.prototype.map = function map() {
        return Array.prototype.map.apply(this.element, arguments);
    }
    
    DOM.prototype.filter = function filter() {
        return Array.prototype.filter.apply(this.element, arguments);
    }
    
    DOM.prototype.reduce = function reduce() {
        return Array.prototype.reduce.apply(this.element, arguments);
    }
    
    DOM.prototype.reduceRight = function reduceRight() {
        return Array.prototype.reduceRight.apply(this.element, arguments);
    }
    
    DOM.prototype.every = function every() {
        return Array.prototype.every.apply(this.element, arguments);
    }
    
    DOM.prototype.some = function some() {
        return Array.prototype.some.apply(this.element, arguments);
    }
    
    DOM.isArray = function isArray(param) {
        return Object.prototype.toString.call(param) === '[object Array]';
    }
    
    DOM.isObject = function isObject(param) {
        return Object.prototype.toString.call(param) === '[object Object]';
    }
    
    DOM.isFunction = function isFunction(param) {
        return Object.prototype.toString.call(param) === '[object Function]';
    }
    
    DOM.isNumber = function isNumber(param) {
        return Object.prototype.toString.call(param) === '[object Number]';
    }
    
    DOM.isString = function isString(param) {
        return Object.prototype.toString.call(param) === '[object String]';
    }
    
    DOM.isBoolean = function isBoolean(param) {
        return Object.prototype.toString.call(param) === '[object Boolean]';
    }
    
    DOM.isNull = function isNull(param) {
        return Object.prototype.toString.call(param) === '[object Undefined]' || Object.prototype.toString.call(param) === '[object Null]';
    }
    
    DOM.prototype.val = function val() {
        if (arguments.length === 0) {
            return this.get().value;
        }
        this.forEach((element) => {
            element.value = arguments[0]; 
        });   
    }
    
    DOM.prototype.text = function text(text) {
        this.forEach((element) => {
            element.textContent = text;
        });
    }

    win.DOM = DOM;

})(window, document);