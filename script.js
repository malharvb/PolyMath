
const checkbox = document.querySelector('#checkbox');

let myStorage = window.localStorage;
checkbox.checked = myStorage.getItem('dark');
console.log(myStorage.getItem('dark'), Boolean(myStorage.getItem('dark')))
const body = document.querySelector('body');

checkbox.addEventListener('change', (e) => {
    if(e.target.checked)
    {
        body.classList.add('dark');
        myStorage.setItem('dark', "true");
    }
    else
    {
        body.classList.remove('dark');
        myStorage.setItem('dark', ""); 
    }
    console.log(myStorage.getItem('dark'))
    
});


if(myStorage.getItem('dark') == 'true')
{
    body.classList.add('dark');
}
else
{
    body.classList.remove('dark');
}