let myStore = window.localStorage;
let resultantPoly = document.querySelector('#resultantPoly');
resultantPoly.innerHTML = myStore.getItem('computedAns');
resultantPoly.style.color = 'black';