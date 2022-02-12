let myStore = window.localStorage;
let letsCompute = document.querySelector('#letsCompute');
let operator = '+'
let operators = document.querySelectorAll('.operator');
let letsCompLink = document.querySelector('#letsCompLink');
let input = document.querySelectorAll('.inputss');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let kbuttons = document.querySelectorAll('.buttonK')
let opbuttons = document.querySelector('.buttonn')
let keypad = document.querySelector('.disbuttonsK')
let numbers = document.querySelectorAll('.number');
let op = document.querySelectorAll('.op');
let current_in,curr_arr=[],num_count=0;
let input1_arr=[], input2_arr=[], index;
let xno = document.querySelector('#xno')
let xr = document.querySelector('#xr')
keypad.style.visibility = 'hidden'

function callk(e)
{   
    op.forEach(no => no.disabled = false);
    numbers.forEach(n=> n.disabled = false);
    xr.disabled = false 
    xno.disabled = false

    if(e.target.id == "input1")
    {
        keypad.style.visibility = 'visible'
        opbuttons.style.visibility = 'hidden'
        input1.disabled = true
        input1.classList.add('selected')
        input2.classList.remove('selected')
        input2.disabled = false
        current_in = input1;
    }
    if(e.target.id == "input2")
    {
        opbuttons.style.visibility = 'hidden'
        keypad.style.visibility = 'visible'
        input2.disabled = true
        input2.classList.add('selected')
        input1.classList.remove('selected')
        input1.disabled = false
        current_in = input2;
    }
    
}

function kinput(e)
{
    if(current_in.innerHTML == 0) current_in.innerHTML = '';
    
    

    if(e.target.innerHTML == 'Done')
    {
        keypad.style.visibility = 'hidden'
        opbuttons.style.visibility = 'visible'
        current_in.disabled = false
        //current_in.innerHTML = '+' + current_in.innerHTML
        createPolyArr(current_in.innerHTML);
    }
    else if(e.target.id == 'xr' || e.target.id == 'xno')
    {
        num_count=0;
        if(e.target.id == 'xr')
        {
            xr.disabled = true  
            xno.disabled = true
            op.forEach(no => no.disabled = true)
            numbers.forEach(no => no.disabled = false)
        }
        else
        {
            xr.disabled = true 
            xno.disabled = true
            op.forEach(no => no.disabled = false)
            numbers.forEach(no => no.disabled = true)
        }
        current_in.innerHTML += e.target.innerHTML
    }
    else if(e.target.classList[1] == 'op')
    {
        num_count=0;
        xr.disabled = false  
        xno.disabled = false
        op.forEach(no => no.disabled = true)
        numbers.forEach(n=> n.disabled = false)
        current_in.innerHTML += e.target.innerHTML
    }
    else
    {
    
        if(num_count < 1)
        {
            op.forEach(no => no.disabled = false)
            if(current_in.innerHTML.charAt(current_in.innerHTML.length - 1) == '^')
            {
                current_in.innerHTML = current_in.innerHTML.slice(0,-1)
                current_in.innerHTML += `<sup>${e.target.innerHTML}</sup>`
            }
            else
            {
                current_in.innerHTML += e.target.innerHTML
            }
        }
        num_count++
    }    
}

