Class('arena.geometry.QuadNode', arena.Object,
	[
		'tree',
		'depth',
		'parent',
		'children',
		'bounds',
		'enabled'
	], {
		QuadNode: function(tree, parentNode, bounds, depth) {
			this.constructor.base.Object.call(this);
			this.tree = tree;
			this.parentNode = parentNode;
			this.nodes = [];
			this.children = [];
			this.bounds = bounds;
			this.depth = depth;
			this.enabled = this.depth == 0;

			this.tree.nodes.add(this);
		},
		build: function() {
			if (this.depth + 1 == this.tree.maxDepth)
				return;

			var rects = this.bounds.subdivide();
			for (var i = 0; i < rects.length; i++) {
				var node = new arena.geometry.QuadNode(this.tree, this, rects[i], this.depth + 1)
				this.nodes.add(node);
				node.build();
			}
		},
		renderOn: function(bitmap) {
			if (this.children.length > 0) {
				var c = Color.named[Color.named.length - 2 - (this.tree.renderIndex % 140)];
				var r = this.bounds.temp().deflate(this.depth / 4, this.depth / 4);
				bitmap.drawRect(r.x, r.y, r.width, r.height, c);

				var childMax = Math.max(this.children.length, this.tree.maxChildren);
				r = this.bounds.temp().setSizeCenter(this.bounds.width * 0.2, this.bounds.height * 0.05);
				var stepx = r.width / childMax;
				//bitmap.fillRect(r.x, r.y, r.width, r.height, c.darkened(0.8));
				for (var i = 0; i < this.children.length; i++) {
					var x = r.x + (stepx * i);
					bitmap.fillRect(x, r.y, stepx, r.height, this.children[i].color)
				}
				//bitmap.fillRect(r.x, r.y, stepx, r.height, c.darkened(0.5));
				bitmap.drawGrid(r.x, r.y, r.width, r.height, c, childMax);

				//bitmap.font.size = 12;
				//bitmap.drawText(this.depth + "." + this.children.length, r.x - 12, r.y - 12);
			}

			this.tree.renderIndex = this.tree.renderIndex + 1;

			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].renderOn(bitmap);
		},
		intersects: function(item) {
			var r = item.quadTreeBounds();
			return this.bounds.intersects(r.x, r.y, r.width, r.height);
		},
		isNodesEmpty: function() {
			for (var i = 0; i < this.nodes.length; i++)
				if (this.nodes[i].enabled)
					return false;
			return true;
		},
		add: function(item) {
			if (!this.isNodesEmpty()) {
				for (var i = 0; i < this.nodes.length; i++)
					if (this.nodes[i].intersects(item) && this.nodes[i].enabled)
						this.nodes[i].add(item);
			} else {
				this.children.add(item);
				if ((this.children.length > this.tree.maxChildren) && (this.depth + 1 < this.tree.maxDepth)) {
					for (var i = 0; i < this.nodes.length; i++) this.nodes[i].enabled = true;
					for (var i = 0; i < this.children.length; i++) this.add(this.children[i]);
					this.children.clear();
				} else {
					this.sortChildren();
				}
			}
		},
		update: function() {
			for (var i = 0; i < this.children.length; i++) {
				var child = this.children[i];
				if (child.needsQuadTreeUpdate) {
					this.children[i] = undefined;
					this.tree.results.add(child);
				}
			}
			this.children.compact();

			this.enabled = this.children.length > 0 && this.depth > 0;

			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].update();
		},
		getChildren: function() {
			for (var i = 0; i < this.children.length; i++)
				this.tree.results.add(this.children[i]);
			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].getChildren();

		},
		clear: function() {
			this.children.clear();
			this.enabled = this.depth == 0;
			for (var i = 0; i < this.nodes.length; i++)
				this.nodes[i].clear();
		},
		buildClear: function() {
			this.children.clear();
			this.enabled = this.depth == 0;
			this.nodes.clear();
		},
		sortChildren: function() {
			this.children.sort(function(a, b) {
				return a.zIndex - b.zIndex;
			});
		},
		itemAtPoint: function(x, y, testLocally) {
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
				if (child.quadTreeBounds().containsPoint(x, y)) {
					if (testLocally) {
						var localPoint = child.globalToLocal(x, y);
						if (child.localbounds.containsPoint(localPoint.x, localPoint.y))
							return child;
					} else {
						return child;
					}
				}
			}

			for (var i = 0; i < this.nodes.length; i++)
				if (this.nodes[i].bounds.containsPoint(x, y))
					return this.nodes[i].itemAtPoint(x, y, testLocally);

			/*if (!this.isNodesEmpty()) {
			 for (var i = 0; i < this.nodes.length; i++)
			 if (this.nodes[i].bounds.containsPoint(x, y))
			 return this.nodes[i].itemAtPoint(x, y, testLocally);
			 } else {
			 for (var i = 0; i < this.children.length; i++) {
			 var child = this.children[i];
			 if (child.quadTreeBounds().containsPoint(x, y)) {
			 if (testLocally) {
			 var localPoint = child.globalToLocal(x, y);
			 if (child.localbounds.containsPoint(localPoint.x, localPoint.y))
			 return child;
			 } else {
			 return child;
			 }
			 }
			 }
			 } */
		},
		itemsAtPoint: function(x, y) {
			if (!this.isNodesEmpty()) {
				for (var i = 0; i < this.nodes.length; i++)
					if (this.nodes[i].bounds.containsPoint(x, y))
						return this.nodes[i].itemsAtPoint(x, y);
			}
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
				if (child.quadTreeBounds().containsPoint(x, y))
					this.tree.results.add(child);
			}
		},
		itemsAtRect: function(x, y, w, h) {
			if (!this.isNodesEmpty()) {
				for (var i = 0; i < this.nodes.length; i++)
					if (this.nodes[i].bounds.intersects(x, y, w, h))
						this.nodes[i].itemsAtRect(x, y, w, h);
			}
			for (var i = this.children.length - 1; i >= 0; i--) {
				var child = this.children[i];
				if (child.quadTreeBounds().intersects(x, y, w, h)) {
					this.tree.results.add(child);
				}
			}
		}
	});