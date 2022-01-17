// Name: Quick Thread Viewer
// Desc: Hover over a thread title to display a small thread viewer


// Styles
document.head.appendChild(document.createElement('style')).innerHTML = '.thread_replycontent *{ max-width: 100%; } @keyframes thread_fadein { 0% { opacity: 0; } 100% { opacity: 1; } } @keyframes thread_fadeout { 0% { opacity: 1; } 100% { opacity: 0; } }'

let thread_timer = null
let thread_timer2 = null

function scrollViewer(elm){
    isAtTop = elm.scrollHeight - elm.scrollTop != elm.clientHeight
    gradientDiv = elm.lastElementChild.firstElementChild

    isAtTop ? gradientDiv.style.opacity = '1' : gradientDiv.style.opacity = '0'
}

document.body.addEventListener('mousemove', (e)=> {
    var isThreadLink = e.target.href && e.target.href.includes('/t/')
    var threadview = document.querySelector('#quickThreadView')

    // Don't create thread viewer if user is hovering over the "View Thread" button or notification
    if(e.target.hasAttribute('blacklistViewer') || document.querySelector('.menu') && document.querySelector('.menu').contains(e.target)) return

    // Reset Timers
    if(thread_timer) {clearTimeout(thread_timer)}
    if(thread_timer2) {clearTimeout(thread_timer2)}

    // Delete Old Viewer
    thread_timer2 = setTimeout(()=> {
        if(threadview && !isThreadLink && e.target != threadview && !threadview.contains(e.target)){
         threadview.style.setProperty('animation', 'thread_fadeout .14s')
            setTimeout(()=> {
               threadview.remove()
            }, 130)
        }
        thread_timer2 = null
    }, 19)

    // Stop if user is not hovering over a thread link
    if(!isThreadLink) return

    // Main
    thread_timer = setTimeout(()=> {
        if(threadview) {threadview.remove()}

        threadURL = e.target.href
        let statusCode

        x = e.clientX
        y = e.clientY

        fetch(threadURL, {cache: 'force-cache'}).then((response)=>{if(response.status == '503') {statusCode = '503'} return response.text()}).then((html) => {
            var doc = new DOMParser().parseFromString(html, 'text/html')

            if(statusCode == '503'){
                errordiv = document.createElement('div')
                document.body.appendChild(errordiv)
                errordiv.outerHTML = `<div id="quickThreadView" class="theme1 border1 round" style="animation: fadein .14s;position: absolute; left: ${x}px; top: ${y}px; box-shadow: 0 30px 90px -20px rgb(0 0 0 / 30%), 0 0 1px 1px rgb(0 0 0 / 5%); width: 500px;min-height: 200px;max-height: 400px;overflow: hidden;display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px;"><h1>Failed to get thread info because of Cloudflare. Refresh the page.</h1>`
                return
            }

            if(!doc.querySelector('.thread_replycontent')) return
    
            function checkRank(rank, color){
                try{
                    if(!doc.querySelector('.usertitle').nextElementSibling) return
                    return doc.querySelector('.usertitle').nextElementSibling.src.includes(rank) ? color : 'false'
                }catch{return 'false'}
            }
            function timeStamp(date){
                return TimeStamp.Beautify(date)
            }
            function truncateString(str, n){
                return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str
            }
            function leaveViewportCheck(offsetS, clientS, xy){
                return (xy + offsetS > clientS) ? xy += clientS - (xy + offsetS) : xy
            }
            
            const P_URL = doc.querySelector('.thread_replierdata').firstElementChild.href
            const P_AVATAR = doc.querySelector('.thread_pfp').style.backgroundImage.split('url("')[1].split('")')[0]
            const P_NAME = doc.querySelector('.userdesc').firstElementChild.firstElementChild.textContent
            const P_ALIAS = doc.querySelector('.usertitle') ? doc.querySelector('.usertitle').textContent : ''
            const P_REP = doc.querySelector('.userstats').children[3].lastElementChild.textContent
            const P_REP_COLOR = P_REP.includes('-') ? '#f44545' : "#4de84d"
            const P_POSTS = doc.querySelector('.userstats').firstElementChild.textContent.split(': ')[1]
            const T_CONTENT = doc.querySelector('.thread_replycontent').outerHTML.replace('onclick="warnLinks(event)"', '')
            const T_DATE = doc.querySelector('.thread_replytime').innerHTML.split(`TimeStamp.Beautify('`)[1].split(`')`)[0]

            // Create new div
            newdiv = document.createElement('div')
            document.body.appendChild(newdiv)

            newdiv.outerHTML = `
            <div id="quickThreadView" class="theme1 border1 round" style="animation: fadein .14s;position: absolute; left: ${x}px; top: ${y}px; box-shadow: 0 30px 90px -20px rgb(0 0 0 / 30%), 0 0 1px 1px rgb(0 0 0 / 5%); width: 500px;min-height: 200px;max-height: 400px;overflow: hidden;display: flex;">
            <div class="userinfobg theme1" style="
             position: absolute;
             top: 0;
             left: 0;
             height: 100%;
             width: 140px;
             filter: brightness(120%);
             border: none;
         "></div>
            <div style="
             position: relative;
             display: flex;
             margin-right: auto;
             min-width: 140px;
             max-width: 140px;
             min-height: 220px;
             flex-direction: column;
             align-items: center;
             justify-content: center;
             overflow: hidden;
         " class="userinfocontent">
               <img style="
             width: 100px;
             height: 100px;
             border-radius: 50%;
         " src="${P_AVATAR}">
               <h1 style="
             font-size: 21px;
             white-space: nowrap;
             overflow: hidden;
             width: 90%;
             text-overflow: ellipsis;
             padding-top: 5px;
             word-break: break-word;
             text-align: center;
             max-width: 90%;
             color: ${checkRank('Noticed', '#528eb6')}; color: ${checkRank('Content', '#2980b9')}; color: ${checkRank('VIP', 'green')}; color: ${checkRank('Premium', '#b905b9')}; color: ${checkRank('Mod', 'red')}; ${checkRank('Admin', 'color: #000; text-transform: uppercase; background: linear-gradient(rgb(255,96,22) 0%,red 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;')}
         ">${P_NAME}</h1>
               <p style="
             opacity: .5;
             font-size: 14px;
             text-align: center;
             word-break: break-word;
             max-height: 40px;
             max-width: 120px;
             overflow: hidden;
         ">${truncateString(P_ALIAS, 23)}</p>
               <div style="
             display: flex;
             flex-direction: row;
             justify-content: center;
             align-items: center;
             column-gap: 15px;
             row-gap: 5px;
             flex-wrap: wrap;
             padding-top: 10px;
         "><span title="Posts" style="
             display: flex;
             align-items: center;
             gap: 3px;
             opacity: .8;
             font-size: 15px;
             cursor: default;
         "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="
             width: 15px;
             height: 15px;
         "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15 4v7H5.17L4 12.17V4h11m1-2H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm5 4h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1z"></path></svg> ${P_POSTS}</span><span title="Reputation" style="
             display: flex;
             align-items: center;
             gap: 3px;
             opacity: .8;
             font-size: 15px;
             cursor: default;
             color: ${P_REP_COLOR};
         "><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="
             width: 15px;
             height: 15px;
         "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path></svg> ${P_REP}</span>
               </div>
            </div>
            <div class="mainthreadDiv" style="
             display: flex;
             flex-direction: column;
             width: calc(100% - 140px);
         ">
         <div class="scrollableContent" onscroll="scrollViewer(this)" style="overflow: auto;height: calc(100% - 50px); word-break: break-word; overflow-x: hidden; padding: 15px;">
                  <p style="
             font-size: 14px;
             opacity: .7;
             padding-bottom: 15px;
         ">Posted ${timeStamp(T_DATE)}</p>
            ${T_CONTENT}
               <div style="
             position: absolute;
             width: calc(100% - 140px);
             height: 50px;
             bottom: 0;
             right: 0;
         ">
                  <div style="
             background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0 0 0 / 14%) 100%);
             width: 100%;
             height: 50px;
             position: absolute;
             top: -50px;
             pointer-events: none;
             opacity: 0;
         "></div>
         <span class="line border1-bottom" style="
             position: absolute;
             width: 100%;
         "></span>
                  <div class="bottomButtons" style="
             display: flex;
             align-items: center;
             justify-content: center;
             flex-direction: row;
             height: 100%;
             gap: 10px;
             padding: 0 10px;
         ">
                     <a href="${threadURL}/newreply" class="btn theme1 theme2 round border1 themebtn" style="padding: 5px;width: 100px;text-align: center;">
                        <p style="
             font-size: 14px;
         ">Reply</p>
                     </a>
                     <a href="${threadURL}" blacklistViewer class="btn theme1 theme2 round border1 themebtn" style="padding: 5px;width: 100px;text-align: center;">
                        <p style="
             font-size: 14px;
         ">View Thread</p>
                     </a>
                     <a href="${P_URL}" blacklistViewer class="btn theme1 theme2 round border1 themebtn" style="
             padding: 5px;
             width: 100px;
             text-align: center;
         ">
                        <p blacklistViewer style="
             font-size: 14px;
         ">View Profile</p>
                     </a>
                  </div>
               </div>
            </div>
         </div>
            `

            // Check if the div would leave the viewport on both sides
            divelm = document.querySelector('#quickThreadView')
            if(!divelm) return

            const { clientHeight, clientWidth } = document.documentElement
            const { offsetHeight, offsetWidth } = divelm
                        
            divelm.style.top = leaveViewportCheck(offsetHeight, clientHeight, y) + window.scrollY + 'px'
            divelm.style.left = leaveViewportCheck(offsetWidth, clientWidth, x) + window.scrollX + 'px'
        }).catch()

        thread_timer = null
    }, 300)
})