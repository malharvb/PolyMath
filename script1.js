let myStore = window.localStorage;
let resultantPoly = document.querySelector('#resultantPoly');
resultantPoly.innerHTML = myStore.getItem('computedAns');
resultantPoly.style.color = 'black';

let steps = document.querySelector('.main3')
steps.innerHTML = 'Steps: <br>'
steps.innerHTML += myStore.getItem('steps')