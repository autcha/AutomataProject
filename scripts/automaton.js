'use strict';

/*
	This file will define the basic automaton functions shared
	by all the DNA computers. And any egernal functions.
*/

window.addEventListener('DOMContentLoaded', (event) => {
    enable_home_btn();
    start_automaton();
});

function enable_home_btn(){
	let btn = document.getElementById('home_btn');
	btn.addEventListener('click', () => {
		location = "file:./index.html";
	});
}