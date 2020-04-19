Class('arena.resource.Resource', arena.event.EventDispatcher, ['url', 'loaded'], {
	Resource: function(url) {
		arena.event.EventDispatcher.call(this);
		this.url = url;
		this.loaded = false;
		this.type = arena.resource.RESOURCE;
	},
	download: function() {
		if (this.loaded == true) {
			this.sendEvent('ready', this);
		} else {
			this.activateDownload();
			this.sendEvent('fetching', this);
		}
	},
	activateDownload: function() {
		// subclasses override actual specifics of initiating download
	}
});