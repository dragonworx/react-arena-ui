Class('arena.tests.Bitmap',
	arena.tests.UnitTest,
	[
		'image',
		'gradient1',
		'gradient2',
		'alphaMask'
	],
	{
		Bitmap: function() {

		},
		'initialisation': {
			init: function() {
			
				this.constructor.base.init.apply(this, arguments); // sets transform

				// create / download image
				arena.resource.Image.pool.clearListeners(/*'ready'*/);
				arena.resource.Image.pool.addListener('ready', this.ready.context(this));
				this.image = arena.resource.Image.pool.require('/arena2d/img/212451_f520.jpg');
				this.localBounds = new arena.geometry.Rectangle(0, 0, this.image.width, this.image.height);
				arena.resource.Image.pool.fetch();
			}
		},
		'canvas': {
			getTransformWidth: function() { return this.image.width; },
			getTransformHeight: function() { return this.image.height; },
			getSetsQuality: function() { return true; }
		},
		'drawing': {
			renderBackground: function() {
				// call super
				this.constructor.base.renderBackground.call(this);

				this.image.bitmap.setQuality(this.transform.alpha);

				// render image
				this.image.render();

				if (this.gradient1) {
					// render gradients
					this.image.bitmap.fillRect(0, 0, 100, this.image.height, this.gradient1);
					this.image.bitmap.fillGradientRect(100, 0, 100, 100, this.gradient2);
					// render lines - with subpixel blending
					this.image.subPixel = true;
					var y = 50;
					for (var x = 20; x < 80; x += 10) {
						this.image.bitmap.drawLine(x, y, x, y + 50, Color.red);
						this.image.bitmap.drawLine(x, y, x + 10, y + 50, Color.red);
					}
					// render lines - without subpuxel blending
					this.image.subPixel = false;
					y = 120;
					for (var x = 20; x < 80; x += 10) {
						this.image.bitmap.drawLine(x, y, x, y + 50, Color.red);
						this.image.bitmap.drawLine(x, y, x + 10, y + 50, Color.red);
					}
					// test alpha mask
					if (this.image.bitmap.quality == 1)
						this.image.bitmap.setAlphaMask(this.alphaMask);
				}
			},
			renderForeground: function() {
				if (this.containsPoint == true) {
					var txt = '%1,%2'.args(Math.floor(this.localPoint.x), Math.floor(this.localPoint.y));
					this.image.bitmap.setFontSizeStyle(20, arena.text.BOLD);
					var w = this.image.bitmap.textWidth(txt);
					this.image.bitmap.fillRect(this.localPoint.x, this.localPoint.y, w, 26, Color.green);
					this.image.bitmap.drawText(txt, this.localPoint.x, this.localPoint.y, Color.white);
					arena.dom(this.overlay).css('cursor', 'text');
				} else {
					arena.dom(this.overlay).css('cursor', 'default');
				}

				// draw image at current transform
				this.bitmap.drawBitmap(this.image.bitmap);
			}
		},
		'events': {
			ready: function() {
				console.log(this.toString() + " [imageloaded] " + this.image.toString());

				this.localBounds = new arena.geometry.Rectangle(0, 0, this.image.width, this.image.height);

				// create linear gradient
				this.gradient1 = new arena.display.LinearGradient(0, 0, 0, this.image.height);
				this.gradient1.addColorStop(0, Color.yellow);
				this.gradient1.addColorStop(1, Color.black);
				// create radial gradient
				this.gradient2 = new arena.display.RadialGradient(30, 30, 0, 50, 50, 50);
				this.gradient2.addColorStop(0.1, Color.white);
				this.gradient2.addColorStop(0.5, Color.blue);
				this.gradient2.addColorStop(1.0, Color.transparent);
				// create alpha mask
				this.alphaMask = new arena.display.Bitmap(520, 400);
				this.alphaMask.fillLinearGradient(0, 0, this.image.width, this.image.height, Color.white, Color.black);
				this.transform.width = this.image.width;
				this.transform.height = this.image.height;
				this.transformHandler();
				// render
				this.render();
			}
		}
	});