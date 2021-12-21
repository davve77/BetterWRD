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
        if(!saved.unsavedtheme_js) {chrome.storage.local.set({'unsavedtheme_js':''})}
        if(!saved.unsavedtheme_css) {chrome.storage.local.set({'unsavedtheme_css':''})}

        if(saved.unsavedtheme_js) {jseditor.getModel().setValue(saved.unsavedtheme_js)}
        else{jseditor.getModel().setValue(`// JS Example:\n// WARNING: Do not paste anything that you don't understand in here.\n\ndocument.getElementById('navigationbar').style.background = 'red'`)}

        if(saved.unsavedtheme_css) {csseditor.getModel().setValue(saved.unsavedtheme_css)}
        else{csseditor.getModel().setValue(`/* CSS Example: */\n\n#navigationbar{\n   background: red;\n}`)}
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

    // Check before creating theme
    if(!themeName.trim() || themeName == ''){
        showToast('Theme name can\'t be empty.')
    }
    else if(!themeModeDark.checked && !themeModeLight.checked){
        showToast('Give your theme a mode.')
    }

    // Create/save theme
    else{
        createCustomTheme(themeName, themeDesc, themeMode, js, css)
        autosave = false
        chrome.storage.local.set({
            'unsavedtheme_js': `// JS Example:\n// WARNING: Do not paste anything that you don't understand in here.\n\ndocument.getElementById('navigationbar').style.background = 'red'`,
            'unsavedtheme_css': `/* CSS Example: */\n\n#navigationbar{\n   background: red;\n}`
        })
        location.assign('themes.html')
    }
})


// Import theme
impbtn = document.getElementById('importbtn')
impdiv = document.getElementById('importdiv')
importbtn = document.getElementById('importthmbtn')
selectfile = document.getElementById('selectfile')

// Funcs
function getThemeInfo(name, src){
    return src.split(`${name}={stTHM}`)[1].split('{edTHM}')[0]
}

function showMenu(){
    impdiv.style.opacity = '1'
    impdiv.style.transform = 'none'

    impbtn.style.background = 'rgb(54,54,54)'
    importbtn.style.pointerEvents = 'all'
}

function hideMenu(){
    impdiv.style.opacity = '0'
    impdiv.style.transform = 'translateY(5px)'

    impbtn.style.removeProperty('background')
    importbtn.style.pointerEvents = 'none'
}

// Import theme function
selectfile.addEventListener('change', ()=> {
    filetoread = selectfile.files[0]
    filereader = new FileReader()
    
    if(filetoread.name.split('.')[1] != 'bwrd' || !filetoread) {hideMenu(); return}

    filereader.addEventListener('load', (e)=> {
        var content = e.target.result

        themeNameTb.value = getThemeInfo('NAME', content)
        themeDescTb.value = getThemeInfo('DESC', content)

        jseditor.getModel().setValue(getThemeInfo('JS', content))
        csseditor.getModel().setValue(getThemeInfo('CSS', content))

        if(getThemeInfo('MODE', content) == 'dark'){
            themeModeDark.checked = true
        }else{themeModeLight.checked = true}

        hideMenu()
    })
    
    filereader.readAsText(filetoread, 'UTF-8')
})

// Show import menu
impbtn.addEventListener('click', showMenu)

// Import theme button click
importbtn.addEventListener('click', ()=> {
    selectfile.click()
})

// Hide import menu on click
document.body.addEventListener('mousedown', (e)=> {
    if(e.target != importbtn && getComputedStyle(impdiv).opacity == '1'){
        hideMenu()
    }
})


// Auto-save unsaved code
window.addEventListener('beforeunload', ()=> {
    if(jseditor && csseditor){
        autosavejs = jseditor.getValue()
        autosavecss = csseditor.getValue()
    
        if(autosave && autosavejs.trim() && autosavecss.trim()){ // Check if JS/CSS isn't just whitespace
            try{
                chrome.storage.local.set({
                    'unsavedtheme_js': autosavejs,
                    'unsavedtheme_css': autosavecss
                })
            } catch{}
        }
    }
})