function createPolyArr(str)
{
    //checks for which input is currently selected
    if(current_in==input1)
    {
        curr_arr = input1_arr;
    }
    else
    {
        curr_arr = input2_arr
    }

    //splits string for + sign 
    temp_arr = str.split(/[+]/)

    //spits - sign and adds - sign the term containing it
    temp_arr.forEach(el => {
        arr = el.split('-')
        
        if(arr.length >= 2)
        {
            index = temp_arr.indexOf(el)
            temp_arr.splice(index, 1);
            if(arr[0] == '')
            {
                arr.shift()
                arr.forEach(a => {
                a = '-' + a;
                temp_arr.push(a)
            
                })
                
            }
            else
            {
                arr.forEach(a => {
                    if(arr.indexOf(a) != 0)
                    {
                        a = '-' + a
                    }    
                    temp_arr.push(a)
                })
            }
            
        }

        
    })

    //converting the array with individual polynomial term arrays to only degree and coefficient
    temp_arr.forEach(el => {
        
        poly_obj = {}
        if(el[0] != '-' && (el[1] == 'x' || el[2] == 'x'))
        {
            if(el.length == 2)
            {
                poly_obj.coeff = parseInt(el[0]);
                poly_obj.deg = 1
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 3)
            {
                poly_obj.coeff = parseInt(el[0]+el[1]);
                poly_obj.deg = 1
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 14)
            {
                poly_obj.coeff = parseInt(el[0]+el[1]);
                poly_obj.deg = parseInt(el[7])
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 15)
            {
                poly_obj.coeff = parseInt(el[1]);
                poly_obj.deg = parseInt(el[8])
                
                curr_arr.push(poly_obj)
            }
        }
        else if(el[2] == 'x' || el[0] == 'x' || el[1] == 'x')
        {
            if(el.length == 1)
            {
                poly_obj.coeff = 1;
                poly_obj.deg = 1
                
                curr_arr.push(poly_obj)
            }
            if(el.length == 2)
            {
                poly_obj.coeff = -1;
                poly_obj.deg = 1
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 3)
            {
                poly_obj.coeff = parseInt(el[0]+el[1]);
                poly_obj.deg = 1
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 13)
            {
                
                poly_obj.coeff = 1;
                poly_obj.deg = parseInt(el[6])
                
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 14)
            {
                if(el[0] != '-')
                {
                    poly_obj.coeff = parseInt(el[0]+el[1]);
                }
                else
                {
                    poly_obj.coeff = -1
                }
                poly_obj.deg = parseInt(el[7])
                
                
                curr_arr.push(poly_obj)
            }
            else if(el.length == 15)
            {
                poly_obj.coeff = parseInt(el[0] + el[1]);
                poly_obj.deg = parseInt(el[8])
                
                
                curr_arr.push(poly_obj)
            }
        }
        else
        {
            if(el.length == 2)
            {
                poly_obj.coeff = parseInt(el);
                poly_obj.deg = 0
                
                curr_arr.push(poly_obj)
            }
            else if (el.length == 1)
            {
                poly_obj.coeff = parseInt(el[0]);
                poly_obj.deg = 0
                
                curr_arr.push(poly_obj)
            }
        }
       

    })

    console.log(input1_arr)
}


input1.addEventListener('click',callk)
input2.addEventListener('click',callk)
kbuttons.forEach(a => a.addEventListener('click',kinput))


//bubble sort to sort both input arrays in descending powers
function bblSort(arr){
     
    for(let i = 0; i < arr.length; i++)
    {
        
      for(let j = 0; j < ( arr.length - i -1 ); j++)
      {
          
        if(arr[j].deg < arr[j+1].deg)
        {
    
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
    
    console.log(arr);
}


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
    let temp = ''

    //sort the input arrays
    bblSort(input1_arr)
    bblSort(input2_arr)
    
    if(operator == '+')
    {
        for(let i = 0; i<input1_arr.length; i++)
        {
            for(let j = 0; j<input2_arr.length; j++)
            {
                if(input1_arr[i].deg == input2_arr[j].deg)
                {
                    temp += (input1_arr[i].deg +  input2_arr[j].deg) + 'x' + `<sup>${input1_arr[1].deg}</sup>`
            
                }
            }
        }
    }
    else if(operator == '-')
    {
       
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

    

    
    
    
           
    if(str.charAt(1) == '+')
        str = str.substring(2);
    
    
    myStore.setItem('computedAns', str);

}

function opSelect(e)
{   
    operators.forEach(op => op.style.cssText = "background-color: rgb(26, 26, 252); border: none;")
    operator = e.target.innerHTML;
    e.target.style.cssText = "background-color: rgb(33, 129, 255); border: 2px solid cyan;";
}

input.forEach(inp => inp.addEventListener('click', e => {setTimeout(function(){if(e.target.innerHTML == '') e.target.value = '0';},6000);}));

operators.forEach(operator => operator.addEventListener('click',opSelect))


letsCompute.addEventListener('click', compute);



let calc = document.querySelector('i');
checked = true;
document.querySelector('.disbuttonsC').style.visibility = 'hidden';


calc.addEventListener('click', () => {
    
    if(checked)
    {
        document.querySelector('.disbuttonsC').style.cssText = 'transition: all 0.4s ease-in-out;transform: translate(-150px);opacity: 100%;'
        checked = false;
    }
    else
    {
        document.querySelector('.disbuttonsC').style.cssText = 'left: 10000px;transition: all 0.4s ease-in-out;transform: translate(100px);opacity: 0;'
        checked = true;
    }

})

