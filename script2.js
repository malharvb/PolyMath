let myStore = window.localStorage;

let step2 = myStore.getItem('steps')

let arr = step2.split('<br>')

console.log(arr)

let steps = document.querySelector('#vis-display')
arr.forEach(e => 
    {
        setTimeout(()=>{steps.innerHTML+= e +'<br>'}, 5000)
    }
    )