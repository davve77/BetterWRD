// BWRD Better Dropmenus

chrome.storage.local.get(null, saved => {
    if(!saved.betterDropmenus || !document.getElementsByClassName('menu')[0]) return
    
    var profilename = document.getElementsByClassName('dropmenu-title')[1].textContent

    // CSS
    document.head.appendChild(document.createElement('style')).textContent = `.navbtn:active, .notification:active{opacity: .5;} .navHeader_dropmenu{transform: scale(1)!important;}`

    // Dark Mode Dropmenus CSS
    document.head.appendChild(document.createElement('style')).textContent = `.menu{transform: scale(1)!important; display: none; z-index: 100; background: rgb(39 40 42); border: none!important; border-radius: 6px; text-align: left; user-select: none; width: 300px; box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;!important;} .navbtn{ position: relative; display: block; border-radius: 6px; margin: 0px 8px; padding: 0 5px; cursor: pointer; transition: .2s ease; } .navbtn:hover { background: rgb(45, 47, 49); } .navbtn > a{display: block; line-height: 29px; }`

    // Get User Profile Info
    fetch('https://wearedevs.net/profile').then((response)=>{return response.text()}).then((html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html')

        userReputation = doc.querySelector('.alias').nextElementSibling.firstElementChild.firstElementChild.textContent
        userPFP = doc.querySelector('#profile_mainprofilepicture').src
        repColor = userReputation.includes('-') ? 'red' : "green"
        
        // Insert dropmenu
        menu.outerHTML = `<div class="menu dropmenu" style="padding: 0px!important"><div style="display: flex;flex-direction: row;align-items: center;padding: 16px;border-bottom: 1.6px solid rgb(70, 70, 70);"><img style=" height: 50px; width: 50px; border-radius: 10px; " src="${userPFP}" draggable="false"><div style="margin-inline-start: 10px;"><span id="dropmenuPNAME" style=" font-weight: 550; letter-spacing: 0px; line-height: 24px; float: none;">${profilename}</span> <div id="online" style=" align-items: center; display: flex; "><span id="statustext" style="position: relative;display: block;font-size: 15px;opacity: .8;">Reputation:</span> <span style="color: ${repColor};font-size: 15px;font-weight: 500;margin-left: 3px;">${userReputation}</span> </div></div></div><div style=" position: relative; display: block; padding: 9px 16px 9px 16px; border-bottom: 1.6px solid rgb(70, 70, 70); margin: 5px 0px 5px 0px; "><li id="yourdraftsbtn" class="navbtn" style=" display: none; cursor: pointer; "><a onclick="showDrafts()" style=" font-size: 15.5px; color: #e2e2e2; ">Your Drafts</a></li><li class="navbtn" style=" "><a href="https://wearedevs.net/profile" style=" font-size: 15.5px; color: #e2e2e2; ">Your Profile</a></li><li class="navbtn" style=" "><a href="https://wearedevs.net/messages" style=" font-size: 15.5px; color: #e2e2e2; ">Your Messages</a></li><li class="navbtn" style=" "><a href="https://wearedevs.net/profile/threads" style=" font-size: 15.5px; color: #e2e2e2; ">Your Threads</a></li> <li class="navbtn" style="margin-bottom: 5px;"><a href="https://wearedevs.net/profile/reputation" style=" font-size: 15.5px; color: #e2e2e2; ">Your Reputation</a></li> </div> <div style="display: block;padding: 9px 16px 9px 16px;border-bottom: 1.6px solid rgb(70, 70, 70);margin: 5px 0px 5px 0px;"><li class="navbtn" style=" "><a target="_blank" href="${chrome.runtime.getURL('settings/index.html')}" id="navbwrd" style=" font-size: 15.5px; color: #e2e2e2; ">BetterWRD Settings</a></li><li class="navbtn" style=" "><a target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}" id="navbwrdthemes" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Themes</a></li> <li class="navbtn" style=" "><a target="_blank" href="${chrome.runtime.getURL('settings/plugins.html')}" id="navbwrdplugins" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Plugins</a></li> <li class="navbtn"><a target="_blank" href="${chrome.runtime.getURL('settings/wallpaper.html')}" id="navbwrdwallpaper" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Wallpaper</a></li> <li class="navbtn" style="margin-bottom: 5px;"><a target="_blank" href="${chrome.runtime.getURL('settings/fonts.html')}" id="navbwrdfonts" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Fonts</a></li> </div><div style="display: block;padding: 9px 16px 16px 16px; border-bottom: none!important"><li class="navbtn" style=" "><a href="https://wearedevs.net/manager/info" style=" font-size: 15.5px; color: #e2e2e2; ">Settings</a></li> <li class="navbtn" style=" "><a onclick="logout()" style=" font-size: 15.5px; color: #e2e2e2; width: 100%; cursor: pointer; ">Sign out</a></li> </div> </div>`
    })

    
    // Notifications Menu
    if(document.querySelectorAll('.navbell>div')){

        // No notifications text
        document.querySelectorAll('.navbell>div').forEach(menu => {
            menu.style.padding = '15px!important'
            menu.style.borderRadius = '6px'
            document.querySelector('.navbell p').style.fontWeight = '400'
        })
    
        // Notification
        document.head.appendChild(document.createElement('style')).textContent = '.notification{transition: .2s all; padding: 10px; border-radius: 10px;} .notification:hover{background: rgb(45, 47, 49);}'
    
        // Delete notification
        document.querySelectorAll('.notif-exit').forEach(delnotif => {
            delnotif.textContent = '×'
            delnotif.style.color = '#ff4545'
            delnotif.style.fontSize = '25px'
            delnotif.style.marginLeft = '14px'
        })
    
        // Delete all notifications
        clearnotifs = document.querySelector('.deleteallnotifs')
        if(clearnotifs){
            clearnotifs.style.textAlign = 'left'
            clearnotifs.style.marginBottom = '10px'
            clearnotifs.style.fontSize = '13px'
            clearnotifs.style.color = '#ff4545'
            clearnotifs.textContent = 'Clear notifications'
        }
    }


    // Dropmenu Themes
    chrome.storage.local.get(['theme','customtheme'], saved => {
        var lightDropmenu = document.createElement('style')
        lightDropmenu.innerHTML = '.menu{background-color: rgb(235, 235, 235)!important; color: black; } .dropmenu > div{ border-bottom: 1.6px solid rgb(180 180 180)!important; } .navbtn > a{ color: rgb(49, 49, 49)!important; } .navbtn:hover{ background: white; } .notification > div > a{ color: black; } .notif-time{ color: rgb(92, 92, 92)!important; } .notification:hover{ background: white; } .deleteallnotifs{color: rgb(255, 69, 69)!important;}'
        document.head.appendChild(lightDropmenu)
    
        // Set dropmenu colors on load
        setTimeout(()=> {
            if(localStorage.getItem('bwrd_thememode') == 'night'){
                lightDropmenu.setAttribute('media', 'not all')
            }
        }, 400)
    
        // Set dropmenu colors on WRD theme change
        if(document.getElementById('themer')){
            document.getElementById('themer').addEventListener('click', ()=> {
                if(document.cookie.includes('night')) {lightDropmenu.setAttribute('media', 'not all')}
                else {lightDropmenu.removeAttribute('media')}
            })
        }
    })
})