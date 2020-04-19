Class('arena.geometry.Line', arena.Object, ['x1', 'y1', 'x2', 'y2'], {
    Line: function (x1, y1, x2, y2) {
        // hashing not required for geometric primitives, no super call // this.constructor.Super.call(this);
        this.x1 = x1 ? x1 : 0;
        this.y1 = y1 ? y1 : 0;
        this.x2 = x2 ? x2 : 0;
        this.y2 = y2 ? y2 : 0;
    },
    'geometric': {
        at: function(value) { return new jgui.geometry.Point(this.x1 + ((this.x2 - this.x1) * value), this.y1 + ((this.y2 - this.y1) * value)); },
        angle: function() { return arena.geometry.angle(this.x1, this.y1, this.x2, this.y2); },
        length: function () { return arena.geometry.length(this.x1, this.y1, this.x2, this.y2); }
    },
    'conversion': {
        toString: function() { return "line($1,$2,$3,$4)".format(this.x1, this.y1, this.x2, this.y2); }
    },
	'static': {
		init: function() {
			this.temp = new this;
			this.prototype.temp = function() { this.constructor.temp.clone(this); return this.constructor.temp; };
		}
	}
});