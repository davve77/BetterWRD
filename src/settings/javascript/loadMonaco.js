// BetterWRD Monaco

var jseditor
var csseditor
var monacoeditor = document.getElementById('monacoeditor')

require.config({paths:{'vs':'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs'}})
require(['vs/editor/editor.main'], ()=> {
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
setTimeout(()=> {
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
}, 1000)

// Fullscreen Monaco
document.getElementById('monacofullscreen').addEventListener('click', ()=> {

    if(!monacoeditor.className.includes('monacofullscreen')){
        monacoeditor.classList.add('monacofullscreen')
        document.body.style.overflow = 'hidden'
        document.getElementById('monacotitle').textContent = 'Monaco — press the fullscreen icon again to exit fullscreen'
    }else{
        monacoeditor.classList.remove('monacofullscreen')
        document.body.style.overflow = 'auto'
        document.getElementById('monacotitle').textContent = 'Monaco'
    }
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