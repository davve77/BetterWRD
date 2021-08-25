// Name: Extension Popups
// Desc: Opens new tabs with info

// First use popup
if(localStorage.getItem('bwrd_notfirstuse') == null){
  open(chrome.runtime.getURL('etc/popup.html'))
  localStorage.setItem('bwrd_notfirstuse', 'yes')
}