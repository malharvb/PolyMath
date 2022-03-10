let myStore = window.localStorage;
let letsCompute = document.querySelector('#letsCompute');
let operator = '+'
let operators = document.querySelectorAll('.operator');
let letsCompLink = document.querySelector('#letsCompLink');
let input = document.querySelectorAll('.inputss');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let kbuttons
let opbuttons = document.querySelector('.button-grp')
let keypad = document.querySelector('.disbuttonsK')
let main1 = document.querySelector('.main1')
let numbers
let op
let keypadWrapper = document.createElement('div')
let current_in,curr_arr=[],num_count=0;
let stepStr;

let input1_arr=[], input2_arr=[], index, output_arr=[];
let xno;
let xr;



function populateKeypad(kswitch)
{
    if(!kswitch) 
    {
        main1.removeChild(main1.children[1])
        return;
    }

    keypadWrapper.innerHTML = `<div class="disbuttonsK">
    <div class="buttonsK">
        <button class="buttonK number">1</button>
        <button class="buttonK number">2</button>
        <button class="buttonK number">3</button>
        <button class="buttonK">&larr;</button>
        <button class="buttonK number">4</button>
        <button class="buttonK number">5</button>
        <button class="buttonK number">6</button>
        <button class="buttonK op">+</button>
        <button class="buttonK number">7</button>
        <button class="buttonK number">8</button>
        <button class="buttonK number">9</button>
        <button class="buttonK op">-</button>
        <button class="buttonK" id="xr">x^</button>
        <button class="buttonK number">0</button>
        <button class="buttonK" id="xno">x</button>
        <button id="equalK" class="buttonK">Done</button>
    </div>
    </div>`
    main1.insertBefore(keypadWrapper, main1.children[1])
}   



function callk(e)
{   
    
    
    if(e.target.disabled == true) return;
    if(e.target.id == "input1")
    {
        populateKeypad(true)
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
        populateKeypad(true)
        input2.disabled = true
        input1.disabled = true
        input2.classList.add('selected')
        input1.classList.remove('selected')

        current_in = input2;
        
    }
    kbuttons = document.querySelectorAll('.buttonK')
    kbuttons.forEach(a => a.addEventListener('click',kinput))
    op = document.querySelectorAll('.op');
    numbers = document.querySelectorAll('.number');
    op.forEach(no => no.disabled = false);
    numbers.forEach(n=> n.disabled = false);
    xr = document.querySelector('#xr')
    xr.disabled = false 
    xno = document.querySelector('#xno')
    xno.disabled = false
    num_count = 0;
}

function kinput(e)
{
    if(current_in.innerHTML == 0) current_in.innerHTML = '';
    console.log('here')
    

    if(e.target.innerHTML == 'Done')
    {
        populateKeypad(false)
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
            num_count++
        }
        if(num_count >= 1)
        {
            numbers.forEach(n=> n.disabled = true)
        }
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
    
    for(let i = 0; i < m ; i++)
    {       
        for (let j = 0; j < n ; j++)
        {
            prod[i + j] += A[i] * B[j];
            if(A[i] != 0 && B[j] != 0)
            {
                stepStr += `(${A[i]} * ${B[j]})x<sup>(${m-i-1}+${n-j-1})</sup>&nbsp;&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;&nbsp;`                
            }
        }
    }
    stepStr = stepStr.slice(0,-26)
    return prod;
}


function compute()
{
    
    
    let calc_arr = [];
    if(input1_arr.length == 0 || input2_arr.length == 0) return;
    stepStr = ''
    //sort the input arrays
    
    bblSort(input1_arr)
    
    bblSort(input2_arr)

    
    
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
            let poly_obj = {};
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
        stepStr = input1.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;*&nbsp;&nbsp;&nbsp;&nbsp;' + input2.innerHTML + '<br>'
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

        
        let prodArr = multiply(a,b);

        for(let i = prodArr.length-1; i >= 0 ; i--)
        {
            let poly_obj = {}
            poly_obj.coeff = prodArr[prodArr.length - i -1]
            poly_obj.deg = i
            output_arr.push(poly_obj)

        }

        
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

