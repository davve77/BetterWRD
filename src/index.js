//     BetterWRD - Adds tons of features to wearedevs.net!
//     Made by david77.


// Add "BetterWRD" to profile dropmenu
const menu = document.getElementsByClassName('menu')[1]
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


// Show everything again (FOUC & other flickers fix)
setTimeout(()=> {
    document.body.style.opacity = '1'
}, 200)


// Done
console.log('BetterWRD loaded')