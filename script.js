let myStore = window.localStorage;
let letsCompute = document.querySelector('#letsCompute');
let newVis = document.querySelector('#new');
let operator = '+'
let operators = document.querySelectorAll('.operator');
let input = document.querySelectorAll('.inputss');
let input1 = document.querySelector('#input1');
let input2 = document.querySelector('#input2');
let kbuttons,numbers,op;
let vis = document.querySelector('#vis')
let visType = document.querySelectorAll('.visType')
let opbuttons = document.querySelector('.button-grp')
let keypad = document.querySelector('.disbuttonsK')
let main1 = document.querySelector('.main1')
let main4 = document.querySelector('.main4')
let upper = document.querySelector('.upper')
let keypadWrapper = document.createElement('div')
let current_in,curr_arr=[],num_count=0;
let stepStr,stepsArr=[];
let calcBtn = document.querySelector('#calcAnim');
let calcBtn2 = document.querySelector('#calcAnim2');
let input1_arr=[], input2_arr=[], index, output_arr=[];
let xno;
let xr;

visType.forEach(type => type.disabled = true)

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
                stepStr += `(${A[i]} * ${B[j]})x<sup>(${m-i-1}+${n-j-1})</sup>&emsp;+&emsp;`
                stepsArr.push(`(${A[i]} * ${B[j]})x<sup>(${m-i-1}+${n-j-1})</sup>&emsp;+&emsp;`)               
            }
        }
    }
    stepStr = stepStr.slice(0,-13)
    return prod;
}


