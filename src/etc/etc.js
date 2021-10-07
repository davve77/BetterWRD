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

// BWRD V3.0 Notification
fetch('https://flameplus.vercel.app/bwrd/notifs/v3.json')
.then(res => res.json())
.then((out) => {
    if(out.released == 'yes'){
        if(document.querySelectorAll('.ILAD')[0]){
            document.querySelectorAll('.ILAD')[0].outerHTML = `<div class="theme1" style="position: relative; margin: 45px auto auto; height: 100px; width: 100%; border-radius: 8px; user-select: none; background-color: rgb(13, 17, 23); border: 1px solid rgb(48, 54, 61);">
            <img style="position: absolute;left: 0;width: 100px;height: 100%;margin-left: 15px;" src="https://i.gyazo.com/9e64301669cf394065e2a0195d7e18f4.png" draggable="false">
        <div style="margin-left: 130px;height: 100%;padding: 10px;padding-left: 15px;border-radius: 0 8px 8px 0;backdrop-filter: brightness(1.5);">
                        <p style="font-size: 22px;font-weight: 500;display: table;margin-bottom: 10px;">BWRD Version 3.0 is out! Go check it out now.<br></p><a href="https://github.com/davve77/BetterWRD/releases/latest" class="btn btn-primary themebtn" id="carddl" style="padding: 10px 15px;font-size: 15px;font-weight: 400;display: table;border-style: none;border-radius: 10px;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black;" type="button">Download now
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000" height="20px" width="20px" style="
    vertical-align: middle;
"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></path></g></svg> </a>
                        <p style="font-size: 19px;color: rgba(207,207,207,0.6);display: none;">BetterWRD V4.0 is out! Go check it out.<br></p>
                    </div>
        </div>`
        }
    }
})