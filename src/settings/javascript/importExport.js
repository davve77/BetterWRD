// BetterWRD Import & Export Themes




/*
*
*   // Export Theme //
*
*/

if(location.pathname.match(/edittheme/)){

    exbtn = document.getElementById('exportbtn')
    exdiv = document.getElementById('exportdiv')
    exdlbtn = document.getElementById('exportdlbtn')

    // Funcs
    function exportTheme(filename, code){
        var dlelm = document.createElement('a')
        dlelm.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(code)}`)
        dlelm.setAttribute('download', `${filename}.bwrd`)
    
        dlelm.style.display = 'none'
    
        document.body.appendChild(dlelm)
        dlelm.click()
        dlelm.remove()

        hideMenu()
    }

    function showMenu(){
        exdiv.style.opacity = '1'
        exdiv.style.transform = 'none'

        exbtn.style.background = 'rgb(54,54,54)'
        exdlbtn.style.pointerEvents = 'all'
    }

    function hideMenu(){
        exdiv.style.opacity = '0'
        exdiv.style.transform = 'translateY(5px)'

        exbtn.style.removeProperty('background')
        exdlbtn.style.pointerEvents = 'none'
    }

    exbtn.addEventListener('click', showMenu)

    exdlbtn.addEventListener('click', ()=> {
exportTheme(`${themename} - BetterWRD Theme`, `
<info.ver>2</info.ver>
<Theme.Name>${themename}</Theme.Name>
<Theme.Description>${themedesc}</Theme.Description>
<Theme.Mode>${thememode}</Theme.Mode>
<Theme.JS>${(themejs.trim() == '') ? themejs : '\n' + themejs + '\n'}</Theme.JS>
<Theme.CSS>${(themecss.trim() == '') ? themecss : '\n' + themecss + '\n'}</Theme.CSS>
`.trim())
    })

    document.body.addEventListener('mousedown', (e)=> {
        if(e.target != exdlbtn && getComputedStyle(exdiv).opacity == '1'){
            hideMenu()
        }
    })
}




/*
*
*   // Import Theme //
*
*/

if(location.pathname.match(/createtheme/)){

    impbtn = document.getElementById('importbtn')
    impdiv = document.getElementById('importdiv')
    importbtn = document.getElementById('importthmbtn')
    selectfile = document.getElementById('selectfile')
    
    // Funcs
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
    
    function getThemeInfo(src){
    
        // Legacy check
        if(!src.match(/<info.ver>([^<]*)<\/info.ver>/)) return 'legacy'
    
        // New
        return{
            'version': src.match(/<info.ver>([^<]*)<\/info.ver>/)[1],
            'name': src.match(/<Theme.Name>([^<]*)<\/Theme.Name>/)[1],
            'desc': src.match(/<Theme.Description>([^<]*)<\/Theme.Description>/)[1],
            'mode': src.match(/<Theme.Mode>([^<]*)<\/Theme.Mode>/)[1],
            'js': src.match(/<Theme.JS>([^<]*)<\/Theme.JS>/)[1].trim(),
            'css': src.match(/<Theme.CSS>([^<]*)<\/Theme.CSS>/)[1].trim()
        }
    }
    
    // Import theme function
    selectfile.addEventListener('change', ()=> {
        filetoread = selectfile.files[0]
        filereader = new FileReader()
        
        if(!filetoread.name.endsWith('.bwrd') || !filetoread) {
            hideMenu()
            return
        }
    
        filereader.addEventListener('load', (e)=> {
            const themeInfo = getThemeInfo(e.target.result)
    
            // New Theme Parser (V3.7 or above)
            if(themeInfo.version == '2'){
    
                themeNameTb.value = themeInfo.name
                themeDescTb.value = themeInfo.desc
                jseditor.getModel().setValue(themeInfo.js)
                csseditor.getModel().setValue(themeInfo.css)
                themeModeDark.checked = (themeInfo.mode == 'dark') ? true : false
                themeModeLight.checked = (themeInfo.mode == 'light') ? true : false
            }
    
            // Legacy Theme Parser
            if(themeInfo == 'legacy'){
    
                function legacGetThemeInfo(name, src){
                    return src.split(`${name}={stTHM}`)[1].split('{edTHM}')[0]
                }
    
                content = e.target.result
                themeNameTb.value = legacGetThemeInfo('NAME', content)
                themeDescTb.value = legacGetThemeInfo('DESC', content)
                jseditor.getModel().setValue(legacGetThemeInfo('JS', content))
                csseditor.getModel().setValue(legacGetThemeInfo('CSS', content))
                if(legacGetThemeInfo('MODE', content) == 'dark') {themeModeDark.checked = true} else{themeModeLight.checked = true}
            }
    
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
}