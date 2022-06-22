// BetterWRD User
// Shows other BWRD users that a post creator used BetterWRD when creating that post

const textelm = `<p><a target="bwrdUser ver:${chrome.runtime.getManifest().version}bver"> </a></p>`
const isOnMessagePage = location.pathname.includes('message')
const isOnThreadPage = document.getElementsByClassName('replygroup')[0]
const isOnCreatePostPage = document.querySelector('#editor')

if(!isOnMessagePage && isOnCreatePostPage || isOnThreadPage){

    // Show 'BWRD User' in user stats div
    if(document.getElementsByClassName('replygroup')[0]){

        // Styles
        document.head.appendChild(document.createElement('style')).textContent = `#bwrduser{ display: inline-flex; align-items: center; font-size: 18px; font-style: italic; font-weight: 400; user-select: none; margin-top: 5px; } #bwrdusertext{font-size: 20px; font-family: system-ui!important; background: linear-gradient(to right,#448fff,#ff41d5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;}`

        // Check Version
        function checkVersion(elm){
            return (elm.includes('target="bwrdUser ver')) ? `BetterWRD V${elm.split('bwrdUser ver:')[1].split('bver">')[0]}` : 'BetterWRD'
        }

        // Main
        const userstatsdivs = document.querySelectorAll('.userstats')
        userstatsdivs.forEach(elms => {
            const threadText = elms.parentNode.parentNode.innerHTML
            if(!threadText.includes('target="bwrdUser')) return

            elms.appendChild(document.createElement('div')).innerHTML = `<span id="bwrduser" title="This user has used ${checkVersion(threadText)} when creating this post."><h2 id="bwrdusertext">bwrd</h2></span>`
        })
    }

    // Show other BWRD users that you're using BetterWRD
    function bwrdUser(){
        const editorDoc = document.getElementById('editor_ifr').contentWindow.document
        const editorText = document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce')
        const bwrduserElm = editorDoc.createElement('p')

        if((/target="bwrdUser/).test(editorText.innerHTML)) return
        editorText.appendChild(bwrduserElm)
        bwrduserElm.outerHTML = textelm
    }

    // Append to tinymce on post submit
    const submitBtn = document.querySelector('.padding > button.g-recaptcha')
    if(submitBtn) submitBtn.addEventListener('click', bwrdUser)
}


// Show BetterWRD User badge on profile page
if(document.querySelector('#profile_sidecards')){

    // Vars
    var hasUsedBWRD = false
    var postsMade = 0
    let lastPost

    // Values
    document.querySelectorAll('.activitycard').forEach((elm, i) => {
        if(elm.innerHTML.includes('<a target="bwrdUser')){
            hasUsedBWRD = true
            postsMade += 1
            if(i == 0) lastPost = elm.innerHTML
        }
    })

    if(hasUsedBWRD){
        var infodiv = document.querySelector('#info').parentElement

        // Style
        infodiv.style.position = 'relative'

        // Add badge
        const badge = document.createElement('div')
        infodiv.appendChild(badge)
        badge.outerHTML = `<div id="bwrdbadge" style="display: flex; user-select: none; position: absolute; bottom: 12px; right: 12px;"><h2 style="font-size: 20px; font-style: italic; font-family: system-ui!important; background: linear-gradient(to right,#448fff,#ff41d5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700;">bwrd</h2> <span style="line-height: 35px;font-size: 16px;font-style: italic;"></span></div>`

        function checkVersion(elm){
            if(!elm) return 'BetterWRD'
            return (elm.includes('target="bwrdUser ver')) ? `BetterWRD V${elm.split('bwrdUser ver:')[1].split('bver">')[0]}` : 'BetterWRD'
        }

        // Add tooltip
        document.querySelector('#bwrdbadge').title = `This user has made ${postsMade}+ posts using ${checkVersion(lastPost)}.`
    }
}