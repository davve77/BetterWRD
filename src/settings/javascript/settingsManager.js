// BWRD Settings Manager


// Consts for elements
const   applybtn            = document.getElementById('applybtn'),
        replaceText         = document.getElementById('replaceText'),
        removeCaps          = document.getElementById('removeCaps'),
        oldUI               = document.getElementById('oldUI'),
        transparentPfpBg    = document.getElementById('transparentPfp'),
        threadNavTop        = document.getElementById('threadNavTop'),
        spellcheck          = document.getElementById('spellcheckTextEd'),
        pageInput           = document.getElementById('pageInput'),
        threadPrefixes      = document.getElementById('threadPrefixes'),
        stickyNavbar        = document.getElementById('stickyNavbar'),
        moreEmbeds          = document.getElementById('embedStrawpoll'),
        betterDropmenus     = document.getElementById('betterDropmenus'),
        onlineUsersBottom   = document.getElementById('onlineUsersBottom'),
        betterPostButtons   = document.getElementById('betterPostButtons'),
        quickProfile        = document.getElementById('quickProfile'),
        quickThread         = document.getElementById('quickThread'),
        centerNav           = document.getElementById('centerNav'),
        autoHideNav         = document.getElementById('autoHideNav'),
        navHeight           = document.getElementById('navHeight'),
        navLinkLine         = document.getElementById('navLinkLine'),
        betterChangelog     = document.getElementById('betterChangelog'),
        mainWidth           = document.getElementById('mainWidth')


// All Settings
const settings = ['betterPostButtons','mainWidth','betterChangelog','navLinkLine','navHeight','autoHideNav','centerNav','oldUI','quickProfile','quickThread','onlineUsersBottom','betterDropmenus','moreEmbeds','stickyNavbar','replaceText','removeCaps','transparentPfp','threadNavTop','spellcheckTextEd','pageInput','threadPrefixes']


// Load Settings
function load(){
    chrome.storage.local.get(settings, saved => {
        replaceText.checked = saved.replaceText
        removeCaps.checked = saved.removeCaps
        oldUI.checked = saved.oldUI
        transparentPfpBg.checked = saved.transparentPfp
        threadNavTop.checked = saved.threadNavTop
        spellcheck.checked = saved.spellcheckTextEd
        pageInput.checked = saved.pageInput
        threadPrefixes.checked = saved.threadPrefixes
        stickyNavbar.checked = saved.stickyNavbar
        moreEmbeds.checked = saved.moreEmbeds
        betterDropmenus.checked = saved.betterDropmenus
        onlineUsersBottom.checked = saved.onlineUsersBottom
        quickProfile.checked = saved.quickProfile
        quickThread.checked = saved.quickThread
        centerNav.checked = saved.centerNav
        autoHideNav.checked = saved.autoHideNav
        navLinkLine.checked = saved.navLinkLine
        betterChangelog.checked = saved.betterChangelog
        betterPostButtons.checked = saved.betterPostButtons
        navHeight.value = saved.navHeight ?? navHeight.value
        mainWidth.value = saved.mainWidth ?? mainWidth.value
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
        'threadNavTop': threadNavTop.checked,
        'spellcheckTextEd': spellcheck.checked,
        'pageInput': pageInput.checked,
        'threadPrefixes': threadPrefixes.checked,
        'threadPrefixes': threadPrefixes.checked,
        'stickyNavbar': stickyNavbar.checked,
        'moreEmbeds': moreEmbeds.checked,
        'betterDropmenus': betterDropmenus.checked,
        'onlineUsersBottom': onlineUsersBottom.checked,
        'quickProfile': quickProfile.checked,
        'quickThread': quickThread.checked,
        'centerNav': centerNav.checked,
        'autoHideNav': autoHideNav.checked,
        'navLinkLine': navLinkLine.checked,
        'betterChangelog': betterChangelog.checked,
        'betterPostButtons': betterPostButtons.checked,
        'navHeight': navHeight.value,
        'mainWidth': mainWidth.value
    })
    if(showtoast){
        showToast('Settings saved and applied.')
    }
}


// Save/Apply button
applybtn.addEventListener('click', ()=> {save(true)})


// Key Shortcuts
document.body.addEventListener('keydown', keyevent => {
    if(document.getElementById('loading')) return
    let switchers = document.querySelectorAll('[type=checkbox]')

    if(keyevent.shiftKey && keyevent.key.toLowerCase() == 'a')  switchers.forEach(s => s.checked = true)
    if(keyevent.shiftKey && keyevent.key == 'Delete')           switchers.forEach(s => s.checked = false)
    if(keyevent.key == 'Enter')                                 save(true)
})


// Auto-save settings
window.addEventListener('beforeunload', ()=> {
    //save(false)
})


// Search Settings
const searchBar             = document.querySelector('#searchinput')
const searchResults         = document.querySelector('#search-results')
const noResults             = document.querySelector('#no-results')
const sections              = document.querySelectorAll('.setting-section')
const allSettings           = document.querySelectorAll('.setting-outer')
const settingsContainer     = document.querySelector('#settings-container')

var results = []

searchBar.addEventListener('input', ()=> {
    if(searchBar.value.trim() != ''){

        const query = searchBar.value.trim().toLowerCase()

        // Hide all sections
        sections.forEach(sec => sec.style.display = 'none')

        // Show search results section
        searchResults.style.display = 'flex'

        // Main
        allSettings.forEach(s => {
            let toMatch = s.innerHTML.toLowerCase()

            if(toMatch.includes(query)){
                if(!results.includes(s)) results.push(s)
                s.style.display = 'flex'
            }
            else{
                results = results.filter(item => item != s)
                s.style.display = 'none'
            }
        })

        // No results
        if(results.length == 0){
            noResults.style.display = 'flex'
            noResults.textContent = `No results for ${query}`
            settingsContainer.classList.remove('search-state')
        }
        else{
            noResults.style.display = 'none'
            settingsContainer.classList.add('search-state')
        }
    }

    else{
        searchResults.style.display = 'none'
        noResults.style.display = 'none'
        settingsContainer.classList.remove('search-state')
        sections.forEach(sec => sec.style.display = 'flex')
        allSettings.forEach(s => s.style.display = 'flex')
    }
})