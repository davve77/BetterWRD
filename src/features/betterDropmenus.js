// BWRD Better Dropmenus

chrome.storage.local.get(null, saved => {
    if(!saved.betterDropmenus || !document.getElementsByClassName('menu')[0]) return
    
    var profilename = document.getElementsByClassName('dropmenu-title')[1].textContent

    // CSS
    document.head.appendChild(document.createElement('style')).innerHTML = `.navbtn:active, .notification:active{opacity: .5;}`

    // Dark Mode Dropmenus CSS
    document.head.appendChild(document.createElement('style')).innerHTML = `.menu{transform: scale(1)!important; display: none; z-index: 100; background: rgb(62, 62, 62); border: none!important; border-radius: 6px; text-align: left; user-select: none; width: 300px; box-shadow: rgb(0 0 0 / 20%) 0px 1rem 3rem!important;} .navbtn{ position: relative; display: block; border-radius: 6px; margin: 0px 8px; padding: 0 5px; cursor: pointer; transition: .2s ease; } .navbtn:hover { background: #525252; } .navbtn > a{display: block; line-height: 29px; }`

    // Insert dropmenu
    menu.outerHTML = `<div class="menu dropmenu" style="padding: 0px!important"> <div style=" display: flex; padding: 16px; border-bottom: 1.6px solid dimgrey; "><div style=" margin-inline-start: 16px; "><span id="dropmenuPNAME" style=" font-weight: 550; letter-spacing: 0px; line-height: 24px; ">${profilename}</span> <div id="online" style=" align-items: center; display: flex; "><div style=" margin: 0px; background: lime; border-radius: 50px; width: 7px; height: 7px; "></div> <span id="statustext" style=" position: relative; display: block; margin-left: 5px; font-size: 15px; opacity: .8; ">Online</span></div></div></div><div style=" position: relative; display: block; padding: 9px 16px 9px 16px; border-bottom: 1.6px solid dimgrey; margin: 5px 0px 5px 0px; "><li id="yourdraftsbtn" class="navbtn" style=" display: none; cursor: pointer; "><a onclick="showDrafts()" style=" font-size: 15.5px; color: #e2e2e2; ">Your Drafts</a></li><li class="navbtn" style=" "><a href="https://wearedevs.net/profile" style=" font-size: 15.5px; color: #e2e2e2; ">Your Profile</a></li><li class="navbtn" style=" "><a href="https://wearedevs.net/profile/threads" style=" font-size: 15.5px; color: #e2e2e2; ">Your Threads</a></li> <li class="navbtn" style="margin-bottom: 5px;"><a href="https://wearedevs.net/profile/reputation" style=" font-size: 15.5px; color: #e2e2e2; ">Your Reputation</a></li> </div> <div style="display: block;padding: 9px 16px 9px 16px;border-bottom: 1.6px solid dimgrey;margin: 5px 0px 5px 0px;"><li class="navbtn" style=" "><a target="_blank" href="${chrome.runtime.getURL('settings/index.html')}" id="navbwrd" style=" font-size: 15.5px; color: #e2e2e2; ">BetterWRD Settings</a></li><li class="navbtn" style=" "><a target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}" id="navbwrdthemes" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Themes</a></li> <li class="navbtn" style="margin-bottom: 5px;"><a target="_blank" href="${chrome.runtime.getURL('settings/wallpaper.html')}" id="navbwrdwallpaper" style=" font-size: 15.5px; color: #e2e2e2; ">BWRD Wallpaper</a></li> </div><div style="display: block;padding: 9px 16px 16px 16px; border-bottom: none!important"><li class="navbtn" style=" "><a href="https://wearedevs.net/manager/info" style=" font-size: 15.5px; color: #e2e2e2; ">Settings</a></li> <li class="navbtn" style=" "><a style=" font-size: 15.5px; color: #e2e2e2; width: 100%; cursor: pointer; ">Sign out</a></li> </div> </div>`
    

    // Notifications Menu
    if(document.querySelectorAll('.navbell>div')){
        // No notifications text
        document.querySelectorAll('.navbell>div').forEach(menu => {
            menu.style.background = 'rgb(62, 62, 62)'
            menu.style.boxShadow = 'rgb(0 0 0 / 20%) 0px 1rem 3rem'
            menu.style.padding = '15px!important'
            menu.style.borderRadius = '6px'
            document.querySelector('.navbell p').style.fontWeight = '400'
        })
    
        // Notification
        document.querySelectorAll('.notification').forEach(notif => {
            notif.style.transition = '.2s all'
            notif.style.padding = '10px'
            notif.style.borderRadius = '10px'
        })
        document.head.appendChild(document.createElement('style')).innerHTML = '.notification:hover{background: rgb(70 70 70);}'
    
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
        lightDropmenu.innerHTML = '.menu{background-color: rgb(235, 235, 235)!important; color: black; } .dropmenu > div{ border-bottom: 1.6px solid rgb(29, 29, 29); } .navbtn > a{ color: rgb(49, 49, 49)!important; } .navbtn:hover{ background: rgb(216, 216, 216); } .notification > div > a{ color: black; } .notif-time{ color: rgb(92, 92, 92)!important; } .notification:hover{ background: rgb(216, 216, 216); } .deleteallnotifs{color: rgb(255, 69, 69)!important;}'
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