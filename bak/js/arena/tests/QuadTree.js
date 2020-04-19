Class('arena.tests.QuadTree',
	arena.tests.UnitTest,
	[
		'quadtree',
		'bounds',
		'sprites',
		'select',
		'depth',
		'maxChildren',
		'pointFocus',
		'points',
		'rect',
		'rectFocus'
	], {
		QuadTree: function() {

		},
		'initialisation': {
			init: function() {
				this.constructor.base.init.call(this);

				this.depth = 4;
				this.maxChildren = 4;
				this.quadtree = new arena.geometry.QuadTree(this.localBounds, this.depth, this.maxChildren);
				this.renderQuad = true;
				this.useQuad = true;

				this.sprites = [];
				this.createSprites(1);

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

				this.select.options.add(option('render on'));
				this.select.options.add(option('render off'));
				this.select.options.add(option('quadtree pick'));
				this.select.options.add(option('brute force pick'));
				this.select.options.add(option('depth 5'));
				this.select.options.add(option('depth 4'));
				this.select.options.add(option('depth 2'));
				this.select.options.add(option('depth 1'));
				this.select.options.add(option('maxChildren 3'));
				this.select.options.add(option('maxChildren 4'));
				this.select.options.add(option('maxChildren 8'));
				this.select.options.add(option('maxChildren 16'));
				this.select.options.add(option('sprites 1'));
				this.select.options.add(option('sprites 8'));
				this.select.options.add(option('sprites 10'));
				this.select.options.add(option('sprites 20'));
				this.select.options.add(option('sprites 50'));
				this.select.options.add(option('sprites 150'));
				this.select.options.add(option('sprites 300'));

				this.pointFocus = undefined;
				this.points = [];
				this.rect = undefined;
				this.rectFocus = [];
			},
			unload: function() {
				this.constructor.base.unload.apply(this, arguments);
				arena.dom.unbind(this.select, 'change', this.selectChange.context(this));
			},
			reset: function() {
				this.constructor.base.reset.call(this);
				for (var i = 0; i < this.sprites.length; i++)
					this.sprites[i].restoreColor();
				this.points.clear();
				this.rect = undefined;
				this.start();
			},
			createSprites: function(amount) {
				this.quadtree.clear();
				this.sprites.clear();
				for (var i = 0; i < amount; i++) {
					var sprite = new arena.tests.QuadTree.Sprite(this.localBounds, this.depth, this.maxChildren);
					this.sprites.add(sprite);
					sprite.zIndex = i;
					this.quadtree.add(sprite);
				}
				console.log("created " + this.quadtree.getChildren().length + " sprites");
			}
		},
		'rendering': {
			renderBackground: function() {
				this.constructor.base.renderBackground.call(this);
				for (var i = 0; i < this.sprites.length; i++) {
					this.sprites[i].renderOn(this.bitmap);
				}
				if (this.renderQuad == true && this.useQuad == true)
					this.quadtree.renderOn(this.bitmap);
				if (this.rect)
					this.bitmap.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height, Color.yellow.opacity(0.15));
			},
			renderForeground: function() {

			}
		},
		'timer': {
			update: function() {
				if (this.isActive()) {
					for (var i = 0; i < this.sprites.length; i++)
						this.sprites[i].update();
					if (this.useQuad)
						this.quadtree.update();
				}
				var item = undefined;
				if (this.useQuad == true) {
					item = this.quadtree.itemAtPoint(this.localPoint.x, this.localPoint.y);
				} else {
					for (var i = this.sprites.length - 1; i >= 0; i--) {
						if (this.sprites[i].quadTreeBounds().containsPoint(this.localPoint.x, this.localPoint.y)) {
							item = this.sprites[i];
							break;
						}
					}
				}
				if (item) {
					if (this.pointFocus)
						this.pointFocus.restoreColor();
					item.setColor(Color.red);
					this.pointFocus = item;
				} else {
					if (this.pointFocus) {
						this.pointFocus.restoreColor();
						this.pointFocus = undefined;
					}
				}

				if (this.rect) {
					for (var i = 0; i < this.rectFocus.length; i++)
						this.rectFocus[i].restoreColor();

					var items = Array.temp;
					if (this.useQuad == true) {
						items = this.quadtree.itemsAtRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
					}   else {
						items.clear();
						for (var i = this.sprites.length - 1; i >= 0; i--) {
							if (this.sprites[i].quadTreeBounds().intersects(this.rect.x, this.rect.y, this.rect.width, this.rect.height)) {
								items.add(this.sprites[i]);
							}
						}
					}
					if (items.length > 0) {
						for (var i = 0; i < items.length; i++)
							items[i].setColor(Color.red);
						this.rectFocus = items.copy();
					}
				}
				this.render();
			}
		},
		'events': {
			mousemove: function(e) {
				arena.dom.mouseEvent(e);
				var mousepoint = arena.dom.mousepoint(e);
				this.localPoint = this.transform.globalToLocal(mousepoint.x, mousepoint.y);
				this.containsPoint = this.localBounds.containsPoint(this.localPoint.x, this.localPoint.y);
				if (!this.isActive()) this.update();
			},
			selectChange: function() {
				var option = this.select.options[this.select.selectedIndex].value;
				if (option == "render on")
					this.renderQuad = true;
				if (option == "render off")
					this.renderQuad = false;
				if (option == "quadtree pick")
					this.useQuad = true;
				if (option == "brute force pick")
					this.useQuad = false;
				if (option.contains("depth")) {
					option = parseInt(option.replace("depth ", ""));
					this.quadtree.setMaxDepth(this.depth = option)
					//this.quadtree.maxDepth = this.depth = option;
					//this.quadtree.rebuild();
				}
				if (option.contains("maxChildren")) {
					option = parseInt(option.replace("maxChildren ", ""));
					this.quadtree.setMaxChildren(this.maxChildren = option)
					//this.quadtree.maxChildren = this.maxChildren = option;
					//this.quadtree.rebuild();
				}
				if (option.contains("sprites")) {
					option = parseInt(option.replace("sprites ", ""));
					this.createSprites(option);
					this.pointFocus = undefined;
					this.rectFocus.clear();
					this.rect = undefined;
				}
				this.update();
			},
			click: function(e) {
				this.constructor.base.click.call(this, e);
				if (e.target == this.select) return;
				this.points.add(this.localPoint);
				if (this.points.length == 2) {
					this.rect = new arena.geometry.Rectangle(this.points[0].x, this.points[0].y, this.points[1].x - this.points[0].x, this.points[1].y - this.points[0].y);
					this.points.clear();
					this.update();
				}
			}
		}
	});

