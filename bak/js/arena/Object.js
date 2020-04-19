Class('arena.Object', null, ['!hash'], {
	Object: function() {
		Object.hash(this)
	},
	'copying, cloning': {
		copy: function() {
			var obj = new this.constructor;
			obj.clone(this);
			return obj;
		},
		clone: function(obj) {
			// beware of circular references, subclasses should implement duplicate() with logic to resolve parent child circular loops
			for (var i=0; i<this.constructor.properties.length; i++) {
				var name = this.constructor.properties[i];
				if (name.charAt(0) == '!') continue; // skip any properties with ! as first char of name, this means the class will override clone and copy this value itself
				var objVal = obj[name];
				if (objVal && objVal.copy)
					this[name] = objVal.copy();
				else
					this[name] = objVal;
			}
			return this;
		}
	},
	'comparing': {
		instanceOf: function(cls) {
			if (this.className == cls.className)
				return true;
			var base = this.constructor.base;
			while (base != undefined) {
				if (base.constructor == cls)
					return true;
				base = base.constructor.base;
			}
			return false;
		},
		equals: function(obj) {
			for (var i=0; i<this.constructor.properties.length; i++) {
				var name = this.constructor.properties[i];
				if ((this[name] && obj[name]) && (this[name].equals && obj[name].equals)) {
					if (!this[name].equals(obj[name]))
						return false;
				} else {
					if (this[name] != obj[name])
						return false;
				}
			}
			return true;
		}
	},
	'conversion': {
		toString: function() { return '[%2:%1]'.args(this.hash, this.constructor.className); }
	}
});