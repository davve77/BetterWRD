// Name: Main Layout WIdth
// Desc: Changes the main div max-width to user's choice


const chosenWidth = document.currentScript.getAttribute('data')
const mainDiv = document.querySelector('main')

if(chosenWidth && mainDiv && !(/scripts|exploits|home/).test(location.pathname) && chosenWidth != '1100'){

    // Set max-width to main
    mainDiv.style.maxWidth = chosenWidth + 'px'
    mainDiv.style.margin = 'auto'

    // For pages with inner main div like /profile
    if(mainDiv.children.length == 1 && (/max-width/).test(mainDiv.firstElementChild.style.cssText)){
        mainDiv.firstElementChild.style.maxWidth = chosenWidth + 'px'
    }

    // Section div for profile threads list and more
    let section = document.querySelector('main > .section')
    if(section){
        util.addRule(`main > .section{ max-width: ${chosenWidth}px; }`)
    }
}