'use strict';

/*
	This file will define the automatons to be displayed
	when the Ben Shapiro DNA computer is chosen.
*/

let state = "TRANSITION"
let input_w = "";
let input_w_x  = 0;
let input_w_y = 0;
let bottom_row = ""
let top_row = "";
let SIZE = 25;
let interval = null;
let result = "continue";
let current_transition = "";
let found_good = false;

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
			break;
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
	h4.innerText = `Transactions and FokI cutting demonstrated below.`;
	
	// Draw the cutting action
	init_cutting();

	let btn = document.getElementById("step_by_step")
	btn.addEventListener('click', () => {
		if(result === "continue"){
			start_cutting();
		}else if( result === "accepted"){
			mark_accepted();
			btn.innerText = "Complete";
		}else if(result === "rejected"){
			mark_rejected();
			btn.innerText = "Complete"; 
		}
	});
}

function init_cutting(){
	// Show the input string
	let canvas = document.getElementById("two_state_3");
	let ctx = canvas.getContext("2d");
	draw_just_input_string(ctx, top_row, bottom_row);
}

function mark_accepted(){
	let circle = document.getElementsByClassName("circle")[1];
	circle.classList.add("select");
	circle.style.background_color = "#5ad47a";
}

function mark_rejected(){
	let circle = document.getElementsByClassName("circle")[0];
	circle.classList.add("select");
	circle.style.background_color = "#d14f5a";
}

function start_cutting(){
	// Get transition
	set_transition();

	// If no transition
		// return
	if(current_transition.length === 0){
		evaluate_state();
		return;
	}

	// First combine the transition with the input string
	let temp_words = get_combined_words();

	// Draw the combined words
	draw_combined_words(temp_words);

	// Place the current SYmbol
	place_current_symbol();

	// Draw the FokI enxyme and the locations of its cut
	draw_fokl_enzyme(temp_words);

	// Display the new cut input string
	setTimeout(() => {
		cut_string(temp_words);
	}, 1000);
}

function trim_words(words){
	let final = [];
	for(let w of words){
		let top = w[0];
		top = top.substring(14, top.length);
		let bottom = w[1];
		bottom = bottom.substring(18, bottom.length);
		final.push([top, bottom]);
	}
	return final;
}

function cut_string(words){
	// Trim the words
	words = trim_words(words);

	// Draw
	let canvas = document.getElementById("two_state_3");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let draw_state = 0;
	let iter = 0;
	found_good = false;

	for(let word of words){
		let count = -4;
		let x = 20;
		let y = (words.length  == 1 ? canvas.height / 2 : canvas.height / 3); 
		if(iter == 1){
			y += 150;
		}
		else{
			iter++;
		}

		for(let w of word[0]){
			if(count % 8 == 0 || count % 8 == 1 || count % 8 == 2){
				draw_state = 0;
			}
			else if(count + 5 >= word[0].length - 5){
				draw_state = 1;
			}
			else{
				draw_state = 2;
			}
			draw_square(ctx, x, y, w, draw_state);
			x += SIZE;
			count++;
		}

		x = 20 + 4 * SIZE;
		y += SIZE;
		count = 0;
		for(let w of word[1]){
			if(count % 8 == 0 || count % 8 == 1 || count % 8 == 2){
				draw_state = 0;
			}
			else if(count >= word[1].length - 5){
				draw_state = 1;
			}
			else{
				draw_state = 2;
			}
			draw_square(ctx, x, y, w, draw_state);
			x += SIZE;
			count++;
		}

		// Check if bad word
		if(!good_word(word[0], iter)){
			draw_bad_word(word[0], ctx, canvas, y);
		}
		else{
			top_row = word[0];
			bottom_row = word[1];
			found_good = true;
		}
	}
}

function good_word(word){
	let relavent = word.substring(0, 4);
	return relavent == "CAGG" || relavent == "TGGC" || relavent == "TCGG";
}

function draw_bad_word(word, ctx, canvas, y){
	let x = word.length * SIZE + SIZE * 2;
	ctx.fillStyle = "#ff681d";
	ctx.fillText("Irrelevant Input", x , y);
}

function place_current_symbol(){
	document.getElementById("current_symbol").innerText = current_transition;
}

function draw_fokl_enzyme(words){
	// Draw block below
	let canvas = document.getElementById("two_state_3");
	let ctx = canvas.getContext("2d");
	let iter = 0;
	let width = SIZE * 5;
	for(let word of words){
		let x = 20;
		let y = (words.length  == 1 ? canvas.height / 2 : canvas.height / 3) - 10 - SIZE; 
		if(iter == 1){
			y += 150;
		}
		else{
			iter++;
		}
		ctx.fillStyle = "#56d6c3";
		ctx.fillRect(x, y, width, SIZE);
		ctx.beginPath();
		ctx.moveTo(x,y)
		ctx.lineTo(x + SIZE * 14, y);
		canvas_arrow(ctx, x + SIZE * 14, y, x + SIZE * 14, y + SIZE);
		ctx.stroke();

		ctx.fillRect(x, y + (SIZE * 3) + (10 * 2), width, SIZE);
		ctx.beginPath();
		ctx.moveTo(x, y + (SIZE * 4) + (10 * 2))
		ctx.lineTo(x + SIZE * 18, y + (SIZE * 4) + (10 * 2));
		canvas_arrow(ctx, x + SIZE * 18, y + (SIZE * 4) + (10 * 2), x + SIZE * 18, y + (SIZE * 3) + (10 * 2) );
		ctx.stroke();

		ctx.fillStyle = "#626ed9";
		ctx.fillText("FokI", x + 5 , y + SIZE - 5);
		ctx.fillText("FokI", x + 5 , y + (SIZE * 3) + (10 * 2) + SIZE - 5);
	}
}

