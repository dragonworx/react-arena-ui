Class('arena.geometry.TransformStack', arena.Object, ['_matrix', 'matrix', 'depth'], {
    TransformStack:function () {
        this.constructor.base.Object.call(this);
        this._matrix = new arena.geometry.Matrix();
        this.matrix = new arena.geometry.Matrix();
        this.depth = 0;
    },
    'matrix stack': {
        clear: function() {
            this._matrix.reset();
            this.matrix.reset();
            return this;
        },
        push: function(element) {
            this.depth++;
            this._matrix.clone(this.matrix);
            this.matrix.concat(element.transformMatrix(), true); // TODO: make transform matrix accessor
            return this;
        },
        pop: function() {
            this.depth--;
            this.matrix.clone(this._matrix);
            return this;
        },
        currentMatrix: function() {
            return this.matrix;
        }
    }
});