
const checkbox = document.querySelector('#checkbox');
const inputPresent = document.querySelector('#input1')

let myStorage = window.localStorage;
checkbox.checked = myStorage.getItem('dark');
const body = document.querySelector('body');

checkbox.addEventListener('change', (e) => {
    if(e.target.checked)
    {
        body.classList.add('dark');
        if(inputPresent!=null)
        {
            document.querySelector('#input1').classList.add('dark')
            document.querySelector('#input2').classList.add('dark')
            document.querySelector('#result').classList.add('dark')
        }
        document.querySelector('#header-text').classList.add('dark')
        myStorage.setItem('dark', "true");
    }
    else
    {
        body.classList.remove('dark');
        if(inputPresent!=null)
        {
            document.querySelector('#input1').classList.remove('dark')
            document.querySelector('#input2').classList.remove('dark')
            document.querySelector('#result').classList.remove('dark')
        }
        document.querySelector('#header-text').classList.remove('dark')
        myStorage.setItem('dark', ""); 
    }
    
});


if(myStorage.getItem('dark') == 'true')
{
    body.classList.add('dark');
    if(inputPresent!=null)
    {
        document.querySelector('#input1').classList.add('dark')
        document.querySelector('#input2').classList.add('dark')
        document.querySelector('#result').classList.add('dark')
    }
    document.querySelector('#header-text').classList.add('dark')

}
else
{
    body.classList.remove('dark');
    if(inputPresent!=null)
    {
        document.querySelector('#input1').classList.remove('dark')
        document.querySelector('#input2').classList.remove('dark')
        document.querySelector('#result').classList.remove('dark')
    }
    document.querySelector('#header-text').classList.remove('dark')
}

// code to open website on same zoom-scale on all size of display devices
var scale = 'scale(1)';
 document.body.style.transform = scale;     // General

 


 