Class('arena.display.RadialGradient', arena.display.Gradient, ['x1', 'y1', 'r1', 'x2', 'y2', 'r2'], {
    RadialGradient: function(x1, y1, r1, x2, y2, r2) {
        this.constructor.base.Gradient.call(this);
        this.x1 = x1 ? x1: 0;
        this.y1 = y1 ? y1: 0;
        this.r1 = r1 ? r1: 0;
        this.x2 = x2 ? x2: 0;
        this.y2 = y2 ? y2: 0;
        this.r2 = r2 ? r2: 0;
    },
    'geometry': {
        setCircle: function(x1, y1, r1, x2, y2, r2) {
            this.x1 = x1;
            this.y1 = y1;
            this.r1 = r1;
            this.x2 = x2;
            this.y2 = y2;
            this.r2 = r2;
            this.gradient = undefined;
        }
    },
    'rendering': {
        createGradient: function(bitmap) {
            return bitmap.context.createRadialGradient(this.x1, this.y1, this.r1, this.x2, this.y2, this.r2);
        }
    }
});