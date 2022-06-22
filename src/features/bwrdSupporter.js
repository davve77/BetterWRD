// Name: BetterWRD Supporter Badge
// Desc: Badge for BetterWRD Supporters


(async()=> {
    const postsPage = !!document.querySelector('.thread_replierdata')
    const profilePage = !!document.querySelector('#medias')
    
    if(!postsPage && !profilePage) return

    const supporterHTML = `<div style=" font-size: 14px; background: #fd90ff; color: black; padding: 0 5px; border-radius: 5px; display: flex; align-items: center; pointer-events: none; gap: 2px; "><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="16" viewBox="0 0 24 24" width="16" fill="black"><g><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"></path></g></svg> <p style="font-weight: 600;">BetterWRD Supporter</p></div>`
    const supportersList = await fetch('https://betterwrd.vercel.app/bwrd/supporters.json').then(e => e.json())

    function bwrdSupporter(elm){
        Object.assign(elm.style, {'display': 'flex', 'flex-direction': 'row', 'align-items': 'center', 'gap': '6px'})
        let supportBadge = document.createElement('div')
        elm.appendChild(supportBadge)
        supportBadge.outerHTML = supporterHTML
    }


    // Posts
    if(postsPage){
        let profileInfos = document.querySelectorAll('.userdesc > a:first-child')
        let getID = elm => elm.href.match(/\d+$/)[0]

        profileInfos.forEach(inf => { if(supportersList.includes( getID(inf) )) bwrdSupporter(inf) })
    }


    // Profile
    if(profilePage){
        let usernameElm = document.querySelector('.username')
        let userID = util.findElementByText('Possible Alts').href.split('=')[1]

        if(supportersList.includes(userID)) bwrdSupporter(usernameElm)
    }
})()