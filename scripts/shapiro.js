'use strict';

/*
	This file will define the automatons to be displayed
	when the Ben Shapiro DNA computer is chosen.
*/


function start_automaton(){
	draw_two_state_canvas();
	document.getElementById('test_btn').addEventListener('click', () => {
		show_transition_canvas();
	});
	let input = document.getElementById('test')
	input.onkeyup = validate_alphabet;
}

function validate_alphabet(e){
	// allow only a and b keys and to lower all
	switch(e.code){
		case "ShiftLeft":
		case "ShiftRight":
		case "Control":
			break;
		case "KeyA":
		case "KeyB":
			// Allow the keys in to upper
			this.value = this.value.toLowerCase();
			break;
		case "Enter":
			show_transition_canvas();
		default:
			this.value =  this.value.substring(0, this.value.length - 1);
	}
}

let state = "TRANSITION"

function show_transition_canvas(){
	if (document.getElementById("test").value.length == 0) {
		document.getElementById("info_ctn").innerText = "Please enter more than one character";
		return;
	}
	document.getElementById("state1").style.display = "none";
	document.getElementById("state2").style.display = "block";
	show_transition_encoding();
	draw_transition_encoding();
	document.getElementById('cotninue_btn').addEventListener('click', () => {
		if(state === "TRANSITION"){
			show_encode_canvas();
		}else{
			show_splitting_canvas();
		}
	});
}

function show_splitting_canvas(){
	// Move to the next container
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `FokI will split remove the first input word.`;
	draw_start_cutting();
	state = "SPLIT";
}

function draw_start_cutting(){
	// Draw the cutting action
}

function show_encode_canvas(){
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `The String must then be encoded into a DNA representation of it. The rules are simple. First, the desire starting state and first input variable must be chosen. Then a spacer of GCC is placed. Then the second input letter, then a spacer, then the third etc. Finaly a terminator is placed.`;
	draw_encoded_string();
	state = "ENCODE";
}

const SIZE = 25;

function draw_encoded_string(){
	// Draw the series of boxes representing a string in DNA form
	let input_string = document.getElementById('test').value;
	let top_row = "";
	let bottom_row = "";
	let spacer_top = "GCC";
	let spacer_bottom = "CGG";
	let terminator_top = "GTCGG";
	let terminator_bottom = "CAGCC";

	if(input_string[0] === 'a'){
		top_row += "GGCT";
	}else{
		top_row += "CAGG";
	}
	top_row += spacer_top;
	bottom_row += spacer_bottom;
	input_string = input_string.substring(0, input_string.length -1 );

	for(let w of input_string){
		if(w === 'a'){
			// Add a
			top_row += "TGGCT";
			bottom_row += "ACCGA";
		}else{
			// Add b
			top_row += "GCAGG";
			bottom_row += "CGTCC";
		}
		top_row += spacer_top;
		bottom_row += spacer_bottom;
	}

	top_row += terminator_top;
	bottom_row += terminator_bottom;

	// Draw them on the canvas
	let canvas = document.getElementById("two_state_2");
	let ctx = canvas.getContext("2d");
	ctx.strokeStyle = 'salmon';
	ctx.lineWidth = 2;


	let x = 10;
	let y = canvas.height / 2 - 15;
	for(let w of top_row){
		draw_square(ctx, x, y, w);
		x += SIZE;
	}

	x = 10 + (SIZE * 4);
	y = canvas.height / 2 - 15 + SIZE;
	for(let w of bottom_row){
		draw_square(ctx, x, y, w);
		x += SIZE;
	}

}

function draw_square(ctx, x, y, letter){
	ctx.strokeRect(x, y, SIZE, SIZE);
	ctx.font = "20px 'Courier New', Courier, monospace";
	ctx.fillStyle = '#7cff4d';
	ctx.fillText(letter, x + 5, y + 20);
}

function draw_transition_encoding(){
	// Draw the transitions in the DNA molecule form
}

function show_transition_encoding(){
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `The FSM has 8 possible transitions functions. In this example we will show 3: A -> B, A -> A, B -> A. A is the starting state and the final state. The encoding for this transitions are set and shown below as DNA. It is important to know that all transitions begin with GGATG because this sequence triggers FokI into action.`;
}

function draw_two_state_canvas(){
	// Aquire context
	let canvas = document.getElementById("two_state");
	let ctx = canvas.getContext("2d");
	let state_radius = canvas.height / 2 * 0.20;
	let offset = 40 + state_radius;
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
	ctx.strokeStyle  = 'salmon';
	ctx.beginPath();
	canvas_arrow(ctx, 
		offset + (state_radius * 2) - 10,
		canvas.height / 2 - 25,
		canvas.width / 2 + offset + 5,
		canvas.height / 2 - 25);
	canvas_arrow(ctx, 
		canvas.width / 2 + offset + 10,
		canvas.height / 2 + 25,
		offset + (state_radius * 2) - 5,
		canvas.height / 2 + 25);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(offset,
  			canvas.height / 2,
  			state_radius / 1.5,
  			2 * Math.PI - Math.PI / 2.7, Math.PI / 2.7, true);
	let lastX = offset + (state_radius / 1.5)*Math.cos(2 * Math.PI - Math.PI / 2.7);
	let lastY = canvas.height / 2 + (state_radius / 1.5)*Math.sin(2 * Math.PI - Math.PI / 2.7);  
	lastY += 2 * (state_radius / 1.5);
	ctx.lineTo(lastX - 10 * Math.cos(Math.PI / 6), lastY - 10 * Math.sin(Math.PI / 6));
  	ctx.moveTo(lastX, lastY);
  	ctx.lineTo(lastX - 10 * Math.cos(Math.PI / 6), lastY - 10 * Math.sin(Math.PI / 6));
	ctx.stroke();
}