// Name: BetterWRD Anti-bot System
// Desc: Hides posts that might be advertisements


(()=> {

    // Return if not on thread or if thread has no replies
    if(document.querySelectorAll('.replygroup').length < 2) return
    
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const currTime = `${months[new Date().getMonth()]}, ${new Date().getFullYear()}`
    const defaultAvatar = 'url("https://cdn.wearedevs.net/images/avatars/anovatar.png")'
    const posts = document.querySelectorAll('.replygroup')

    // Get info
    const getPosts              = elm => elm.querySelector('.userstats').children[0].textContent.match(/\d+/)[0]
    const getThreads            = elm => elm.querySelector('.userstats').children[1].textContent.match(/\d+/)[0]
    const getJoinDate           = elm => elm.querySelector('.userstats').children[2].textContent.substring(8)
    const getAvatar             = elm => getComputedStyle(elm.querySelector('.thread_replierdata > a > div')).backgroundImage
    const hasLowRep             = elm => !!elm.querySelector('[onclick="warnLinks(event)"]')
    const hasUntrustedLinks     = elm => !!(elm.querySelector('.thread_replycontent a') && !(/wearedevs/).test(elm.querySelector('.thread_replycontent a').href))

    // Vars
    var isBotted = false
    var bottedPosts = 0
    
    // Check posts
    posts.forEach(post => {

        // Return if first post
        if(post == posts[0]) return

        // Return if no links
        if(!hasUntrustedLinks(post)) return

        // Checks
        if( getJoinDate(post) == currTime &&
            getPosts(post) < 2 &&
            getThreads(post) < 2 &&
            getAvatar(post) == defaultAvatar &&
            hasLowRep(post) ){

                // Post is botted
                post.style.display = 'none'
                post.style.setProperty('border', '1px solid #ff6a6a8a', 'important')
                post.classList.add('bot-thread')

                isBotted = true
                bottedPosts++
            }

    })


    // Create alert box
    if(!isBotted) return

    const alertDiv = document.createElement('div')
    const lastPost = posts[posts.length-1]
    const parentOfPosts = lastPost.parentElement
    const alertText = (bottedPosts > 1) ? ['Some posts have', 'Show them'] : ['A post has', 'Show it']

    // Append alert box
    parentOfPosts.appendChild(alertDiv)
    parentOfPosts.insertBefore(alertDiv, lastPost.nextElementSibling)
    alertDiv.outerHTML = `<br> <div class="theme1 border1 round" style=" padding: 12px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; "> <div style=" display: flex; align-items: center; gap: 10px; "> <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" width="48" style=" opacity: .8; transform: scale(.8); margin: -5px; "><path d="M17.3 45 13.5 38.5 5.95 36.95 6.8 29.6 2 24 6.8 18.45 5.95 11.1 13.5 9.55 17.3 3 24 6.1 30.7 3 34.55 9.55 42.05 11.1 41.2 18.45 46 24 41.2 29.6 42.05 36.95 34.55 38.5 30.7 45 24 41.9ZM24 24ZM21.85 30.65 33.2 19.4 30.95 17.35 21.85 26.35 17.1 21.4 14.8 23.65ZM18.65 41.05 24 38.8 29.5 41.05 32.85 36.05 38.7 34.55 38.1 28.6 42.15 24 38.1 19.3 38.7 13.35 32.85 11.95 29.4 6.95 24 9.2 18.5 6.95 15.15 11.95 9.3 13.35 9.9 19.3 5.85 24 9.9 28.6 9.3 34.65 15.15 36.05Z"></path></svg> <div> <p style=" font-size: 17px; font-weight: 500; ">${alertText[0]} been hidden by BetterWRD Anti-bot system.</p><p style=" margin-top: -2px; font-size: 13px; opacity: .45; ">Warning: this feature is in Beta and may falsely report some posts.</p> </div> </div><a class="button" style=" padding: 5px 20px; margin-left: 10px; background: hsla(0, 0%, 100%, .061);" id="show-bot-threads">${alertText[1]}</a> </div> <style>.replygroup{transition: 167ms linear opacity;}</style>`

    // Show bot threads button
    document.querySelector('#show-bot-threads').addEventListener('click', ()=> {
        let botPosts = document.querySelectorAll('.bot-thread')

        botPosts.forEach(elm => elm.style.removeProperty('display'))
        botPosts[0].style.opacity = '0'
        botPosts[0].scrollIntoView({behavior: 'smooth', block: 'center'})
        setTimeout(()=> { botPosts[0].style.opacity = '1' }, 500)
    })
})()