import { Point } from './point';
import { Matrix } from './matrix';

export class Transform {
   width: number = 0;
   height: number = 0;
   origin: Point = new Point();
   translation: Point = new Point();
   rotation: number = 0;
   scale: Point = new Point(1, 1);
   skew: Point = new Point(0, 0);
   tilt: Point = new Point(1, 1);
   squeeze: number = 1;
   alpha: number = 1;
   matrix: DOMMatrix = new DOMMatrix();

   reset() {
      this.width = this.height = 0;
      this.origin.set(0, 0);
      this.translation.set(0, 0);
      this.rotation = 0;
      this.scale.set(1, 1);
      this.skew.set(1, 1);
      this.tilt.set(1, 1);
      this.squeeze = 1;
      this.alpha = 1;
   }

   build(premultiply?: DOMMatrix) {
      if (premultiply)
			this.matrix.multiplySelf(premultiply);
		else
			this.matrix = new DOMMatrix();

         this.matrix.translateSelf((this.width * this.origin.x) * -1, (this.height * this.origin.y) * -1);

		// if (this.squeeze != 1)
		// 	this.matrix.squeeze(this.squeeze);

      if (this.skew.x != 0) {
         this.matrix.skewXSelf(this.skew.x);
      }

      if (this.skew.y != 0) {
         this.matrix.skewYSelf(this.skew.y);
      }

		if (this.scale.x != 0 || this.scale.y != 0)
			this.matrix.scaleSelf(this.scale.x == 0 ? 0.001 : this.scale.x, this.scale.y == 0 ? 0.001 : this.scale.y);

		if (this.rotation % 360 != 0)
			this.matrix.rotateSelf(this.rotation);

		if (this.tilt.x != 1 || this.tilt.y != 1)
			this.matrix.scaleSelf(this.tilt.y == 0 ? 0.001 : this.tilt.y, this.tilt.x == 0 ? 0.001 : this.tilt.x);

		if ((this.translation.x != 0) || (this.translation.y != 0))
			this.matrix.translateSelf(this.translation.x, this.translation.y);

		return this.matrix;
   }

   localToGlobal(p: Point) {
      const lp = this.matrix.transformPoint(p);
      return new Point(lp.x, lp.y);
   }

   globalToLocal(p: Point) {
      const gp = this.matrix.inverse().transformPoint(p);
      return new Point(gp.x, gp.y);
   }

   toCssMatrix() {
      const { a, b, c, d, e, f } = this.matrix;
      return `matrix(${a},${b},${c},${d},${e},${f})`;
   }
}