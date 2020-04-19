Class('arena.tests.Color', arena.tests.UnitTest, [], {
	init: function() {
		this.constructor.base.init.call(this);
		this.rects = [];
	},
    'drawing': {
        renderBackground: function() {
            this.constructor.base.renderBackground.apply(this, arguments);

            var xsize = 100;
            var ysize = 30;

            //render named colors
            var x = 0;
            var y = 0;

			this.rects.clear();
			this.bitmap.setFontSizeStyle(12, arena.text.BOLD);
            for (var i=0; i<Color.names.length; i++) {
                var color = Color[Color.names[i]];
                this.bitmap.font.color = color.overself();
                this.bitmap.fillRect(x, y, xsize, ysize, color);
                this.bitmap.drawRect(x, y, xsize, ysize, Color.darkgray);
                this.bitmap.drawText(Color.names[i], x + 2, y + 2);
				var r = new arena.geometry.Rectangle(x, y, xsize, ysize);
				this.rects.add({rect:r,color:color,name:Color.names[i]});
                x += xsize;
                if (x + xsize > this.bitmap.width) {
                    y += ysize; x = 0;
                }
            }
            x = 0;
            y += ysize * 2;

            // render alpha blended colors
            var colors = [
                Color.white, Color.black,
                Color.red, Color.blue,
                Color.green, Color.mediumslateblue,
                Color.orange, Color.navy
            ];
            for (var i=0; i<colors.length; i += 2) {
                var c1 = colors[i].copy();
                var c2 = colors[i + 1].copy();
				var c = c1.blended(c2, 0.5);
                this.bitmap.fillRect(x, y, xsize, ysize, c1);
                this.bitmap.fillRect(x + xsize, y, xsize, ysize, c2);
                this.bitmap.fillRect(x + (xsize / 2), y + (ysize / 4), xsize, ysize / 2, c);
                x += xsize * 2;
                if (x + xsize * 2 > this.bitmap.width) {
                    y += ysize; x = 0;
                }
            }

			this.localBounds.setHeight(y);
        },
		renderForeground: function() {
			this.bitmap.clearTransform();
			for (var i=0; i<this.rects.length; i++) {
				var rect = this.rects[i].rect;
				if (rect.containsPoint(this.localPoint.x, this.localPoint.y)) {
					arena.dom(this.overlay).css('cursor', 'text');
					var color = this.rects[i].color;
					var name = this.rects[i].name;
					this.bitmap.setFontSizeStyle(16, arena.text.BOLD);
					var w = this.bitmap.textWidth(name);
					this.bitmap.fillRect((this.bitmap.width / 2) - (w / 2) - 5, (this.bitmap.height / 2) - 5, w + 10, 18, color);
					this.bitmap.drawText(name, (this.bitmap.width / 2) - (w / 2), (this.bitmap.height / 2) - 5, color.overself());
					return;
				} else {
					arena.dom(this.overlay).css('cursor', 'default');
				}
			}
		}
    }
});