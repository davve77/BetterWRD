// BWRD Auto save settings
// Saves everything in the WRD localstorage so if you reinstall BWRD all your stuff will be there

// Create bwrd_saved key if it doesn't exist
if(localStorage.getItem('bwrd_saved') == null) {localStorage.setItem('bwrd_saved', '')}

chrome.storage.local.get(null, saved => {

    // Set the bwrd_saved key value to the current settings if isn't empty
    if(JSON.stringify(saved) != '{}') {localStorage.setItem('bwrd_saved', JSON.stringify(saved))}

    // Set settings to bwrd_saved value if not empty
    if(JSON.stringify(saved) != localStorage.getItem('bwrd_saved')){
        if(localStorage.getItem('bwrd_saved')) {chrome.storage.local.set(JSON.parse(localStorage.getItem('bwrd_saved')))}
    }
})