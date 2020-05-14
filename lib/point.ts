import { radians, distance, angle } from './util';

export class Point {
   x: number;
   y: number;

   constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
   }

   static polarPoint(deg: number, length: number) {
      const rad = radians(deg);
      var x = length * Math.cos(rad);
      var y = length * Math.sin(rad);
      return new Point(x, y);
   }

   clone() {
      return new Point(this.x, this.y);
   }

   isNaN() {
      return isNaN(this.x) || isNaN(this.y);
   }

   set(x: number, y: number) {
      this.x = x;
      this.y = y;
      return this;
   }

   setX(x: number) {
      this.x = x;
      return this;
   }

   setY(y: number) {
      this.y = y;
      return this;
   }

   translate(x: number, y: number) {
      this.x += x;
      this.y += y;
      return this;
   }

   translated(x: number, y: number) {
      return this.clone().translate(x, y);
   }

   rotate(deg: number, aroundThisPoint?: Point) {
      const rad = radians(deg);
		const s = Math.sin(rad);
		const c = Math.cos(rad);
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
   }

   rotated(deg: number, aroundThisPoint?: Point) {
      return this.clone().rotate(deg, aroundThisPoint);
   }

   scale(x: number, y: number) {
      this.x *= x;
      this.y *= y;
      return this;
   }

   scaled(x: number, y: number) {
      return this.clone().scale(x, y);
   }

   travel(deg: number, length: number) {
      const p = Point.polarPoint(deg, length);
      return this.translate(p.x, p.y);
   }

   traveled(deg: number, length: number) {
      return this.clone().travel(deg, length);
   }

   interpolatedTo(x: number, y: number, t: number) {
      return new Point(this.x + ((x - this.x) * t), this.y + ((y - this.y) * t));
   }

   distanceTo(x: number, y: number) {
      return distance(this.x, this.y, x, y);
   }

   angle(x: number, y: number) {
      return angle(this.x, this.y, x, y);
   }

   ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
   }

   ceiled() {
      return this.clone().ceil();
   }

   floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
   }

   floored() {
      return this.clone().floor();
   }

   round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
   }

   rounded() {
      return this.clone().round();
   }

   normalise() {
      const l = distance(0, 0, this.x, this.y)
		this.x = this.x / l;
		this.y = this.y / l;
		return this;
   }

   normalised() {
      return this.clone().normalise();
   }
}