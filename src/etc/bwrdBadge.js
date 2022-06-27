// BetterWRD User Badge
// Badge/icon that appears on the user's profile and posts for using BetterWRD

'use strict'

class bwrdBadge{
    constructor(){
        this.badgeHTML = `<p><a target="bwrdUser ver:${chrome.runtime.getManifest().version}bver"> </a></p>`
        this.isOnMessagePage = /message/.test(location.pathname)
        this.isOnThreadPage = !!document.querySelector('.replygroup')
        this.isOnProfilePage = !!document.querySelector('#profile_sidecards')
        this.isOnCreatePostPage = !!document.querySelector('#editor')
    }

    main(){
        if(this.isOnMessagePage) return
        if(!(this.isOnThreadPage || this.isOnCreatePostPage || this.isOnProfilePage)) return

        // CSS
        util.addCSS(chrome.runtime.getURL('etc/css/bwrdBadge.css'))
        
        // Main
        if(this.isOnThreadPage) this.threadPage()
        if(this.isOnProfilePage) this.profilePage()
        if(this.isOnCreatePostPage) this.createPostPage()
    }

    getVer(text){
        return (/target="bwrdUser ver/.test(text)) ? `BetterWRD V${text.split('bwrdUser ver:')[1].split('bver">')[0]}` : 'BetterWRD'
    }

    threadPage(){
        // Show badges below stats
        document.querySelectorAll('.userstats').forEach(elm => {
            let threadText = elm.parentNode.parentNode.innerHTML
            if(!(/target="bwrdUser/).test(threadText)) return

            elm.appendChild(document.createElement('div')).innerHTML = `
            <span id="bwrduser" title="This user has used ${this.getVer(threadText)} when creating this post.">
                <h2 id="bwrdusertext">bwrd</h2>
            </span>`
        })
    }

    profilePage(){
        // Show badges on profile page
        var hasUsedBWRD = false,
            postsMade = 0,
            lastPost

        // Assign values to variables
        document.querySelectorAll('.activitycard').forEach((elm, i) => {
            if((/<a target="bwrdUser/).test(elm.innerHTML)){
                hasUsedBWRD = true
                postsMade++
                if(!lastPost) lastPost = elm.innerHTML
            }
        })

        // Show badge
        if(hasUsedBWRD){
            let infoDiv = document.querySelector('#info').parentElement
            infoDiv.style.position = 'relative'

            // Add badge
            util.addElement('div', infoDiv, `
            <div id="bwrdbadge" title="This user has made ${postsMade}+ posts using ${this.getVer(lastPost)}.">
                <h2>bwrd</h2>
            </div>`)
        }
    }

    createPostPage(){
        // Add badge to editor on submit
        let submitBtn = document.querySelector('.padding > button.g-recaptcha')
        if(!submitBtn) return

        submitBtn.addEventListener('click', () => {
            let editorDoc = document.getElementById('editor_ifr').contentWindow.document
            let editorText = editorDoc.getElementById('tinymce')
            let elm = editorDoc.createElement('p')
            
            // don't add if it already exists
            if((/target="bwrdUser/).test(editorText.innerHTML)) return
    
            editorText.appendChild(elm)
            elm.outerHTML = this.badgeHTML
        })
    }
}

new bwrdBadge().main()