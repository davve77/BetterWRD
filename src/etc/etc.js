// BWRD ETC: Other stuff that will make WRD better

chrome.storage.local.get('autoRefreshWRD', saved => {
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return

    // 1 - Better animation on navbar items
    var navitems = document.getElementsByClassName('navItem')
    for(var i=0, l=navitems.length; i<l; i++) {navitems[i].style.transition = '.5s'}

    // 2 - Make WRD 99% dark when using night theme
    var themer = document.getElementById('themer')
    var ls = document.getElementById('loadstring')
    var personalwebsite = document.querySelector('[title="Personal website"]')
    if(document.cookie.includes('night')) document.head.appendChild(document.createElement('style')).innerHTML = ':root{color-scheme:dark;)'
    if(themer){
        themer.addEventListener('click', ()=> {
            if(themer.checked) {document.documentElement.style.colorScheme = 'light'}
            else {document.documentElement.style.colorScheme = 'dark'}
        })
    }
    if(ls && document.cookie.includes('night')) {ls.style.color = 'white'}
    if(personalwebsite && document.cookie.includes('night')) {personalwebsite.firstChild.style.background = `url(${chrome.runtime.getURL('etc/img/domain.png')})`}
    // Don't turn white on autofill
    document.head.appendChild(document.createElement('style')).innerHTML = 'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { transition: background-color 999999999s ease-in-out 0s; }'
    document.querySelectorAll('input, select').forEach(elm => {elm.style.outline = 'none'})

    // 3 - Auto refresh when a setting is changed
    chrome.storage.onChanged.addListener((changes)=> {
        changes = Object.keys(changes)[0]
        if(saved.autoRefreshWRD && !changes.includes('unsavedtheme') && !changes.includes('customtheme')) {location.reload()}
    })
})

// Make cloudflare page dark if user uses night theme
if(document.getElementById('cf-wrapper') && document.cookie.includes('night')){
    document.querySelectorAll('*').forEach(elm => {
        elm.style.backgroundColor = 'black'
        elm.style.color = 'rgb(210,210,210)'
    })
    document.querySelector('.bg-gradient-gray').style.background = 'black'
}