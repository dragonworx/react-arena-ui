var activeTest = undefined;
var $ = jQuery;

var originx = $('#originx'); var originy = $('#originy');
var transx = $('#transx'); var transy = $('#transy');
var rotation = $('#rotation');
var scalex = $('#scalex'); var scaley = $('#scaley');
var skewx = $('#skewx'); var skewy = $('#skewy');
var squeeze = $('#squeeze');
var tiltx = $('#tiltx'); var tilty = $('#tilty');
var quality = $('#quality');

function storeDefaults() {
	originx.data('default', originx.val()); originy.data('default', originy.val());//origin
	transx.data('default', transx.val()); transy.data('default', transy.val());//trans
	rotation.data('default', rotation.val());//rotation
	scalex.data('default', scalex.val()); scaley.data('default', scaley.val());//scale
	skewx.data('default', skewx.val()); skewy.data('default', skewy.val());//skew
	squeeze.data('default', squeeze.val());//squeeze
	tiltx.data('default', tiltx.val()); tilty.data('default', tilty.val());//tilt
	quality.data('default', quality.val());//quality
}

function test(name) {
	// start a test here, close existing down if found
    if (activeTest) {
        document.getElementById(activeTest.constructor.className).src = "img/scroll.png";
		activeTest.stop();
        activeTest.unload();
        console.log("unloaded test " + activeTest.toString());
    }

	// change the ui
    document.getElementById(name).src = "img/scroll_run.png";
    document.getElementById('overlay').innerHTML = '';

	// make the test
    activeTest = new arena.tests[name]();
	activeTest.transformHandler = transform;
	activeTest.init();

	// set the hash and reset scrollTop
    window.location.hash = name;
    document.body.scrollTop = 0;
	//console.log("loaded test " + activeTest.toString());

	this.reset();

	console.log("loaded test " + activeTest.toString());
}

function reset() {
	// reset inputs
	originx.val(originx.data('default')); originy.val(originy.data('default'));
	transx.val(transx.data('default')); transy.val(transy.data('default'));
	rotation.val(rotation.data('default'));
	scalex.val(scalex.data('default')); scaley.val(scaley.data('default'));
	skewx.val(skewx.data('default')); skewy.val(skewy.data('default'));
	squeeze.val(squeeze.data('default'));
	tiltx.val(tiltx.data('default')); tilty.val(tilty.data('default'));
	quality.val(quality.data('default'));

	// reset labels
	setLabel(originx); setLabel(originy);
	setLabel(transx); setLabel(transx);
	setLabel(rotation);
	setLabel(scalex); setLabel(scaley);
	setLabel(skewx); setLabel(skewy);
	setLabel(squeeze);
	setLabel(tiltx); setLabel(tilty);
	setLabel(quality);

	// reset test

	activeTest.reset();

	transform();

	this.update();
}

function dumpTransform() {
	return "o(%1@%2).t(%3@%4).r'%5'.s{%6:%7}.k{%8:%9}.~{%10:%11}.q{%12}.a'%13'".args(
		originx.val().toFloat().decimals(1),//1
		originy.val().toFloat().decimals(1),
		transx.val().toFloat().decimals(1),//3
		transy.val().toFloat().decimals(1),
		rotation.val().toFloat().decimals(1),//5
		scalex.val().toFloat().decimals(1),//6
		scaley.val().toFloat().decimals(1),
		skewx.val().toFloat().decimals(1),//8
		skewy.val().toFloat().decimals(1),
		tiltx.val().toFloat().decimals(1),//10
		tilty.val().toFloat().decimals(1),//11
		squeeze.val().toFloat().decimals(1),//12
		quality.val().toFloat().decimals(1));//13
}

function transform() {
	var squeezeVal = squeeze.val().toFloat() >= 0 ? squeeze.val().toFloat() + 1 : (squeeze.val().toFloat() + 1) * 0.5 + 0.5;

	activeTest.setTransform(
		originx.val().toFloat(),
		originy.val().toFloat(),
		transx.val().toFloat(),
		transy.val().toFloat().decimals(1),
		rotation.val().toFloat().decimals(1),
		scalex.val().toFloat(),
		scaley.val().toFloat(),
		skewx.val().toFloat(),
		skewy.val().toFloat(),
		squeezeVal,
		tiltx.val().toFloat(),
		tilty.val().toFloat(),
		quality.val().toFloat()
	);

	update();

	$('#info').text(dumpTransform());
}

function update() { activeTest.update();	}

function start() { activeTest.start(); }

function stop() { activeTest.stop(); }

function setLabel(input) {
	input = $(input);
    var label = input.prev();
    var labelText = label.text().replace(/:\s[0-9\.\-]+/, ': ' + parseFloat(input.val()).decimals(2));
    label.text(labelText);
}

// page load
window.onload = function() {
	storeDefaults();
    if (window.top.location.hash.length > 0)
        test(window.location.hash.replace('#',''));
};

// page unload
window.unload = function() {
    if (activeTest)
		activeTest.unload();
};