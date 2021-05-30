// BWRD Theme Create page Script

// Vars
var themeNameTb = document.getElementById('themeNameTb')
var themeDescTb = document.getElementById('themeDescTb')
var themeModeDark = document.getElementById('darkradiobtn')
var themeModeLight = document.getElementById('lightradiobtn')
var autosave = true

// Create customthemes key if it doesn't exist
chrome.storage.local.get('customthemes', saved => {if(!saved.customthemes) {chrome.storage.local.set({'customthemes':'[]'})}})

window.addEventListener('load', ()=> {
// Load unsaved code
    chrome.storage.local.get(['unsavedtheme_js','unsavedtheme_css'], function(saved){
        if(saved.unsavedtheme_js) {jseditor.setValue(saved.unsavedtheme_js)}
        if(saved.unsavedtheme_css) {csseditor.setValue(saved.unsavedtheme_css)}
    })
})

function createCustomTheme(name, desc, mode, js, css){
    chrome.storage.local.get('customthemes', saved => {
        var currentThemes = JSON.parse(saved.customthemes)
        
        currentThemes.push({
            "name":name,
            "desc":desc,
            "mode":mode,
            "js":js,
            "css":css
        })
    
        chrome.storage.local.set({'customthemes': JSON.stringify(currentThemes)})
    })
}

document.getElementById('createCustomTheme').addEventListener('click', ()=> {
    var themeName = themeNameTb.value
    var themeDesc = themeDescTb.value
    var themeMode
    var js = jseditor.getValue()
    var css = csseditor.getValue()
    if(themeModeDark.checked) {themeMode = 'dark'} else {themeMode = 'light'}

    if(themeName.value == '' || !themeModeDark.checked && !themeModeLight.checked){ // Make sure user gave a name and a mode
        toast.innerHTML = 'Give your theme a name and/or a mode.'
        toast.className = 'show'
        setTimeout(()=> {toast.classList.remove('show')}, 2000)
    }
    else if(themeName.includes(`"`) || themeDesc.includes(`"`)){ // Blacklist char
        toast.innerHTML = 'Your theme name, desc, js or css contains a blacklisted character such as <b>"</b>. Please make sure your theme\'s content does not have any of that.'
        toast.className = 'show2'
        setTimeout(()=> {toast.classList.remove('show2')}, 5500)
    }
    else{ // Save theme
        createCustomTheme(themeName, themeDesc, themeMode, js, css)
        autosave = false
        chrome.storage.local.set({
            'unsavedtheme_js': `// JS Example:\n// WARNING: Do not paste anything in here that you don't understand.\n\ndocument.getElementById('navigationbar').style.background = 'red'`,
            'unsavedtheme_css': `/* CSS Example: */\n\n#navigationbar{\n   background: red;\n}`
        })
        location.assign('themes.html')
    }
})

// Auto-save unsaved code
window.addEventListener('beforeunload', ()=> {
    if(autosave){
        try{
            chrome.storage.local.set({
                'unsavedtheme_js': jseditor.getValue(),
                'unsavedtheme_css': csseditor.getValue()
            })
        } catch{}
    }
})