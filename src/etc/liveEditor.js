// BetterWRD Live Theme Editing

chrome.storage.local.get(null, saved => {
    const themes = JSON.parse(saved.customthemes)

    if(!saved.customtheme || !saved.isLiveEditing) return
    if(!saved.theme && !saved.customtheme) return

    // Styles
    document.head.appendChild(document.createElement('style')).innerHTML = `.activetabeditor { color: white!important; font-weight: 600!important; } .monacotopbuttons{transition: .11s all; cursor: default!important; padding: 3.5px; border-radius: 7px; z-index: 3;} .monacotopbuttons:hover{opacity: 1!important; background: rgb(80 80 80 / 39%);} .monacotopbuttons:active{opacity: .3!important;} #runjs:hover{color: lime;} #stoplivemonaco:hover{color: #ff5252;} #monaco *{ margin-bottom:0; float: none;} #monaco a{ color: white; } #monaco header *{margin: unset;} @font-face { font-family: 'Material Icons Outlined'; font-style: normal; font-weight: 400; src: url(https://fonts.gstatic.com/s/materialiconsoutlined/v56/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2) format('woff2'); } .material-icons-outlined { font-family: 'Material Icons Outlined'!important; font-weight: normal; font-style: normal; font-size: 24px; line-height: 1; letter-spacing: normal; text-transform: none; display: inline-block; white-space: nowrap; word-wrap: normal; direction: ltr; -webkit-font-feature-settings: 'liga'; -webkit-font-smoothing: antialiased; } .monaco-editor .scroll-decoration{box-shadow: none!important;} .monaco-scrollable-element>.scrollbar>.slider{display: none!important;} .monaco-editor *{ font-family: monospace!important; }`

    // Insert Monaco Div
    document.body.appendChild(document.createElement('div')).outerHTML = `<div id="monaco" style="user-select: none; display: flex; flex-direction: column; position: fixed; box-shadow: 0 30px 90px -20px rgb(0 0 0 / 30%), 0 0 1px 1px rgb(0 0 0 / 5%); width: 492px; width: 600px; height: 350px; ${getPosition()} z-index: 2147483647; backdrop-filter: blur(10px); background: rgba(43, 43, 43, 0.91); border: 1px solid rgb(47, 47, 47); border-radius: 8px;"> <header id="monacoheader" style="position: relative;display: flex;justify-content: space-between;align-items: center;height: 0;line-height: 32px;padding: 17px 15px; width:"> <div id="monacotitle" style=" position: absolute; top: 0; left: 0; width: 100%; height: 35px; display: flex; justify-content: center; "></div> <div style=" display: flex; align-items: center; gap: 5px;"> <h3 style="font-size: 15px;color: rgb(215,215,215);margin: 0px; max-width: 250px; text-overflow: ellipsis; overflow: hidden;">${themes[saved.customtheme].name}</h3> <a href="${chrome.runtime.getURL('settings/edittheme.html')}?theme=${saved.customtheme}" target="_blank" class="material-icons-outlined monacotopbuttons" style="font-size: 18px; opacity: .7;" title="Open Theme Page">open_in_new</a> </div> <div style="display: flex;margin-right: -10px;gap: 2px;"> <span id="runjs" class="material-icons-outlined monacotopbuttons" style="font-size: 18px; opacity: .7;" title="Run JS">play_arrow</span> <span style="font-size: 18px; opacity: .7;" id="stoplivemonaco" class="material-icons-outlined monacotopbuttons" title="Close">clear</span></div> </header> <div style="display: flex; margin: unset;"><span id="jstab" class="activetabeditor" style="color: gray;font-size: 16px;margin: 0px -4px;padding: 8px 4px;cursor: pointer;margin-left: 10px;">Javascript</span><span id="csstab" class="editortab" style="color: gray;font-size: 16px;margin: 0px -4px;padding: 8px 4px;cursor: pointer;margin-left: 15px;">CSS</span></div> <div style="position: relative;width: 100%;height: 100%;"> <div id="jsmonaco" style="position: absolute;text-align: left;width: 100%;height: 100%;z-index: 1;"> </div> <div id="cssmonaco" style="position: absolute;text-align: left;width: 100%;height: 100%; display: none;"> </div> </div> </div>`

    // Make Dragable - Credits to https://www.w3schools.com/howto/howto_js_draggable.asp
    dragElement(document.getElementById("monacotitle"))
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
        var target = elmnt.parentNode.parentNode
        elmnt.onmousedown = dragMouseDown
    function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()

        pos3 = e.clientX
        pos4 = e.clientY

        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
    }
    function elementDrag(e) {
        e = e || window.event
        e.preventDefault()

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        var pRect = document.body.getBoundingClientRect()
        var tgtRect = target.getBoundingClientRect()

        if (tgtRect.left < pRect.left) target.style.left = 0
        if (tgtRect.top < pRect.top) target.style.top = 0
        if (tgtRect.right > pRect.right) target.style.left = pRect.width - tgtRect.width + 'px'

        target.style.top = (target.offsetTop - pos2) + "px"
        target.style.left = (target.offsetLeft - pos1) + "px"

        localStorage.setItem('bwrd_monacoposition', `left=${(target.offsetLeft - pos1) + "px"}; top=${(target.offsetTop - pos2) + "px"};`)
    }
    function closeDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}
    function getPosition(){
        const pos = localStorage.getItem('bwrd_monacoposition')
        return (pos && pos.includes('px')) ? `left: ${pos.split('left=')[1].split(';')[0]}; top: ${pos.split('top=')[1].split(';')[0]};` : 'right: 15px; bottom: 15px;'
    }

    
    // Load Monaco
    const monaco = document.getElementById('monaco')
    const monacoScript = document.createElement('script')

    monacoScript.id = 'monacoscript'
    monacoScript.src = 'https://unpkg.com/monaco-editor@latest/min/vs/loader.js'
    monacoScript.addEventListener('load', loadMonaco)
    document.head.appendChild(monacoScript)

    function loadMonaco(){
        document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('etc/loadLiveEditor.js')
    }

    monaco.setAttribute('theme', themes[saved.customtheme].name)
    monaco.setAttribute('themejs', themes[saved.customtheme].js)
    monaco.setAttribute('themecss', themes[saved.customtheme].css)


    // Monaco tabs
    jstab = document.getElementById('jstab')
    csstab = document.getElementById('csstab')
    jsmonaco = document.getElementById('jsmonaco')
    cssmonaco = document.getElementById('cssmonaco')

    function tabjs(){
        jstab.className = 'activetabeditor'
        csstab.className = 'editortab'

        jsmonaco.style.display = 'block'
        cssmonaco.style.display = 'none'

        localStorage.setItem('bwrd_monacotab', 'js')
    }

    function tabcss(){
        jstab.className = 'editortab'
        csstab.className = 'activetabeditor'

        cssmonaco.style.display = 'block'
        jsmonaco.style.display = 'none'

        localStorage.setItem('bwrd_monacotab', 'css')
    }

    jstab.addEventListener('click', tabjs)
    csstab.addEventListener('click', tabcss)

    if(localStorage.getItem('bwrd_monacotab')){
        (localStorage.getItem('bwrd_monacotab') == 'js') ?  tabjs() : tabcss()
    }


    // Listen to attribute changes
    const eventCallback = (mutationsList) => {
        mutationsList.forEach(mutation => {
            if((mutation.type != 'attributes')) return

            themes[saved.customtheme].css = monaco.getAttribute('themecss')
            themes[saved.customtheme].js = monaco.getAttribute('themejs')

            chrome.storage.local.set({'customthemes': JSON.stringify(themes)})
        })
    }
    new MutationObserver(eventCallback).observe(monaco, {attributes: true})


    // Run Theme JS
    document.getElementById('runjs').addEventListener('click', ()=> {
        eval(monaco.getAttribute('themejs'))
    })


    // Stop Live Editing
    document.getElementById('stoplivemonaco').addEventListener('click', ()=> {
        chrome.storage.local.set({'isLiveEditing': false})
    })


    // Show Reset Monaco Position in footer
    const themelink = document.querySelector('#themedisplayer')
    if(themelink){
        themelink.appendChild(document.createElement('a')).outerHTML = `<a id="resetmonacopos" onclick="return false" style=" display: block; padding-top: 5px; ">Live Editing is on. Can't see the Theme Editor? Click here to reset its position.</a>`
        document.getElementById('resetmonacopos').addEventListener('click', ()=> {
            if(monaco){
                monaco.style.removeProperty('inset')
                monaco.style.setProperty('right', '15px')
                monaco.style.setProperty('bottom', '15px')
            }
            localStorage.removeItem('bwrd_monacoposition')
        })
    }
})