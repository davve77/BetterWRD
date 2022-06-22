// BWRD Auto save settings
// Saves everything in the localstorage so if you reinstall the data wont disappear

// Create bwrd_saved key if it doesn't exist
if(localStorage['bwrd_saved'] == null) localStorage['bwrd_saved'] = ''

chrome.storage.local.get(null, saved => {

    let settings = JSON.stringify(saved)

    // Set bwrd_saved value to current settings if there's anything to save
    if(settings != '{}') localStorage['bwrd_saved'] = settings

    // Set bwrd settings to bwrd_saved if not empty
    if(settings != localStorage['bwrd_saved'] && localStorage['bwrd_saved']){
        chrome.storage.local.set(JSON.parse(localStorage['bwrd_saved']))
    }
})