function compute()
{
    
    if(input1_arr.length == 0 || input2_arr.length == 0) return;
    letsCompute.disabled = true
    visType.forEach(type => type.disabled = false)
    let calc_arr = [];
    stepStr = ''
    //sort the input arrays
    
    bblSort(input1_arr)
    
    bblSort(input2_arr)

    
    
    if(operator == '+')
    {
        stepStr = input1.innerHTML + '&emsp;+&emsp;' + input2.innerHTML + '<br><br>'
        
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
            
                    if(input1_arr[i].deg > 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`)
                    }
                    else if(input1_arr[i].deg == 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} + ${input2_arr[j].coeff})x&emsp;+&emsp;`)
                    }
                    else
                    {
                        stepStr += `(${input1_arr[i].coeff} + ${input2_arr[j].coeff})&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} + ${input2_arr[j].coeff})&emsp;+&emsp;`)
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
                    stepStr += `${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`)
                }
                else if(input1_arr[i].deg == 1)
                {
                    stepStr += `${input1_arr[i].coeff}x&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}x&emsp;+&emsp;`)
                }
                else
                {
                    stepStr += `${input1_arr[i].coeff}&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}&emsp;+&emsp;`)
                }
            }
        }

        

        for(let i = 0; i<input2_arr.length; i++)
        {
            let flag = false
            let poly_obj = {};
            
            for(let j = 0; j<calc_arr.length; j++)
            {
                if(input2_arr[i].deg === calc_arr[j])
                {
                    flag = true
                }
            }
            if(flag == false)
            {
                poly_obj.coeff = input2_arr[i].coeff
                poly_obj.deg = input2_arr[i].deg
                
                output_arr.push(poly_obj)

                if(input2_arr[i].deg > 1)
                {
                    stepStr += `${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&emsp;+&emsp;`
                    stepsArr.push(`${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&emsp;+&emsp;`)
                }
                else if(input2_arr[i].deg == 1)
                {
                    stepStr += `${input2_arr[i].coeff}x&emsp;+&emsp;`
                    stepsArr.push(`${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&emsp;+&emsp;`)
                }
                else
                {
                    stepStr += `${input2_arr[i].coeff}&emsp;+&emsp;`
                    stepsArr.push(`${input2_arr[i].coeff}&emsp;+&emsp;`)
                }
            }
        }
        stepStr = stepStr.slice(0,-13)
        

    }
    else if(operator == '-')
    {
        stepStr = input1.innerHTML + '&emsp;-&emsp;' + input2.innerHTML + '<br><br>'
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
                    
                    if(input1_arr[i].deg > 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`)
                    }
                    else if(input1_arr[i].deg == 1)
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} - ${input2_arr[j].coeff})x&emsp;+&emsp;`)
                    }
                    else
                    {
                        stepStr += `(${input1_arr[i].coeff} - ${input2_arr[j].coeff})&emsp;+&emsp;`
                        stepsArr.push(`(${input1_arr[i].coeff} - ${input2_arr[j].coeff})&emsp;+&emsp;`)
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
                    stepStr += `${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup>&emsp;+&emsp;`)
                }
                else if(input1_arr[i].deg == 1)
                {
                    stepStr += `${input1_arr[i].coeff}x&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}x&emsp;+&emsp;`)
                }
                else
                {
                    stepStr += `${input1_arr[i].coeff}&emsp;+&emsp;`
                    stepsArr.push(`${input1_arr[i].coeff}&emsp;+&emsp;`)
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
                    stepStr += `-${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&emsp;+&emsp;`
                    stepsArr.push(`-${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup>&emsp;+&emsp;`)
                }
                else if(input2_arr[i].deg == 1)
                {
                    stepStr += `-${input2_arr[i].coeff}x&emsp;+&emsp;`
                    stepsArr.push(`-${input2_arr[i].coeff}x&emsp;+&emsp;`)
                }
                else
                {
                    stepStr += `-${input2_arr[i].coeff}&emsp;+&emsp;`
                    stepsArr.push(`-${input2_arr[i].coeff}&emsp;+&emsp;`)
                }
            }
        }
        stepStr = stepStr.slice(0,-13)
        
    }
    else if(operator == '*')
    {
        stepStr = input1.innerHTML + '&emsp;*&emsp;' + input2.innerHTML + '<br><br>'
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

    stepStr += '<br><br>'+ans  
    document.querySelector('#result').innerHTML = ans
    document.querySelector('#steps').innerHTML = stepStr

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







let calcSwitch = true
let calcWrapper = document.createElement('div')
calcWrapper.classList.add('disbuttonsC')
calcWrapper.innerHTML = `<div id="displayC"></div>
                        <div class="buttonsC">
                        <div class="buttonC">C</div>
                        <div class="buttonC">/</div>
                        <div class="buttonC">*</div>
                        <div class="buttonC">&larr;</div>
                        <div class="buttonC">7</div>
                        <div class="buttonC">8</div>
                        <div class="buttonC">9</div>
                        <div class="buttonC">-</div>
                        <div class="buttonC">4</div>
                        <div class="buttonC">5</div>
                        <div class="buttonC">6</div>
                        <div class="buttonC">+</div>
                        <div class="buttonC">1</div>
                        <div class="buttonC">2</div>
                        <div class="buttonC">3</div>
                        <div class="buttonC">.</div>
                        <div class="buttonC">(</div>
                        <div class="buttonC">0</div>
                        <div class="buttonC">)</div>
                        <div id="equalC" class="buttonC">=</div>
                        </div>`

let quadWrapper = document.createElement('div')
quadWrapper.classList.add('quadContent')
quadWrapper.innerHTML = `<div class="quadHeader">Root Calculator: </div>
                    <input type="number" class="quadInput" id="quad1" value=0> <label>x<sup>2</sup>+</label>
                    <input type="number" class="quadInput" id="quad2" value=0> <label>x+</label>
                    <input type="number" class="quadInput" id="quad3" value=0>
                    <div><button class="quadCalcBtn">Calculate</button></div>`



function calcDispFn()
{
    if(calcSwitch)
    {
        main4.appendChild(calcWrapper)
        main4.appendChild(quadWrapper)
        let quadCalcBtn = document.querySelector('.quadCalcBtn')
        quadCalcBtn.addEventListener('click', quadCalc)
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
        calcSwitch = false
    }
    else
    {
        main4.removeChild(calcWrapper)
        main4.removeChild(quadWrapper)
        calcSwitch = true
    }
}

function quadCalc()
{
    let a = Number(document.querySelector('#quad1').value)
    let b = Number(document.querySelector('#quad2').value)
    let c = Number(document.querySelector('#quad3').value)
    let roots = document.createElement('div')
    if (quadWrapper.childNodes.length > 13) 
    {
        quadWrapper.removeChild(quadWrapper.lastChild)
    }
    roots.classList.add('quadRoots')
    if(a == 0) 
    {
        return;
    }
    console.log(quadWrapper.childNodes.length)
    
    let discriminant = b * b - 4 * a * c;

    // condition for real and different roots
    if (discriminant > 0) {
        let root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        let root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    
        // result
        roots.textContent = `Roots are ${root1} and ${root2}`
    }
    
    // condition for real and equal roots
    else if (discriminant == 0) {
        let root1 = -b / (2 * a);
    
        // result
        roots.textContent = `Roots are ${root1} and ${root1}`
    }
    
    // if roots are not real
    else {
        let realPart = (-b / (2 * a)).toFixed(2);
        let imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
    
        // result
        roots.textContent = `Roots are ${realPart} + ${imagPart}i and ${realPart} - ${imagPart}i`
      
    }

    

    quadWrapper.appendChild(roots)
}

calcBtn.addEventListener('click', calcDispFn)
calcBtn2.addEventListener('click', calcDispFn)



function arrToString(arr)
{
    let str = ''
    let temp = ''
    arr.forEach(el => 
        {

            if(el.coeff != 0 )
            {
                if(el.deg > 1)
                {
                    temp = el.coeff + `x^${el.deg}`
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
    if(str.charAt(0) == '+')
    {
        str = str.substring(1)
    }
    return str;
}

function time(ms)
{
    return new Promise( (resolve,reject)=>{
        setTimeout(resolve,ms)
    } )
}

function visFn(e)
{
    let sel = false
    vis.innerHTML = ''
    if(e.target.innerHTML == 'Graphical')
    {

        let calculator = Desmos.GraphingCalculator(vis, {keypad: false, expressionsTopbar: false, expressions: false});
        str1 = arrToString(input1_arr)
        str2 = arrToString(input2_arr)
        str3 = arrToString(output_arr)
        console.log(str1,str2,str3)
        calculator.setExpression({ id: 'g', latex: str1, color: Desmos.Colors.ORANGE});
        calculator.setExpression({ id: 'h', latex: str2, color: Desmos.Colors.GREEN});
        calculator.setExpression({ id: 'f', latex: str3, color: '#ff007f'});
        return
    }
    
    let stepsArrDup = [...stepsArr]
    vis.innerHTML = `
            <div id="desp1"></div>
            <div id="vis1"></div>
            <div id="desp2"></div>
            <div id="vis2"></div>
            <div id="desp3"></div>
            <div id="vis3"></div>`
    if(operator == '*')
    {
        for(let i=0; i<input1_arr.length; i++)
        {
            document.querySelector('#vis1').innerHTML += `<span id="inp1_${i}">${input1_arr[i].coeff}x<sup>${input1_arr[i].deg}</sup></span>+`
            if(i+1 != input1_arr.length&&input1_arr[i+1].coeff < 0)
            {
                document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
                
            }      
        }
        document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
        
        document.querySelector('#vis1').innerHTML += `&emsp;*&emsp;`
        
        for(let i=0; i<input2_arr.length; i++)
        {
            document.querySelector('#vis1').innerHTML += `<span id="inp2_${i}">${input2_arr[i].coeff}x<sup>${input2_arr[i].deg}</sup></span>+`    
            if(i+1 != input2_arr.length&&input2_arr[i+1].coeff < 0)
            {
                document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
                
            }       
        }
        document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
        
        
        document.querySelector('#vis2').innerHTML = '<br>'
        document.querySelector('#desp1').innerHTML = 'Multiplying every term of both polynomials with each other: <br><br>'
        let i = 0
        let j = 0
        async function multLoop1()
        {
            
            for(let k=0; k<input2_arr.length; k++)
            {
                document.querySelector(`#inp2_${k}`).className = ''       
            }
            document.querySelector(`#inp1_${i}`).classList.add('selected_el')
            await time(1000)
            multLoop2()
            await time(3000*input2_arr.length)
            
            i++
            if(i<input1_arr.length)
            {
                j=0;
                document.querySelector(`#inp1_${i-1}`).classList.remove('selected_el')
                multLoop1()
            }
            else if(i==input1_arr.length)
            {
                document.querySelector(`#inp1_${i-1}`).classList.remove('selected_el')
                document.querySelector('#vis2').innerHTML = document.querySelector('#vis2').innerHTML.slice(0,-3)
                
                let ans = opArrToString(output_arr)
                if(ans.charAt(0) == '+')
                {
                    ans = ans.slice(1);
                }
                document.querySelector('#desp3').innerHTML = '<br>Final Result'
                document.querySelector('#vis3').innerHTML = '<br>'+ans
            }
        }
        multLoop1();
        async function multLoop2()
        {
            document.querySelector('#desp2').innerHTML = '<br>Simplifying: '
            document.querySelector(`#inp2_${j}`).classList.add('selected_el')
            
            await time(1000)
            document.querySelector(`#inp2_${j}`).classList.add('green')
            document.querySelector(`#inp1_${i}`).classList.add('green')
            await time(1000)
            document.querySelector(`#inp1_${i}`).classList.remove('green')
            document.querySelector(`#inp2_${j}`).className = ''
            document.querySelector('#vis2').innerHTML += stepsArrDup.shift()
            j++
            if(j<input2_arr.length)
            {
                multLoop2()
            }
        }
        return
    }

    for(let i=0; i<input1_arr.length; i++)
    {
        document.querySelector('#vis1').innerHTML += `${input1_arr[i].coeff}<span id="inp1_${i}">x<sup>${input1_arr[i].deg}</sup></span>+`
        if(i+1 != input1_arr.length&&input1_arr[i+1].coeff < 0)
        {
            document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
            
        }      
    }
    document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
    if(operator == '+')
    {
        document.querySelector('#vis1').innerHTML += `&emsp;+&emsp;`
    }
    else if(operator == '-')
    {
        document.querySelector('#vis1').innerHTML += `&emsp;-&emsp;`
    }
    for(let i=0; i<input2_arr.length; i++)
    {
        document.querySelector('#vis1').innerHTML += `${input2_arr[i].coeff}<span id="inp2_${i}">x<sup>${input2_arr[i].deg}</sup></span>+`    
        if(i+1 != input2_arr.length&&input2_arr[i+1].coeff < 0)
        {
            document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
            
        }       
    }
    document.querySelector('#vis1').innerHTML = document.querySelector('#vis1').innerHTML.slice(0,-1)
    
    
    document.querySelector('#vis2').innerHTML = '<br>'
    document.querySelector('#desp1').innerHTML = 'Comparing the degree of the polynomial terms: <br><br>'
    
    let i = 0
    let j = 0
    async function loop1()
    {    
        sel = false
        for(let k=0; k<input2_arr.length; k++)
        {
            document.querySelector(`#inp2_${k}`).className = ''       
        }
        document.querySelector(`#inp1_${i}`).classList.add('selected_el')
        await time(1000)
        loop2()
        while (true)
        {
            await time(3000)
            if(sel)
            {
                break;
            }
        }
        
    
        i++
        if(i <= input1_arr.length)
        { 
            j = 0
            let temp = i-1
            document.querySelector(`#inp1_${temp}`).className = ''
            for(let k=0; k<input2_arr.length; k++)
            {
                document.querySelector(`#inp2_${k}`).className = ''       
            }
            document.querySelector('#vis2').innerHTML += stepsArrDup.shift()
            if(i != input1_arr.length)
            {
                loop1()
            }    
            else if(i == input1_arr.length)
            {
                for(let k=0; k<stepsArrDup.length; k++)
                {
                    document.querySelector('#vis2').innerHTML += stepsArrDup[k];      
                }
                document.querySelector('#vis2').innerHTML = document.querySelector('#vis2').innerHTML.slice(0,-3)
                await time(2000)
                let ans = opArrToString(output_arr)
                if(ans.charAt(0) == '+')
                {
                    ans = ans.slice(1);
                }
                document.querySelector('#desp3').innerHTML = '<br>Final Result: '
                document.querySelector('#vis3').innerHTML = '<br>'+ans
            }
        } 
    }
    loop1()
    
    

    async function loop2()
    {

        document.querySelector(`#inp2_${j}`).classList.add('selected_el')
        await time(2000)
        j++
        document.querySelector('#desp2').innerHTML = '<br>Simplifying: '
        let temp = j-1
        if(input2_arr[temp].deg == input1_arr[i].deg)
        {
            document.querySelector(`#inp2_${temp}`).classList.remove('selected_el')
            document.querySelector(`#inp1_${i}`).className = ''
            document.querySelector(`#inp2_${temp}`).classList.add('green')
            document.querySelector(`#inp1_${i}`).classList.add('green')
            document.querySelector(`#inp1_${i}`).classList.add('selected_el')
            sel = true
        }
        else if(j < input2_arr.length)
        {
            
            document.querySelector(`#inp1_${i}`).classList.add('red')
            document.querySelector(`#inp2_${temp}`).classList.add('red')
            await time(1000)
            document.querySelector(`#inp2_${temp}`).className = ''
            document.querySelector(`#inp1_${i}`).className = ''
            document.querySelector(`#inp1_${i}`).classList.add('selected_el')
            loop2()
        } 
        else if(j == input2_arr.length)
        {
            document.querySelector(`#inp1_${i}`).classList.add('red')
            document.querySelector(`#inp2_${temp}`).classList.add('red')
            await time(1000)
            document.querySelector(`#inp2_${temp}`).className = ''
            document.querySelector(`#inp1_${i}`).className = ''
            document.querySelector(`#inp1_${i}`).classList.add('green')
            sel = true

        }
    }

    
}


visType.forEach(type => type.addEventListener('click',visFn))
newVis.addEventListener('click', clearAll)

function clearAll()
{
    input1.innerHTML = ''
    input2.innerHTML = ''
    document.querySelector('#result').innerHTML = ''
    document.querySelector('#steps').innerHTML = ''
    stepStr = ''
    stepsArr = []
    visType.forEach(type => type.disabled = true)
    input1_arr = []
    input2_arr = []
    output_arr=[];
    vis.innerHTML = ''
    letsCompute.disabled = false
}
