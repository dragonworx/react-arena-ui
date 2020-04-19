Class('arena.geometry.QuadTree', arena.Object,
	[
		'root',
		'maxDepth',
		'maxChildren',
		'results'
	], {
		QuadTree: function(bounds, maxDepth, maxChildren) {
			this.constructor.base.Object.call(this);
			this.maxDepth = maxDepth ? maxDepth : 4;
			this.maxChildren = maxChildren ? maxChildren : 4;
			this.results = [];
			this.nodes = []; // used by sub nodes to all all nodes to tree

			this.root = new arena.geometry.QuadNode(this, null, bounds, 0);
			this.root.build();

		},
		setBounds: function(bounds) {
			this.root.setBounds(bounds);
		},
		renderOn: function(bitmap) {
			this.renderIndex = 0;
			this.root.renderOn(bitmap);
		},
		add: function(item) {
			if (this.root.intersects(item))
				this.root.add(item);
		},
		update: function() {
			this.root.update();
			this.results.removeDuplicates();
			for (var i=0; i<this.results.length; i++)
				this.add(this.results[i]);
			this.results.clear();
		},
		rebuild: function() {
			this.getChildren();
			this.nodes.clear();
			this.root.buildClear();
			this.root.build();
			for (var i=0; i<this.results.length; i++)
				this.add(this.results[i]);
			this.results.clear();
		},
		clear: function() {
			this.root.clear();
		},
		getChildren: function() {
			this.root.getChildren();
			this.results.removeDuplicates();
			return this.results;
		},
		itemAtPoint: function(x, y, testLocally) {
			return this.root.itemAtPoint(x, y, testLocally);
		},
		itemsAtPoint: function(x, y) {
			this.results.clear();
			this.root.itemsAtPoint(x, y);
			this.results.removeDuplicates();
			return this.results;
		},
		itemsAtRect: function(x, y, w, h) {
			this.results.clear();
			this.root.itemsAtRect(x, y, w, h);
			this.results.removeDuplicates();
			return this.results;
		},
		setMaxDepth: function(depth) {
			this.maxDepth = depth;
			this.rebuild();
		},
		setMaxChildren: function(children) {
			this.maxChildren = children;
			this.rebuild();
		},
		setMaxDepthAndChildren: function(depth, children) {
			this.maxDepth = depth;
			this.maxChildren = children;
			this.rebuild();
		}
	});