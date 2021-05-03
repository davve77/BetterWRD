//     BetterWRD - Adds tons of features and bug fixes to weareskids.net!
//     Made by davidT.
//     Copyright 1889 - 1945.


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
chrome.storage.local.get(null, function(saved){
    if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return // Stops here if you're on a Cloudflare page

    if(saved.replaceText)          {run('features/replacetoLogo.js')}
    if(saved.brightNavbar)         {run('features/brightthemeNavbar.js')}
    if(saved.threadPrefixes)       {run('features/threadPrefixes.js')}
    if(saved.readUnread)               {run('features/readUnread.js')}
    if(saved.darkCB)               {run('features/darkcodeBlocks.js')}
    if(saved.removeCaps)           {run('features/lowercasePremium.js')}

    if(document.getElementsByClassName('replygroup')[0]){ // Checks if you're on a thread page
        if(saved.nextonTop)        {run('features/nextpageTop.js')}
        if(saved.bigMention)       {run('features/bigmentionBt.js')}
        if(saved.transparentPfp)   {run('features/transparentpfpBg.js')}
        if(saved.pageInput)        {run('features/pageTextbox.js')}}
    
    if(document.getElementsByClassName('g-recaptcha')[0]){ // Checks if you're on a create thread/reply page
        if(saved.darkTextEd)       {run('features/darktextEditor.js')}
        if(saved.spellcheckTextEd) {run('features/texteditorSpellcheck.js')}
        if(saved.postDrafts)       {run('features/saveDrafts.js')}
}})


// Done
console.log('BetterWRD loaded.')