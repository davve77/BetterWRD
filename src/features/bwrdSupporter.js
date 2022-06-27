// Name: BetterWRD Supporter Badge
// Desc: Badge for BetterWRD Supporters


(async()=> {
    const postsPage = !!document.querySelector('.thread_replierdata')
    const profilePage = !!document.querySelector('#medias')
    
    if(!postsPage && !profilePage) return

    const supporterHTML = `<div style=" font-size: 14px; background: #fd90ff; color: black; padding: 0 5px; border-radius: 5px; display: flex; align-items: center; pointer-events: none; gap: 2px; "><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="16" viewBox="0 0 24 24" width="16" fill="black"><g><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"></path></g></svg> <p style="font-weight: 600;">BetterWRD Supporter</p></div>`
    const supportersList = await fetch('https://betterwrd.vercel.app/bwrd/supporters.json').then(e => e.json())

    function bwrdSupporter(elm, badges){
        Object.assign(elm.style, {'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'gap': '6px'})
        
        let supportBadge = document.createElement('div')
        elm.appendChild(supportBadge)
        supportBadge.outerHTML = supporterHTML
        
        let badgeColor = getBadgeColor(badges)
        if(badgeColor) elm.lastElementChild.style['background'] = badgeColor
    }

    function getBadgeColor(badge){
        switch(true){
            case /Mod/.test(badge)      : return 'linear-gradient(to right,rgb(255 70 70) 0%,#ff1129 100%)'
            case /Premium/.test(badge)  : return 'linear-gradient(to right,rgb(255 92 255) 0%,#61c0ff 100%)'
            case /VIP/.test(badge)      : return 'linear-gradient(to right,rgb(109 226 98) 0%,#e8ff8a 100%)'
            case /Creator/.test(badge)  : return 'linear-gradient(to right,rgb(138 207 250) 0%,#3f70ea 100%)'
            case /Noticed/.test(badge)  : return 'linear-gradient(to right,rgb(138 207 250) 0%,#3f70ea 100%)'
            default                     : return '#fd90ff'
        }
    }

    // Posts
    if(postsPage){
        let profileInfos = document.querySelectorAll('.userdesc > a:first-child')
        let getID = elm => elm.href.match(/\d+$/)[0]
        let getBadge = elm => elm.parentElement.querySelector('.badge') ? elm.parentElement.querySelector('.badge').src : ''

        profileInfos.forEach(inf => { if(supportersList.includes( getID(inf) )) bwrdSupporter(inf, getBadge(inf)) })
    }

    // Profile
    if(profilePage){
        let usernameElm = document.querySelector('.username')
        let userID = util.findElementByText('Possible Alts').href.split('=')[1]
        let badges = document.querySelector('[alt="badge"]') ? document.querySelector('[alt="badge"]').parentElement.innerHTML : ''

        if(supportersList.includes(userID)) bwrdSupporter(usernameElm, badges)
    }
})()