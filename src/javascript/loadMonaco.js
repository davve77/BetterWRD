// BetterWRD Monaco


var jseditor
var csseditor
var monacoeditor = document.getElementById('monacoeditor')

require.config({ paths: { 'vs': 'monaco/vs' }})
require(["vs/editor/editor.main"], ()=> {
    jseditor = monaco.editor.create(document.getElementById('jsmonaco'), {
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap:{enabled:false}
    })
    
    csseditor = monaco.editor.create(document.getElementById('cssmonaco'), {
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap:{enabled:false}
    })
})

// Editor tabs
jstab = document.getElementById('jstab')
csstab = document.getElementById('csstab')
jsmonaco = document.getElementById('jsmonaco')

jstab.addEventListener('click', ()=> {
    jstab.className = 'activetabeditor'
    csstab.className = 'editortab'
    jsmonaco.style.zIndex = '1'
})
csstab.addEventListener('click', ()=> {
    jstab.className = 'editortab'
    csstab.className = 'activetabeditor'
    jsmonaco.style.zIndex = '0'
})

// Auto-save
window.addEventListener('load', ()=> {
    if(!location.pathname.includes('edit')) return

    chrome.storage.local.get('customthemes', saved => {
        allthemes = JSON.parse(saved.customthemes)
        themenum = location.search.split('theme=')[1]
    
        jseditor.getModel().onDidChangeContent((e) => {
            allthemes[themenum].js = jseditor.getValue()
            chrome.storage.local.set({'customthemes': JSON.stringify(allthemes)})
        })
        csseditor.getModel().onDidChangeContent((e) => {
            allthemes[themenum].css = csseditor.getValue()
            chrome.storage.local.set({'customthemes': JSON.stringify(allthemes)})
        })
    })
})

// Fullscreen Monaco
document.getElementById('monacofullscreen').addEventListener('click', ()=> {

    // Animation Start
    monacoeditor.style.opacity = '0'
    monacoeditor.style.transform = 'scale(1.1)'

    // Funcs
    function enterfs(){
        monacoeditor.classList.add('monacofullscreen')
        document.body.style.overflow = 'hidden'
        document.getElementById('monacotitle').textContent = 'Monaco — press fullscreen again to exit'
    }

    function leavefs(){
        monacoeditor.classList.remove('monacofullscreen')
        document.body.style.overflow = 'overlay'
        document.getElementById('monacotitle').textContent = 'Monaco'
    }

    // Enter/Leave Fullscreen
    setTimeout(()=> {
        if(!monacoeditor.className.includes('monacofullscreen')){
            enterfs()
        }else{
            leavefs()
        }
    }, 140)

    // Animation End
    setTimeout(()=> {
        monacoeditor.style.opacity = '1'
        monacoeditor.style.transform = 'scale(1)'
    }, 280)
})

// Refresh WRD
if(location.pathname.includes('edit')){
    document.getElementById('refreshwrd').addEventListener('click', ()=> {
        // Trigger refresh
        chrome.storage.local.set({'themeedited': Math.floor(Math.random() * 99)})
    })
}
else{
    document.getElementById('refreshwrd').style.display = 'none'
}

// Live Monaco
chrome.storage.local.get(['isLiveEditing', 'customtheme'], (saved)=> {
    if(location.href.includes('create')) {document.getElementById('livemonaco').style.display = 'none'; return}
    if(saved.isLiveEditing) {document.getElementById('livemonacodiv').style.display = 'flex'}

    // Vars
    lmbtn = document.getElementById('livemonaco')
    lmdiv = document.getElementById('livemonacodiv')
    stoplm = document.getElementById('stoplm')
    useinstead = document.getElementById('lmusethis')
    themenum = location.search.split('theme=')[1]

    // Buttons
    lmbtn.addEventListener('click', ()=> {
        chrome.storage.local.set({'isLiveEditing': true, 'customtheme': themenum, 'theme': null})
        lmdiv.style.display = 'flex'
        lmdiv.style.animation = '.1s fadein ease-out'
        lmdiv.children[1].textContent = 'You are now Live Editing.'
        lmdiv.style.transform = 'scale(1)'
    })
    stoplm.addEventListener('click', ()=> {
        chrome.storage.local.set({'isLiveEditing': false})
    })
    useinstead.addEventListener('click', ()=> {
        chrome.storage.local.set({'customtheme': themenum, 'theme': null})
        useinstead.style.display = 'none'
    })

    // Show 'edit this theme instead' button
    if(themenum != saved.customtheme && saved.isLiveEditing){
        useinstead.style.display = 'inline-block'
    }
})

// Auto refresh when isLiveEditing is set to false
chrome.storage.onChanged.addListener((changes)=> {
    if(!Object.keys(changes)[0].includes('isLiveEditing') || location.href.includes('create')) return

    chrome.storage.local.get(['isLiveEditing'], (saved)=> {
        if(!saved.isLiveEditing){
            location.reload()
        }
    })
})