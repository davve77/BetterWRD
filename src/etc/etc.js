// BetterWRD Other

chrome.storage.local.get('autoRefreshWRD', saved => {

    // Stop if user is on a cloudflare page
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return


    // Better animation on navbar items
    document.querySelectorAll('.navItem').forEach(navitems => navitems.style.transition = '.35s all')


    // Placeholder text colors
    setTimeout(()=> {
        if(localStorage.getItem('bwrd_thememode') == 'night'){
            document.documentElement.style.colorScheme = 'dark'
            document.head.appendChild(document.createElement('style')).innerHTML = '*::placeholder{color: rgb(185, 185, 185); opacity: 1;}'
        }
        else{
            document.head.appendChild(document.createElement('style')).innerHTML = '*::placeholder{color: rgb(70, 70, 70); opacity: 1;}'
        }
    }, 200)


    // Remove navbar bottom border
    document.head.appendChild(document.createElement('style')).innerHTML = '#navigationbar{border-bottom: none!important;}'


    // Change scrollbar colors on theme change
    if(themer){
        themer.addEventListener('click', ()=> {
            if(themer.checked) {document.documentElement.style.colorScheme = 'light'}
            else {document.documentElement.style.colorScheme = 'dark'}
        })
    }


    // Better Night Theme
    setTimeout(()=> {
        if(localStorage.getItem('bwrd_thememode') == 'night'){
            
            const pw = document.querySelector('[title="Personal website"]')
            const pins = document.querySelectorAll('.pin')
            const views = document.querySelectorAll('.viewsicon')

            // Make pinned thread icon white
            if(pins && localStorage.getItem('bwrd_thememode') == 'night'){
                pinwhite = chrome.runtime.getURL('etc/img/pinwhite.svg')
                pins.forEach(pins => pins.style.background = `url(${pinwhite})`)
            }

            // Make views icon white
            if(views && localStorage.getItem('bwrd_thememode') == 'night'){
                viewswhite = chrome.runtime.getURL('etc/img/viewwhite.png')
                views.forEach(views => views.style.backgroundImage = `url(${viewswhite})`)
            }

            // Make website logo white
            if(pw){
                pw.firstChild.style.background = `url(${chrome.runtime.getURL('etc/img/domain.png')})`
            }

            // Make guidelines, privacy and terms of use pages dark mode
            if(location.pathname.includes('guidelines') || location.pathname.includes('privacy') || location.pathname.includes('terms')){
                document.body.style.backgroundColor = '#181919'
                document.body.style.color = 'white'
            }
        }
    }, 200)


    // Don't turn input color all white on autofill
    document.head.appendChild(document.createElement('style')).innerHTML = 'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { transition: background-color 999999999s ease-in-out 0s; }'
    document.querySelectorAll('input, select').forEach(elm => {elm.style.outline = 'none'})


    // Don't add 'themebtn' class to delete post button
    document.querySelectorAll('span.button.btn_deletereply').forEach(e => {
        e.style.setProperty('background', '0', 'important')
        e.style.setProperty('border', '0', 'important')
    })


    // Auto refresh WRD when a setting is changed
    function checkChange(change, changes){
        return changes.includes(change)
    }
    chrome.storage.onChanged.addListener((changes)=> {
        changes = Object.keys(changes)[0]

        if(!saved.autoRefreshWRD) return
        if(checkChange('unsavedtheme', changes) || checkChange('customthemes', changes)) return
        if(location.href.includes('newreply') || location.href.includes('newthread')) return

        location.reload()
    })
})


// New BWRD Version Notification
if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox
    fetch('https://flameplus.vercel.app/bwrd/ver.json')
    .then(res => res.json())
    .then((out) => {
        if(out.version != chrome.runtime.getManifest().version){
            const notif = document.createElement('div')
            notif.innerHTML = `<div class="theme1 border1" style="position: relative;margin: 25px auto;width: 100%;max-width: 1076px;margin-bottom: 10px;border-radius: 8px;user-select: none;"> <img style="position: absolute;width: 100px;height: 100px;margin-left: 15px;" src="https://i.gyazo.com/9e64301669cf394065e2a0195d7e18f4.png" draggable="false"> <div class="border1-left" style="margin-left: 130px;height: 100%;padding: 11px;padding-left: 20px;border-radius: 0 8px 8px 0;backdrop-filter: brightness(1.2);"> <p style="font-size: 22px;font-weight: 500;margin-bottom: 10px;opacity: .9;">A new version of BetterWRD is out. Download it!<br></p><a href="https://github.com/davve77/BetterWRD/releases/latest" class="btn btn-primary themebtn" id="carddl" target="_blank" style="padding: 10px 15px;font-size: 15px;font-weight: 500;display: table;border-style: none!important;border-radius: 10px;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black;" type="button"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000" height="20px" width="20px" style="vertical-align: middle;margin-right: 8px;"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></path></g></svg>Download now</a>  </div> </div>`
            if(document.getElementsByTagName('main')[0]){
                document.body.appendChild(notif)
                document.body.insertBefore(notif, document.getElementsByTagName('main')[0])
                notif.lastElementChild.lastElementChild.href = out.link
            }
        }
    })
}


// Make cloudflare page dark if user is using night theme
if(document.getElementById('cf-wrapper') && document.cookie.includes('night')){
    document.querySelectorAll('*').forEach(elm => {
        elm.style.backgroundColor = 'black'
        elm.style.color = 'rgb(210,210,210)'
    })
    document.querySelector('.bg-gradient-gray').style.background = 'black'
}