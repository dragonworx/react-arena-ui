Class('arena.display.LinearGradient', arena.display.Gradient, ['x1', 'y1', 'x2', 'y2'], {
    LinearGradient: function(x1, y1, x2, y2) {
        this.constructor.base.Gradient.call(this);
        this.x1 = x1 ? x1: 0;
        this.y1 = y1 ? y1: 0;
        this.x2 = x2 ? x2: 0;
        this.y2 = y2 ? y2: 0;
    },
    'geometry': {
        setLine: function(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.gradient = undefined;
        }
    },
    'rendering': {
        createGradient: function(bitmap) {
            return bitmap.context.createLinearGradient(this.x1, this.y1, this.x2, this.y2);
        }
    }
});