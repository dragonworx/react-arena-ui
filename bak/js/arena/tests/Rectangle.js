Class('arena.tests.Rectangle', arena.tests.UnitTest, ['points', 'rects', 'mode', 'select'], {
	Rectangle: function() {
		this.constructor.base.UnitTest.call(this);
	},
    'initialisation': {
        init: function() {
            this.constructor.base.init.call(this);

            this.points = [];
            this.rects = [];
            this.mode = "intersect";
            this.bitmap.setFontSizeStyle(14, arena.text.BOLD);

            // create select
            this.select = document.createElement("select");
            arena.dom.bind(this.select, 'change', this.selectChange.context(this));
            this.overlay.append(this.select);

            // add options
            function option(name) {
                var option = document.createElement('option');
                option.value = option.text = name;
                return option;
            }
            this.select.options.add(option('intersect'));
            this.select.options.add(option('union'));
            this.select.options.add(option('split'));
            this.select.options.add(option('split(merge)'));
            this.select.options.add(option('intersects'));
            this.select.options.add(option('contains(partially)'));
            this.select.options.add(option('contains(completely)'));
        },
        unload: function() {
            this.constructor.base.unload.apply(this, arguments);
            arena.dom.unbind(this.select, 'change', this.selectChange.context(this));
        }
    },
    'drawing': {
        renderBackground: function() {
            this.constructor.base.renderBackground.call(this);

            for (var i=0; i<this.rects.length; i++)
                this.bitmap.fillRect(this.rects[i].x, this.rects[i].y, this.rects[i].width, this.rects[i].height, Color.white.opacity(0.5));

            if (this.rects.length  == 2) {
                switch (this.mode) {
                    case "intersect":
                        var r = this.rects[0].intersect(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height);
                        this.bitmap.drawRect(r.x, r.y, r.width, r.height, Color.red.opacity(0.8));
                        break;
                    case "union":
                        var r = this.rects[0].union(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height);
                        this.bitmap.fillRect(r.x, r.y, r.width, r.height, Color.yellow.opacity(0.15));
                        break;
                    case "split":
                        var list = this.rects[0].split(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height);
                        for (var i=0; i<list.length; i++) {
                            this.bitmap.drawRect(list[i].x, list[i].y, list[i].width, list[i].height, Color.red.opacity(0.8));
                            this.bitmap.drawText(i, list[i].x + 2, list[i].y);
                        }
                        break;
                    case "split(merge)":
                        var list = this.rects[0].split(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height, true);
                        for (var i=0; i<list.length; i++) {
                            this.bitmap.drawRect(list[i].x, list[i].y, list[i].width, list[i].height, Color.red.opacity(0.8));
                            this.bitmap.drawText(i, list[i].x + 2, list[i].y);
                        }
                        break;
                    case "intersects":
                        this.bitmap.fillRect(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height, this.rects[0].intersects(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height) ? Color.green.opacity(0.5) : Color.red.opacity(0.5));
                        break;
                    case "contains(partially)":
                        this.bitmap.fillRect(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height, this.rects[0].contains(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height) ? Color.green.opacity(0.5) : Color.red.opacity(0.5));
                        break;
                    case "contains(completely)":
                        this.bitmap.fillRect(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height, this.rects[0].contains(this.rects[1].x, this.rects[1].y, this.rects[1].width, this.rects[1].height, true) ? Color.green.opacity(0.5) : Color.red.opacity(0.5));
                        break;
                }
            }
        }
    },
    'events': {
        reset: function() {
            this.points.clear();
            this.rects.clear();
            this.constructor.base.reset.call(this);
        },
        click: function(e) {
            this.constructor.base.click.apply(this, arguments);
			if (e.target == this.select) return;
            this.points.add(this.localPoint);
            if (this.points.length == 2) {
                this.rects.add(new arena.geometry.Rectangle(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y));
				if (this.rects.length > 2) this.rects.removeFirst();
				this.points.clear();
                this.render();
            }
        },
        selectChange: function() {
            this.mode = this.select.options[this.select.selectedIndex].value;
            this.reset();
        }
    }
});