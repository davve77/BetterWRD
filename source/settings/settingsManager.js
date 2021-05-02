// BWRD Settings Manager

// Create variables for every checkbox & the save button
var applybtn = document.getElementById('applybtn')
replaceText = document.getElementById('replaceText')
removeCaps = document.getElementById('removeCaps')
darkCodeBl = document.getElementById('darkCB')
darkTextEd = document.getElementById('darkTextEd')
transparentPfpBg = document.getElementById('transparentPfp')
bigMentionBtn = document.getElementById('bigMention')
postDrafts = document.getElementById('postDrafts')
brightNavbar = document.getElementById('brightNavbar')
nextBtnOnTop = document.getElementById('nextonTop')
spellcheck = document.getElementById('spellcheckTextEd')
pageInput = document.getElementById('pageInput')
threadPrefixes = document.getElementById('threadPrefixes')

var settings = ['replaceText','removeCaps','darkCB','darkTextEd','transparentPfp','bigMention','postDrafts','brightNavbar','nextonTop','spellcheckTextEd','pageInput','threadPrefixes']

// Load settings
chrome.storage.local.get(settings, function(saved){
    replaceText.checked = saved.replaceText
    removeCaps.checked = saved.removeCaps
    darkCodeBl.checked = saved.darkCB
    darkTextEd.checked = saved.darkTextEd
    transparentPfpBg.checked = saved.transparentPfp
    bigMentionBtn.checked = saved.bigMention
    postDrafts.checked = saved.postDrafts
    brightNavbar.checked = saved.brightNavbar
    nextBtnOnTop.checked = saved.nextonTop
    spellcheck.checked = saved.spellcheckTextEd
    pageInput.checked = saved.pageInput
    threadPrefixes.checked = saved.threadPrefixes
})

// Save settings
function save(){
    chrome.storage.local.set({'replaceText': replaceText.checked})
    chrome.storage.local.set({'removeCaps': removeCaps.checked})
    chrome.storage.local.set({'darkCB': darkCodeBl.checked})
    chrome.storage.local.set({'darkTextEd': darkTextEd.checked})
    chrome.storage.local.set({'transparentPfp': transparentPfpBg.checked})
    chrome.storage.local.set({'bigMention': bigMentionBtn.checked})
    chrome.storage.local.set({'postDrafts': postDrafts.checked})
    chrome.storage.local.set({'brightNavbar': brightNavbar.checked})
    chrome.storage.local.set({'nextonTop': nextBtnOnTop.checked})
    chrome.storage.local.set({'spellcheckTextEd': spellcheck.checked})
    chrome.storage.local.set({'pageInput': pageInput.checked})
    chrome.storage.local.set({'threadPrefixes': threadPrefixes.checked})

    document.getElementById('toast').className = 'show'
    setTimeout(()=> {document.getElementById('toast').classList.remove('show')}, 2000)
}

// Other
document.addEventListener('keydown', function(keyevent){
    var checkboxes = document.querySelectorAll('[type=checkbox]')
    if(keyevent.ctrlKey && keyevent.key == 'a') {checkboxes.forEach(cboxes => cboxes.checked = true)}
    if(keyevent.ctrlKey && keyevent.key == 'Delete') {checkboxes.forEach(cboxes => cboxes.checked = false)}
})

applybtn.addEventListener('mouseup', save)
window.addEventListener('beforeunload', save) // Auto-save