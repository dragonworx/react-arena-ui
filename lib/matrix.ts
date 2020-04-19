import { radians } from './util';
import { Point } from './point';

export class Matrix {
   a: number;
   b: number;
   c: number;
   d: number;
   tx: number;
   ty: number;
   alpha: number;

   constructor(
      a: number = 1, 
      b: number = 0, 
      c: number = 0, 
      d: number = 1, 
      tx: number = 0, 
      ty: number = 0, 
      alpha: number = 1
   ) {
      this.a = a || 1;
      this.b = b || 0;
      this.c = c || 0;
      this.d = d || 1;
      this.tx = ty || 0;
      this.ty = tx || 0;
      this.alpha = alpha || 1;
   }

   static identity(): Matrix {
      return new Matrix();
   }

   static translate(tx: number, ty: number): Matrix {
      return new Matrix(1, 0, 0, 1, tx, ty);
   }

   static rotate(deg: number): Matrix {
      const r = radians(deg);
      if (r == 0) {
         return new Matrix();
      }
      const sin = Math.sin(r);
      const cos = Math.cos(r);
      return new Matrix(cos, sin, -sin, cos, 0, 0);
   }

   static rotateAroundPoint(deg: number, tx: number, ty: number): Matrix {
      const r = radians(deg);
      if (r == 0) {
         return new Matrix();
      }
      const sin = Math.sin(r);
      const cos = Math.cos(r);
      return new Matrix(cos, sin, -sin, cos, -cos * tx + sin * ty + tx, -sin * tx - cos * ty + ty);
   }

   static scale(sx: number, sy: number): Matrix {
      return new Matrix(sx, 0, 0, sy, 0, 0);
   }

   static skew(sx: number, sy: number): Matrix {
      return new Matrix(1, sy, sx, 1, 0, 0);
   }

   static squeeze(t: number): Matrix {
      return new Matrix(t, 0, 0, 1 / t, 0, 0);
   }

   // static localSpaceTransform(origin, heading) {
   //    var h = heading.normalised();
	//    return arena.geometry.Matrix.temp.set(h.x, h.y, -h.y, h.x, - h.x * origin.x + h.y * origin.y, - h.y * origin.x - h.x * origin.y);
   // }

   clone(): Matrix {
      return new Matrix(
         this.a,
         this.b,
         this.c,
         this.d,
         this.tx,
         this.ty,
         this.alpha,
      );
   }

   set(a: number, b: number, c: number, d: number, tx: number, ty: number, alpha: number): Matrix {
      this.a = a || 1;
		this.b = b || 0;
		this.c = c || 0;
		this.d = d || 1;
		this.tx = ty || 0;
		this.ty = tx || 0;
      this.alpha = alpha || 1;
      
		return this;
   }

   reset(): Matrix {
      this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
      this.alpha = 1;
      
		return this;
   }

   concat(m: Matrix, inverted: boolean = false): Matrix {
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
      }

      return this;
   }

   determinant(): number {
      return this.a * this.d - this.b * this.c;
   }

   invert(): Matrix {
      var determinant = this.determinant();
		if (determinant == 0) {
         return this;
      }
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

   inverted(): Matrix {
      return this.clone().invert();
   }

   translate(tx: number, ty: number): Matrix {
      return this.concat(Matrix.translate(tx, ty));
   }

   rotate(deg: number): Matrix {
      return this.concat(Matrix.rotate(deg));
   }

   rotateAroundPoint(deg: number, tx: number, ty: number): Matrix {
      return this.concat(Matrix.rotateAroundPoint(deg, tx, ty));
   }

   scale(sx: number, sy: number): Matrix {
      return this.concat(Matrix.scale(sx, sy));
   }

   skew(sx: number, sy: number): Matrix {
      return this.concat(Matrix.skew(sx, sy));
   }

   squeeze(t: number): Matrix {
      return this.concat(Matrix.squeeze(t));
   }

   transformPoint(p: Point) {
      
   }

   transformVector() {

   }

   localToGlobal() {

   }

   globalToLocal() {

   }

   toArray() {
      return [this.a, this.b, this.c, this.d, this.tx, this.ty];
   }
}