Class('arena.tests.QuadTree.Sprite', arena.Object, ['needsQuadTreeUpdate', 'pointer', 'bounds', 'size', 'color'], {
	Sprite: function(bounds) {
		this.needsQuadTreeUpdate = false;
		this.bounds = bounds;
		var x = (this.bounds.width / 4) + (Math.random() * (this.bounds.width / 2));
		var y = (this.bounds.height / 4) + (Math.random() * (this.bounds.height / 2));
		this.pointer = new arena.geometry.Pointer(new arena.geometry.Point(x, y), Math.random() * 360, 1 + (Math.random() * 14));
		this.size = (Math.random() * 100) + 50;
		this.size = 80;
		this.color = Color.random().opacity(1).copy();
		this.needsQuadTreeUpdate = true;
	},
	update: function() {
		this.pointer.moveForward();
		var r = this.getBounds();
		if (r.top() < this.bounds.top()) {
			this.pointer.moveBack();
			this.pointer.reflectY();
		}
		if (r.bottom() > this.bounds.bottom()) {
			this.pointer.moveBack();
			this.pointer.reflectY();
		}
		if (r.left() < this.bounds.left()) {
			this.pointer.moveBack();
			this.pointer.reflectX();
		}
		if (r.right() > this.bounds.right()) {
			this.pointer.moveBack();
			this.pointer.reflectX();
		}
		return this;
	},
	getBounds: function() { return this.pointer.point.size(this.size, this.size, this.size / 2, this.size / 2); },
	renderOn: function(bitmap) {
		var r = this.getBounds();
		bitmap.fillRect(r.x, r.y, r.width, r.height, this.color);
		//bitmap.drawText(this.zIndex, r.x, r.y, Color.white);
		return this;
	},
	quadTreeBounds: function() {
		return this.getBounds();
	},
	setColor: function(c) {
		if (!this.oldColor)
			this.oldColor = this.color;
		this.color = c;
	},
	restoreColor: function() {
		if (this.oldColor) {
			this.color = this.oldColor;
			this.oldColor = undefined;
		}
	}
});