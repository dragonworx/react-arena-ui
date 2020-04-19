/** ! arena v1.7.1 arena2d.com | arena2d.com/license */
jQuery(document).ready(function() {
	var obj = {
		changed: function(sender, propName) {
			console.log(sender.hash + "." + propName + " changed!");
		},
		redChanged: function(sender, newValue, oldValue) {
			console.log('redChanged! was ' + oldValue + ' now ' + newValue);
		}
	};

	Color.red.addEvent('changed', obj.changed);
	Color.red.addEvent('redChanged', obj.redChanged);

	Color.red.red = 5;

	Color.red.disableEvent('changed');

	Color.red.set(4, 5, 6, 7);

	Color.red.enableEvent('changed');
});