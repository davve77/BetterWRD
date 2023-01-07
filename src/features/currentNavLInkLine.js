// Name: Line below current nav bar link
// Desc: Adds a small line below the current active nav bar link

if(document.querySelector('.navItems')){

    const navItems = document.querySelectorAll('.navItem')

    // CSS
    bwrd.injectStyle(`
    .currentNavItem::after{
        content: '';
        position: absolute;
        bottom: -2px;
        height: 2px;
        left: 50%;
        transform: translateX(-50%);
        background: #f5f5f5db;
        animation: 250ms cubic-bezier(0,0,0,1) current-nav-anim 150ms forwards;
    }
    @keyframes current-nav-anim{
        0% { width: 0px; }
        100% { width: 25px; }
    }`)

    // Set class
    switch(true){
        case location.host.split('.')[0] == 'forum':
            navItems[0].classList.add('currentNavItem')
            break

        case (/scripts/).test(location.pathname):
            navItems[1].classList.add('currentNavItem')
            break

        case (/exploits|dinfo|\/d\//).test(location.pathname):
            navItems[0].classList.add('currentNavItem')
    }
}