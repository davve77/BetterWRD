// BWRD Settings Manager


// Consts for elements
const   applybtn            = document.getElementById('applybtn'),
        replaceText         = document.getElementById('replaceText'),
        removeCaps          = document.getElementById('removeCaps'),
        oldUI               = document.getElementById('oldUI'),
        transparentPfpBg    = document.getElementById('transparentPfp'),
        lastPageOnTop       = document.getElementById('lastPageOnTop'),
        nextBtnOnTop        = document.getElementById('nextonTop'),
        spellcheck          = document.getElementById('spellcheckTextEd'),
        pageInput           = document.getElementById('pageInput'),
        threadPrefixes      = document.getElementById('threadPrefixes'),
        autoRefreshWRD      = document.getElementById('autoRefreshWRD'),
        stickyNavbar        = document.getElementById('stickyNavbar'),
        embedStrawpoll      = document.getElementById('embedStrawpoll'),
        betterDropmenus     = document.getElementById('betterDropmenus'),
        onlineUsersBottom   = document.getElementById('onlineUsersBottom'),
        selectLogo          = document.getElementById('selectLogo'),
        quickProfile        = document.getElementById('quickProfile'),
        quickThread         = document.getElementById('quickThread')


// All Settings
const settings = ['oldUI','quickProfile','quickThread','onlineUsersBottom','betterDropmenus','embedStrawpoll','stickyNavbar','replaceText','removeCaps','transparentPfp','lastPageOnTop','nextonTop','spellcheckTextEd','pageInput','threadPrefixes','autoRefreshWRD']


// Load Settings
function load(){
    chrome.storage.local.get(settings, saved => {
        replaceText.checked = saved.replaceText
        removeCaps.checked = saved.removeCaps
        oldUI.checked = saved.oldUI
        transparentPfpBg.checked = saved.transparentPfp
        lastPageOnTop.checked = saved.lastPageOnTop
        nextBtnOnTop.checked = saved.nextonTop
        spellcheck.checked = saved.spellcheckTextEd
        pageInput.checked = saved.pageInput
        threadPrefixes.checked = saved.threadPrefixes
        autoRefreshWRD.checked = saved.autoRefreshWRD
        stickyNavbar.checked = saved.stickyNavbar
        embedStrawpoll.checked = saved.embedStrawpoll
        betterDropmenus.checked = saved.betterDropmenus
        onlineUsersBottom.checked = saved.onlineUsersBottom
        quickProfile.checked = saved.quickProfile
        quickThread.checked = saved.quickThread
    })
}
load()


// Save Settings
function save(showtoast){
    chrome.storage.local.set({
        'replaceText': replaceText.checked,
        'removeCaps': removeCaps.checked,
        'removeCaps': removeCaps.checked,
        'oldUI': oldUI.checked,
        'transparentPfp': transparentPfpBg.checked,
        'lastPageOnTop': lastPageOnTop.checked,
        'nextonTop': nextBtnOnTop.checked,
        'spellcheckTextEd': spellcheck.checked,
        'pageInput': pageInput.checked,
        'threadPrefixes': threadPrefixes.checked,
        'threadPrefixes': threadPrefixes.checked,
        'autoRefreshWRD': autoRefreshWRD.checked,
        'stickyNavbar': stickyNavbar.checked,
        'embedStrawpoll': embedStrawpoll.checked,
        'betterDropmenus': betterDropmenus.checked,
        'onlineUsersBottom': onlineUsersBottom.checked,
        'quickProfile': quickProfile.checked,
        'quickThread': quickThread.checked
    })
    if(showtoast){
        showToast('Settings saved and applied.')
    }
}


// Save/Apply button
applybtn.addEventListener('click', ()=> {save(true)})


// Key Shortcuts
document.addEventListener('keydown', keyevent => {
    if(document.getElementById('loading')) return

    const checkboxes = document.querySelectorAll('[type=checkbox]')
    if(keyevent.ctrlKey && keyevent.key == 'a') {checkboxes.forEach(cboxes => cboxes.checked = true)}
    if(keyevent.ctrlKey && keyevent.key == 'Delete') {checkboxes.forEach(cboxes => cboxes.checked = false)}
    if(keyevent.key == 'Enter') {save(true)}
})


// Select WRD logo
selectLogo.addEventListener('click', (e)=> {
    if(e.target == selectLogo.firstElementChild){
        chrome.storage.local.set({'WRDLogo': 'light'})
    }
    else if(e.target == selectLogo.lastElementChild){
        chrome.storage.local.set({'WRDLogo': 'dark'})
    }
})
selectLogo.addEventListener('mouseover', (e)=> {
    document.getElementById('replaceText').disabled = true
})
selectLogo.addEventListener('mouseleave', (e)=> {
    document.getElementById('replaceText').disabled = false
})

// Auto-save settings
window.addEventListener('beforeunload', ()=> {
    if(!document.getElementById('loading') && !document.getElementById('downloadbtn')) {save(false)}
})