function get_combined_words(){
	if(current_transition === 'a'){
		let temp1 = "GGATG" + top_row;
		let temp2 = "CCTACACCG" + bottom_row;
		return [[temp1, temp2]];
	}
	else{
		let temp1 = "GGATGCC" + top_row;
		let temp2 = "CCTACGGGTCC" + bottom_row;
		let temp3 = "GGATGC" + top_row;
		let temp4 = "CCTACGGTCC" + bottom_row;
		return [[temp1, temp2], [temp3, temp4]];
	}
}

function draw_combined_words(words){
	let canvas = document.getElementById("two_state_3");
	let ctx = canvas.getContext("2d");
	let draw_state = 2;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = 'salmon';
	ctx.lineWidth = 2;

	let iter = 0;
	for(let word of words){
		let x = 20;
		let y = (words.length  == 1 ? canvas.height / 2 : canvas.height / 3); 
		if(iter == 1){
			y += 150;
		}
		else{
			iter++;
		}
		
		x = 20;
		for(let w of word[0]){
			draw_square(ctx, x, y, w, draw_state);
			x += SIZE;
		}

		x = 20;
		y += SIZE;
		for(let w of word[1]){
			draw_square(ctx, x, y, w, draw_state);
			x += SIZE;
		}
	}
}

function evaluate_state(){
	if(bottom_row.length === 0 && top_row.length == 4){
		if(top_row === "TCGG"){
			result = "accepted";
		}else{
			result = "rejected";
		}
	}
	else{
		if(current_transition.length == 0){
			result = "rejected";
		}else{
			result = "continue";
		}
	}
}

function set_transition(){
	let relavent = top_row.substring(0, 4);
	switch(relavent){
		case "CAGG":
			current_transition = 'b';
			document.getElementById("trans1").classList.toggle("selected_trans", true);
			document.getElementById("trans2").classList.toggle("selected_trans", true);
			document.getElementById("trans3").classList.toggle("selected_trans", false);
			break;
		case "TGGC":
			current_transition = 'a';
			document.getElementById("trans1").classList.toggle("selected_trans", false);
			document.getElementById("trans2").classList.toggle("selected_trans", false);
			document.getElementById("trans3").classList.toggle("selected_trans", true);
			break;
		default:
			current_transition = "";
	}
}

function show_encode_canvas(){
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `The String must then be encoded into a DNA representation of it. The rules are simple. First, the desire starting state and first input variable must be chosen. Then a spacer of GCC is placed. Then the second input letter, then a spacer, then the third etc. Finally a terminator is placed.`;
	input_w = document.getElementById('test').value;
	input_w_x = 10;
	input_w_y = 500 / 2 - 15;
	draw_encoded_string();
	state = "ENCODE";
}


function draw_encoded_string(){
	// Draw the series of boxes representing a string in DNA form
	let input_string = input_w;
	top_row = "";
	bottom_row = "";
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
	input_string = input_string.substring(1, input_string.length);
	console.log(input_string);
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
	let trans_ctn = document.getElementById("transitions");
	trans_ctn.style.display = "none";
	let canvas = document.getElementById("two_state_2");
	canvas.style.display = "block"
	let ctx = canvas.getContext("2d");
	draw_just_input_string(ctx, top_row, bottom_row);

}

function draw_just_input_string(ctx, top_row, bottom_row){
	ctx.strokeStyle = 'salmon';
	ctx.lineWidth = 2;
	SIZE = (top_row.length > 30 ? 15 : 25);
	let x = input_w_x;
	let y = input_w_y;
	let count = -4;
	let draw_state = 0;
	for(let w of top_row){
		if(count % 8 == 0 || count % 8 == 1 || count % 8 == 2){
			draw_state = 0;
		}
		else if(count + 5 >= top_row.length - 5){
			draw_state = 1;
		}
		else{
			draw_state = 2;
		}
		draw_square(ctx, x, y, w, draw_state);
		x += SIZE;
		count++;
	}

	x = input_w_x + (SIZE * 4);
	y = input_w_y + SIZE;
	count = 0;
	for(let w of bottom_row){
		if(count % 8 == 0 || count % 8 == 1 || count % 8 == 2){
			draw_state = 0;
		}
		else if(count >= bottom_row.length - 5){
			draw_state = 1;
		}
		else{
			draw_state = 2;
		}
		draw_square(ctx, x, y, w, draw_state);
		x += SIZE;
		count++;
	}
}

function draw_square(ctx, x, y, letter, state){
	if(state === undefined){
		ctx.fillStyle = "#7cff4d";
	}else{
		switch(state){
			case 0: ctx.fillStyle = "#1d1f1e"; break;
			case 1: ctx.fillStyle = "#b45fc9"; break;
			case 2: ctx.fillStyle = "#7cff4d"; break;
			default:
			 	ctx.fillStyle = "#7cff4d";
		}
	}
	ctx.strokeRect(x, y, SIZE, SIZE);
	ctx.font = `${SIZE - 5}px 'Courier New', Courier, monospace`;
	ctx.fillText(letter, x + (SIZE / 6), y + SIZE - 5);
}

function show_transition_encoding(){
	let h4 = document.getElementsByClassName("comp_desc")[0];
	h4.innerText = `The FSM has 8 possible transitions functions. In this example we will show 3: A -> B, A -> A, B -> A. A is the starting state and the final state. The encoding for these transitions are set and are shown below as DNA. It is important to know that all transitions begin with GGATG because this sequence triggers FokI into action.`;
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