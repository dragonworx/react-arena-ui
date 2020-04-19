Class('arena.resource.Url', arena.Object, ['rawUrl', 'scheme', 'host', 'port', 'path', 'file', 'extension', 'query', 'hash'], {
	Url:function(text) {
		// http://localhost:8888/arena2d/#Bitmap
		// img/212451_f520.jpg
		this.rawUrl = text;
		var str = text.chopLeft('/', 1);
		this.hash = str.chopLeft('#', 1);
		this.query = str.chopLeft('?', 1);
		this.file = str.chopRight('.', 1);
		this.extension = str.chopLeft('.', 1);
	},
	'instance':{
		resourceType:function() {
			for (var i = 0; i<arena.resource.Url.imageTypes.length; i++)
				if (arena.resource.Url.imageTypes[i].equals(this.extension))
					return arena.resource.IMAGE;
			return
		},
		toString:function() { return this.rawUrl; }
	},
	'static':{
		init:function() {
			arena.resource.Url.imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'tiff'];
		}
	}
});