// Name: Auto-hide navigation bar
// Desc: Slides the nav bar out of view when it isn't being used


if(document.querySelector('.navItems')){

    let navBar = document.querySelector('#navigationbar')

    bwrd.injectStyle(`
    .autoHideNavbar     {transform: translateY(-33px);}
    .autoHideNavbar *   {opacity: 0;}
    #navigationbar *    {transition: linear 120ms opacity;}
    #navigationbar      {transition: transform 250ms cubic-bezier(0.85, 0, 0, 1);}`)

    navBar.classList.add('autoHideNavbar')

    function hideShow(option){
        if(option == 'show') navBar.classList.remove('autoHideNavbar')
        if(option == 'hide') navBar.classList.add('autoHideNavbar')
    }

    document.body.addEventListener('mouseover', e => {
        if(navBar.contains(e.target)) hideShow('show')
        else hideShow('hide')
    })

    setTimeout(()=> {
        if(/blur/.test(getComputedStyle(navBar).backdropFilter)){
            navBar.style.setProperty('backdrop-filter', 'none', 'important')
        }
    })
}