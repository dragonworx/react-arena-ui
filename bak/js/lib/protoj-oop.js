Javascript.classes = {};
Javascript.hashes = {};

Javascript.hash = function(object) {
	Javascript.hashes[object.ClassName] = Javascript.hashes[object.ClassName] ? Javascript.hashes[object.ClassName] + 1 : 1;
	object.hash = Javascript.hashes[object.ClassName];
	return Javascript.hashes[object.ClassName];
};

Javascript.classInit = function() {
	for (var fqdn in Javascript.classes)
		if (Javascript.classes[fqdn].init)
			Javascript.classes[fqdn].init.call(Javascript.classes[fqdn]);
};

/*
 Should be put after all class declaration is complete, this informs the system to register the fully working class
 */
Function.prototype.namespace = function(fqdn) {
	Javascript.classes[fqdn] = this;
	this.fqdn = fqdn;
	for (var key in this.prototype)
		if (!this[key])
			this[key] = this.prototype[key];
	this.prototype.constructor = this;
	return this;
};

Object.defineProperty(Function.prototype, 'property', {
	get: function() {
		if (!this._property)
			this._property = [];
		return this._property;
	}
});

Object.defineProperty(Function.prototype, 'staticProperty', {
	get: function() {
		if (!this._staticProperty)
			this._staticProperty = {};
		return this._staticProperty;
	},
	set: function(object) {
		this._staticProperty = object;
	}
});

Function.prototype.properties = function() {
	this.property.addAll(argsArray(arguments));

	return this;
};

Function.prototype.staticProperties = function(object) {
	this.staticProperty = object;

	for (var key in object)
		this.createStaticProperty(key, this)

	return this;
};

Function.prototype.createStaticProperty = function(key, cls) {
	Object.defineProperty(this.prototype, key, {
		get: function() {
			return cls.staticProperty[key];
		},
		set: function(value) {
			cls.staticProperty[key] = value;
		}
	});
};

Function.prototype.extend = function(superClass) {
	for (var key in superClass.prototype)
		if (!this.prototype[key])
			this.prototype[key] = superClass.prototype[key];

	Object.defineProperty(this.prototype, 'Super', {
		value: superClass,
		enumerable: false,
		configurable: false
	});

	this.property.insertAll(superClass.property);

	for (var key in superClass.staticProperty)
		this.createStaticProperty(key, superClass);

	return this;
};

Object.defineProperty(Object.prototype, 'Class', {
	get: function() {
		if (typeof this == 'function') {
			return this;
		} else {
			return this.constructor;
		}
	},
	configurable: false,
	enumerable: false
});

Object.defineProperty(Object.prototype, 'ClassName', {
	get: function() {
		if (this.constructor.fqdn)
			return this.constructor.fqdn;
		if (typeof this == 'function') {
			return this.getName();
		} else {
			return this.constructor.getName();
		}
	},
	configurable: false,
	enumerable: false
});

jQuery(document).ready(function() {
	Javascript.classInit();
});