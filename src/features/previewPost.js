// BetterWRD Preview Post


if(document.querySelector('#editor')){

    /*
    *
    *   // Styles //
    *
    */

    document.head.appendChild(document.createElement('style')).textContent = `.thread_replycontent img, .thread_replycontent iframe { max-width: 100%; border: 0!important; } .thread_replytime { font-size: 14px; color: gray; padding: 12px!important; padding-bottom: 0!important; } video { height: 100%; width: 100%; max-width: 100%;} .thread_replycontent{line-height: 1.52; padding: var(--padding)!important;}`



    /*
    *
    *   // Preview Button //
    *
    */

    // Create button
    const previewButton = document.createElement('a')
    previewButton.setAttribute('id', 'previewButton')
    previewButton.setAttribute('class', 'theme2 button')
    previewButton.setAttribute('style', 'color: inherit; float: right; margin-right: 8px;')
    previewButton.textContent = 'Preview'

    // Append Button
    const containerDiv = document.querySelector('.g-recaptcha').parentElement
    containerDiv.appendChild(previewButton)
    containerDiv.insertBefore(previewButton, containerDiv.children[2])

    // Event
    previewButton.addEventListener('click', ()=> {
        var topic = (document.querySelector('#topic')) ? document.querySelector('#topic').value : null
        var content = document.querySelector('#editor_ifr').contentWindow.document.body.innerHTML

        previewPost(topic, content)
    })



    /*
    *
    *   // Main //
    *
    */

    function previewPost(postTitle, postContent){

        /*
        *
        *   // Create Preview //
        *
        */

        // Vars
        var mainDiv = document.querySelector('main')
        var newMainDiv = document.createElement('div')

        // Create preview div
        newMainDiv.setAttribute('class', 'screenPadding previewPost')
        newMainDiv.setAttribute('style', 'max-width: 1100px; min-width: 1100px; margin: 0 auto')
        document.body.appendChild(newMainDiv)
        document.body.insertBefore(newMainDiv, mainDiv)

        // Hide old div
        mainDiv.style.display = 'none'

        // Show preview
        newMainDiv.innerHTML = `<div class="theme2 round border1 padding"> <p> ${mainDiv.firstElementChild.firstElementChild.outerHTML} </p> <h1 style="display: flex;justify-content: space-between;"> <span style="font-weight: 400; font-size: 25px;">${(postTitle == null) ? 'New Reply' : (postTitle.trim() == '') ? 'No title' : postTitle}</span> </h1> </div> <br> <div style="text-align: right"> <a onclick="stopPreview(document.querySelector('.previewPost'), document.querySelector('main'))" class="theme1 round border1 btn_newrelpy" style=" cursor: pointer; padding: 12px; ">Stop Previewing</a> </div> <div class="theme1 replygroup round border1"> <div class="theme2 thread_replierdata"> <a><div id="prPfp" style="cursor: pointer; background-image: url(https://cdn.wearedevs.net/images/avatars/anovatar.png);" class="thread_pfp"></div></a> <div class="userdesc" style="flex: 1"> <a style="cursor: pointer;"><p id="prName">You</p></a> <p class="usertitle" id="prAlias">The Chad</p> <a class="theme1 border1 btnmention" style=" border-radius: 10px; cursor: pointer; ">Mention</a> </div> <div class="userstats"> <p>Posts: 5</p> <p>Threads: 5</p> <p id="prJoined">Joined: Jun, 2019</p> <p>Reputation: <span class="good" id="prRep">6</span></p> <div><span id="bwrduser" style="display: inline-flex; align-items: center; font-size: 18px; font-style: italic; font-weight: 400; user-select: none; margin-top: -10px;" title="This user has used BetterWRD when creating this post."><img id="bwrduserimg" src="https://i.imgur.com/CSDfsvi.png" style="width: 55px; height: 55px; -webkit-user-drag: none; margin-right: 2px;"></span></div> </div> </div> <div class="replycard"> <div style="position: relative"> <p class="thread_replytime padding">Posted ${TimeStamp.Beautify(new Date())}</p> </div> <div class="thread_replycontent"><p>${postContent}</p></div> </div> <div class="signature theme2 padding"><p style="">&nbsp;</p> <p style=" text-align: center; ">Your Epic Siggy.</p> <p style="">&nbsp;</p></div> </div> <br> <div style="text-align: right"> <a onclick="stopPreview(document.querySelector('.previewPost'), document.querySelector('main'))" class="theme1 round border1 btn_newrelpy" style=" cursor: pointer; padding: 12px; ">Stop Previewing</a> </div>`
        newMainDiv.querySelector('.btnmention').style.display = (location.href.endsWith('newthread')) ? 'none' : 'inline-block'



        /*
        *
        *   // Tweaks for the preview //
        *
        */

        function checkImage(url, callback){

            // Check extension
            if(!url.endsWith('.png') && !url.endsWith('.gif') && !url.endsWith('.jpeg')) {callback(false); return}

            // Check hostname
            const host = new URL(url).host
            if(host != 'discord.com' && host != 'cdn.discordapp.com' && host != 'media.discordapp.net' && host != 'gyazo.com' && host != 'i.gyazo.com' && host != 'imgur.com' && host != 'i.imgur.com' && host != 'ibb.co' && host != 'i.ibb.co'){
                callback(false)
                return
            }

            // Check URL
            var img = new Image()
            img.onerror = ()=> {callback(false); return}
            callback(true)
            img.src = url
        }

        function checkVideo(url, callback){

            // Check extension
            if(!url.endsWith('.mp4')) {callback(false); return}

            // Check URL
            var video = document.createElement('video')
            var src = document.createElement('source')
            video.appendChild(src)
            src.setAttribute('type', 'video/mp4')
            video.onerror = ()=> {callback(false); return}
            callback(true)
            src.src = url
        }

        document.querySelectorAll('.thread_replycontent *').forEach(a => {

            // Check for images
            const posturl = a.textContent.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi)
            if(posturl){

                checkImage(posturl[0], (isOK) => {
                    if(isOK != false){

                        img = document.createElement('img')
                        img.setAttribute('src', posturl[0])
                        a.appendChild(img)
                        a.firstChild.remove()
                    }
                })

                checkVideo(posturl[0], (isOK) => {
                    if(isOK != false){

                        video = document.createElement('video')
                        video.setAttribute('controlslist', 'nodownload')
                        video.setAttribute('preload', 'none')
                        video.setAttribute('controls', '')
    
                        source = document.createElement('source')
                        source.setAttribute('src', posturl[0])
                        source.setAttribute('type', 'video/mp4')
                        
                        video.appendChild(source)
                        a.appendChild(video)
                        a.firstChild.remove()
                    }
                })
            }

            // Bold Text
            if(a.tagName == 'STRONG' && a.firstElementChild){
                a.firstElementChild.style['font-weight'] = '700'
            }

            // Emotes
            if(a.getAttribute('class') && a.getAttribute('class').includes('emoteBWRD')){
                a.style['max-width'] = '100%'
                a.style['max-height'] = '100%'
            }

            // Empty space font-size
            if(a.getAttribute('data-mce-bogus') && a.getAttribute('data-mce-bogus') == '1' && a.firstElementChild){
                a.firstElementChild.style['font-size'] = '12pt'
            }

            // Remove empty space from image
            if(a.tagName == 'BR' && a.nextElementSibling && a.nextElementSibling.tagName == 'IMG'){
                a.remove()
            }
        })


        // Set profile info
        setProfileInfo()


        // Scroll to top
        window.scrollTo(0, 0)
    }



    /*
    *
    *   // Stop Previewing //
    *
    */

    function stopPreview(previewdiv, createpostdiv){
        previewdiv.remove()
        createpostdiv.style.display = 'block'
    }



    /*
    *
    *   // Set user's avatar, name, reputation etc //
    *
    */

    async function setProfileInfo(){
        const profileDoc = new DOMParser().parseFromString(await fetch('https://wearedevs.net/profile').then(e => e.text()), 'text/html')

        const P_AVATAR = profileDoc.querySelector('#profile_mainprofilepicture').src
        const P_NAME = profileDoc.querySelector('.username').textContent
        const P_ALIAS = profileDoc.querySelector('.alias').textContent.replace('(','').replace(')','')
        const P_REP = profileDoc.querySelector('.alias').nextElementSibling.firstElementChild.firstElementChild.textContent
        const P_JOINED = profileDoc.querySelector('.alias').nextElementSibling.nextElementSibling.textContent.split(': ')[1]

        document.querySelector('#prPfp').style['background-image'] = `url('${P_AVATAR}')`
        document.querySelector('#prName').textContent = P_NAME
        document.querySelector('#prName').setAttribute('style', `color: ${checkRank('Noticed', '#528eb6')}; color: ${checkRank('Content', '#2980b9')}; color: ${checkRank('VIP', 'green')}; color: ${checkRank('Premium', '#b905b9')}; color: ${checkRank('Mod', 'red')}; ${checkRank('Admin', 'color: #000; text-transform: uppercase; background: linear-gradient(rgb(255,96,22) 0%,red 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;')}`)
        document.querySelector('#prAlias').textContent = P_ALIAS
        document.querySelector('#prRep').textContent = P_REP
        document.querySelector('#prJoined').textContent = `Joined ${P_JOINED}`

        // Colored name for ranks
        function checkRank(rank, color){
            try{
                return profileDoc.querySelector('.profile_badges').innerHTML.includes(rank) ? color : 'false'
            }catch{return 'false'}
        }
    }
}