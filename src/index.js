
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

    constructor() {
        this.scriptQueue = []
        this.scriptFrag = document.createDocumentFragment()
    }

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
        EventEmitter.on('FeaturesLoaded', ()=> {
            this.log(`Loaded ${this.scriptQueue.length + 2} scripts in ${loadTime.toString()}ms`)
        })
    }

    run(setting, file, data){
        if(!setting) return

        let script = document.createElement('script')
        script.src = chrome.runtime.getURL(file)
        script.setAttribute('url', chrome.runtime.getURL('/etc'))

        if(data) script.setAttribute('data', data)

        this.scriptFrag.appendChild(script)
        this.scriptQueue.push(script.outerHTML)
    }

    loadFeatures(){
        chrome.storage.local.get(null, saved => {

            // Stops here if you're on a Cloudflare loading page
            if(util.isOnLoadingPage()) return
        
            // Global
            this.run(saved.replaceText,             'features/textToLogo.js')
            this.run(saved.removeCaps,              'features/lowercasePremium.js')
            this.run(saved.stickyNavbar,            'features/stickyNavbar.js')
            this.run(saved.threadPrefixes,          'features/threadPrefixes.js')
            this.run(saved.centerNav,               'features/centeredNavbar.js')
            this.run(saved.autoHideNav,             'features/autoHideNav.js')
            this.run(saved.navLinkLine,             'features/currentNavLinkLine.js')
            this.run(saved.quickProfile,            'features/quickProfileViewer.js')
            this.run(saved.quickThread,             'features/quickThreadViewer.js')
            this.run(saved.betterChangelog,         'features/betterChangelog.js')
            this.run(true,                          'features/multiMention.js')
            this.run(true,                          'features/emotes.js')
            this.run(true,                          'features/emotesPopout.js')
            this.run(true,                          'features/previewPost.js')
            this.run(true,                          'features/bwrdSupporter.js')
            this.run(true,                          'features/navHeight.js',    saved.navHeight)
            this.run(true,                          'features/mainWidth.js',    saved.mainWidth)
   

            // Checks if you're on the main forum page
            if(document.querySelector('.buttons, .forumcontainer')){
                this.run(saved.oldUI,               'features/oldLayout.js')
                this.run(saved.onlineUsersBottom,   'features/onlineUsersBottom.js')
            }
        
            // Checks if you're on a thread page
            if(document.querySelector('.replygroup')){
                this.run(saved.threadNavTop,       'features/threadButtonsOnTop.js')
                this.run(saved.betterPostButtons,  'features/betterPostButtons.js')
                this.run(saved.transparentPfp,     'features/transparentAvatarBg.js')
                this.run(saved.moreEmbeds,         'features/moreEmbeds.js')
                this.run(saved.pageInput,          'features/pageTextbox.js')
            }
            
            // Checks if you're on create post or profile manager page
            if(document.querySelector('#replyform, #editor, .manager_descriptor')){
                this.run(saved.spellcheckTextEd,    'features/textEditorSpellcheck.js')
                this.run(true,                      'features/drafts.js')
            }

            // Append fragment to head
            document.head.appendChild(this.scriptFrag)

            // Emit event
            EventEmitter.emit('FeaturesLoaded')
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
        console.log(`%c[BetterWRD]:  ${text}`, `color: #b181db; font-size: 14px`)
    }

    reveal(){
        setTimeout(()=> {
            document.body.style.opacity = '1'
        }, 200)
    }
}


// Load BetterWRD
new BetterWRD().loader()