/**	
* @module $classlist
* @desc cross browser classList utility
* @version 0.0.1    
* @author George Raptis | http://georap.gr 
*/
;(function(window, doc, undef){
	'use strict';
	
	/**
	 * @desc this object holds utils that allow us to add, remove, toggle CSS classes and.. 
	 * ..check if a CSS class is contained in the HTMLCollection object in a cross browser compatible way
	 * @support IE7, IE8, real browsers
	*/
	var $classList = {};

	/**
	 * @desc adds a CSS class to an element
	 * @param el {Object} - the element to add the class
	 * @param c {String} - the name of the class to add to the element
	*/
	$classList.add = function (el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "add" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t add class "' + c + '" on ' + el);
 
		var self = this;

		if (document.documentElement.classList) {				// check if ECMAScript 5 'classList' object is supported
			el.classList.add(c);								// and just use the native method 'add'
		} else {												// if ECMAScript 5 'classList' object is NOT supported 									
			if (!self.contains(el, c)) {						// check that element does not already have the desired class and if not add it to the 'className' property
				var c_names = el.className.split(/\s+/);
				c_names.push(c);
				el.className = c_names.join(' ');
			}
		}
		return self;	// return the object to allow 'method chaining'
	};

	/**
	 * @desc adds many CSS classes to an element
	 * @dependancies (fn) add 
	 * @param el {Object} - the element to add the classes
	 * @param c {String} - the names of the classes to add to the element
	*/
	$classList.addMany = function (el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "addMany" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t add class(es) "' + c + '" on ' + el);

		var arr = c.split(/\s+/),
			self = this;
		for (var i = 0, l = arr.length; i < l; i++) {
			self.add(el, arr[i]);
		}
		return self;	// return the object to allow 'method chaining'
	};

	/**
	 * @desc removes a CSS class from an element
	 * @param el - the element to remove the class from
	 * @param c (String) - the name of the class to remove from element (space seperated)
	*/
	$classList.remove = function (el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "remove" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t remove class "' + c + '" from ' + el);
		
		var self = this;

		if(document.documentElement.classList){
			el.classList.remove(c);
		} else {
			var c_names = el.className.split(/\s+/), 
				pos = -1;
			
			for (var i = 0, l = c_names.length; i < l; i++){
				if (c_names[i] == c){
					pos = i;
					c_names.splice(pos, 1);
					el.className = c_names.join(' ');
					break;
				}
			}
		}
		return self;	// return the object to allow 'method chaining'
	};

	/**
	 * @desc removes many CSS classes from an element
	 * @param el - the element to remove the classes from
	 * @param c (String) - the names of the classes to be removed from the element (space seperated)
	*/
	$classList.removeMany = function(el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "removeMany" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t remove class(es) "' + c + '" from ' + el);

		var arr = c.split(/\s+/),
			self = this;

		for (var i = 0, l = arr.length; i < l; i++) {
			if (self.contains(el, arr[i])) {
				self.remove(el, arr[i]);
			}
		}
		return self;	// return the object to allow 'method chaining'
	};

	/**
	 * @desc returns true if element hsa a class
	 * @param el - the element we want to check if contains class
	 * @param c (string) - the class name
	*/
	$classList.contains = function (el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "contains" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t check if class "' + c + '" is contained on ' + el);

		if (document.documentElement.classList) {
			return el.classList.contains(c);
		} else {
			var c_names = el.className.split(/\s+/);

			for (var i = 0, l = c_names.length; i < l; i++) {
				if (c_names[i] == c) {
					return true;
				}
			}
			return false;
		}
	};

	/**
	 * @desc toggles a class of an element
	 * @dependancies (fn) contains, (fn) remove, (fn) add
	 * @param el - the element to toggle its class
	 * @param c (string) - the class name	
	*/
	$classList.toggle = function (el, c) {
		// check if all arguments are provided and if el and c arguments are not faulsy values
		if (arguments.length != 2) throw new Error('function "toggle" called with ' + arguments.length + ' argument(s), but it expects 2 arguments.');
		if (!el || !c) throw new Error('Can\'t toggle class "' + c + '" on ' + el);

		var self = this;

		if (document.documentElement.classList) {
			el.classList.toggle(c);
		} else {
			if (self.contains(el, c)) {
				self.remove(el, c)
			} else {
				self.add(el, c);
			}
		}
		return self;	// return the object to allow 'method chaining'
	};

	/**
	 * @desc gets the class list of an element
	 * @param el {Object}
	 * @return array of classes
	*/
	$classList.get = function (el) {
		// check if all arguments are provided and if el argument is not faulsy value
		if (arguments.length != 1) throw new Error('function "getClassList" called with ' + arguments.length + ' argument(s), but it expects 1 argument');
		if (!el) throw new Error('Can\'t get classes of "' + el + '".');

		if (document.documentElement.classList) {
			return el.classList;
		}  else {
			var c_names = el.className.split(/\s+/);
			return c_names;
		}
		return false;
	};

	/**
	 * @desc get elements by class name
	 * @param node {Object} - the node to check for the class name (eg: document)
	 * @param c {String} - the class name
	 * @return node list {Array} with the elements that contain the class name
	*/ 
	$classList.getElementsByClassName = function (node, c) {
		var self = this;

		// if getElementsByClassName is supported
		if (document.getElementsByClassName) {
			return node.getElementsByClassName(c);
		}

		// if getElementsByClassName is NOT supported but querySelectorAll is supported
		if (!document.getElementsByClassName && document.querySelectorAll) {
			return node.querySelectorAll('.' + c);
		}

		// if neither getElementsByClassName nor querySelectorAll is supported
		if (!document.getElementsByClassName && !document.querySelectorAll) {
			var arr = [],
				regx = new RegExp('(^| )' + c + '( |$)'),
				els = node.getElementsByTagName('*');

			for (var i = 0, len = els.length; i < len; i++) {
				if (regx.test(els[i].className)) {
					arr.push(els[i]);
				}
			}			
			return arr;
		}
	};
	
	window.$classList = $classList;
})(this, this.document);	