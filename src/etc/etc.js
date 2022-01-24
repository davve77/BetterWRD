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
        if(checkChange('unsavedtheme', changes) || checkChange('customthemes', changes)) return
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


// New BWRD Version Notification
(async() =>{
    if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox
        fetch('https://betterwrd.vercel.app/bwrd/ver.json')
        .then(res => res.json())
        .then((out) => {
            if(!document.querySelector('#navigationbar')) return
            if(out.version != chrome.runtime.getManifest().version){
                const notif = document.createElement('div')
                notif.innerHTML = `<div class="theme1 border1 round" style="position: relative;margin: 25px auto;width: 100%;max-width: 1076px;margin-bottom: 10px;user-select: none;padding: 15px;overflow: hidden;"> <h1 style="padding-bottom: 10px;margin: 0;font-size: 20px;text-align: left;">A new version of BetterWRD is out — Please update now.</h1> <div style=" display: flex; align-items: center; gap: 8px; "> <a href="${out.link}" class="btn btn-primary themebtn" id="carddl" target="_blank" style="position: relative;display: inline-flex;align-items: center;padding: 8px 20px;font-size: 14px;font-weight: 500!important;border-style: none!important;border-radius: 10px;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black; transition: .16s all" type="button"> <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000" height="20px" width="20px" style="vertical-align: middle;margin-right: 8px;"> <g> <rect fill="none" height="24" width="24"></rect> </g> <g> <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></path> </g> </svg>Download Now</a> <p style="opacity: .8;font-size: 14px;">your settings, themes, emotes, drafts etc will not be deleted.</p> </div> <div style=" position: absolute; height: 100%; top: 0; right: 10px; display: flex; "> <img class="updatebwlogo" src="https://betterwrd.vercel.app/bwrd/img/logo.png" style="width: 100px;height: 100px;padding: 10px;filter: brightness(1000%);"> <div style=" position: absolute; height: 100%; width: 650%; right: -10px; background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(167 61 147 / 56%) 100%); animation: updateanim .45s ease-out;"></div> </div> </div> <style>#carddl:hover { transform: scale(.94)!important; } @keyframes updateanim { from {transform: translateX(650%);} to {transform: translateX(0px);} }</style>`
                if(document.getElementsByTagName('main')[0]){
                    document.body.appendChild(notif)
                    document.body.insertBefore(notif, document.getElementsByTagName('main')[0])
    
                    // Turn BetterWRD logo black if using Bright Theme
                    setTimeout(()=> {
                        if(localStorage.getItem('bwrd_thememode') == 'bright'){
                            document.head.appendChild(document.createElement('style')).textContent = '.updatebwlogo{filter: brightness(0)!important;}'
                        }
                    }, 200)
                }
            }
        })
    }
})()


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

        likebtn.onclick = ()=> {
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
        }

        if(JSON.parse(localStorage.getItem('bwrd_likedposts')).includes(threadID)){
            likebtn.style.setProperty('background', '#a5a5a566', 'important')
        }
    })
}


// Fix TinyMCE top bar displaying over navbar dropmenus
if(document.querySelector('.tox-editor-header')){
    document.head.appendChild(document.createElement('style')).textContent = '.tox-editor-header{z-index: 0!important;}'
}


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