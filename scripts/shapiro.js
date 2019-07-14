'use strict';

/*
	This file will define the automatons to be displayed
	when the Ben Shapiro DNA computer is chosen.
*/


function start_automaton(){
	draw_two_state_canvas();
}

function draw_two_state_canvas(){
	// Aquire context
	let canvas = document.getElementById("two_state");
	let ctx = canvas.getContext("2d");
	let state_radius = canvas.height / 2 * 0.3;
	let offset = 20 + state_radius;

	// Draw state one
	ctx.beginPath();
  	ctx.arc(offset, canvas.width / 2, state_radius, 0, 2 * Math.PI);
 	ctx.fillStyle = 'white';
  	ctx.fill();

	// Draw State two
	ctx.beginPath();
  	ctx.arc(canvas.width / 2 + offset,  canvas.height / 2, state_radius, 0, 2 * Math.PI);
 	ctx.fillStyle = 'white';
  	ctx.fill();

	// Draw transitions

	// Write in text
}