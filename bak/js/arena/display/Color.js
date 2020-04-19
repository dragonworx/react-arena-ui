Class('arena.display.Color', arena.Object, ['red', 'green', 'blue', 'alpha'], {
    Color: function (red, green, blue, alpha) {
        //this.constructor.base.Object.call(this); // no need for super constructor unless wanting hash
        this.red = red || 0;
        this.green = green || 0;
        this.blue = blue || 0;
        this.alpha = alpha == undefined ? 1 : alpha;
        this.clamp();
    },
    'testing': {
        average: function() { return 0.2126 * this.red + 0.7152 * this.green + 0.0722 * this.blue; },
        name: function() {
            for (var i=0; i<Color.names.length; i++) {
                var color = Color[Color.names[i]];
                if (this.equals(color))
                    return Color.names[i];
            }
            return '';
        },
        clamp: function() {
            this.red = Math.round(Math.max(0, Math.min(255, this.red)));
            this.green = Math.round(Math.max(0, Math.min(255, this.green)));
            this.blue = Math.round(Math.max(0, Math.min(255, this.blue)));
            this.alpha = Math.max(0, Math.min(1, this.alpha));
            return this;
        }
    },
    'manipulation': {
        setAlpha: function(alpha) { this.alpha = Math.max(0, Math.min(1, alpha)); return this; },
        setRgb: function(red, green, blue) { this.red = red; this.green = green; this.blue = blue; return this.clamp(); },
        blend: function(color, amount) {
            var a = color.alpha * amount;
            var r = color.red / 255;
            var g = color.green / 255;
            var b = color.blue / 255;
            var A = this.alpha;
            var R = this.red / 255;
            var G = this.green / 255;
            var B = this.blue / 255;
            this.alpha = 1 - (1 - a) * (1 - A);
            this.red = (r * a / this.alpha + R * A * (1 - a) / this.alpha) * 255;
            this.green = (g * a / this.alpha + G * A * (1 - a) / this.alpha) * 255;
            this.blue = (b * a / this.alpha + B * A * (1 - a) / this.alpha) * 255;
            return this.clamp();
        },
        lighten: function(amount) { return this.blend(Color.white, amount); },
        darken: function(amount) { return this.blend(Color.black, amount); }
    },
    'modified': {
        blended: function(color, amount) { return this.temp().blend(color, amount); },
        lightened: function(amount) { return this.temp().lighten(amount); },
        darkened: function(amount) { return this.temp().darken(amount); },
        opacity: function(alpha) { return this.temp().setAlpha(alpha); }
    },
    'conversion': {
        rgba: function() { return "rgba(%1,%2,%3,%4)".args(this.red, this.green, this.blue, this.alpha); },
        rgb: function() { return "rgb(%1,%2,%3)".args(this.red, this.green, this.blue); },
        hex: function() { return '#' + arena.display.Color.componentToHex(this.red) + arena.display.Color.componentToHex(this.green) + arena.display.Color.componentToHex(this.blue); },
        overself: function() {
            var avg = this.average();
            if (avg < 100) return this.copy().lighten(0.5);
            else return this.copy().darken(0.5);
        },
        renderOn: function(bitmap) { return this.toString(); },
        toString: function() { return this.alpha == 1.0 ? this.hex() : this.rgba(); }
    },
    'static named colors': {
        named: function() {
            return {
                aliceblue:  [240,248,255],
                antiquewhite: [250,235,215],
                aqua: [0,255,255],
                aquamarine: [127,255,212],
                azure:  [240,255,255],
                beige:  [245,245,220],
                bisque: [255,228,196],
                black:  [0,0,0],
                blanchedalmond: [255,235,205],
                blue: [0,0,255],
                blueviolet: [138,43,226],
                brown:  [165,42,42],
                burlywood:  [222,184,135],
                cadetblue:  [95,158,160],
                chartreuse: [127,255,0],
                chocolate:  [210,105,30],
                coral:  [255,127,80],
                cornflowerblue: [100,149,237],
                cornsilk: [255,248,220],
                crimson:  [220,20,60],
                cyan: [0,255,255],
                darkblue: [0,0,139],
                darkcyan: [0,139,139],
                darkgoldenrod:  [184,134,11],
                darkgray: [50,50,50],
                darkgreen:  [0,100,0],
                darkgrey: [169,169,169],
                darkkhaki:  [189,183,107],
                darkmagenta:  [139,0,139],
                darkolivegreen: [85,107,47],
                darkorange: [255,140,0],
                darkorchid: [153,50,204],
                darkred:  [139,0,0],
                darksalmon: [233,150,122],
                darkseagreen: [143,188,143],
                darkslateblue:  [72,61,139],
                darkslategray:  [47,79,79],
                darkslategrey:  [47,79,79],
                darkturquoise:  [0,206,209],
                darkviolet: [148,0,211],
                deeppink: [255,20,147],
                deepskyblue:  [0,191,255],
                dimgray:  [105,105,105],
                dimgrey:  [105,105,105],
                dodgerblue: [30,144,255],
                firebrick:  [178,34,34],
                floralwhite:  [255,250,240],
                forestgreen:  [34,139,34],
                fuchsia:  [255,0,255],
                gainsboro:  [220,220,220],
                ghostwhite: [248,248,255],
                gold: [255,215,0],
                goldenrod:  [218,165,32],
                gray: [128,128,128],
                green:  [0,128,0],
                greenyellow:  [173,255,47],
                grey: [128,128,128],
                honeydew: [240,255,240],
                hotpink:  [255,105,180],
                indianred:  [205,92,92],
                indigo: [75,0,130],
                ivory:  [255,255,240],
                khaki:  [240,230,140],
                lavender: [230,230,250],
                lavenderblush:  [255,240,245],
                lawngreen:  [124,252,0],
                lemonchiffon: [255,250,205],
                lightblue:  [173,216,230],
                lightcoral: [240,128,128],
                lightcyan:  [224,255,255],
                lightgoldenrodyellow: [250,250,210],
                lightgray:  [211,211,211],
                lightgreen: [144,238,144],
                lightgrey:  [211,211,211],
                lightpink:  [255,182,193],
                lightsalmon:  [255,160,122],
                lightseagreen:  [32,178,170],
                lightskyblue: [135,206,250],
                lightslategray: [119,136,153],
                lightslategrey: [119,136,153],
                lightsteelblue: [176,196,222],
                lightyellow:  [255,255,224],
                lime: [0,255,0],
                limegreen:  [50,205,50],
                linen:  [250,240,230],
                magenta:  [255,0,255],
                maroon: [128,0,0],
                mediumaquamarine: [102,205,170],
                mediumblue: [0,0,205],
                mediumorchid: [186,85,211],
                mediumpurple: [147,112,219],
                mediumseagreen: [60,179,113],
                mediumslateblue:  [123,104,238],
                mediumspringgreen:  [0,250,154],
                mediumturquoise:  [72,209,204],
                mediumvioletred:  [199,21,133],
                midnightblue: [25,25,112],
                mintcream:  [245,255,250],
                mistyrose:  [255,228,225],
                moccasin: [255,228,181],
                navajowhite:  [255,222,173],
                navy: [0,0,128],
                oldlace:  [253,245,230],
                olive:  [128,128,0],
                olivedrab:  [107,142,35],
                orange: [255,165,0],
                orangered:  [255,69,0],
                orchid: [218,112,214],
                palegoldenrod:  [238,232,170],
                palegreen:  [152,251,152],
                paleturquoise:  [175,238,238],
                palevioletred:  [219,112,147],
                papayawhip: [255,239,213],
                peachpuff:  [255,218,185],
                peru: [205,133,63],
                pink: [255,192,203],
                plum: [221,160,221],
                powderblue: [176,224,230],
                purple: [128,0,128],
                red:  [255,0,0],
                rosybrown:  [188,143,143],
                royalblue:  [65,105,225],
                saddlebrown:  [139,69,19],
                salmon: [250,128,114],
                sandybrown: [244,164,96],
                seagreen: [46,139,87],
                seashell: [255,245,238],
                sienna: [160,82,45],
                silver: [192,192,192],
                skyblue:  [135,206,235],
                slateblue:  [106,90,205],
                slategray:  [112,128,144],
                slategrey:  [112,128,144],
                snow: [255,250,250],
                springgreen:  [0,255,127],
                steelblue:  [70,130,180],
                tan:  [210,180,140],
                teal: [0,128,128],
                thistle:  [216,191,216],
                tomato: [255,99,71],
                turquoise:  [64,224,208],
                violet: [238,130,238],
                wheat:  [245,222,179],
                white:  [255,255,255],
                whitesmoke: [245,245,245],
                yellow: [255,255,0],
                yellowgreen:  [154,205,50],
                transparent: [0, 0, 0]
            }
        }
    },
    'static methods': {
        componentToHex: function(component) {
            if (component == null) return "00";
            component = parseInt(component);
            if (component == 0 || isNaN(component)) return "00";
            return "0123456789abcdef".charAt((component - component % 16) / 16) + "0123456789abcdef".charAt(component % 16);
        },
        init: function() {
			this.temp = new this;
			this.prototype.temp = function() { this.constructor.temp.clone(this); return this.constructor.temp; };

            // create global function to create color (always returns a new instance of named colors)
            window.Color = function(color) {
                switch (typeof color) {
                    case "string":
                        if (color.charAt(0) == '#') {
                            color = color.replace(/^#/, '');
                            if (color.length == 3) color = color.padRight(color.charAt(2), 6);
                            return new arena.display.Color(parseInt(color.substring(0, 2), 16), parseInt(color.substring(2, 4), 16), parseInt(color.substring(4, 6), 16));
                        } else {
                            if (color.indexOf('rgb') == 0) {
                                var components = color.match(/[0-9]+/g);
                                return new arena.display.Color(parseInt(components[0]), parseInt(components[1]), parseInt(components[2]), components.length == 4 ? parseFloat(components[2]) : 1);
                            } else {
                                return Color[color].copy();
                            }
                        }
                        break;
                    case "number":
                        return new arena.display.Color(arguments[0], arguments[1], arguments[2], arguments[3]);
                    default:
                        return color.copy();
                }
            };

			window.Color.random = function(alpha) { return new arena.display.Color(Math.floor(Math.random() * 256) - 1, Math.floor(Math.random() * 256) - 1, Math.floor(Math.random() * 256) - 1, alpha ? alpha : 1); };

            // install colors into global namespace
            window.Color.names = [];
            window.Color.named = [];
            window.Color.register = function(name, color) {
                window.Color[name] = color;
                window.Color.named.push(color);
                window.Color.names.push(name);
            }
            var namedColors = arena.display.Color.named();
            for (var colorName in namedColors) {
                var color = new arena.display.Color(
                    namedColors[colorName][0],
                    namedColors[colorName][1],
                    namedColors[colorName][2],
                    colorName == 'transparent' ? 0 : 1
                );
                window.Color.register(colorName, color);
            }
        }
    }
});

var Color = arena.display.Color.named; // helps intellisense