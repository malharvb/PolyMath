let myStore = window.localStorage;

let step2 = myStore.getItem('steps')

let arr = step2.split('<br>')

console.log(arr)

let steps = document.querySelector('#vis-display')
setTimeout(()=>{steps.innerHTML += arr[0] +'<br>'}, 2000)
setTimeout(()=>{steps.innerHTML += arr[1] +'<br>'}, 4000)
setTimeout(()=>{steps.innerHTML += arr[2] +'<br>'}, 6000)



//setInterval(()=>{arr.forEach(e=>{steps.innerHTML += e +'<br>'})}, 2000)