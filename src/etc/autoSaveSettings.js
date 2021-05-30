// BWRD Auto save settings
// Saves everything in the WRD localstorage so if you reinstall BWRD all of your settings will be how you left them

if(typeof InstallTrigger == 'undefined'){ // Only auto-save settings on chromium-based browsers
    if(localStorage.getItem('bwrd_saved') == null) {localStorage.setItem('bwrd_saved', '')} // Create bwrd_saved key if it doesn't exist

    chrome.storage.local.get(null, saved => {
        if(JSON.stringify(saved) != '{}') {localStorage.setItem('bwrd_saved', JSON.stringify(saved))} // Set the bwrd_saved key value to the current settings if isn't empty
        if(localStorage.getItem('bwrd_saved')) chrome.storage.local.set(JSON.parse(localStorage.getItem('bwrd_saved'))) // Set settings to bwrd_saved value if not empty
    })
}