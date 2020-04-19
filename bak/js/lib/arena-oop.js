Object.prototype.className = null;

Object.classes = {};
Object.hashes = {};

Object.hash = function(object) {
	Object.hashes[object.className] = Object.hashes[object.className]
		? Object.hashes[object.className] + 1
		: 1;
	Object.defineProperty(object, 'hash', {
		value:object.className + "#" + Object.hashes[object.className],
		enumerable:false,
		configurable:false
	});
	return object['hash'];
};

Object.classInit = function() {
	for (var domainName in Object.classes)
		if (Object.classes[domainName].init)
			Object.classes[domainName].init.call(Object.classes[domainName]);
};

Function.prototype.domainName = null;

Object.instanceOf = function(a, b) {
	if (typeof a == "object" && a.instanceOf) return a.instanceOf(b);
	return false;
}

Object.defineProperty(Object.prototype, 'className', {
	get:function() {
		if (this.constructor.domainName)
			return this.constructor.domainName;
		if (typeof this == 'function') {
			return this.clsName;
		} else {
			return this.constructor.clsName;
		}
	},
	configurable:false,
	enumerable:false
});

function Class(namespace, superClass, properties, methods) {

	console.log("building class " + namespace);

	//get instance methods
	var instanceMethods = {};
	var constructorMethod = null;
	var staticMethods = {};
	for (var key in methods) {
		if (key.indexOf("static")>-1) {
			for (var statickey in methods[key])
				staticMethods[statickey] = methods[key][statickey];
		} else {
			if (typeof methods[key] == "function") {
				if (!constructorMethod)
					constructorMethod = methods[key];
				else
					instanceMethods[key] = methods[key];
			} else {
				for (var subkey in methods[key])
					instanceMethods[subkey] = methods[key][subkey];
			}
		}
	}

	//if (namespace == "arena.event.EventDispatcher") debugger;

	//create class, first inherit superclass methods and properties
	var newClass = constructorMethod;
	newClass.prototype = {};
	newClass.properties = [];

	//install into namespace
	var clsName = null;
	namespace = namespace.split(".");
	var namespaceParent = window;
	for (var i = 0; i<namespace.length; i++) {
		var key = namespace[i];
		if (i == namespace.length - 1) {
			namespaceParent[key] = newClass;
			clsName = key;
		} else {
			if (!namespaceParent[key])
				namespaceParent[key] = {};
			namespaceParent = namespaceParent[key];
		}
	}

	//install superclass properties and methods
	if (superClass) {
		for (var i = 0; i<superClass.properties.length; i++)
			newClass.properties.push(superClass.properties[i]);
		for (var key in superClass.prototype)
			newClass.prototype[key] = superClass.prototype[key];
		newClass.base = superClass.prototype;
	}

	//install instance properties
	if (properties) {
		for (var i = 0; i<properties.length; i++)
			newClass.properties.push(properties[i]);
	}

	//install instance methods
	for (var key in instanceMethods)
		newClass.prototype[key] = instanceMethods[key];

	//install static methods
	for (var key in staticMethods)
		newClass[key] = staticMethods[key];

	//add to class collection
	Object.classes[namespace] = newClass;

	//set constructor
	newClass.prototype.constructor = newClass;
	newClass.prototype[clsName] = newClass;
	newClass.clsName = clsName;
	newClass.domainName = namespace.join(".");

	console.log("success for " + clsName);

	return newClass;
}

Function.prototype.from = function(superClass) {
	Object.defineProperty(this.prototype, 'superConstructor', {
		value:superClass,
		enumerable:false,
		configurable:false
	});

	Object.defineProperty(this, 'superConstructor', {
		value:superClass,
		enumerable:false,
		configurable:false
	});

	if (typeof superClass != "function") return;

	for (var key in superClass.prototype)
		if (!this.prototype[key])
			this.prototype[key] = superClass.prototype[key];

	this.property.insertAll(superClass.property);

	for (key in superClass.sharedProperty)
		this.createStaticProperty(key, superClass);

	return this;
};

Function.prototype.property = null;

Object.defineProperty(Function.prototype, 'property', {
	get:function() {
		if (!this._property)
			this._property = [];
		return this._property;
	}
});

Function.prototype.sharedProperty = null;

Object.defineProperty(Function.prototype, 'sharedProperty', {
	get:function() {
		if (!this._sharedProperty)
			this._sharedProperty = {};
		return this._sharedProperty;
	},
	set:function(object) {
		this._sharedProperty = object;
	}
});

Function.prototype.sharedMethod = null;

Object.defineProperty(Function.prototype, 'sharedMethod', {
	get:function() {
		if (!this._sharedMethod)
			this._sharedMethod = {};
		return this._sharedMethod;
	},
	set:function(object) {
		this._sharedMethod = object;
	}
});

Function.prototype.properties = function() {
	this.property.addAll(argsArray(arguments));
	return this;
};

Function.prototype.share = function(object) {
	this.sharedProperty = object;

	for (var key in object)
		this.createStaticProperty(key, this);

	return this;
};

Function.prototype.createStaticProperty = function(key, cls) {
	Object.defineProperty(this.prototype, key, {
		get:function() {
			return cls.sharedProperty[key];
		},
		set:function(value) {
			cls.sharedProperty[key] = value;
		},
		enumerable:false,
		configurable:false
	});
};

Function.prototype.createStaticMethod = function(key, method) {
	Object.defineProperty(this, key, {
		value:method,
		enumerable:false,
		configurable:false
	});
	Object.defineProperty(this.prototype, key, {
		value:method,
		enumerable:false,
		configurable:false
	});
};

Function.prototype.temporary = function() {
	this.temp = new this();
	Object.defineProperty(this.prototype, 'temp', {
		get:function() { return this.constructor.temp.clone(this); }
	});
};

Array.temporary();

jQuery(document).ready(function() {
	Object.classInit();
});