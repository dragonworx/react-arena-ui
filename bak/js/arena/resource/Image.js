Class('arena.resource.Image', arena.resource.Resource, ['#pool', 'image', 'url'], {
	Image: function(url) {
		arena.resource.Resource.apply(this, arguments);
		this.bitmap = new arena.display.Bitmap()
		this.img = document.createElement("img");
		this.width = this.bitmap.width;
		this.height = this.bitmap.height;
		this.type = arena.resource.IMAGE;
		this.render();
	},
	'downloading': {
		activateDownload: function() {
			arena.dom.bind(this.img, 'load', this.load.context(this));
			this.img.src = this.url.toString();
			console.log(this.url.toString());
		},
		load: function() {
			this.loaded = true;
			this.bitmap.setSize(this.img.width, this.img.height);
			this.width = this.img.width;
			this.height = this.img.height;
			this.render();
			arena.dom.unbind(this.img, 'load', this.load.context(this));
			this.sendEvent('ready', this);

		}
	},
	'rendering': {
		render: function(renderEnd) {
			if (this.loaded == false) {
				this.bitmap.render();
			} else {
				this.bitmap.clear();
				this.bitmap.drawImage(this.img, 0, 0);
			}
		}
	},
	'conversion': {
		toString: function() {
			if (this.loaded)
				return 'image(%1[%2x%3])'.args(this.url.toString(), this.width, this.height);
			else
				return 'image(%1[-x-])'.args(this.url.toString());
		}
	},
	'static resource pool initialisation': {
		init: function() {
			this.pool = new arena.resource.Pool();
		}
	}
});