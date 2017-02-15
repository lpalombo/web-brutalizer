//This code is partially adapted from CSS-Tricks forum poster Shikkediel
//https://css-tricks.com/forums/topic/making-random-not-so-random

$(document).ready(function() {

var field = $('#container'); // parent object
var target = $('.dots'); // children element class
var order = $('#grouped'); // this button will give the elements structure 
var random = $('#erratic'); // click this object to shuffle
var words = $('.formation'); // selector class of button inline text

var limit = 40; // distance randomised elements will stay away from parent's edge
var mount = 20; // extra space (similar to margin) added around each random element
var initial = 8; // number of elements to initially place inside quadrants
var ensued = false; // set to true will start page with aligned elements
var expand; // margins for organised layout will be copied from stylesheet

target.hide();
readMargin();

$(window).on('load', function() {

field.width('100%');
var gate = $(window),
spread = field.width(),
occupied = $('body').height(),
term = gate.height()-occupied, crest,
alpha, redraw,
total = 0, minimum, dynamic, profuse,
boxes = [];

surfaceArea();
initiateScene();

order.click(normalFlow);

random.click(function() {

	if (profuse) {
	ensued = false;
	initiateScene();
	}
});

gate.resize(function() {

	if (alpha) {
	alpha = false;
	$(target).add(words).hide();
	field.height(0);
	}
	spread = field.width();
	term = gate.height()-occupied;
	clearTimeout(redraw);
	redraw = setTimeout(initiateScene, 200);
});

function surfaceArea() {

	var range, wide = 0, pitch;
	target.each(function() {
	range = $(this).width()+2*mount;
	if (range > wide) wide = range;
	pitch = $(this).height()+2*mount;
	total += range*pitch;
	});
	minimum = 3*wide+2*limit;
}

function initiateScene() {
    
	alpha = true;
	if (ensued) target.css('display', 'inline-block');
	else {
	if (spread >= minimum) {
	if (!dynamic) {
	target.css({position: 'absolute', margin: 0});
	dynamic = true;
	}
	var edge = 2.5*total/(spread-2*limit)+2*limit;
	if (term < edge) crest = edge;
	else crest = term;
	field.height(crest);
	}
	}
	spread = field.width();
	if (spread >= minimum) {
	profuse = true;
	if (!ensued) placeRandom();
	words.show();
	}
	else {
	profuse = false;
	normalFlow();
	}
}

function normalFlow() {

	if (!ensued) {
	field.height(0);
	target.css({
	position: 'relative',
	top: 0,
	left: 0,
	display: 'inline-block',
	margin: expand
	});
	ensued = true;
	dynamic = false;
	}
}

function placeRandom() {

	boxes.length = 0;
	var iter = 0, box,
	horizontal = spread/2,
	vertical = crest/2;

	target.each(function() {
	iter++;
	var object = $(this);
	setPosition(object);
	boxes.push(box);
	object.show();
	});

function setPosition(object) {

	var zone = object.width(),
	unit = object.height();

	if (iter <= initial) {

	var quadrant = iter%4;
	if (quadrant == 0) quadrant = 4;
	var spaceX = Math.round(Math.random()*(horizontal-zone-limit)),
	spaceY = Math.round(Math.random()*(vertical-unit-limit)),
	bufferX, bufferY;

	if (quadrant == 1) {
	bufferX = limit;
	bufferY = limit;
	}
	if (quadrant == 2) {
	bufferX = horizontal;
	bufferY = limit;
	}
	if (quadrant == 3) {
	bufferX = horizontal;
	bufferY = vertical;
	}
	if (quadrant == 4) {
	bufferX = limit;
	bufferY = vertical;
	}
	var fixleft = spaceX+bufferX,
	fixtop = spaceY+bufferY;
	}
	else {
	fixleft = Math.round(Math.random()*(spread-zone-2*limit))+limit;
	fixtop = Math.round(Math.random()*(crest-unit-2*limit))+limit;
	}

	object.css({top: fixtop, left: fixleft});
	box = {top: fixtop, left: fixleft, width: zone, height: unit}

	if (iter == 1) boxes.push(box);
	else {
	for (var i = 0; i < boxes.length; i++) {
	if (encroachOn(box, boxes[i])) setPosition(object);
	}
	}
}
}

function encroachOn(box1, box2) {

	var x1 = box1.left,
	y1 = box1.top,
	h1 = box1.height,
	w1 = box1.width,
	b1 = y1+h1,
	r1 = x1+w1,
	x2 = box2.left,
	y2 = box2.top,
	h2 = box2.height,
	w2 = box2.width,
	b2 = y2+h2,
	r2 = x2+w2,

	apex = b1+mount > y2-mount,
	nadir = y1-mount < b2+mount,
	sin = r1+mount > x2-mount,
	dex = x1-mount < r2+mount;

	return (apex && nadir && sin && dex);
}
});

function readMargin() {

	var t = target.css('margin-top'),
	r = target.css('margin-right'),
	b = target.css('margin-bottom'),
	l = target.css('margin-left'),

	all = [t, r, b, l];
	expand = all.toString().replace(/,/g , " ");
}
});