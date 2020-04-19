Class('arena.geometry.Rectangle', arena.Object, ['x', 'y', 'width', 'height'], {
	Rectangle: function(x, y, width, height) {
		// hashing not required for geometric primitives, no super call // this.constructor.Super.call(this);
		this.x = x ? x : 0;
		this.y = y ? y : 0;
		this.width = width ? width : 0;
		this.height = height ? height : 0;
		this.normalise();
	},
	'accessors': {
		set: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return this;
		},
		setLocation: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
		setCorner: function(x, y) {
			this.width = x - this.x;
			this.height = y - this.y;
			this.normalise();
			return this;
		},
		setWidth: function(w) {
			this.width = w;
			return this;
		},
		setHeight: function(h) {
			this.height = h;
			return this;
		},
		setTop: function(y) {
			this.y = y;
			this.normalise();
			return this;
		},
		setLeft: function(x) {
			this.x = x;
			this.normalise();
			return this;
		},
		setRight: function(x) {
			this.width = x - this.x;
			this.normalise();
			return this;
		},
		setBottom: function(y) {
			this.height = y - this.y;
			this.normalise();
			return this;
		},
		setSize: function(w, h) {
			this.width = w;
			this.height = h;
			return this;
		},
		setCenter: function(point) {
			var w = this.width / 2;
			var h = this.height / 2;
			this.x = point.x - w;
			this.y = point.y - h;
			return this;
		},
		location: function() { return new arena.geometry.Point(this.x, this.y); },
		origin: function() { return new arena.geometry.Point(this.x, this.y); },
		corner: function() { return new arena.geometry.Point(this.x + this.width, this.y + this.height); },
		center: function() { return new arena.geometry.Point(this.x + this.width / 2, this.y + this.height / 2); },
		top: function() { return this.y; },
		left: function() { return this.x; },
		right: function() { return this.x + this.width; },
		bottom: function() { return this.y + this.height; },
		topLeft: function() { return new arena.geometry.Point(this.x, this.y); },
		topRight: function() { return new arena.geometry.Point(this.x + this.width, this.y); },
		bottomLeft: function() { return new arena.geometry.Point(this.x, this.y + this.height); },
		bottomRight: function() { return new arena.geometry.Point(this.x + this.width, this.y + this.height); },
		leftSide: function() { return new arena.geometry.Line(this.x, this.y, this.x, this.y + this.height); },
		rightSide: function() { return new arena.geometry.Line(this.x + this.width, this.y, this.x + this.width, this.y + this.height); },
		topSide: function() { return new arena.geometry.Line(this.x, this.y, this.x, this.y + this.height); },
		bottomSide: function() { return new arena.geometry.Line(this.x, this.y, this.x, this.y + this.height); },
		primaryDiagonal: function() { return this.location().to(this.corner()); },
		secondaryDiagonal: function() { return this.location().plusY(this.height()).to(this.location().plusX(this.width())); },
		centerVertical: function() { return this.topSide().at(0.5).to(this.bottomSide().at(0.5)); },
		centerHorizontal: function() { return this.leftSide().at(0.5).to(this.rightSide().at(0.5)); },
		clear: function() {
			this.x = this.y = this.width = this.height = 0;
			return this;
		}
	},
	'testing': {
		isEmpty: function() { return (this.x == 0) && (this.y == 0) && (this.width == 0) && (this.height == 0); },
		containsPoint: function(x, y) {
			if ((x < this.x) || (x > this.x + this.width)) return false;
			if ((y < this.y) || (y > this.y + this.height)) return false;
			return true;
		},
		contains: function(x, y, width, height, completely) {
			var result = this.containsPoint(x, y) && this.containsPoint(x + width, y + height);
			if ((completely != true) && (result != true)) return this.intersects(x, y, width, height);
			return result;
		},
		intersects: function(x, y, width, height) {
			return this.left() <= (x + width) &&
				x <= this.right() &&
				this.top() <= (y + height) &&
				y <= this.bottom();
		}
	},
	'transformation': {
		move: function(x, y) {
			this.x += x;
			this.y += y;
			return this;
		},
		scale: function(w, h) {
			h = h ? h : w;
			this.x = this.x * w;
			this.y = this.y * h;
			this.width = this.width * w;
			this.height = this.height * h;
			return this;
		},
		scaleSize: function(w, h) {
			h = h ? h : w;
			this.width = this.width * w;
			this.height = this.height * h;
			return this;
		},
		inflate: function(width, height) {
			var x = this.x;
			var y = this.y;
			var w = this.width;
			var h = this.height;
			this.x = x - width;
			this.y = y - height;
			this.width = this.width + (width * 2);
			this.height = this.height + (height * 2);
			return this;
		},
		deflate: function(width, height) {
			return this.inflate(width * -1, height * -1);
		},
		setSizeCenter: function(width, height) {
			this.x = this.x + (this.width / 2) - (width / 2);
			this.y = this.y + (this.height / 2) - (height / 2);
			this.width = width;
			this.height = height;
			return this;
		},
		encompass: function() {
			// accepts variable amounts of point objects through arguments array
			var xmin = 100000;
			var ymin = 100000;
			var xmax = -100000;
			var ymax = -100000;
			for (var i = 0; i < arguments.length; i++) {
				var p = arguments[i];
				xmin = Math.min(p.x, xmin);
				ymin = Math.min(p.y, ymin);
				xmax = Math.max(p.x, xmax);
				ymax = Math.max(p.y, ymax);
			}
			this.x = xmin;
			this.y = ymin;
			this.width = xmax - xmin;
			this.height = ymax - ymin;
			return this;
		},
		union: function(x, y, width, height) {
			if (this.x == x && this.y == y && this.width == width && this.height == height) return this;
			if (this.isEmpty())
				return this.temp().set(x, y, width, height);
			var l = Math.min(this.x, x);
			var t = Math.min(this.y, y);
			var r = Math.max(this.x + this.width, x + width);
			var b = Math.max(this.y + this.height, y + height);
			return this.temp().set(l, t, r - l, b - t);
		},
		intersect: function(x, y, width, height) {
			if (!this.intersects(x, y, width, height)) return this.temp();
			if (this.x == x && this.y == y && this.width == width && this.height == height) return this.temp();
			var left = Math.max(this.x, x);
			var top = Math.max(this.y, y);
			var right = Math.min(this.right(), x + width);
			var bottom = Math.min(this.bottom(), y + height);
			return this.temp().set(left, top, right - left, bottom - top);
		}
	},
	'geometric': {
		normalise: function() {
			if (this.right() < this.x) {
				var x = this.x;
				this.x = this.right();
				this.width = x - this.x;
			}
			if (this.bottom() < this.y) {
				var y = this.y;
				this.y = this.bottom();
				this.height = y - this.y;
			}
			return this;
		},
		subdivide: function(border) {
			border = border ? border : 0;
			var w = (this.width / 2) - border;
			var h = (this.height / 2) - border;
			var array = [];
			array.push(new arena.geometry.Rectangle(this.x + border, this.y + border, w, h));
			array.push(new arena.geometry.Rectangle(this.x + border + w, this.y + border, w, h));
			array.push(new arena.geometry.Rectangle(this.x + border, this.y + border + h, w, h));
			array.push(new arena.geometry.Rectangle(this.x + border + w, this.y + border + h, w, h));
			return array;
		},
		areasOutside: function(x, y, width, height) {
			if (!this.intersects(x, y, width, height)) return Array.from(this);
			var r = new arena.geometry.Rectangle(x, y, width, height);
			var yOrigin, yCorner;
			var list = [];
			var _origin = this.origin();
			var _corner = this.corner();
			var r_origin = r.origin();
			var r_corner = r.corner();

			if (r_origin.y > _origin.y) {
				yOrigin = r_origin.y;
				list.addLast(_origin.corner(_corner.x.at(yOrigin)));
			} else {
				yOrigin = _origin.y;
			}

			if (r_corner.y < _corner.y) {
				yCorner = r_corner.y;
				list.addLast(_origin.at(yCorner).corner(_corner));
			} else {
				yCorner = _corner.y;
			}

			if (r_origin.x > _origin.x)
				list.addLast(_origin.x.at(yOrigin).corner(r_origin.x.at(yCorner)))

			if (r_corner.x < _corner.x)
				list.addLast(r_corner.x.at(yOrigin).corner(_corner.x.at(yCorner)));
			return list;
		},
		split: function(x, y, width, height, merge) {
			var list1 = this.areasOutside(x, y, width, height);
			if (merge && (!this.contains(x, y, width, height, true))) {
				list1.insert(new arena.geometry.Rectangle(x, y, width, height));
				return list1;
			}
			var list2 = new arena.geometry.Rectangle(x, y, width, height).areasOutside(this.x, this.y, this.width, this.height);
			list1.addAll(list2);
			if (this.intersects(x, y, width, height)) list1.insert(this.copy().intersect(x, y, width, height));
			return list1;
		}
	},
	'conversion': {
		round: function() {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			this.width = Math.round(this.width);
			this.height = Math.round(this.height);
			return this;
		},
		floor: function() {
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			this.width = Math.floor(this.width);
			this.height = Math.floor(this.height);
			return this;
		},
		ceil: function() {
			this.x = Math.ceil(this.x);
			this.y = Math.ceil(this.y);
			this.width = Math.ceil(this.width);
			this.height = Math.ceil(this.height);
			return this;
		},
		toString: function() { return "rect($1,$2,$3,$4)".format(this.x, this.y, this.width, this.height); }
	},
	'static': {
		init: function() {
			this.temp = new this;
			this.prototype.temp = function() {
				this.constructor.temp.clone(this);
				return this.constructor.temp;
			};
		}
	}
});