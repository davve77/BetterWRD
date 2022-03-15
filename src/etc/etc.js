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
            document.head.appendChild(document.createElement('style')).textContent = '*::placeholder{color: rgb(185, 185, 185); opacity: 1;}'
        }
        else{
            document.head.appendChild(document.createElement('style')).textContent = '*::placeholder{color: rgb(70, 70, 70); opacity: 1;}'
        }
    }, 200)


    // Remove navbar bottom border
    document.head.appendChild(document.createElement('style')).textContent = '#navigationbar{border-bottom: none!important;}'


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
    document.head.appendChild(document.createElement('style')).textContent = 'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active { transition: background-color 999999999s ease-in-out 0s; }'
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
        if(checkChange('unsavedtheme', changes) || checkChange('customthemes', changes) || checkChange('plugins', changes)) return
        if(location.href.includes('newreply') || location.href.includes('newthread')) return

        location.reload()
    })
})


// Make Edit/Delete/Like post buttons better
if(document.getElementsByClassName('replygroup')[0]){

    function button(elm, classlist){
        elm.className = classlist
        elm.style.padding = '5px 10px'
        elm.style.filter = 'brightness(1.25)'
        elm.style.cursor = 'pointer'
        elm.style.display = 'flex'
    }

    document.querySelectorAll('.reply_menu').forEach(e => {
        if(!e.firstElementChild) return

        const likediv = e.firstElementChild
        const editdiv = e.childNodes[3]
        const deldiv = e.childNodes[5]
        const moderatordeldiv = e.children[1]

        // Like button
        if(likediv && likediv.firstElementChild && likediv.firstElementChild.classList.contains('btnLikeReply')){
            likebtn = likediv.firstElementChild
            likebtn.style.gap = '2px'
            button(likebtn, 'themebtn btn theme1 round border1 btnLikeReply verticalCenter threadbtn')
        }

        // Edit post button
        if(editdiv && editdiv.firstElementChild && editdiv.firstElementChild.textContent == 'Edit'){
            editbtn = editdiv.firstElementChild
            editbtn.innerHTML = `<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style=" "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg>`
            button(editbtn, 'themebtn btn theme1 round border1 threadbtn')
        }
 
        // Delete post button
        if(deldiv && deldiv.firstElementChild && deldiv.innerHTML.includes('btn_deletereply')){
            delbtn = deldiv.firstElementChild
            delbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>`
            button(delbtn, 'themebtn btn theme1 round border1 btn_deletereply threadbtn')
        }

        // Moderator delete post button
        if(moderatordeldiv && moderatordeldiv.firstElementChild && moderatordeldiv.innerHTML.includes('btn_deletereply')){
            moddeletebtn = moderatordeldiv.firstElementChild
            moddeletebtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>`
            button(moddeletebtn, 'themebtn btn theme1 round border1 btn_deletereply threadbtn')
        }

        e.style.padding = '5px 10px'
    })
    document.head.appendChild(document.createElement('style')).textContent = '.reply_menu li>*{margin-left: 4px!important; height: 31px!important;}'
    setTimeout(()=> {
        if(localStorage.getItem('bwrd_thememode') == 'bright'){
            document.head.appendChild(document.createElement('style')).textContent = '.threadbtn{filter: brightness(.95)!important;}'
        }
    }, 200)
}


// BetterWRD Settings Key Combination
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


// Change Like button background color when liked
if(document.querySelector('.replygroup')){

    // Create item
    if(!localStorage.getItem('bwrd_likedposts')) localStorage.setItem('bwrd_likedposts', '[]')

    document.querySelectorAll('.btnLikeReply').forEach(likebtn => {
        const threadID = likebtn.getAttribute('data-trid')

        // Stop if user is logged out
        if(document.querySelector('[href="/login"]')) return

        likebtn.addEventListener('click', ()=> {
            const likedPosts = JSON.parse(localStorage.getItem('bwrd_likedposts'))

            // Add Like
            if(!likedPosts.includes(threadID)){
                likedPosts.push(threadID)
                localStorage.setItem('bwrd_likedposts', JSON.stringify(likedPosts))
                likebtn.style.setProperty('background', '#a5a5a566', 'important')
            }

            // Remove Like
            else{
                likedPosts.splice(likedPosts.indexOf(threadID), 1)
                localStorage.setItem('bwrd_likedposts', JSON.stringify(likedPosts))
                likebtn.style.removeProperty('background')
            }
        })

        if(JSON.parse(localStorage.getItem('bwrd_likedposts')).includes(threadID)){
            likebtn.style.setProperty('background', '#a5a5a566', 'important')
        }
    })
}


// Statistics
if(!localStorage['bwrd_stat']){
    location.href = 'https://api.stathat.com/c?ukey=MTg4NTcgiDyQmjcDg9aC70zAHI1Img~~&key=CPRn2uHnuoNoYP8pRcaBIiBTdUlE&count=1'
    localStorage['bwrd_stat'] = 'true'
}


// Fix TinyMCE top bar displaying over navbar dropmenus
if(document.querySelector('.tox-editor-header')){
    document.head.appendChild(document.createElement('style')).textContent = '.tox-editor-header{z-index: 0!important;}'
}


// Fix V3rmillion media links
let verm = document.querySelector('[title="V3rmillion Profile"]')
if(verm) {verm.href = verm.href.replace(/amp;/gm, '')}


// Redirect to BetterWRD Settings
if(location.pathname.toLowerCase() == '/betterwrd'){
    location.href = chrome.runtime.getURL('settings/index.html')
}


// Make cloudflare page dark if user is using night theme
if(document.getElementById('cf-wrapper') && document.cookie.includes('night')){
    document.querySelectorAll('*').forEach(elm => {
        elm.style.backgroundColor = 'black'
        elm.style.color = 'rgb(210,210,210)'
    })
    document.querySelector('.bg-gradient-gray').style.background = 'black'
}