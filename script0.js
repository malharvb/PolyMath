let myStore = window.localStorage;
let pow3 = 0, pow2 = 0, pow1 = 0, pow0 = 0;
let letsCompute = document.querySelector('#letsCompute');
let operator = '+'
let operators = document.querySelectorAll('.operator');

function compute()
{
    if(operator == '+')
    {
        pow3 = parseInt(document.querySelector('#input-1').value) + parseInt(document.querySelector('#input-5').value);
        pow2 = parseInt(document.querySelector('#input-2').value) + parseInt(document.querySelector('#input-6').value);
        pow1 = parseInt(document.querySelector('#input-3').value) + parseInt(document.querySelector('#input-7').value);
        pow0 = parseInt(document.querySelector('#input-4').value) + parseInt(document.querySelector('#input-8').value);
    }
    else if(operator == '-')
    {
        pow3 = parseInt(document.querySelector('#input-1').value) - parseInt(document.querySelector('#input-5').value);
        pow2 = parseInt(document.querySelector('#input-2').value) - parseInt(document.querySelector('#input-6').value);
        pow1 = parseInt(document.querySelector('#input-3').value) - parseInt(document.querySelector('#input-7').value);
        pow0 = parseInt(document.querySelector('#input-4').value) - parseInt(document.querySelector('#input-8').value);  
    }
    

    let str = '';
    if(operator == '+' || operator == '-')
    {
        if(pow3 != 0)
        {
            
            str += `${pow3}x<sup>3</sup>`;
        }
        if(pow2 != 0)
        {
            if(pow2 > 0)
                pow2 = ' + ' + pow2;
            
            
            str += `${pow2}x<sup>2</sup>`;
        }
        if(pow1 != 0)
        {
            if(pow1 > 0)
                pow1 = ' + ' + pow1;
            
            str += `${pow1}x`;
        }
        if(pow0 != 0)
        {
            if(pow0 > 0)
                pow0 = ' + ' + pow0;
           
            str += `${pow0}`;
        }
    }    
    
    
    myStore.setItem('computedAns', str);

}

function opSelect(e)
{
    operator = e.target.innerHTML;
}

operators.forEach(operator => operator.addEventListener('click',opSelect))


letsCompute.addEventListener('click', compute);
