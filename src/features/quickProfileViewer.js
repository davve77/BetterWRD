// Name: Quick Profile Viewer
// Desc: Hover a user's name to display a profile viewer

// Styles
document.head.appendChild(document.createElement('style')).innerHTML = '@keyframes fadein { 0% { opacity: 0; } 100% { opacity: 1; } } @keyframes fadeout { 0% { opacity: 1; } 100% { opacity: 0; } }'
document.body.style.overflowX = 'hidden'

let timer = null
let timer2 = null

document.body.addEventListener('mousemove', (e)=> {
    var isUserLink = e.target.parentNode.href && e.target.parentNode.href.includes('profile?uid') || e.target.href && e.target.href.includes('profile?uid')
    var profileview = document.querySelector('#quickProfileView')

    // Don't create profile viewer if user is hovering over the viewer's Profile link or notification
    if(e.target.hasAttribute('blacklistViewer') || document.querySelector('.menu') && document.querySelector('.menu').contains(e.target)) return

    // Reset Timers
    if(timer) {clearTimeout(timer)}
    if(timer2) {clearTimeout(timer2)}

    // Delete Old Viewer
    timer2 = setTimeout(()=> {
        if(profileview && !isUserLink && e.target != profileview && !profileview.contains(e.target)){
            profileview.style.setProperty('animation', 'fadeout .14s')
            setTimeout(()=> {
                profileview.remove()
            }, 130)
        }
        timer2 = null
    }, 19)

    // Stop if user is not hovering over a profile link
    if(!isUserLink) return

    // Main
    timer = setTimeout(()=> {
        if(profileview) {profileview.remove()}

        profileLink = e.target.href ? e.target.href : e.target.parentNode.href

        x = e.clientX
        y = e.clientY

        fetch(profileLink).then((response)=>{return response.text()}).then((html) => {
            var doc = new DOMParser().parseFromString(html, 'text/html')
            if(!doc.querySelector('#profile_mainprofilepicture')) return
    
            function getBadges(){
                var e = ''
                doc.querySelectorAll('[alt="badge"]').forEach((badge, num) => {
                    badge.style.width = '150px'
                    if(num <= 2){ // Only get first 3 badges
                        e += badge.outerHTML
                    }
                })
                return e
            }
            function checkRank(rank, color){
                try{
                    return doc.querySelector('.profile_badges').innerHTML.includes(rank) ? color : 'false'
                }catch{return 'false'}
            }
            function leaveViewportCheck(offsetS, clientS, xy){
                return (xy + offsetS > clientS) ? xy += clientS - (xy + offsetS) : xy
            }

            const P_ID = profileLink.split('uid=')[1]
            const P_AVATAR = doc.querySelector('#profile_mainprofilepicture').src
            const P_NAME = doc.querySelector('.username').textContent
            const P_ALIAS = doc.querySelector('.alias').textContent.replace('(','').replace(')','')
            const P_REP = doc.querySelector('.alias').nextElementSibling.firstElementChild.firstElementChild.textContent
            const P_JOINED = doc.querySelector('.alias').nextElementSibling.nextElementSibling.textContent.split(': ')[1]
            const P_BIO = doc.querySelector('.biography').textContent
            const P_BADGES = getBadges()
            const P_BADGES_COUNT = doc.querySelectorAll('[alt="badge"]').length
            const P_REP_COLOR = P_REP.includes('-') ? '#f44545' : "#4de84d"

            newdiv = document.createElement('div')
            document.body.appendChild(newdiv)
            newdiv.outerHTML = `
            <div id="quickProfileView" class="theme1 border1 round" style="animation: fadein .14s; position: absolute; left: ${x}px; top: ${y}px; box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px; width: 492px; padding: 15px; ">
            <div style=" display: flex; flex-direction: row; padding-bottom: 10px; ">
                <img class="round" src="${P_AVATAR}" style=" border-radius: 50%; width: 70px; ">
                <div style=" width: 100%; padding: 6px; display: flex; padding-left: 15px; align-items: center; gap: 20px; ">
                    <div style=" display: inline-flex; flex-direction: column; ">
                        <p style=" font-size: 15px; opacity: .7; ">Joined</p>
                        <h1 style=" font-size: 18px; ">${P_JOINED}</h1>
                    </div>
                    <div style=" display: inline-flex; flex-direction: column; ">
                        <p style=" font-size: 15px; opacity: .7; ">Badges</p>
                        <h1 style=" font-size: 18px; ">${P_BADGES_COUNT}</h1>
                    </div>
                    <div style=" display: inline-flex; flex-direction: column; ">
                        <p style=" font-size: 15px; opacity: .7; ">Reputation</p>
                        <h1 style=" color: ${P_REP_COLOR}; font-size: 18px; ">${P_REP}</h1>
                    </div>
                </div>
            </div>
            <h1 style="text-transform: none; font-size: 20px; color: ${checkRank('Noticed', '#528eb6')}; color: ${checkRank('Content', '#2980b9')}; color: ${checkRank('VIP', 'green')}; color: ${checkRank('Premium', '#b905b9')}; color: ${checkRank('Mod', 'red')}; ${checkRank('Admin', 'color: #000; text-transform: uppercase; background: linear-gradient(rgb(255,96,22) 0%,red 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;')}">${P_NAME}</h1> 
            <p style=" opacity: .6; font-size: 14px; margin-bottom: 15px; ">${P_ALIAS}</p>
            <p style=" font-size: 15px; margin-bottom: 15px; ">${P_BIO}</p>
            <div style=" padding-bottom: 15px; display: inline-flex; gap: 5px; overflow: hidden;">${P_BADGES}</div>
            <div style=" color: #3498DB; display: flex; flex-direction: row; gap: 15px; "><a blacklistViewer href="${profileLink}">View Profile</a>  <a href="https://wearedevs.net/profile/threads?uid=${P_ID}">Threads List</a>  <a href="https://wearedevs.net/profile/alts?uid=${P_ID}">Possible Alts</a><a href="https://wearedevs.net/profile/reputation?uid=${P_ID}">Reputation</a>
            </div>
            </div>
            `

            // Check if the div would leave the viewport on both sides
            divelm = document.querySelector('#quickProfileView')
            if(!divelm) return
                        
            const { clientHeight, clientWidth } = document.documentElement
            const { offsetHeight, offsetWidth } = divelm
                        
            divelm.style.top = leaveViewportCheck(offsetHeight, clientHeight, y) + window.scrollY + 'px'
            divelm.style.left = leaveViewportCheck(offsetWidth, clientWidth, x) + window.scrollX + 'px'
        }).catch()

        timer = null
    }, 250)
})