Class('arena.tests.Transform',
	arena.tests.UnitTest,
	[
		'size'
	], {
		Transform: function() {

		},
		'initialisation':{
			init:function() {
				this.constructor.base.init.apply(this, arguments);
				this.size = 100;
				this.localBounds.setSize(this.size, this.size);
			}
		},
		'canvas':{
			getTransformWidth:function() { return this.size; },
			getTransformHeight:function() { return this.size; }
		},
		'rendering':{
			renderBackground:function() {
				this.constructor.base.renderBackground.call(this);
				this.bitmap.fillRect(0, 0, this.size, this.size, this.color);
				this.bitmap.drawCrossedRect(0, 0, this.size, this.size, Color.yellow);
				this.bitmap.drawRect(0, 0, 10, 10, Color.yellow);
			},
			renderForeground:function() {
				if (this.containsPoint == true) {
					var txt = '%1,%2'.args(Math.floor(this.localPoint.x), Math.floor(this.localPoint.y));
					this.bitmap.setFontSizeStyle(16, arena.text.BOLD);
					var w = this.bitmap.textWidth(txt);
					this.bitmap.fillRect(this.localPoint.x, this.localPoint.y, w + 10, 18, Color.green);
					this.bitmap.drawText(txt, this.localPoint.x, this.localPoint.y, Color.white);
					arena.dom(this.overlay).css('cursor', 'text');
				} else {
					arena.dom(this.overlay).css('cursor', 'default');
				}
			}
		},
		'events':{
			mousemove:function(e) {
				this.constructor.base.mousemove.call(this, e);
				if (this.containsPoint == true)
					this.color = this.green;
				else
					this.color = this.white;
				this.render();
			}
		}
	});