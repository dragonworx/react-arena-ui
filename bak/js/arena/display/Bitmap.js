Class('arena.display.Bitmap', arena.Object,
	[
		'width',
		'height',
		'canvas',
		'context',
		'quality',
		'bufferPaths',
		'subPixel',
		'imageData',
		'imageDataPoint',
		'font',
		'matrix'
	], {
		Bitmap: function(width, height, canvas) {
			this.constructor.base.Object.call(this);
			this.quality = 1;
			this.bufferPaths = false;
			this.subPixel = false;
			this.imageData = undefined;
			this.imageDataPoint = new arena.geometry.Point();
			this.matrix = new arena.geometry.Matrix();
			this.font = {
				name: 'sans-serif',
				size: 12,
				style: 'normal',
				color: Color.white
			};
			if (typeof width != "number")
				canvas = width; // canvas can be passed as first argument
			if (canvas) {
				this.canvas = canvas.element ? canvas.element() : canvas;
			} else {
				this.canvas = document.createElement('canvas');
				if (!this.canvas.getContext) {
					var msg = "HTML5 Canvas element is unsupported in this browser. Go HTML5.";
					alert(msg);
					throw new Error(msg);
				}
			}
			this.setCanvas(this.canvas);
			if (typeof width == "number") {
				this.setSize(width, height);  // should size be at least 1 or is zero ok for canvas?
			} else {
				this.width = this.canvas.width;
				this.height = this.canvas.height;
			}
		},
		'canvas initialisation': {
			setCanvas: function(canvas) {
				this.canvas = canvas;
				this.context = this.canvas.getContext('2d');
				this.clearTransform();
				this.refreshImageData();
				this.render();
			}
		},
		'geometry': {
			setSize: function(width, height) {
				this.width = width;
				this.height = height;
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.setQuality(this.quality);
			},
			pixel: function(val) {
				return this.subPixel == false ? Math.floor(val) + 0.5 : val;
			},
			size: function(val) {
				return this.subPixel == false ? Math.floor(val) - 0.5 : val;
			},
			setQuality: function(quality) {
				this.quality = Math.max(quality, 0.05);
				this.setTransform(this.matrix.a, this.matrix.b, this.matrix.c, this.matrix.d, this.matrix.tx, this.matrix.ty);
				this.refreshImageData();
				this.render();
			}
		},
		'transform': {
			clearTransform: function() {
				this.setTransform(1, 0, 0, 1, 0, 0);
				return this;
			},
			setTransform: function(a, b, c, d, e, f) {
				if (Object.instanceOf(a, arena.geometry.Matrix)) {
					b = a.b;
					c = a.c;
					d = a.d;
					e = a.tx;
					f = a.ty;
					a = a.a;
				}
				this.context.setTransform(a, b, c, d, e, f);

				this.matrix.a = a;
				this.matrix.b = b;
				this.matrix.c = c;
				this.matrix.d = d;
				this.matrix.tx = e;
				this.matrix.ty = f;

				this.context.scale(this.quality, this.quality);

				return this;
			},
			translate: function(x, y) {
				this.context.translate(x, y);
				return this;
			},
			scale: function(x, y) {
				this.context.scale(x, y);
				return this;
			},
			rotate: function(deg) {
				this.context.rotate(arena.geometry.radians(deg));
				return this;
			},
			push: function() { this.context.save(); },
			pop: function() { this.context.restore(); }
		},
		'rendering': {
			render: function() {
				this.clear();
				this.clearFill(Color.darkred);
				this.drawCrossedRect(0, 0, this.width, this.height, Color.red);
				return this;
			},
			renderOn: function(bitmapOrCanvas) {
				var context = bitmapOrCanvas.context;
				if (!context)
					context = bitmapOrCanvas.getContext('2d');
				context.save();
				context.scale(1 / this.quality, 1 / this.quality);
				context.drawImage(this.canvas, 0, 0);
				context.restore();
				return this;
			}
		}, 'alpha mask': {
			setAlphaMask: function(bitmap) {
				var sourceData = bitmap.refreshImageData().getImageData().data;
				if ((this.width != bitmap.width) || (this.height != bitmap.height))
					this.setSize(bitmap.width, bitmap.height);
				var destData = this.refreshImageData().getImageData().data;
				for (var i = 0; i < sourceData.length; i += 4) {
					destData[i + 3] = 0.2126 * sourceData[i] + 0.7152 * sourceData[i + 1] + 0.0722 * sourceData[i + 2];
				}
				this.putImageData();
				return this;
			},
			setAlphaBlend: function(alpha) {
				this.context.globalAlpha = alpha
			}
		},
		'font': {
			setFont: function(name, size, style) {
				this.font.name = name;
				if (size) this.font.size = size;
				if (style) this.font.style = style;
				return this;
			},
			setFontSizeStyle: function(size, style, color) {
				this.font.size = size;
				if (style) this.font.style = style;
				if (color) this.font.color = color;
				return this;
			},
			fontStyle: function() {
				return '$1 $2px $3'.args(this.font.style, this.font.size, this.font.name);
			},
			textWidth: function(txt) {
				this.context.font = this.fontStyle();
				return this.context.measureText(txt).width;
			}
		}, 'drawing': {
			clear: function() {
				this.clearTransform();
				this.context.clearRect(0, 0, this.width * (1 / this.quality), this.height * (1 / this.quality));
				return this;
			},
			clearFill: function(fillStyle) {
				this.fillRect(0, 0, this.width, this.height, fillStyle);
				return this;
			},
			fillRect: function(x, y, w, h, fillStyle) {
				if (!this.bufferPaths) this.context.beginPath();
				this.context.fillStyle = fillStyle.renderOn ? fillStyle.renderOn(this) : fillStyle;
				this.context.rect(this.pixel(x), this.pixel(y), this.size(w), this.size(h));
				if (!this.bufferPaths) this.context.fill();
				if (!this.bufferPaths) this.context.closePath();
				return this;
			},
			fillGradientRect: function(x, y, w, h, fillStyle) {
				this.context.save();
				this.context.translate(this.pixel(x), this.pixel(y));
				if (!this.bufferPaths) this.context.beginPath();
				this.context.fillStyle = fillStyle.renderOn ? fillStyle.renderOn(this) : fillStyle;
				this.context.rect(this.pixel(0), this.pixel(0), this.size(w), this.size(h));
				if (!this.bufferPaths) this.context.fill();
				if (!this.bufferPaths) this.context.closePath();
				this.context.restore();
				return this;
			},
			fillLinearGradient: function(x, y, w, h, startColor, stopColor) {
				var gradient = new arena.display.LinearGradient(x, y, w, h);
				gradient.addColorStop(0, startColor);
				gradient.addColorStop(1, stopColor);
				this.fillGradientRect(x, y, w, h, gradient);
			},
			drawCrossedRect: function(x, y, w, h, strokeStyle) {
				this.drawRect(x, y, w, h, strokeStyle);
				this.drawLine(x, y, x + w, y + h, strokeStyle);
				this.drawLine(x, y + h, x + w, y, strokeStyle);
				return this;
			},
			drawRect: function(x, y, w, h, strokeStyle) {
				if (!this.bufferPaths) this.context.beginPath();
				this.context.strokeStyle = strokeStyle.renderOn ? strokeStyle.renderOn(this) : strokeStyle;
				this.context.rect(this.pixel(x), this.pixel(y), this.size(w), this.size(h));
				if (!this.bufferPaths) this.context.stroke();
				if (!this.bufferPaths) this.context.closePath();
				return this;
			},
			drawLine: function(x1, y1, x2, y2, strokeStyle, width) {
				if (!this.bufferPaths) this.context.beginPath();
				this.context.strokeStyle = strokeStyle.renderOn ? strokeStyle.renderOn(this) : strokeStyle;
				this.context.lineWidth = width || 1;
				this.context.moveTo(this.pixel(x1), this.pixel(y1));
				this.context.lineTo(this.pixel(x2), this.pixel(y2));
				if (!this.bufferPaths) this.context.stroke();
				if (!this.bufferPaths) this.context.closePath();
				return this;
			},
			drawGrid: function(x, y, w, h, strokeStyle, hdiv, vdiv) {
				vdiv = vdiv ? vdiv : 1;
				this.lockBufferPaths();
				this.bufferPaths = true;
				this.drawRect(x, y, w, h, strokeStyle);
				var hinc = w / hdiv;
				var vinc = h / vdiv;
				if (hdiv > 1)
					for (var px = x; px < x + w; px += hinc)
						this.drawLine(px, y, px, y + h, strokeStyle);
				if (vdiv > 1)
					for (var py = y; py < y + h; py += vinc)
						this.drawLine(x, py, x + w, py, strokeStyle);
				this.context.stroke();
				this.unlockBufferPaths();
			},
			drawBitmap: function(bitmap) {
				bitmap.renderOn(this);
			},
			drawImage: function(image, x, y) {
				this.context.drawImage(image, x || 0, y || 0);
			},
			drawText: function(text, x, y, fillStyle, width) {
				if (!this.bufferPaths)
					this.context.beginPath();
				this.context.font = this.fontStyle();
				this.context.fillStyle = fillStyle ? fillStyle.renderOn(this) : this.font.color.renderOn(this);
				this.context.fillText(text.toString(), x, y + this.font.size, width ? width : 10000);
				if (!this.bufferPaths)
					this.context.closePath();
				return this;
			}
		},
		'pixel manipulation': {
			refreshImageData: function() {
				this.imageData = undefined;
				return this;
			},
			getImageData: function(x, y, w, h) {
				if (!this.imageData) {
					x = x || 0;
					y = y || 0;
					w = w || this.canvas.width;
					h = h || this.canvas.height;
					this.imageData = this.context.getImageData(x, y, w, h);
					this.imageDataPoint.set(x, y);
				}
				return this.imageData;
			},
			putImageData: function() {
				this.context.putImageData(this.imageData, this.imageDataPoint.x, this.imageDataPoint.y);
				return this;
			}
		},
		'buffering stroke and fills': {
			lockBufferPaths: function() {
				this._bufferPaths = this.bufferPaths;
				this.context.beginPath();
				return this;
			},
			unlockBufferPaths: function() {
				this.bufferPaths = this._bufferPaths;
				this.context.closePath();
				return this;
			}
		}
	});