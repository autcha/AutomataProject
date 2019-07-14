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

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 15; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.moveTo(tox,toy)
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}