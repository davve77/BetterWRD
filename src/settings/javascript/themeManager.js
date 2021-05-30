// BWRD Theme Manager

// Vars
selectedtheme = document.getElementById('selectedtheme')
resettheme = document.getElementById('resettheme')
applytheme = document.getElementById('applytheme')
var usingcustomtheme
var customthemenum

// Create customthemes key if it doesn't exist
chrome.storage.local.get('customthemes', saved => {if(!saved.customthemes) {chrome.storage.local.set({'customthemes':'[]'})}})

// Main
chrome.storage.local.get(['theme','customtheme','customthemes'], saved => {
    try{
        customthemes = JSON.parse(saved.customthemes)

        if(saved.customtheme != null){
            usingcustomtheme = true
            selectedtheme.textContent = customthemes[saved.customtheme].name
        }
        else{
            if(saved.theme != 'None' && saved.theme != null){
                selectedtheme.textContent = saved.theme
            }
        }
    } catch {chrome.storage.local.set({'customtheme': null}); selectedtheme.textContent = 'None'}
})

function selectTheme(themename){
    selectedtheme.textContent = themename
    document.title = `Selected: ${themename}`

    chrome.storage.local.set({'customtheme': null})
    usingcustomtheme = false
}

function applyTheme(theme){
    if(selectedtheme.textContent == 'None') {showToast('Select a theme first'); return}
    chrome.storage.local.set({'theme': theme})
    showToast(`You are now using — ${theme}`)
}

function resetTheme(){
    chrome.storage.local.set({'theme': 'None'})
    chrome.storage.local.set({'customtheme': null})

    selectedtheme.textContent = 'None'
    document.title = 'BetterWRD Themes'
    showToast('Theme has been reset')
}

function showToast(text){
    document.getElementById('toast').textContent = text
    document.getElementById('toast').className = 'show'
    setTimeout(()=> {document.getElementById('toast').classList.remove('show')}, 2000)
}

// Set
document.addEventListener('click', (e)=>{
    if(e.target.matches('#create-custom-theme > p, #create-custom-theme')) {location = 'createtheme.html'}
    if(e.target == applytheme) {
        if (usingcustomtheme) {applyCustomTheme()}
        else {applyTheme(selectedtheme.textContent)}
    }
    if(e.target == resettheme) {resetTheme()}

    if(e.target.matches('#gh-smooth-dark > p, #gh-smooth-dark > p em, #gh-smooth-dark'))   {selectTheme('GitHub: Smooth Dark')}
    if(e.target.matches('#gh-dark-green > p, #gh-dark-green > p em, #gh-dark-green'))      {selectTheme('GitHub: Dark & Green')}
    if(e.target.matches('#dark-f-green > p, #dark-f-green > p em, #dark-f-green'))         {selectTheme('Dark Mint Green')}
    if(e.target.matches('#midnight-gray > p, #midnight-gray > p em, #midnight-gray'))      {selectTheme('Midnight Gray')}
    if(e.target.matches('#deep-night > p, #deep-night > p em, #deep-night'))               {selectTheme('Deep Night')}
    if(e.target.matches('#gh-light > p, #gh-light > p em, #gh-light'))                     {selectTheme('GitHub: Light Mode')}
})



// Custom Themes
function selectCustomTheme(themenumber, themename){
    selectedtheme.textContent = themename
    document.title = `Selected: ${themename}`

    usingcustomtheme = true
    customthemenum = themenumber
}

function applyCustomTheme(){
    if(selectedtheme.textContent == 'None') {showToast('Select a theme first'); return}

    chrome.storage.local.set({'customtheme': customthemenum})
    chrome.storage.local.set({'theme': null})

    showToast(`You are now using — ${selectedtheme.textContent}`)
}

function showCustomThemes(){
    chrome.storage.local.get('customthemes', saved => {
        if(saved.customthemes == '[]' || saved.customthemes == null) return

        var customthemes = JSON.parse(saved.customthemes)
        var cthemesdiv = document.getElementById('customthemesdiv')

        customthemes.forEach(theme=> {
            var customtheme = document.createElement('div')
            var themenum = customthemes.indexOf(theme)

            if(theme.mode == 'dark') {themeMode = 'dark_mode'}
            else{themeMode = 'light_mode'}

            customtheme.className = 'themecard customthmcard'
            customtheme.innerHTML = `<p style="position: relative;top: 10px;font-size: 19px;width: 92%;margin: 0 auto;overflow-x: hidden;">${theme.name}<br /></p> <p class="themedesc" style="width: 90%;overflow-x: hidden;">${theme.desc}<br /></p> <div style="position: absolute; bottom: 0; height: 35px; left: 50%; transform: translateX(-50%);"><span class="material-icons-outlined themebutton" title="This theme&#39;s mode is ${theme.mode}. Click to switch it to the other mode." style="margin-right: 5px;">${themeMode}</span><span class="material-icons-outlined themebutton" title="Click to edit this theme's JS and CSS.">edit</span> <span class="material-icons-outlined themebutton" title='Click to delete "${theme.name}".'>delete</span> </div>`
            
            customtheme.addEventListener('click', (e)=> { // Yes I know i should use document instead of customtheme but
                // Edit theme buttons
                if(e.target.parentNode == customtheme.children[2]){
                    location.assign(`edittheme.html?theme=${themenum}`)
                }

                // Theme click
                if(e.target.parentNode == cthemesdiv || e.target.parentNode == customtheme){
                    selectCustomTheme(themenum, theme.name)
                }
            })
            cthemesdiv.prepend(customtheme)
        })
    })
}
showCustomThemes()

// Keyboard shortcuts
document.addEventListener('keydown', (keyevent)=> {
    if(keyevent.key == 'Enter'){
        if (usingcustomtheme) {applyCustomTheme()}
        else {applyTheme(selectedtheme.textContent)}
    }
})