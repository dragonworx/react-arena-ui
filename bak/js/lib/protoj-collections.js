// Array extensions
Array.prototype.clear = function() {
	this.length = 0;
	return this;
};
Array.prototype.clone = function(array, deepCopy) {
	this.clear();
	for (var i = 0; i < array.length; i++)
		this.push(deepCopy && array[i].copy ? array[i].copy() : array[i]);
	return this;
};
Array.prototype.copy = function() {
	return [].slice.call(this);
};
Array.prototype.deepCopy = function() {
	var array = [];
	for (var i = 0; i < this.length; i++)
		array.push(this[i].copy ? this[i].copy() : this[i]);
	return array;
};
Array.prototype.equals = function(array) {
	if (array.length != this.length)
		return false;
	for (var i = 0; i < this.length; i++)
		if (this[i].equals ? !(this[i].equals(array[i])) : this[i] != array[i])
			return false;
	return true;
};
Array.prototype.add = function(item) {
	this.push(item);
	return this;
};
Array.prototype.addAll = function(array) {
	this.push.apply(this, array);
	return this;
};
Array.prototype.insertAll = function(array) {
	this.unshift.apply(this, array);
	return this;
};
Array.prototype.addLast = function(item) { return this.insertAt(item, this.length); };
Array.prototype.insert = function(item) {
	this.splice(0, 0, item);
	return this;
};
Array.prototype.insertAt = function(item, index) {
	this.splice(index, 0, item);
	return this;
};
Array.prototype.first = function() { return this[0]; };
Array.prototype.last = function() { return this[this.lastIndex]; };
Array.prototype.contains = function(item) { return this.indexOf(item) > -1; };
Array.prototype.insertBefore = function(newItem, beforeItem) {
	this.insertAt(this.indexOf(beforeItem), newItem);
	return this;
};
Array.prototype.insertAfter = function(newItem, afterItem) {
	this.insertAt(this.indexOf(afterItem) + 1, newItem);
	return this;
};
Array.prototype.chopLeft = function(length) { return this.slice(length); };
Array.prototype.chopRight = function(length) { return this.slice(0, this.length - length); };
Array.prototype.copyRange = function(startIndex, length) { return this.splice(startIndex, length); };
Array.prototype.remove = function(item) {
	for (var i = 0; i < this.length; i++)
		if (this[i] == item) this.removeAt(i);
	return this;
};
Array.prototype.removeAt = function(index) {
	this.splice(index, 1);
	return this;
};
Array.prototype.removeAny = function(array) {
	for (var i = 0; i < array.length; i++)
		for (var j = 0; j < this.length; j++)
			if (this[j] == array[i])
				this[j] = undefined;
	this.compact();
	return this;
};
Array.prototype.removeDuplicates = function() {
	for (var i = 0; i < this.length; i++)
		for (var j = 0; j < this.length; j++)
			if ((this[j] == this[i]) && (i != j))
				this[j] = undefined;
	this.compact();
	return this;

};
Array.prototype.compact = function() {
	var array = [];
	for (var i = 0; i < this.length; i++)
		if (this[i] != undefined)
			array.push(this[i]);
	this.clear();
	for (var j = 0; j < array.length; j++)
		this.push(array[j]);
	return this;
};
Array.prototype.removeFirst = Array.prototype.shift;
Array.prototype.removeLast = Array.prototype.pop;
Array.prototype.update = function(callback) {
	for (var i = 0; i < this.length; i++)
		this[i] = callback(this[i], i);
	return this;
};
Array.prototype.fill = function(type, count) {
	for (var i = 0; i < count; i++)
		this.push(new type());
	return this;
};
Array.prototype.clearFilled = function() {
	for (var i = 0; i < this.length; i++)
		this[i].clear();
};
Array.prototype.isFillEmpty = function() {
	for (var i = 0; i < this.length; i++)
		if (!this[i].isEmpty)
			return false;
	return true;
};
Array.prototype.reverse = function() {
	var array = new Array();
	for (var i = this.length - 1; i >= 0; i--) array.push(this[i]);
	this.clear();
	this.addAll(array);
	return this;
};
Array.prototype.toArray = function() {
	var array = [];
	for (var i = 0; i < this.length - 1; i++) array.push(this[i]);
	return array;
};
Array.prototype.takeFirst = function(type) {
	if (this.length == 0) return undefined;
	var typeString = typeof(type).toString().toLowerCase();
	for (var i = 0; i < this.length; i++) {
		if ((type == Object) && (typeof(this[i] == "object")) && !(this[i] instanceof Array)) return this.remove(this[i]);
		if ((type == Array) && (this[i] instanceof Array)) return this.remove(this[i]);
		if (typeof(this[i]) == typeString) return this.remove(this[i]);
	}
};
Array.prototype.takeLast = function(type) {
	if (this.length == 0) return undefined;
	var typeString = typeof(type).toString().toLowerCase();
	for (var i = this.length - 1; i >= 0; i++) {
		if ((type == Object) && (typeof(this[i] == "object")) && !(this[i] instanceof Array)) return this.remove(this[i]);
		if ((type == Array) && (this[i] instanceof Array)) return this.remove(this[i]);
		if (typeof(this[i]) == typeString) return this.remove(this[i]);
	}
};
Array.from = function(array) {
	var array = [];
	array.addAll(array ? array : arguments);
	return array;
}
Array.prototype.each = Array.prototype.forEach;
Object.defineProperty(Array.prototype, 'lastIndex', {
	get: function() { return this.length - 1; },
	configurable: false,
	enumerable: false
});
Object.defineProperty(Array.prototype, 'isEmpty', {
	get: function() {
		if (this instanceof Array) return this.length == 0;
		for (var key in this) return false;
		return true;
	},
	configurable: false,
	enumerable: false
});
window.argsArray = function(args) {
	return [].slice.call(args);
};
Array.temp = [];

// Dictionary extensions
Object.defineProperty(Object.prototype, 'containsKey', {
	value: function(key) {
		return Object.keys(this).contains(key);
	},
	configurable: false,
	enumerable: false
});
Object.clear = function(object) {
	for (var key in object)
		delete object[key];
	return object;
}