window.arena = {};

// Object
arena.Object = function Object() {
	Javascript.hash(this);
};
arena.Object.prototype = {
	copy: function() {
		var object = new this.Class;
		object.clone(this);
		return object;
	},
	clone: function(object) {
		for (var i = 0; i < this.Class.property.length; i++)
			this[this.Class.property[i]] = object[this.Class.property[i]].copy
				? object[this.Class.property[i]].copy()
				: object[this.Class.property[i]];
		return this;
	},
	equals: function(object) {
		for (var i = 0; i < this.Class.property.length; i++) {
			var propName = this.Class.property[i];
			if (this[propName].equals) {
				if (!this[propName].equals(object[propName]))
					return false;
			} else {
				if (this[propName] != object[propName])
					return false;
			}
		}

		return true;
	}
};
arena.Object.namespace('arena.Object');

// Class1
arena.Class1 = function Class1(x) {
	arena.Object.call(this);
	this.x = x;
};
arena.Class1.prototype = {
	x: null,
	test: function() { console.dump('Class.instance.x', this.x); }
};
arena.Class1.init = function() { console.log("Class1 static init!") };
arena.Class1.namespace('arena.Class1').extend(arena.Object).properties('x').staticProperties({'y': 5});

// Class2
arena.Class2 = function Class2(x) {
	arena.Class1.apply(this, arguments);
	this.w = x + '_mod';
};
arena.Class2.prototype = {
	w: null,
	test: function() {
		arena.Class1.test.call(this);
		console.dump('Class.instance.w', this.w);
	}
};
arena.Class2.namespace('arena.Class2').extend(arena.Class1).properties('w');

// test...
jQuery(document).ready(function() {
	console.log("starting tests...");
	window.x = new arena.Class2('woof');
	window.y = window.x.copy();
	console.dump('x', window.x);
});