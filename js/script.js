'use strict';

document.querySelector('#btnShowText').addEventListener('click', (e) => {
    e.preventDefault();

    const textDiv = document.querySelector('#text');
    textDiv.innerText = 'Double click me';
    textDiv.style.display = 'block';
});

document.querySelector('#text').addEventListener('dblclick', () => {
    const textDiv = document.querySelector('#moreText');
    textDiv.innerText = 'Double clicked!';
    textDiv.style.display = 'block';
});