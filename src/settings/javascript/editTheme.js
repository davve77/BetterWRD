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

chrome.storage.local.get('customthemes', saved => {
    allthemes = JSON.parse(saved.customthemes)

    // Check if theme doesn't exists
    if(!themenum || !allthemes[themenum]) {location.assign('themes.html'); return}

    // Vars
    themename = allthemes[themenum].name
    themedesc = allthemes[themenum].desc
    thememode = allthemes[themenum].mode
    themejs = allthemes[themenum].js
    themecss = allthemes[themenum].css

    // Load theme info
    namebox.value = themename
    descbox.value = themedesc
    if(thememode == 'dark') {darkradio.checked = true} else{lightradio.checked = true}
    window.addEventListener('load', ()=> {
        jseditor.setValue(themejs)
        csseditor.setValue(themecss)
    })
    document.getElementById(`secondh`).textContent = `Edit or Remove "${themename}" — Don't forget to save!`

    // Delete theme
    deletebtn.addEventListener('click', ()=> {
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

        // Blacklisted Char
        if(namebox.value.includes(`"`) || descbox.value.includes(`"`)){ // Blacklist char
            toast.innerHTML = 'Your theme name, desc, js or css contains a blacklisted character such as <b>"</b>. Please make sure your theme\'s content does not have any of that.'
            toast.className = 'show2'
            setTimeout(()=> {toast.classList.remove('show2')}, 5500)
            return
        }

        // Save
        chrome.storage.local.set({'customthemes': JSON.stringify(allthemes)})

        // Go back to themes page
        location.assign('themes.html')
    })
})