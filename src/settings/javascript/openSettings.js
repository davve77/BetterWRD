// BWRD Open Settings Popup

// For Chromium
open(chrome.runtime.getURL('settings/index.html'))
close()

// For Firefox
document.addEventListener('click', ()=>{
    open(chrome.runtime.getURL('settings/index.html'))
    close()
})