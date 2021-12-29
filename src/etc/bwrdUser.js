// BetterWRD User
// Shows other BWRD users that a post creator used BetterWRD when making that post

var textelm = `<p><a target="bwrdUser ver:${chrome.runtime.getManifest().version}bver"> </a></p>`
const isOnMessagePage = location.pathname.includes('message')
const isOnThreadPage = document.getElementsByClassName('replygroup')[0]
const isOnCreatePostPage = document.getElementsByClassName('g-recaptcha')[0] || document.getElementById('saveinfo')

if(!isOnMessagePage && isOnCreatePostPage || isOnThreadPage){

    // Show 'BWRD User' in user stats div
    if(document.getElementsByClassName('replygroup')[0]){

        // Styles
        document.head.appendChild(document.createElement('style')).innerHTML = `#bwrduser{ display: inline-flex; align-items: center; font-size: 18px; font-style: italic; font-weight: 400; user-select: none; margin-top: -10px; } #bwrduserimg{ width: 55px; height: 55px; -webkit-user-drag: none; margin-right: 2px; }`

        // Check Version
        function checkVersion(elm){
            return (elm.includes('target="bwrdUser ver')) ? `BetterWRD V${elm.split('bwrdUser ver:')[1].split('bver">')[0]}` : 'BetterWRD'
        }

        // Main
        const userstatsdivs = document.querySelectorAll('.userstats')
        userstatsdivs.forEach(elms => {
            const threadText = elms.parentNode.parentNode.innerHTML
            if(!threadText.includes('target="bwrdUser')) return

            elms.appendChild(document.createElement('div')).innerHTML = `<span id="bwrduser" title="This user has used ${checkVersion(threadText)} when creating this post."><img id="bwrduserimg" src="https://i.imgur.com/CSDfsvi.png" style="">User</span>`
        })
    }

    // Show other BWRD users that you're using BetterWRD
    function bwrduser(){
        const tinymcetext = document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce')
        if(tinymcetext.innerHTML.includes('target="bwrdUser')) return
        tinymcetext.innerHTML += textelm
    }
    if(document.getElementsByClassName('g-recaptcha')[0]){
        setTimeout(()=> {
            try {bwrduser()}
            catch {setTimeout(bwrduser, 2500)}
        }, 1500)
    }
}