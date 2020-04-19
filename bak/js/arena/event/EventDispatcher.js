Class('arena.event.EventDispatcher', arena.Object, ['listeners'], {
	EventDispatcher: function() {
		this.constructor.base.Object.call(this);
		this.listeners = {};
	},
	'adding / removing listeners': {
		addListener: function(type, fn) {
			if (!this.listeners.containsKey(type))
				this.listeners[type] = {enabled: true, array: []};
			this.listeners[type].array.add(fn);
			return this;
		},
		removeListener: function(type, fn) {
			if (!this.listeners.containsKey(type))
				return this;
			this.listeners[type].array.remove(fn);
			return this;
		},
		clearListeners: function(type) {
			if (type) {
				if (!this.listeners.containsKey(type))
					return this;
				this.listeners[type].array.clear();
			} else {
				for (var type in this.listeners)
					this.listeners[type].array.clear();
			}
		}
	},
	'enable / disable listeners': {
		enableEvent: function(type) {
			if (!this.listeners[type])
				return this;
			this.listeners[type].enabled = true;
			return this;
		},
		disableEvent: function(type) {
			if (!this.listeners[type])
				return this;
			this.listeners[type].enabled = false;
			return this;
		}
	},
	'sending events': {
		sendEvent: function(type, data) {
			if (!this.listeners[type])
				return this;
			if (this.listeners[type].enabled)
				for (var i = 0; i < this.listeners[type].array.length; i++)
					this.listeners[type].array[i](data);
			return this;
		}
	}
});