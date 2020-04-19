Class('arena.resource.Pool', arena.event.EventDispatcher, ['resources', 'downloading'], {
	Pool: function() {
		this.constructor.base.EventDispatcher.call(this);
		this.resources = {};
		this.downloads = [];
	},
	'downloading': {
		require: function(url) {
			// dont include resources which do not have a url
			if (typeof url == "string")
				url = new arena.resource.Url(url);

			// return cached resource, or create new ones
			if (this.resources[url.toString()]) {
				resource = this.resources[url.toString()];
				this.downloads.add(resource);
				return resource;
			} else {
				resource = new arena.resource[url.resourceType()](url);
				this.resources[url.toString()] = resource;
				this.downloads.add(resource);
				resource.addListener('ready', this.resourceReady.context(this));
				return resource;
			}
		},
		fetch: function() {
			this.sendEvent('fetching');
			for (var i = 0; i < this.downloads.length; i++) {
				var resource = this.downloads[i];
				if (resource.loaded == false)
					resource.download();
				else
					this.resourceReady(resource);
			}
		},
		resourceReady: function(resource) {
			this.downloads.remove(resource);
			if (this.downloads.isEmpty)
				this.sendEvent('ready');
		}
	}
});