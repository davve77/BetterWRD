// Name: Extension Popups
// Desc: Opens new tabs with info

// First use popup
if(localStorage.getItem('bwrd_notfirstuse') == null){
  open(chrome.runtime.getURL('etc/popup.html'))
  localStorage.setItem('bwrd_notfirstuse', 'yes')
}

// Update Changelog popup
var version = chrome.runtime.getManifest().version
if(localStorage.getItem('bwrd_lastchangelog') == null) {localStorage.setItem('bwrd_lastchangelog', '')}

if(localStorage.getItem('bwrd_lastchangelog') != version){
  open(chrome.runtime.getURL('settings/latestchangelog.html'))
  localStorage.setItem('bwrd_lastchangelog', version)
}