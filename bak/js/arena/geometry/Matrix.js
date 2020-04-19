// [a, c ,tx]
// [b, d, ty]
// [alpha, 0, 1]
// identity: (a, b, c, d, tx, ty, alpha)
// identity: (1, 0, 0, 1, 0, 0, 1) (with alpha 1)
// identity: (1, 0, 0, 1, 0, 0) (without alpha)

Class('arena.geometry.Matrix', arena.Object, ['a', 'b', 'c', 'd', 'tx', 'ty', 'alpha'], {
    Matrix:function (a, b, c, d, tx, ty, alpha) {
        // hashing not required for geometric primitives, no super call // this.constructor.Super.call(this);
        this.a = a ? a : 1;
        this.b = b ? b : 0;
        this.c = c ? c : 0;
        this.d = d ? d : 1;
        this.tx = tx ? tx : 0;
        this.ty = ty ? ty : 0;
        this.alpha = alpha ? alpha : 1;
    },
    'operation': {
        reset: function() {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.tx = 0;
            this.ty = 0;
            this.alpha = 1;
            return this;
        },
        'concat': function(m, inverted) {
            if (inverted) {
                var a = this.a * m.a + this.c * m.b;
                var b = this.b * m.a + this.d * m.b;
                var c = this.a * m.c + this.c * m.d;
                var d = this.b * m.c + this.d * m.d;
                var tx = this.a * m.tx + this.c * m.ty + this.tx;
                var ty = this.b * m.tx + this.d * m.ty + this.ty;
                var alpha = this.alpha * m.alpha;
                this.a = a;
                this.b = b;
                this.c = c;
                this.d = d;
                this.tx = tx;
                this.ty = ty;
                this.alpha = alpha;
                return this;
            } else {
                var a = this.a;
                var b = this.b;
                var c = this.c;
                var d = this.d;
                var tx = this.tx;
                var ty = this.ty;
                var alpha = this.alpha;
                this.a = m.a * a + m.c * b;
                this.b = m.b * a + m.d * b;
                this.c = m.a * c + m.c * d;
                this.d = m.b * c + m.d * d;
                this.tx = m.a * tx + m.c * ty + m.tx;
                this.ty = m.b * tx + m.d * ty + m.ty;
                this.alpha = m.alpha * alpha;
                return this;
            }
        },
        determinant: function() {
            return this.a * this.d - this.b * this.c;
        },
        inverse: function() {
            return this.copy().invert();
        },
        invert: function() {
            var determinant = this.determinant();
            if (determinant == 0) return null;
            var det = 1 / determinant;
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var x = this.tx;
            var y = this.ty;
            this.a = d * det;
            this.b = -b * det;
            this.c = -c * det;
            this.d = a * det;
            this.tx = (c * y - x * d ) * det;
            this.ty = (x * b - a * y ) * det;
            return this;
        }
    },
    'transformation': {
        translate: function(x, y) { return this.concat(arena.geometry.Matrix.translate(x, y)); },
        rotate: function(deg) { return this.concat(arena.geometry.Matrix.rotate(deg)); },
        rotateAroundPoint: function(deg, x, y) { return this.concat(arena.geometry.Matrix.rotateAroundPoint(deg, x, y)); },
        scale: function(x, y) { return this.concat(arena.geometry.Matrix.scale(x, y)); },
        skew: function(x, y) { return this.concat(arena.geometry.Matrix.skew(x, y)); },
        squeeze: function(t) { return this.concat(arena.geometry.Matrix.squeeze(t)); }
    },
    'coordinate mapping': {
        transformPoint: function(x, y) { return new arena.geometry.Point(this.a * x + this.c * y + this.tx, this.b * x + this.d * y + this.ty); },
        transformVector: function(x, y) { return new arena.geometry.Point(this.a * x + this.c * y, this.b * x + this.d * y ); },
        localToGlobal: function(x, y) { return this.transformPoint(x, y); },
        globalToLocal: function(x, y) { return this.inverse().transformPoint(x, y); }
    },
    'conversion': {
        toString: function() { return "|$1, $2, $3|\n|$4, $5, $6|\n|0, 0, $7|".format(this.a, this.c, this.tx, this.b, this.d, this.ty, this.alpha); },
		toArray: function() { return [this.a, this.b, this.c, this.d, this.tx, this.ty]; }
    },
    'static matrix creation': {
        identity: function() { return new new arena.geometry.Matrix(1, 0, 0, 1, 0, 0); },
        translate: function(x, y) { return new arena.geometry.Matrix(1, 0, 0, 1, x, y); },
        rotate: function(deg) {
            var r = arena.geometry.radians(deg);
            if (r == 0) return new arena.geometry.Matrix();
            var sin = Math.sin(r);
            var cos = Math.cos(r);
            return new arena.geometry.Matrix(cos, sin, -sin, cos, 0, 0);
        },
        rotateAboutPoint: function(deg, x, y) {
            var r = arena.geometry.radians(deg);
            if (r == 0) return new arena.geometry.Matrix();
            var sin = Math.sin(r);
            var cos = Math.cos(r);
            return new arena.geometry.Matrix(cos, sin, -sin, cos, -cos * x + sin * y + x, -sin * x - cos * y + y);
        },
        scale: function(x, y) { return new arena.geometry.Matrix(x, 0, 0, y, 0, 0); },
        skew: function(x, y) { return new arena.geometry.Matrix(1, y, x, 1, 0, 0); },
        squeeze: function(t) { return new arena.geometry.Matrix(t, 0, 0, 1/t, 0, 0); }
    },
    'static: coordinate mapping': {
        localSpaceTransform: function(origin, heading) {
            var h = heading.normalised();
            return new arena.geometry.Matrix(h.x, h.y, -h.y, h.x, - h.x * origin.x + h.y * origin.y, - h.y * origin.x - h.x * origin.y);
        },
        localSpaceTransformRaw: function(origin, heading) {
            var h = heading.normalised();
            return [h.x, h.y, -h.y, h.x, - h.x * origin.x + h.y * origin.y, - h.y * origin.x - h.x * origin.y];
        }
    },
	'static': {
		init: function() {
			this.temp = new this;
			this.prototype.temp = function() { this.constructor.temp.clone(this); return this.constructor.temp; };
		}
	}
});