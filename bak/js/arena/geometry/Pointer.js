Class('arena.geometry.Pointer', arena.Object, ['point', 'angle', 'radius', 'lastX', 'lastY'], {
	Pointer: function(point, angle, radius) {
		this.point = point || new arena.geometry.Point();
		this.lastX = this.point.x;
		this.lastY = this.point.y;
		this.angle = angle || 0;
		this.radius = radius || 1;
	},
	moveForward: function() {
		this.lastX = this.point.x;
		this.lastY = this.point.y;
		var p = arena.geometry.polarPoint(this.angle, this.radius);
		this.point.move(p.x, p.y);
		return this;
	},
	moveBack: function() {
		this.point.set(this.lastX, this.lastY);
		return this;
	},
	reflectX: function() {
		if (this.point.y - this.lastY > 0)
			this.angle = this.reflectVerticalAngle(); // moving positive y axis
		else
			this.angle = this.reflectVerticalAngle(); // moving negative y axis
		return this;
	},
	reflectY: function() {
		if (this.point.x - this.lastX > 0)
			this.angle = this.reflectHorizontalAngle(); // moving positive x axis
		else
			this.angle = this.reflectHorizontalAngle(); // moving negative x axis
		return this;
	},
	reflectHorizontalAngle: function() {
		var deg = this.angle % 360;
		if (deg >= 0 && deg <= 90) return 360 -deg;
		if (deg >= 90 && deg <= 180) return 180 + (180 - deg);
		if (deg >= 180 && deg <= 270) return 180 - (deg - 180);
		if (deg >= 270 && deg <= 360) return 360 - deg;
		return deg;
	},
	reflectVerticalAngle: function() {
		var deg = this.angle % 360;
		if (deg >= 0 && deg <= 90) return 180 - deg;
		if (deg >= 90 && deg <= 180) return (180 - deg);
		if (deg >= 180 && deg <= 270) return 360 - (deg - 180);
		if (deg >= 270 && deg <= 360) return 270 - (deg - 270);
		return deg;
	}
});