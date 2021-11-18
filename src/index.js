//     BetterWRD - Adds tons of features and bug fixes to weareskids.net!
//     Made by david77


// Main
var menu = document.getElementsByClassName('menu')[1]
if(menu){
    var bwrd = menu.appendChild(menu.childNodes[3].cloneNode())
    bwrd.textContent = 'BetterWRD'
    bwrd.title = 'Manage BWRD Settings'
    bwrd.target = '_blank'
    bwrd.href = chrome.runtime.getURL('settings/index.html')
}


// Load
function run(file){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL(file)
}
chrome.storage.local.get(null, saved => {
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return // Stops here if you're on a Cloudflare page

    if(saved.replaceText)          {run('features/replaceToLogo.js')}
    if(saved.brightNavbar)         {run('features/brightThemeNavbar.js')}
    if(saved.darkCB)               {run('features/darkCodeBlocks.js')}
    if(saved.removeCaps)           {run('features/lowercasePremium.js')}
    if(saved.stickyNavbar)         {run('features/stickyNavbar.js')}

    if(document.getElementsByClassName('forumcategory')[0]){ // Checks if you're on the main forum page
        if(saved.threadPrefixes)   {run('features/threadPrefixes.js')}
        if(saved.readUnread)       {run('features/readUnread.js')}
    }

    if(document.getElementsByClassName('replygroup')[0]){ // Checks if you're on a thread page
        if(saved.nextonTop)        {run('features/nextPageTop.js')}
        if(saved.bigMention)       {run('features/bigMentionBt.js')}
        if(saved.transparentPfp)   {run('features/transparentPfpBg.js')}
        if(saved.pageInput)        {run('features/pageTextbox.js')}}
        if(saved.embedStrawpoll)   {run('features/strawpollEmbeds.js')}
    
    if(document.getElementsByClassName('g-recaptcha')[0]){ // Checks if you're on a create thread/reply page
        if(saved.darkTextEd)       {run('features/darkTextEditor.js')}
        if(saved.spellcheckTextEd) {run('features/textEditorSpellcheck.js')}
        if(saved.postDrafts)       {run('features/saveDrafts.js')}}
})


// Done
console.log('BetterWRD loaded')