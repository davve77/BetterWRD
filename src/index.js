
/*
    * BetterWRD
    * Adds tons of new features to wearedevs.net!
    * License: GNU GPL V3.0
    *
    * Copyright (C) 2022 BetterWRD
    *
    * This program is free software: you can redistribute it and/or modify
    * it under the terms of the GNU General Public License as published by
    * the Free Software Foundation, either version 3 of the License, or
    * (at your option) any later version.
    *
    * This program is distributed in the hope that it will be useful,
    * but WITHOUT ANY WARRANTY; without even the implied warranty of
    * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    * GNU General Public License for more details.
*/

class BetterWRD{
    async loader(){
        let startTime = new Date()

        this.log('Adding Settings button to dropmenu')
        this.addToDropmenu()

        this.log('Loading features')
        this.loadFeatures()

        this.log('Loading Theme')
        ThemeLoader.initialize()

        this.log('Loading Font')
        FontLoader.initialize()

        this.log('Revealing updated page')
        this.reveal()

        let loadTime = new Date() - startTime
        this.log(`Loaded in ${loadTime.toString()}ms`)
    }

    run(file, setting){
        let script = document.createElement('script')
        script.src = chrome.runtime.getURL(file)
        script.setAttribute('url', chrome.runtime.getURL('/etc'))
        document.head.appendChild(script)
    }

    loadFeatures(){
        chrome.storage.local.get(null, saved => {
            if(util.isOnLoadingPage()) return // Stops here if you're on a Cloudflare loading page
        
            if(saved.removeCaps)            this.run('features/lowercasePremium.js')
            if(saved.stickyNavbar)          this.run('features/stickyNavbar.js')
            if(saved.threadPrefixes)        this.run('features/threadPrefixes.js')
            if(saved.quickProfile)          this.run('features/quickProfileViewer.js')
            if(saved.quickThread)           this.run('features/quickThreadViewer.js')
                                            this.run('features/multiMention.js')
                                            this.run('features/emotes.js')
                                            this.run('features/previewPost.js')
        
            if(document.querySelectorAll('.buttons')[0] || document.querySelectorAll('.forumcontainer')[0]){ // Checks if you're on the main forum page
                if(saved.onlineUsersBottom) this.run('features/onlineUsersBottom.js')
            }
        
            if(document.getElementsByClassName('replygroup')[0]){ // Checks if you're on a thread page
                if(saved.lastPageOnTop)     this.run('features/lastPageOnTop.js')
                if(saved.nextonTop)         this.run('features/nextPageTop.js')
                if(saved.transparentPfp)    this.run('features/transparentPfpBg.js')
                if(saved.pageInput)         this.run('features/pageTextbox.js')
                if(saved.embedStrawpoll)    this.run('features/strawpollEmbeds.js')
            }
            
            if(document.querySelector('#replyform, #editor, .manager_descriptor')){ // Checks if you're on create post or profile manager page
                if(saved.spellcheckTextEd)  this.run('features/textEditorSpellcheck.js')
                                            this.run('features/drafts.js')
            }
        })
    }

    addToDropmenu(){
        const menu = document.querySelectorAll('.menu')[1]
        if(menu){
            const bwrd = menu.appendChild(menu.childNodes[3].cloneNode())
            bwrd.textContent = 'BetterWRD'
            bwrd.title = 'Manage BWRD Settings'
            bwrd.target = '_blank'
            bwrd.href = chrome.runtime.getURL('settings/index.html')
        }
    }

    log(text){
        console.log(`%c[BetterWRD]  ${text}`, `color: #b181db; font-size: 14px`)
    }

    reveal(){
        setTimeout(()=> {
            document.body.style.opacity = '1'
        }, 200)
    }
}


// Load BetterWRD
new BetterWRD().loader()