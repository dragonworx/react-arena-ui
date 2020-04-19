function isUndefined(obj) { return typeof obj == "undefined"; }
function isDefined(obj) { return !isUndefined(obj); }

Function.contexts = {};

Function.prototype.context = function(context) {
	if (!Function.contexts[this])
		Function.contexts[this] = {};

	var thisFunction = this;
	Function.contexts[this][context] = function() {
		return thisFunction.apply(context, arguments);
	};

	return Function.contexts[this][context];
};

Function.clearContexts = function() {
	Object.clear(Function.contexts);
};

Function.prototype.functionName = null;

Object.defineProperty(Function.prototype, 'functionName', {
	get: function() {
		var name = this.toString().match(/^function ([\$a-zA-Z0-9_]+)/);
		if (name == null)
			return null;
		else
			return name[1];
	},
	configurable: false,
	enumerable: false
});

jQuery(window).unload(function() {
	Function.clearContexts();
});