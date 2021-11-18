// BWRD Settings Manager

// Create variables for every checkbox & the save button
var applybtn = document.getElementById('applybtn')
toast = document.getElementById('toast')
oldUI = document.getElementById('oldUI')
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
readUnread = document.getElementById('readUnread')
autoRefreshWRD = document.getElementById('autoRefreshWRD')
stickyNavbar = document.getElementById('stickyNavbar')
embedStrawpoll = document.getElementById('embedStrawpoll')

var settings = ['oldUI','embedStrawpoll','stickyNavbar','readUnread','replaceText','removeCaps','darkCB','darkTextEd','transparentPfp','bigMention','postDrafts','brightNavbar','nextonTop','spellcheckTextEd','pageInput','threadPrefixes','autoRefreshWRD']

// Load settings
function load(){
    chrome.storage.local.get(settings, saved => {
	oldUI.checked = saved.oldUI
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
        readUnread.checked = saved.readUnread
        autoRefreshWRD.checked = saved.autoRefreshWRD
        stickyNavbar.checked = saved.stickyNavbar
        embedStrawpoll.checked = saved.embedStrawpoll
    })
}
setTimeout(load, 800)

// Save settings
function save(showtoast){
    chrome.storage.local.set({
	'oldUI': oldUI.checked,
        'replaceText': replaceText.checked,
        'removeCaps': removeCaps.checked,
        'removeCaps': removeCaps.checked,
        'darkCB': darkCodeBl.checked,
        'darkTextEd': darkTextEd.checked,
        'transparentPfp': transparentPfpBg.checked,
        'bigMention': bigMentionBtn.checked,
        'postDrafts': postDrafts.checked,
        'brightNavbar': brightNavbar.checked,
        'nextonTop': nextBtnOnTop.checked,
        'spellcheckTextEd': spellcheck.checked,
        'pageInput': pageInput.checked,
        'threadPrefixes': threadPrefixes.checked,
        'threadPrefixes': threadPrefixes.checked,
        'readUnread': readUnread.checked,
        'autoRefreshWRD': autoRefreshWRD.checked,
        'stickyNavbar': stickyNavbar.checked,
        'embedStrawpoll': embedStrawpoll.checked
    })
    if(showtoast){
        toast.innerHTML = 'Settings saved and applied.'
        toast.className = 'show'
        setTimeout(()=> {toast.classList.remove('show')}, 2000)
    }
}

// Other
document.addEventListener('keydown', keyevent => {
    if(document.getElementById('loading')) return

    var checkboxes = document.querySelectorAll('[type=checkbox]')
    if(keyevent.ctrlKey && keyevent.key == 'a') {checkboxes.forEach(cboxes => cboxes.checked = true)}
    if(keyevent.ctrlKey && keyevent.key == 'Delete') {checkboxes.forEach(cboxes => cboxes.checked = false)}
    if(keyevent.key == 'Enter') {save(true)}
})

applybtn.addEventListener('click', ()=> {save(true)})

window.addEventListener('beforeunload', ()=> { // Auto-save
    if(!document.getElementById('loading') && !document.getElementById('downloadbtn')) {save(false)}
})

chrome.storage.local.get('shownthemebtncircle', saved => {
    if(saved.shownthemebtncircle){
        document.getElementById('changethemebtn').classList.add('remove-before')
    }
})

document.getElementById('changethemebtn').addEventListener('click', ()=> {
    chrome.storage.local.set({'shownthemebtncircle': true})
})