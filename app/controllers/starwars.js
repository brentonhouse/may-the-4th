
// Android does not support Matrix3D so it will use rotationX instead
if (OS_IOS) {

	// this code rotates the text and changes perspective
	let matrix = Ti.UI.createMatrix3D();

	// Alter the perspective of the view
	matrix.m34 = -1 / 200;

	// Rotate the image around the x-axis
	matrix = matrix.rotate(50, 1, 0, 0);

	// Scale the image down to fit
	matrix = matrix.scale(0.7, 0.7);

	// Apply the transformation
	$.wrapper.transform = matrix;

	// This code moves the background image further back
	// on z-index so that text does not go behind image.
	let matrix2 = Ti.UI.createMatrix3D();

	// Move the background image further back (z-axis)
	matrix2 = matrix2.translate(0, 0, -100);

	// Apply the transformation to the ImageView
	$.backgroundImage.transform = matrix2;

}

// Preload the intro music
const music = Titanium.Media.createSound({
	url:     '/audio/starwars-intro.mp3',
	preload: true,
});

const executeAnimation1 = () => {

	const animation = Ti.UI.createAnimation({
		opacity:  1,
		duration: 6000,
		curve:    Ti.UI.ANIMATION_CURVE_LINEAR,
	});

	// Set the visibility of the different views
	$.galaxy.visible = true;
	$.starwars.visible = false;
	$.wrapper.visible = false;
	$.backgroundImage.visible = false;

	animation.addEventListener('complete', function onComplete1() {
		animation.removeEventListener('complete', onComplete1);

		// Execute the next animation sequence
		executeAnimation2();
	});

	// Begin showing first view
	$.galaxy.animate(animation);

};

const executeAnimation2 = () => {

	// scale the title text out and then bring it back in
	const matrix = Ti.UI.createMatrix2D({ scale: 14 });
	$.starwars.transform = matrix;
	const matrix2 = Ti.UI.createMatrix2D({ scale: 1 });

	const animation = Ti.UI.createAnimation({
		opacity:   1,
		duration:  7000,
		curve:     Ti.UI.ANIMATION_CURVE_LINEAR,
		transform: matrix2,
	});

	// Set the visibility of the different views
	$.galaxy.visible = false;
	$.starwars.visible = true;
	$.wrapper.visible = false;
	$.backgroundImage.visible = false;

	animation.addEventListener('complete', function onComplete2() {
		animation.removeEventListener('complete', onComplete2);

		// Wait for a bit before executing the next animation sequence
		_.delay(executeAnimation3, 2000);
	});

	// Start playing the intro music here
	music.play();

	// Begin showing the title screen
	$.starwars.animate(animation);

};


const executeAnimation3 = () => {

	// Animation to scroll the text up
	const animation = Ti.UI.createAnimation({
		top:      -1400,
		duration: 120000,
		curve:    Ti.UI.ANIMATION_CURVE_LINEAR,
	});

	// Animation to show the background image (stars)
	const animation2 = Ti.UI.createAnimation({
		opacity:  0.8,
		duration: 10000,
		curve:    Ti.UI.ANIMATION_CURVE_LINEAR,
	});

	// Set the visibility of the different views
	$.galaxy.visible = false;
	$.starwars.visible = false;
	$.wrapper.visible = true;
	$.backgroundImage.visible = true;

	// Begin showing the background stars
	$.backgroundImage.animate(animation2);

	// Start the text crawl
	$.intro.animate(animation);

};

// Execute the first animation sequence
executeAnimation1();

