Class('arena.geometry.Point', arena.Object, ['x', 'y'], {
    Point: function (x, y) {
        // hashing not required for geometric primitives, no super call // this.constructor.Super.call(this);
        this.x = x ? x : 0;
        this.y = y ? y : 0;
    },
    'accessors': {
        set: function(x, y) { this.x = x; this.y = y; return this; },
        setX: function(x) { this.x = x; return this; },
        setY: function(y) { this.y = y; return this; }
    },
    'transforming': {
        plus: function(x ,y) { return new arena.geometry.Point(this.x + x, this.y + y); },
        plusX: function(x) { return this.plus(x, 0); },
        plusY: function(y) { return this.plus(0, y); },
        move: function(x ,y) { this.x += x; this.y += y; return this; },
        moveX: function(x) { return this.move(x, 0); },
        moveY: function(y) { return this.move(0, y); },
        rotate: function (deg, aroundThisPoint) {
            var radians = arena.geometry.radians(deg);
            var s = Math.sin(radians);
            var c = Math.cos(radians);
            if (aroundThisPoint) {
                var x = this.x;
                var y = this.y;
                x -= aroundThisPoint.x;
                y -= aroundThisPoint.y;
                var xnew = x * c - y * s;
                var ynew = x * s + y * c;
                this.x = xnew + aroundThisPoint.x;
                this.y = ynew + aroundThisPoint.y;
            } else {
                this.x = this.x * c - this.y * s;
                this.y = this.x * s + this.y * c;
            }
            return this;
        },
        scale: function (x, y) { this.x = this.x * x; this.y = this.y * (y ? y : x); return this; },
        travel: function(deg, length) { var p = arena.geometry.polarPoint(deg, length); return this.move(p.x, p.y); }
    },
    'geometric': {
        to: function(x, y, interplolatedAmount) { return new arena.geometry.Point(this.x + ((x - this.x) * interplolatedAmount), this.y + ((y - this.y) * interplolatedAmount)); },
        length: function(x, y) { return arena.geometry.length(this.x, this.y, x, y); },
        angle: function(x, y) { return arena.geometry.angle(this.x, this.y, x, y); }
    },
	'rounding': {
		ceil: function() { return this.set(Math.ceil(this.x), Math.ceil(this.y)); },
		floor: function() { return this.set(Math.floor(this.x), Math.floor(this.y)); },
		round: function() { return this.set(Math.round(this.x), Math.round(this.y)); }
	},
    'testing': {
        isNaN: function() { return (isNaN(this.x) || isNaN(this.y)); }
    },
    'conversion': {
        normalised: function() { var l = this.length(); return new arena.geometry.Point(this.x / l, this.y / l); },
        at: function(y) { this.y = y; return this; },
        to: function(point) { return new arena.geometry.Line(this.x, this.y, point.x, point.y); },
        corner: function(point) { return new arena.geometry.Rectangle(this.x, this.y, point.x - this.x, point.y - this.y); },
		size: function(w, h, originx, originy) { return arena.geometry.Rectangle.temp.set(this.x - (originx || 0), this.y - (originy || 0), w, h); },
        toString: function() { return "point(" + this.x + "," + this.y + ")"; },
        toShortString: function() { return this.x + "," + this.y; }
    },
	'static': {
		init: function() {
			this.temp = new this;
			this.prototype.temp = function() { this.constructor.temp.clone(this); return this.constructor.temp; };
		}
	}
});

Number.prototype.at = function(num) {
    return new arena.geometry.Point(parseFloat(this), num);
};