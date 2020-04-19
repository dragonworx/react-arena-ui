Class('arena.dom', null, null, {
    dom: function(selector) {
        var obj = jQuery(selector);
        obj.constructor = arena.dom;
        obj.className = 'arena.dom';
        return obj;
    },
    'static - geometry': {
        offset: function(element) {
			var element = jQuery(element);
            var offset = element.offset();
            return {x:offset.left, y:offset.top};
        },
        scroll: function(element) {
			var element = jQuery(element);
            var scrollTop = element.scrollTop();
            var scrollLeft = element.scrollLeft();
            return {x:scrollLeft, y:scrollTop};
        },
        size: function(element) {
			var element = jQuery(element);
            var outerWidth = element.outerWidth();
            var outerHeight = element.outerHeight();
            return {width:outerWidth, height:outerHeight};
        },
        mouseEvent: function(event) {
            var element = jQuery(event.currentTarget);
            var offset = arena.dom.offset(element);
            if (!element.data('mousepoint'))
                element.data('mousepoint', new arena.geometry.Point());
            element.data('mousepoint').x = event.pageX  - offset.x;
            element.data('mousepoint').y = event.pageY  - offset.y;
            return element.data('mousepoint');
        },
        mousepoint: function(event) {
            var element = jQuery(event.currentTarget);
            if (!element.data('mousepoint'))
                element.data('mousepoint', new arena.geometry.Point());
            return element.data('mousepoint');
        }
    },
    'static - events': {
        bind: function(element, type, fn) {
            jQuery(element).bind(type, fn);
        },
        unbind: function(element, type, fn) {
            jQuery(element).unbind(type, fn);
        }
    }
});