Class('arena.tests.UnitTest', arena.Object,
	[
		'bitmap',
		'canvas',
		'transform',
		'controls',
		'localPoint',
		'localBounds',
		'containsPoint',
		'color',
		'white',
		'green',
		'timer'
	], {
		UnitTest: function() {
			this.constructor.base.Object.call(this);
		},
		'initialisation': {
			init: function() {
				this.createBitmap();
				this.transform = new arena.geometry.Transform();
				this.overlay = arena.dom('#overlay');
				arena.dom.bind(this.overlay, 'click', this.click.context(this));
				arena.dom.bind(this.overlay, 'mousemove', this.mousemove.context(this));
				arena.dom.bind(window, 'unload', this.unload.context(this));
				this.localPoint = new arena.geometry.Point(0, 0);
				this.localBounds = new arena.geometry.Rectangle(0, 0, this.bitmap.width, this.bitmap.height);
				this.containsPoint = false;
				this.white = Color.white.opacity(0.5);
				this.green = Color.green.opacity(0.5);
				this.color = this.white;
			},
			unload: function() {
				arena.dom.unbind(this.overlay, 'click', this.click.context(this));
				arena.dom.unbind(this.overlay, 'mousemove', this.mousemove.context(this));
				arena.dom.unbind(window, 'unload', this.unload.context(this));
			}
		},
		'bitmap': {
			createBitmap: function() {
				var canvas = arena.dom('#canvas');
				var size = arena.dom.size(canvas);
				this.bitmap = new arena.display.Bitmap(size.width, size.height);
				this.canvas = new arena.display.Bitmap(size.width, size.height, canvas);
			},
			getTransformWidth: function() { return this.bitmap.width; },
			getTransformHeight: function() { return this.bitmap.height; },
			getSetsQuality: function() { return false; },
			setTransform: function(originx, originy, transx, transy, rotation, scalex, scaley, skewx, skewy, squeeze, tiltx, tilty, quality) {
				this.transform.origin.x = originx * this.getTransformWidth();
				this.transform.origin.y = originy * this.getTransformHeight();
				this.transform.translation.x = transx;
				this.transform.translation.y = transy;
				this.transform.rotation = rotation;
				this.transform.scale.x = scalex;
				this.transform.scale.y = scaley;
				this.transform.skew.x = skewx;
				this.transform.skew.y = skewy;
				this.transform.squeeze = squeeze;
				this.transform.tilt.x = tiltx;
				this.transform.tilt.y = tilty;
				this.transform.alpha = quality;
				if (!this.getSetsQuality())
					this.bitmap.setQuality(quality);
				this.transform.build();
			}
		},
		'rendering': {
			render: function() {
				this.canvas.clear();

				var m = this.transform.matrix();
				this.canvas.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);

				this.bitmap.clear();
				this.renderBackground();
				this.renderForeground();

				this.bitmap.renderOn(this.canvas);

				// draw globalbounds
				this.drawGlobalBounds();
			},
			renderBackground: function() {

			},
			renderForeground: function() {
				this.bitmap.clearTransform();
				if (this.containsPoint == true) {
					var txt = '%1,%2'.args(Math.floor(this.localPoint.x), Math.floor(this.localPoint.y));
					this.bitmap.setFontSizeStyle(16, arena.text.BOLD);
					var w = this.bitmap.textWidth(txt);
					this.bitmap.fillRect((this.bitmap.width / 2) - (w / 2) - 5, (this.bitmap.height / 2) - 5, w + 10, 18, Color.green);
					this.bitmap.drawText(txt, (this.bitmap.width / 2) - (w / 2), (this.bitmap.height / 2) - 5, Color.white);
				}
			},
			globalBounds: function() {
				var r = arena.geometry.Rectangle.temp;
				r.clear();
				var topLeft = this.transform.localToGlobal(0, 0);
				var topRight = this.transform.localToGlobal(this.localBounds.width, 0);
				var bottomLeft = this.transform.localToGlobal(0, this.localBounds.height);
				var bottomRight = this.transform.localToGlobal(this.localBounds.width, this.localBounds.height);
				r.set(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y).encompass(topLeft, topRight, bottomLeft, bottomRight).round();
				return r;
			},
			drawGlobalBounds: function() {
				this.canvas.push();
				this.canvas.clearTransform();
				var r = this.globalBounds();
				this.canvas.drawRect(r.x, r.y, r.width, r.height, Color.red);
				this.canvas.pop();
			}
		},
		'events': {
			reset: function() {
				this.transform.reset();
				this.bitmap.clear(true);
				this.render();
			},
			start: function() { this.startTimer(); },
			stop: function() { this.stopTimer(); },
			click: function(e) {
				arena.dom.mouseEvent(e);
				var mousepoint = arena.dom.mousepoint(e);
				this.localPoint = this.transform.globalToLocal(mousepoint.x, mousepoint.y);
				this.containsPoint = this.localBounds.containsPoint(this.localPoint.x, this.localPoint.y);
			},
			mousemove: function(e) {
				arena.dom.mouseEvent(e);
				var mousepoint = arena.dom.mousepoint(e);
				this.localPoint = this.transform.globalToLocal(mousepoint.x, mousepoint.y);
				this.containsPoint = this.localBounds.containsPoint(this.localPoint.x, this.localPoint.y);
				this.render();
			}
		},
		'timer': {
			startTimer: function() {
				this.stopTimer();
				this.timer = setInterval(this.update.context(this), 1000 / 24);
			},
			stopTimer: function() {
				if (this.timer)
					clearInterval(this.timer);
				this.timer = undefined;
			},
			update: function() {
				this.render();
			},
			isActive: function() {
				return this.timer != undefined;
			}
		}
	});
