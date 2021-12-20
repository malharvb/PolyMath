
let myStorage = window.localStorage;
let body = document.querySelector('body');
//body.classList.remove('dark')
console.log(myStorage.getItem('dark'));



if(myStorage.getItem('dark') == 'true')
{
    body.classList.add('dark')
}
else
{
    body.classList.remove('dark')
}




