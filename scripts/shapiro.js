'use strict';

/*
	This file will define the automatons to be displayed
	when the Ben Shapiro DNA computer is chosen.
*/

let state = "TRANSITION"
let input_w = "";
let input_w_x  = 0;
let input_w_y = 0;
const SIZE = 25;


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
	document.getElementById("state2").style.display = "none";
	document.getElementById("state3").style.display = "block";
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `FokI will split remove the first input word.`;
	draw_start_cutting();
	state = "SPLIT";
}

function draw_start_cutting(){
	// Set the header
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `.`;
	
	// Draw the cutting action
	init_cutting();

	setTimeout(() => {
		start_cutting(); 
	}, 1000);
}

function init_cutting(){
	// Show the input string

	// Show the transitions on the left
}

function start_cutting(){

}

function show_encode_canvas(){
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `The String must then be encoded into a DNA representation of it. The rules are simple. First, the desire starting state and first input variable must be chosen. Then a spacer of GCC is placed. Then the second input letter, then a spacer, then the third etc. Finaly a terminator is placed.`;
	input_w = document.getElementById('test').value;
	input_w_x = 10;
	input_w_y = canvas.height / 2 - 15;
	draw_encoded_string();
	state = "ENCODE";
}


function draw_encoded_string(){
	// Draw the series of boxes representing a string in DNA form
	let input_string = input_w;
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


	let x = input_w_x;
	let y = input_w_y;
	for(let w of top_row){
		draw_square(ctx, x, y, w);
		x += SIZE;
	}

	x = input_w_x + (SIZE * 4);
	y = input_w_y + SIZE;
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
		canvas.width / 2 + offset + 10,
		canvas.height / 2 - 25);
	canvas_arrow(ctx, 
		canvas.width / 2 + offset + 10,
		canvas.height / 2 + 25,
		offset + (state_radius * 2) -10 ,
		canvas.height / 2 + 25);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(offset -10,
  			canvas.height / 2 ,
  			state_radius / 1.5 + 5,
  			2 * Math.PI - Math.PI / 2.7 + .25, Math.PI / 2.7 - .25, true);
	let lastX = offset + (state_radius / 1.5)*Math.cos(2 * Math.PI - Math.PI / 2.7);
	let lastY = canvas.height / 2 + (state_radius / 1.5)*Math.sin(2 * Math.PI - Math.PI / 2.7);  
	lastY += 2 * (state_radius / 1.5);
	ctx.lineTo(lastX - 10 * Math.cos(Math.PI / 6), lastY - 10 * Math.sin(Math.PI / 6) );
  	ctx.moveTo(lastX -2 , lastY -2);
  	ctx.lineTo(lastX -2, lastY + 5);
	ctx.stroke();

	//Add in transition text
	ctx.fillStyle = 'salmon';
	//transition 1 (A -> A)
	var posx = offset - 60;
	var posy = canvas.height /2;
	ctx.fillText("b", posx, posy);
	//transition 2 (A -> B)
	posx =((offset + (state_radius * 2) - 10) +(canvas.width / 2 + offset + 10))/2
	posy =((canvas.height / 2 - 25) + (canvas.height / 2 - 25))/2 - 20;
	ctx.fillText("b", posx, posy);
	//transition 2 (B -> A)
	posy =((canvas.height / 2 - 25) + (canvas.height / 2 - 25))/2 + 80;
	ctx.fillText("a",posx, posy);
}