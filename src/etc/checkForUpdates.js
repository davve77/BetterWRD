// BetterWRD Update Checker

(async() =>{
    
    // Return
    if(typeof InstallTrigger != 'undefined') return
    if(!document.querySelector('#navigationbar')) return

    // Fetch GitHub API
    fetch('https://api.github.com/repos/davve77/BetterWRD/releases/latest')
    .then(res => res.json())
    .then((out) => {

        if(!out['tag_name']) return

        // Check version
        if(out['tag_name'] != chrome.runtime.getManifest().version && !out['tag_name'].includes('BETA')){

            // Create update notice
            const notif = document.createElement('div')
            notif.innerHTML =  DOMPurify.sanitize(`<div class="theme1 border1 round" style="position: relative;margin: 25px auto;width: 100%;max-width: 1076px;margin-bottom: 10px;user-select: none;padding: 15px;overflow: hidden;"> <h1 style="padding-bottom: 10px;margin: 0;font-size: 20px;text-align: left;">A new version of BetterWRD is out — Please update now.</h1> <div style=" display: flex; align-items: center; gap: 8px; "> <a href="${out['html_url']}" class="btn btn-primary themebtn" id="carddl" target="_blank" style="position: relative;display: inline-flex;align-items: center;padding: 8px 20px;font-size: 14px;font-weight: 500!important;border-style: none!important;border-radius: 10px;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black; transition: .16s all" type="button"> <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#000000" height="20px" width="20px" style="vertical-align: middle;margin-right: 8px;"> <g> <rect fill="none" height="24" width="24"></rect> </g> <g> <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></path> </g> </svg>Download Now</a> <p style="opacity: .8;font-size: 14px;">your settings, themes, emotes, plugins etc will not be deleted.</p> </div> <div style=" position: absolute; height: 100%; top: 0; right: 10px; display: flex; "> <img class="updatebwlogo" src="https://betterwrd.vercel.app/bwrd/img/logo.png" style="width: 100px;height: 100px;padding: 10px;filter: brightness(1000%);"> <div style=" position: absolute; height: 100%; width: 650%; right: -10px; background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(167 61 147 / 56%) 100%); animation: updateanim .45s ease-out;"></div> </div> </div> <style>#carddl:hover { transform: scale(.94)!important; } @keyframes updateanim { from {transform: translateX(650%);} to {transform: translateX(0px);} }</style>`, {ADD_ATTR: ['target']})
            if(document.getElementsByTagName('main')[0]){
                document.body.appendChild(notif)
                document.body.insertBefore(notif, document.getElementsByTagName('main')[0])

                // Turn BetterWRD logo black when using Bright Theme
                setTimeout(()=> {
                    if(localStorage.getItem('bwrd_thememode') == 'bright'){
                        document.head.appendChild(document.createElement('style')).textContent = '.updatebwlogo{filter: brightness(0)!important;}'
                    }
                }, 200)
            }
        }
    })
})()