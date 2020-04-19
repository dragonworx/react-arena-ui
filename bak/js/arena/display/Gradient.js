Class('arena.display.Gradient', arena.Object, ['gradient', 'stops'], {
    Gradient: function(x1, y1, x2, y2) {
        this.gradient = undefined;
        this.stops = [];
    },
    'color stops': {
        addColorStop: function(offset, color) {
            this.stops.add({offset:offset, color:color});
            this.gradient = undefined;
        },
        setColorStop: function(index, offset, color) {
            this.stops[index].offset = offset;
            this.stops[index].color = color;
            this.gradient = undefined;
        },
        setColorStopOffset: function(index, offset) {
            this.setColorStop(index, offset, this.stops[index].color);
        },
        setColorStopColor: function(index, color) {
            this.setColorStop(index, this.stops[index].offset, color);
        }
    },
    'rendering': {
        createGradient: function(bitmap) {
            // subclasses should override
        },
        renderOn: function(bitmap) {
            if (!this.gradient) {
                this.gradient = this.createGradient(bitmap);
                this.renderColorStops(bitmap);
            }
            return this.gradient;
        },
        renderColorStops: function(bitmap) {
            for (var i=0; i<this.stops.length; i++)
                this.gradient.addColorStop(this.stops[i].offset, this.stops[i].color.renderOn(bitmap));
        }
    }
});