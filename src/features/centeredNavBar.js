// Name: Centered Navigation Bar
// Desc: Centers the nav bar links

if(document.querySelector('.navItems')){

    // Remove hidden blog link
    const blogAd = document.querySelector('.adTip')
    if(blogAd) blogAd.remove()

    // Consts
    const isForumSubdomain = location.host.split('.')[0] == 'forum'
    const navItemsDiv = document.querySelector('.navItems')
    const navItems = navItemsDiv.children
    const centerDiv = document.createElement('div')
    const deleteLinks = []
    
    // Insert div
    navItemsDiv.insertBefore(centerDiv, navItems[0])

    // Place links inside div
    const _items = (isForumSubdomain) ? 5 : 4
    document.querySelectorAll('.navItem').forEach(e => {
        if(e != centerDiv && Array.from(e.parentNode.children).indexOf(e) < _items){
            let cloneLink = e.cloneNode(true)
            centerDiv.appendChild(cloneLink)
            deleteLinks.push(e)
        }
    })

    // Delete leftover links
    deleteLinks.forEach(e => e.remove())

    // Center the div
    centerDiv.setAttribute('style', 'position: absolute; height: 100%; left: 50%; transform: translateX(-50%); display: flex; align-items: center; justify-content: center;')

    // Remove margin-left from first link
    centerDiv.firstElementChild.style['margin-left'] = '0px'
    
    // Responsive CSS
    util.addRule('@media only screen and (max-width: 700px) {.navItems > div { position: relative!important; flex-direction: column; left: 0!important; transform: none!important; }}')
}