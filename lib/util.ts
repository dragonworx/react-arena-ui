export const radians = (deg: number) => deg * (Math.PI / 180);

export const degrees = (rad: number) => rad * (180 / Math.PI);

export const length = (x1: number, y1: number, x2: number, y2: number) => {
   var x = Math.abs(x2 - x1);
   var y = Math.abs(y2 - y1);
   return Math.sqrt((y * y) + (x * x));
};

export const angle = (x1: number, y1: number, x2: number, y2: number) => {
   var deg = degrees(Math.atan2(y2 - y1, x2 - x1));
   if (deg < 0) deg = 180 + (180 - Math.abs(deg));
   return deg;
};

// export const polarPoint = (deg: number, length: number) => {
//    const rad = radians(deg);
//    var x = length * Math.cos(rad);
//    var y = length * Math.sin(rad);
//    return new Point(x, y);
// };