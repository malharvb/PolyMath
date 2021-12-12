let myStore = window.localStorage;
let pow3 = 0, pow2 = 0, pow1 = 0, pow0 = 0;
let letsCompute = document.querySelector('#letsCompute');
let operator = '+'
let operators = document.querySelectorAll('.operator');

function multiply(A, B)
{
    let prod = [];
    let m = A.length;
    let n = B.length;
    for (let i = 0; i < m + n - 1; i++) prod[i] = 0;
    
    for(let i = 0; i < m ; i++){
        
        for (let j = 0; j < n ; j++)
            prod[i + j] += A[i] * B[j];
    }
    return prod;
}
function compute()
{
    let str = '';

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
    else if(operator == '*')
    {
        
        let a = []
        for(let i = 4; i>0; i--) a[4-i] = document.querySelector(`#input-${i}`).value;
        
        let b = []
        for(let i = 8; i>4; i--) b[8-i] = document.querySelector(`#input-${i}`).value;


        
        let prodArr = multiply(a,b);

        for (let i = prodArr.length-1; i >= 0 ; i--)
        {
            if(prodArr[i] != 0)
            {   
                
                if (i != prodArr.length-1)
                {
                    if(prodArr[i] > 0)
                    str += ' + ';
                }
                str += prodArr[i];
                if (i != 0 && i != 1)
                    str +="x<sup>"+i+"</sup>";
                if (i == 1)
                    str +="x";
            }
        }

        
    }

    

    
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
    
           
    if(str.charAt(1) == '+')
        str = str.substr(2);
    
    
    myStore.setItem('computedAns', str);

}

function opSelect(e)
{   
    operators.forEach(op => op.style.cssText = "background-color: rgb(26, 26, 252); border: none;")
    operator = e.target.innerHTML;
    e.target.style.cssText = "background-color: rgb(33, 129, 255); border: 2px solid cyan;";
}

operators.forEach(operator => operator.addEventListener('click',opSelect))


letsCompute.addEventListener('click', compute);
