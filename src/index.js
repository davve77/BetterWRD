
/*
    * BetterWRD
    * Adds tons of new features to wearedevs.net!
    * Credits: david77
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



// Add "BetterWRD" to profile dropmenu
const menu = document.querySelectorAll('.menu')[1]
if(menu){
    const bwrd = menu.appendChild(menu.childNodes[3].cloneNode())
    bwrd.textContent = 'BetterWRD'
    bwrd.title = 'Manage BWRD Settings'
    bwrd.target = '_blank'
    bwrd.href = chrome.runtime.getURL('settings/index.html')
}


// Main
function run(file){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL(file)
}

chrome.storage.local.get(null, saved => {
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return // Stops here if you're on a Cloudflare page

    if(saved.darkCB)               {run('features/darkCodeBlocks.js')}
    if(saved.removeCaps)           {run('features/lowercasePremium.js')}
    if(saved.stickyNavbar)         {run('features/stickyNavbar.js')}
    if(saved.threadPrefixes)       {run('features/threadPrefixes.js')}
    if(saved.quickProfile)         {run('features/quickProfileViewer.js')}
    if(saved.quickThread)          {run('features/quickThreadViewer.js')}
                                   {run('features/multiMention.js')}
                                   {run('features/emotes.js')}
                                   {run('features/previewPost.js')}

    if(document.querySelectorAll('.buttons')[0] || document.querySelectorAll('.forumcontainer')[0]){ // Checks if you're on the main forum page
        if(saved.onlineUsersBottom){run('features/onlineUsersBottom.js')}
    }

    if(document.getElementsByClassName('replygroup')[0]){ // Checks if you're on a thread page
        if(saved.lastPageOnTop)    {run('features/lastPageOnTop.js')}
        if(saved.nextonTop)        {run('features/nextPageTop.js')}
        if(saved.transparentPfp)   {run('features/transparentPfpBg.js')}
        if(saved.pageInput)        {run('features/pageTextbox.js')}
        if(saved.embedStrawpoll)   {run('features/strawpollEmbeds.js')}
    }
    
    if(document.querySelector('#replyform, #editor, .manager_descriptor')){ // Checks if you're on create post or profile manager page
        if(saved.spellcheckTextEd) {run('features/textEditorSpellcheck.js')}
                                   {run('features/drafts.js')}
    }
})


// Reveal page after 200ms (Flickering fix)
setTimeout(()=> {
    document.body.style.opacity = '1'
}, 200)


// Done
console.log('BetterWRD loaded')