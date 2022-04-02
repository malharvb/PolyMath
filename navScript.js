
(() => {

let hamburger = document.querySelector('.hamburger');
let i = document.createElement('i');
i.classList.add('fas');
i.classList.add('fa-bars');
let mobileNav = document.querySelector('.mobile-view');


let flag = true;

function addMobileNav()
{
    if(flag)
    {
        hamburger.textContent = '×';
        mobileNav.style.cssText = "display: flex;"
        flag = false;
    }
    else
    {
        hamburger.textContent = '';
        hamburger.appendChild(i);
        mobileNav.style.cssText = "display: none;"
        flag = true;
    }
}
hamburger.addEventListener('click',addMobileNav)
})();
