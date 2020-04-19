function isUndefined(obj) { return typeof obj == "undefined"; }
function isDefined(obj) { return !isUndefined(obj); }

// Adding scope to functions (NOTE: if scope() is used on function, it must be cleared with clearScope() on dispose if object does not want to leave memory leak)
Function.contexts = {};

Function.prototype.context = function(context) {
	var thisFunction = this;
	if (!Function.contexts[thisFunction])
		Function.contexts[thisFunction] = function() {
			return thisFunction.apply(context, arguments);
		};
	return Function.contexts[context];
};

Function.clearContexts = function() {
	Object.clear(Function.contexts);
};

Function.prototype.getName = function() {
	var name = this.toString().match(/^function ([\$a-zA-Z0-9_]+)/);
	if (name == null)
		return null;
	else
		return name[1];
};

Object.select = function(obj, callback) {
	// if callback(key, value) returns true for each object needed for selection then value is added to results,
	// otherwise value not added to results
	var results = {};
	Object.select.func(obj, callback, results);
	return results;
};

Object.select.func = function(obj, callback, results) {
	var keys = Object.keys(obj);
	for (var i=0; i<keys.length; i++) {
		var key = keys[i];
		if (typeof obj[key] == 'object') {
			Object.select.func(obj[key], callback, results);
		} else {
			if (callback(key, obj[key])) {
				results[key] = obj[key];
			}
		}
	}
};

Object.isObject = function(obj) {
	return (typeof obj == "object") && !(obj instanceof Array);
};

Object.values = function(obj) {
	var array = [];
	Object.keys(obj).each(function(e) {
		array.push(e);
	});
	return array;
};

jQuery(window).unload(function() {
	Function.clearContexts();
});