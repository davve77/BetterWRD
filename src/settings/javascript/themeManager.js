// BWRD Themes Page

// Vars
currenttheme = document.getElementById('currenttheme')
resettheme = document.getElementById('resettheme')
searchinput = document.getElementById('searchinput')
var usingcustomtheme
var customthemenum

// Scroll to top
setTimeout(()=> {
    scrollTo(0, 0)
}, 40)

// Create customthemes key if it doesn't exist
chrome.storage.local.get('customthemes', saved => {if(!saved.customthemes) {chrome.storage.local.set({'customthemes':'[]'})}})

// Show Current Theme
chrome.storage.local.get(['theme','customtheme','customthemes'], saved => {
    if(saved.theme != null){
        currenttheme.textContent = 'Current: ' + saved.theme
    }
    if(saved.customtheme != null){
        currenttheme.textContent = 'Current: ' + JSON.parse(saved.customthemes)[saved.customtheme].name
    }
})

// Show Custom Themes
function showCustomThemes(){
    chrome.storage.local.get('customthemes', saved => {
        if(saved.customthemes == '[]' || saved.customthemes == null) return

        var customthemes = JSON.parse(saved.customthemes)
        var cthemesdiv = document.getElementById('customthemesdiv')

        customthemes.forEach(theme=> {
            var customtheme = document.createElement('div')
            var themenum = customthemes.indexOf(theme)

            themeMode = (theme.mode == 'dark') ? 'dark_mode' : 'light_mode'

            // Add Theme Divs
            customtheme.className = 'themecard customthmcard searchablethm'
            customtheme.innerHTML = `<p class="theme-title"></p> <p class="theme-desc"></p>`
            
            // Add Theme Info
            customtheme.children[0].appendChild(document.createTextNode(theme.name))
            customtheme.children[1].appendChild(document.createTextNode(theme.desc))

            // Add Theme Manager
            customtheme.appendChild(document.createElement('div')).outerHTML = `<div style="position: absolute; bottom: 5px; height: 35px; left: 50%; width: 100%; transform: translateX(-50%);"><span class="material-icons-outlined themebutton" title="This theme&#39;s mode is ${theme.mode}. Click to switch it to the other mode.">${themeMode}</span><span class="material-icons-outlined themebutton" title="Click to edit this theme's JS and CSS.">edit</span> <span class="material-icons-outlined themebutton" style="margin-left: -5px;" title='Click to delete "${theme.name}".'>delete</span> </div>`

            // Theme On Click
            customtheme.addEventListener('click', (e)=> {
                // Edit theme buttons
                if(e.target.parentNode == customtheme.children[2]){
                    location.assign(`edittheme.html?theme=${themenum}`)
                }

                // Theme click
                if(e.target.parentNode == cthemesdiv || e.target.parentNode == customtheme){
                    chrome.storage.local.set({'customtheme': themenum})
                    chrome.storage.local.set({'theme': null})

                    showToast(`You are now using — ${theme.name}.`)
                    currenttheme.textContent = 'Current: ' + theme.name
                }
            })
            cthemesdiv.prepend(customtheme)
            if(document.getElementsByClassName('themesection')[0]){
                cthemesdiv.insertBefore(document.getElementsByClassName('themesection')[0], customtheme)
            }
        })
    })
}
showCustomThemes()

// Reset Theme
resettheme.addEventListener('click', ()=> {
    chrome.storage.local.set({'customtheme': null,'theme': null, 'isLiveEditing': false})

    currenttheme.textContent = 'Current: None'
    showToast('Theme has been reset.')
})

// View Mode
listbtn = document.getElementById('listviewbtn')
gridbtn = document.getElementById('gridviewbtn')

function listView(){
    document.querySelectorAll('.themecard').forEach(themes => themes.classList.add('themecardlistview'))
    gridbtn.style.setProperty('border', '1px solid rgb(69,69,69)', 'important')
    listbtn.style.setProperty('border', '1.4px solid rgb(111 111 111)', 'important')
    localStorage.setItem('themesViewMode', 'list')
}
function gridView(){
    document.querySelectorAll('.themecard').forEach(themes => themes.classList.remove('themecardlistview'))
    gridbtn.style.setProperty('border', '1.4px solid rgb(111 111 111)', 'important')
    listbtn.style.setProperty('border', '1px solid rgb(69,69,69)', 'important')
    localStorage.setItem('themesViewMode', 'grid')
}

listbtn.addEventListener('click', listView)
gridbtn.addEventListener('click', gridView)

// Save View Mode
if(localStorage.getItem('themesViewMode') == null) {localStorage.setItem('themesViewMode', 'grid')}
setTimeout(()=> {
    if(localStorage.getItem('themesViewMode') == 'grid') {gridView()}
    if(localStorage.getItem('themesViewMode') == 'list') {listView()}
}, 1)


// Search
setInterval(()=> {
    searchinput.placeholder = `Search among ${document.querySelectorAll('.themecard').length-1} themes`
}, 80)
searchinput.addEventListener('keyup', ()=> {
     searchtext = searchinput.value
     themes = document.querySelectorAll('.searchablethm')

    for(i = 0; i < themes.length; i++){
        if(themes[i].children[0].firstChild.textContent.toLowerCase().indexOf(searchtext.toLowerCase()) > -1){
            themes[i].style.setProperty('display', 'inline-flex', 'important')
        }else{
            themes[i].style.setProperty('display', 'none', 'important')
        }
    }
})

// Notifications
if(location.href.includes('?shownotif')){
    chrome.storage.local.get('theme', saved => {
        showToast(`You are now using — ${saved.theme}.`)
        setTimeout(()=> {
            history.replaceState('', '', '/settings/themes.html')}, 2100)
    })
}

// Animation on load
setTimeout(()=> {
    $('.themecard').each(function(i){
        var $this = $(this)
        setTimeout(function(){
            $this.css('opacity', '1')
            $this.css('transform', 'none')
        }, i*30)
    });
}, 50)