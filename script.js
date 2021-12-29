
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
 document.body.style.transform = scale;     // General

 //code for calculator

 let display = document.getElementById('displayC');

let buttons = Array.from(document.getElementsByClassName('buttonC'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error"
                }
                break;
            case '←':
                if (display.innerText){
                   display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});
 