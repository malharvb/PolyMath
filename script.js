
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

// code to open website on same zoom-scale on all size of display devices
var scale = 'scale(1)';
document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
 document.body.style.msTransform =   scale;       // IE 9
 document.body.style.transform = scale;     // General
 