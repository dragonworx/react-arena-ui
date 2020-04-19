Class('arena.geometry.Transform', arena.Object, ['_dirty', '_matrix', 'origin', 'translation', 'rotation', 'scale', 'skew', 'squeeze', 'tilt', 'alpha', 'childRequiresTransform'], {
	Transform: function() {
		this.constructor.base.Object.call(this);
		this._matrix = new arena.geometry.Matrix();
		this._dirty = false;
		this.origin = new arena.geometry.Point();
		this.translation = new arena.geometry.Point();
		this.rotation = 0;
		this.scale = new arena.geometry.Point(1, 1);
		this.skew = new arena.geometry.Point(0, 0);
		this.tilt = new arena.geometry.Point(1, 1);
		this.squeeze = 1;
		this.alpha = 1;
		this.childRequiresTransform = true;
	},
	'matrix': {
		matrix: function() {
			if (this._dirty == true) this.build();
			return this._matrix;
		},
		reset: function() {
			this._matrix.reset();
			this.origin.x = 0;
			this.origin.y = 0;
			this.translation.x = 0;
			this.translation.y = 0;
			this.rotation = 0;
			this.scale.x = 1;
			this.scale.y = 1;
			this.skew.x = 0;
			this.skew.y = 0;
			this.tilt.x = 1;
			this.tilt.y = 1;
			this.squeeze = 1;
			this.alpha = 1;
			this._dirty = false;
			this.childRequiresTransform = true;
			return this;
		},
		build: function() {
			this._matrix.reset();
			if ((this.origin.x != 0) || (this.origin.y != 0))
				this._matrix.translate(this.origin.x * -1, this.origin.y * -1);

			if (this.squeeze != 1)
				this._matrix.squeeze(this.squeeze);

			if ((this.skew.x != 0) || (this.skew.y != 0))
				this._matrix.skew(this.skew.x, this.skew.y);

			if ((this.scale.x != 0) || (this.scale.y != 0))
				this._matrix.scale(this.scale.x == 0 ? 0.001 : this.scale.x, this.scale.y == 0 ? 0.001 : this.scale.y);

			if (this.rotation % 360 != 0)
				this._matrix.rotate(this.rotation);

			if ((this.tilt.x != 1) || (this.tilt.y != 1))
				this._matrix.scale(this.tilt.y == 0 ? 0.001 : this.tilt.y, this.tilt.x == 0 ? 0.001 : this.tilt.x);

			if ((this.translation.x != 0) || (this.translation.y != 0))
				this._matrix.translate(this.translation.x, this.translation.y);

			this._matrix.alpha = this.alpha;
			this._dirty = false;
			return this._matrix;
		}
	},
	'testing': {
		update: function() { this._dirty = true; },
		needsUpdate: function() { return this._dirty; }
	},
	'coordinate mapping': {
		localToGlobal: function(x, y) { return this.matrix().localToGlobal(x, y); },
		globalToLocal: function(x, y) { return this.matrix().globalToLocal(x, y); }
	},
	'conversion': {
		toString: function() {
			return "o($1@$2).t($3@$4).r'$5'.s{$6:$7}.k{$8:$9}.~{$10:$11}.q{$12}.a'$13'".format(
				this.origin.x.decimalPlaces(1), //1
				this.origin.y.decimalPlaces(1),
				this.translation.x.decimalPlaces(1), //3
				this.translation.y.decimalPlaces(1),
				this.rotation.decimalPlaces(1), //5
				this.scale.x.decimalPlaces(1), //6
				this.scale.y.decimalPlaces(1),
				this.skew.x.decimalPlaces(1), //8
				this.skew.y.decimalPlaces(1),
				this.tilt.x.decimalPlaces(1), //10
				this.tilt.y.decimalPlaces(1), //11
				this.squeeze.decimalPlaces(1), //12
				this.alpha.decimalPlaces(1));//13
		}
	}
});