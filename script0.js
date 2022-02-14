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

let input1_arr=[], input2_arr=[], index, output_arr=[];
let xno = document.querySelector('#xno')
let xr = document.querySelector('#xr')
keypad.style.visibility = 'hidden'

function callk(e)
{   
    op.forEach(no => no.disabled = false);
    numbers.forEach(n=> n.disabled = false);
    xr.disabled = false 
    xno.disabled = false
    num_count = 0;
    
    if(e.target.disabled == true) return;
    if(e.target.id == "input1")
    {
        keypad.style.visibility = 'visible'
        opbuttons.style.visibility = 'hidden'
        input1.disabled = true
        input2.disabled = true
        input1.classList.add('selected')
        input2.classList.remove('selected')
        current_in = input1;
        
        
    }
    if(e.target.id == "input2")
    {
        opbuttons.style.visibility = 'hidden'
        keypad.style.visibility = 'visible'
        input2.disabled = true
        input1.disabled = true
        input2.classList.add('selected')
        input1.classList.remove('selected')

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
        input1.disabled = false
        input2.disabled = false
        input1.classList.remove('selected')
        input2.classList.remove('selected')

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
    else if((current_in==input2))
    {
        curr_arr = input2_arr;
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

    
    if(current_in==input2)
    {
        test = curr_arr;
    }
    
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
    
    
    let calc_arr = [];
    if(input1_arr.length == 0 || input2_arr.length == 0) return;
    let stepStr = ''
    //sort the input arrays
    //console.log(input1_arr,input2_arr)
    bblSort(input1_arr)
    //console.log(input1_arr,input2_arr)
    bblSort(input2_arr)

    //console.log(input1_arr,input2_arr)
    
    if(operator == '+')
    {
        stepStr = input1.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;' + input2.innerHTML + '<br>'
        
        for(let i = 0; i<input1_arr.length; i++)
        {
            let flag = false;
            let poly_obj = {};
            for(let j = 0; j<input2_arr.length; j++)
            {
                if(input1_arr[i].deg == input2_arr[j].deg)
                {
                    poly_obj.coeff = input1_arr[i].coeff +  input2_arr[j].coeff
                    poly_obj.deg = input1_arr[i].deg
                    output_arr.push(poly_obj)
                    calc_arr.push(input1_arr[i].deg)
                    //console.log('1' + poly_obj)
                    if(input1_arr[i].deg > 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    else if(input1_arr[i].deg == 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    else
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    flag = true

                }
            }
            if(flag == false)
            {
                poly_obj.coeff = input1_arr[i].coeff
                poly_obj.deg = input1_arr[i].deg
                output_arr.push(poly_obj)
                //console.log('1' + poly_obj)
                if(input1_arr[i].deg > 1)
                {
                    stepStr += `${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else if(input1_arr[i].deg == 1)
                {
                    stepStr += `${input1_arr[i].coeff}x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else
                {
                    stepStr += `${input1_arr[i].coeff}&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
            }
        }

        

        for(let i = 0; i<input2_arr.length; i++)
        {
            let flag = false
            let poly_obj = {};
            console.log(calc_arr)
            for(let j = 0; j<calc_arr.length; j++)
            {
                if(input2_arr[i].deg === calc_arr[j])
                {
                    console.log('here')
                    flag = true
                }
            }
            if(flag == false)
            {
                poly_obj.coeff = input2_arr[i].coeff
                poly_obj.deg = input2_arr[i].deg
                //console.log('2' + poly_obj.coeff  + poly_obj.deg)
                output_arr.push(poly_obj)

                if(input2_arr[i].deg > 1)
                {
                    stepStr += `${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else if(input2_arr[i].deg == 1)
                {
                    stepStr += `${input2_arr[i].coeff}x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else
                {
                    stepStr += `${input2_arr[i].coeff}&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
            }
        }
        stepStr = stepStr.slice(0,-26)
        console.log(output_arr)

    }
    else if(operator == '-')
    {
        stepStr = input1.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + input2.innerHTML + '<br>'
        for(let i = 0; i<input1_arr.length; i++)
        {
            let flag = false;
            let poly_obj = {};
            for(let j = 0; j<input2_arr.length; j++)
            {
                if(input1_arr[i].deg == input2_arr[j].deg)
                {
                    poly_obj.coeff = input1_arr[i].coeff -  input2_arr[j].coeff
                    poly_obj.deg = input1_arr[i].deg
                    
                    output_arr.push(poly_obj)
                    calc_arr.push(input1_arr[i].deg)
                    //console.log('1' + poly_obj.coeff  + poly_obj.deg)
                    if(input1_arr[i].deg > 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    else if(input1_arr[i].deg == 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    else
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                    }
                    flag = true

                }
            }
            if(flag == false)
            {
                poly_obj.coeff = input1_arr[i].coeff
                poly_obj.deg = input1_arr[i].deg
                output_arr.push(poly_obj)
                if(input1_arr[i].deg > 1)
                {
                    stepStr += `${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else if(input1_arr[i].deg == 1)
                {
                    stepStr += `${input1_arr[i].coeff}x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else
                {
                    stepStr += `${input1_arr[i].coeff}&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
            }
        }

        

        for(let i = 0; i<input2_arr.length; i++)
        {
            let flag = false
            
            for(let j = 0; j<calc_arr.length; j++)
            {
                if(input2_arr[i].deg == calc_arr[j])
                {
                    flag = true
                }
            }
            if(flag == false)
            {
                poly_obj.coeff = -input2_arr[i].coeff
                poly_obj.deg = input2_arr[i].deg
                
                output_arr.push(poly_obj)

                if(input2_arr[i].deg > 1)
                {
                    stepStr += `-${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else if(input2_arr[i].deg == 1)
                {
                    stepStr += `-${input2_arr[i].coeff}x&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
                else
                {
                    stepStr += `-${input2_arr[i].coeff}&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`
                }
            }
        }
        stepStr = stepStr.slice(0,-26)
        console.log(output_arr)
    }
    else if(operator == '*')
    {
        
        let a = []

        for(let i = input1_arr[0].deg; i >= 0; i--)
        {
            let flag = false
            for(let j = 0; j < input1_arr.length; j++)
            {
                if(i == input1_arr[j].deg)
                {
                    a.push(input1_arr[j].coeff)
                    flag = true
                }
            }

            if(flag == false)
            {
                a.push(0)
            }
        }
        
        let b = []
        for(let i = input2_arr[0].deg; i >= 0; i--)
        {
            let flag = false
            for(let j = 0; j < input2_arr.length; j++)
            {
                if(i == input2_arr[j].deg)
                {
                    b.push(input2_arr[j].coeff)
                    flag = true
                }
            }

            if(flag == false)
            {
                b.push(0)
            }
        }

        console.log(a)
        console.log(b)
        
        let prodArr = multiply(a,b);

        for(let i = prodArr.length-1; i >= 0 ; i--)
        {
            let poly_obj = {}
            poly_obj.coeff = prodArr[prodArr.length - i -1]
            poly_obj.deg = i
            output_arr.push(poly_obj)

        }

        console.log(output_arr)
    }

    bblSort(output_arr)
    let ans = opArrToString(output_arr)
    
    if(ans.charAt(0) == '+')
    {
        ans = ans.slice(1);
    }

    stepStr += '<br>'+ans  
    myStore.setItem('computedAns', ans);
    myStore.setItem('steps', stepStr)

}

function opSelect(e)
{   
    operators.forEach(op => op.classList.remove('selected_op'))
    operator = e.target.innerHTML;
    e.target.classList.add('selected_op')
}

function opArrToString(arr)
{
    let str = ''
    let temp = ''
    arr.forEach(el => 
        {

            if(el.coeff != 0 )
            {
                if(el.deg > 1)
                {
                    temp = el.coeff + `x<sup>${el.deg}</sup>`
                }
                else if(el.deg == 1)
                {
                    temp = el.coeff + 'x'
                }
                else if(el.deg == 0)
                {
                    temp = el.coeff
                }



                if(el.coeff > 0)
                {
                    temp = '+' + temp
                }
                

                str += temp

            }
        })
    
    return str;
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

