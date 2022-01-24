// BWRD Edit Custom Theme

var themenum = location.search.split('theme=')[1]
var namebox = document.getElementById('name')
var descbox = document.getElementById('desc')
var darkradio = document.getElementById('darkradiobtn')
var lightradio = document.getElementById('lightradiobtn')
var deletebtn = document.getElementById('deletebtn')
var jsmonaco = document.getElementById('jsmonaco')
var cssmonaco = document.getElementById('cssmonaco')
var savebtn = document.getElementById('saveChanges')

chrome.storage.local.get(['customthemes','customtheme'], saved => {
    var allthemes = JSON.parse(saved.customthemes)

    // Check if theme doesn't exist
    if(!themenum || !allthemes[themenum]) {location.assign('themes.html'); return}

    // Vars
    var themename = allthemes[themenum].name
    var themedesc = allthemes[themenum].desc
    var thememode = allthemes[themenum].mode
    var themejs = allthemes[themenum].js
    var themecss = allthemes[themenum].css

    // Load theme info
    namebox.value = themename
    descbox.value = themedesc
    if(thememode == 'dark') {darkradio.checked = true} else{lightradio.checked = true}
    window.addEventListener('load', ()=> {
        jseditor.getModel().setValue(themejs)
        csseditor.getModel().setValue(themecss)
    })
    document.getElementById(`secondh`).textContent = `edit or remove "${themename.toLowerCase()}" — your code autosaves!`

    // Delete theme
    deletebtn.addEventListener('click', ()=> {
        if(saved.customtheme == themenum){
            chrome.storage.local.set({'customtheme': null,'theme': null, 'isLiveEditing': false})
        }

        allthemes.splice(themenum, 1)
        chrome.storage.local.set({'customthemes': JSON.stringify(allthemes)})
        location.assign('themes.html')
    })

    // Save and Apply changes
    savebtn.addEventListener('click', ()=> {
        // Change
        allthemes[themenum].name = namebox.value
        allthemes[themenum].desc = descbox.value
        allthemes[themenum].js = jseditor.getValue()
        allthemes[themenum].css = csseditor.getValue()
        if(darkradio.checked) {allthemes[themenum].mode = 'dark'} else {allthemes[themenum].mode = 'light'}

        if(!namebox.value.trim() || namebox.value == ''){
            showToast('Theme name can\'t be empty.')
            return
        }

        // Save
        chrome.storage.local.set({'customthemes': JSON.stringify(allthemes)})

        // Trigger refresh
        chrome.storage.local.set({'themeedited': Math.floor(Math.random() * 20)})

        // Go back to themes page
        location.assign('themes.html')
    })
})