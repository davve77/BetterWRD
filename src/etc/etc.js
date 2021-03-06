// BetterWRD Other

// CSS
util.addCSS(chrome.runtime.getURL('etc/css/misc.css'))

chrome.storage.local.get('autoRefreshWRD', saved => {

    // Stop if user is on a cloudflare page
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return


    // Better animation on navbar items
    document.querySelectorAll('.navItem').forEach(navitem => navitem.style.transition = '.35s all')


    // Placeholder text colors
    EventEmitter.on('ThemeLoaded', mode => {
        if(mode != 'bright'){
            document.documentElement.style.colorScheme = 'dark'
            document.head.appendChild(document.createElement('style')).textContent = '*::placeholder{color: rgb(185, 185, 185); opacity: 1;}'
        }
        else{
            document.head.appendChild(document.createElement('style')).textContent = '*::placeholder{color: rgb(70, 70, 70); opacity: 1;}'
        }
    })


    // Remove navbar bottom border
    util.addRule('#navigationbar{border-bottom: none!important;}')


    // Better Dark Mode (white icons, etc)
    EventEmitter.on('ThemeLoaded', mode => {
        if(mode == 'bright') return

        // Make pinned thread icon white
        let pins = document.querySelectorAll('.pin')
        if(pins) pins.forEach(pin => pin.style.filter = 'invert(1)')

        // Make "my website" logo white
        let pw = document.querySelector('[title="Personal website"]')
        if(pw && getComputedStyle(pw.parentElement).background != 'rgb(128, 128, 128)'){
            pw.firstChild.style.filter = 'invert(1)'
        }
    })


    // Don't add 'themebtn' class to delete post button
    document.querySelectorAll('span.button.btn_deletereply').forEach(e => {
        e.style.setProperty('background', '0', 'important')
        e.style.setProperty('border', '0', 'important')
    })


    // Auto refresh WRD when a setting is changed
    function checkChange(change, changes){
        return changes.includes(change)
    }
    chrome.storage.onChanged.addListener((sChanges)=> {
        let changes = Object.keys(sChanges)[0]
        
        if(changes.startsWith('_')) return
        if(checkChange('unsavedtheme', changes) || checkChange('customthemes', changes) || checkChange('plugins', changes)) return
        if(location.href.includes('newreply') || location.href.includes('newthread')) return

        location.reload()
    })
})


// BetterWRD Settings Keyboard shortcut
document.addEventListener('keydown', e => {
    if(e.shiftKey && e.key == '~') {open(chrome.runtime.getURL('settings/index.html'))}
})


// Fix Image SIzing on Conversation page
if(location.pathname.includes('messages')){
    document.head.appendChild(document.createElement('style')).textContent = `
    img {
        width: auto;
        height: auto;
        display: initial;
        margin: initial!important;
    }
    .rows img {
        width: 65px !important;
        height: 65px !important;
        display: inline-block !important;
        margin: 0 var(--padding)!important;
    }
    .row img {
        width: 65px !important;
        height: 65px !important;
        margin-right: var(--padding) !important;
    }
    `
}


// Statistics
if(!localStorage['bwrd_stat']){
    location.href = 'https://api.stathat.com/c?ukey=MTg4NTcgiDyQmjcDg9aC70zAHI1Img~~&key=CPRn2uHnuoNoYP8pRcaBIiBTdUlE&count=1'
    localStorage['bwrd_stat'] = 'true'
}


// Fix V3rmillion media links
let verm = document.querySelector('[title="V3rmillion Profile"]')
if(verm) verm.href = verm.href.replace(/amp;/gm, '')


// Redirect to BetterWRD Settings
if(location.pathname.toLowerCase() == '/betterwrd'){
    location.href = chrome.runtime.getURL('settings/index.html')
}


// Cloudflare error page
if(document.querySelector('#cf-error-details')){
    util.addCSS(chrome.runtime.getURL('/etc/css/cloudflare.css'))
    util.addElement('div', document.body, '<div id="cf-useful-buttons" style="position: absolute;bottom: 0;left: 0;padding: 15px;display: flex;flex-direction: column;gap: 12px;"> <button style="font-size: 13px;padding: 12px 19px;border-radius: 10px;" onclick="window.open(`https://wearedevs.net/betterwrd`)">BetterWRD Settings</button><button style="font-size: 13px;padding: 12px 19px;border-radius: 10px;" onclick="window.open(`https://discord.gg/ceU5SRTf4J`)">BetterWRD Discord</button> </div>')
}


// Beta Testing features
chrome.storage.local.get(['betaTesting'], async sv => {
    if(sv.betaTesting){
        document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('etc/beta.js')
    }
})