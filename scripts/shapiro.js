'use strict';

/*
	This file will define the automatons to be displayed
	when the Ben Shapiro DNA computer is chosen.
*/


function start_automaton(){
	draw_two_state_canvas();
	document.getElementById('test').addEventListener('click', () => {
		draw_encode_canvas();
	});
}

function draw_encode_canvas(){
	show_transition_encoding();
	draw_transition_encoding();
}

function draw_transition_encoding(){
	// TODO: Resume here
}

function show_transition_encoding(){
	let h4 = document.getElementsByClassname("comp_desc")[0];
	h4.innerText = `The FSM has 8 possible transitions functions.
	In this example we will show 3: A -> B, A -> A, B -> A. A
	is the starting state and the final state. The encoding for 
	this transitions are set and shown below as DNA. It is important
	to know that all transitions begin with GGATG because this
	sequence triggers FokI into action.`;
}

function draw_two_state_canvas(){
	// Aquire context
	let canvas = document.getElementById("two_state");
	let ctx = canvas.getContext("2d");
	let state_radius = canvas.height / 2 * 0.25;
	let offset = 20 + state_radius;
	let text_len = 5;

	// Draw state one
	ctx.beginPath();
  	ctx.arc(offset + state_radius,
  			canvas.height / 2,
  			state_radius,
  			0, 2 * Math.PI);
 	ctx.fillStyle = 'white';
  	ctx.fill();
 	ctx.strokeStyle  = 'grey';
 	ctx.lineWidth = 3;
 	ctx.stroke();

	// Draw State two
	ctx.beginPath();
  	ctx.arc(canvas.width / 2 + offset + state_radius,
  	 		canvas.height / 2,
  	 		state_radius,
  	 		0, 2 * Math.PI);
 	ctx.fillStyle = 'white';
  	ctx.fill();

	// Write in text
	ctx.font = "20px 'Courier New', Courier, monospace";
	ctx.fillStyle = 'rgb(100, 100, 100)';
	ctx.fillText("A", offset + state_radius - text_len, canvas.height / 2 + text_len);
	ctx.fillText("B", canvas.width / 2 + offset + state_radius - text_len, canvas.height / 2 + text_len);

	// Draw transitions
	ctx.beginPath();
	canvas_arrow(ctx, 
		offset + (state_radius * 2) - 10,
		canvas.height / 2 - 25,
		canvas.width / 2 + offset + 5,
		canvas.height / 2 - 25);
	// TODO: Stroke from B to A
	// TODO: Stroke from A to A
	ctx.stroke();
}