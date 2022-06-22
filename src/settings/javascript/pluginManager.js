// BetterWRD Plugin Manager

const PluginLib = new PlgLib()

chrome.storage.local.get(['plugins'], (saved)=>{

    // Create 'plugins' if it doesn't exist
    !(saved.plugins) && (chrome.storage.local.set({'plugins':'[]'}))

    // Const
    const pluginsDiv = document.querySelector('#pluginsDiv')
    const mainDiv = document.querySelector('.mainPGDIV')
    const dropDiv = document.querySelector('#dropDiv')

    // Refresh list
    async function refreshPluginList(plugins, list, isFirstLoad){

        // Remove children
        while(list.firstChild) {list.firstChild.remove()}

        // Create divs
        plugins.forEach(plg => {
            let plgDiv = document.createElement('div')
            pluginsDiv.prepend(plgDiv)
            plgDiv.innerHTML = `<div plgName="${plg.name}" class="plgCard" style="height: 170.5px; transition: .15s cubic-bezier(0.3, 0, 0.5, 1); transition-property: opacity, transform; width: 400px; background: rgb(40,40,40);border: 1px solid rgba(255,255,255,0.04);box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;display: flex;flex-direction: column;border-radius: 8px;overflow: hidden;text-align: left!important;"> <div style="height: 60px;background: rgb(35,35,35);padding: 15px;display: flex;align-items: center;justify-content: space-between;"> <div style="display: flex;flex-direction: row;"> <div class="material-icons-outlined" style="display: flex;align-items: center;padding-right: 10px;"><span>extension</span></div> <div> <h1 style="font-size: 17px;margin: 0!important;color: rgb(242,242,242); white-space: pre; max-width: 250px; overflow: hidden; text-overflow: ellipsis;">${util.strip(plg.name)}</h1> <p style="margin: 0;font-size: 13px;opacity: .6; white-space: pre; max-width: 250px; overflow: hidden; text-overflow: ellipsis;">by ${util.strip(plg.author)}&nbsp; —&nbsp; v${util.strip(plg.version)}</p> </div> </div> <div><label class="switch"> <input plgName="${plg.name}" id="pluginswitch" type="checkbox" autocomplete="off"> <span class="slider round"></span> </label></div> </div> <div class="bottom-plg-section"> <div style="padding: 15px;"> <p style="font-size: 15px; white-space: pre; max-width: 500px; text-overflow: ellipsis; overflow: hidden;">${util.strip(plg.description)}</p> </div> <div class="plg-bottom-buttons" style="padding: 10px;flex: 1;display: flex;justify-content: space-between;"> <div style="display: flex;align-items: center;padding-left: 5px;gap: 7px;opacity: .7;"><a href="https://github.com${new URL(plg.source).pathname.replace('/main/', '/blob/main/')}" style="border-radius: 6ps;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="22" height="22" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a></div> <div style="display: flex;gap: 7px;"><button class="btn btn-primary" id="updatePlg" plgName="${plg.name}" type="button">Update</button><button class="btn btn-primary" id="deletePlg" plgName="${plg.name}" type="button">Delete</button></div></div></div></div>`
            plgDiv.firstElementChild.firstElementChild.lastElementChild.lastElementChild.firstElementChild.checked = (plg.enabled) ? true : false

            // Animation
            if(!isFirstLoad){
                plgDiv.firstElementChild.style.transform = 'none'
                plgDiv.firstElementChild.style.opacity = '1'
            }
        })

        // Slider event
        pluginSliders()
    }


    function loadPlugin(PLGDATA, ExistingPlugins){
        
        // Return if plugin data is null
        if(!PLGDATA || !PluginLib.errorCheck(PLGDATA)) {showToast('Failed to load plugin.'); return}

        // @source is not valid
        try{new URL(PLGDATA.source)} catch{showToast('Plugin source URL is not valid.'); return}
        if(new URL(PLGDATA.source).hostname != 'raw.githubusercontent.com') {showToast('Plugin source URL is not a raw Github link.'); return}

        // Overwrite plugin if plugins have the same name
        for(var i=0;i<ExistingPlugins.length;i++) {if(ExistingPlugins[i].name == PLGDATA.name){
            PluginLib.overwritePlugins([PLGDATA], ExistingPlugins)
            chrome.storage.local.get('plugins', (sv)=>{refreshPluginList(JSON.parse(sv.plugins), pluginsDiv)})
            showToast(`"${PLGDATA.name}" has been reloaded.`)
            return
        }}

        chrome.storage.local.get(['plugins'], (sv)=>{
            const plugins = JSON.parse(sv.plugins)
            plugins.push({
                'name': PLGDATA.name,
                'version': PLGDATA.version,
                'description': PLGDATA.description,
                'author': PLGDATA.author,
                'source': PLGDATA.source,
                'code': PLGDATA.code
            })

            chrome.storage.local.set({'plugins': JSON.stringify(plugins)})
            refreshPluginList(plugins, pluginsDiv)

            // Toast
            showToast(`"${PLGDATA.name}" has been loaded.`)
        })
    }

    async function loadPluginURL(PLURL, ExistingPlugins){

        // Check if text is valid URL
        try {new URL(PLURL)} catch{showToast('URL is not valid.'); return}

        // Returns
        if(new URL(PLURL).host != 'raw.githubusercontent.com') {showToast('The link has to be a raw Github URL.'); return}
        if(!PLURL.endsWith('.bwrd.js')) {showToast('The file name has to end with .bwrd.js.'); return}

        // Consts
        const PluginText    = await fetch(PLURL).then(e => e.text())
        const PlgData       = PluginLib.getPluginData(PluginText)

        // Load
        loadPlugin(PlgData, ExistingPlugins)
    }

    function deletePluginByName(FindName){
        chrome.storage.local.get(['plugins'], (sv)=>{
            let plugins = JSON.parse(sv.plugins)

            // Find & Delete
            for(var i=0;i<plugins.length;i++) {if(plugins[i].name == FindName) {plugins.splice(i, 1)}}
            chrome.storage.local.set({'plugins': JSON.stringify(plugins)})

            // Refresh
            refreshPluginList(plugins, pluginsDiv)

            // Toast
            showToast(`"${FindName}" has been deleted.`)
        })
    }

    async function updatePlugin(plugin, allplugins){

        let getPlgSrc = await fetch(plugin.source).then(e => e.text())

        if(!PluginLib.getPluginData(getPlgSrc)) {showToast('Failed to update this plugin.'); return}

        let plugins = JSON.parse(allplugins)
        let pluginToUpdate = [PluginLib.getPluginData(getPlgSrc)]
        let getPlgVer = pluginToUpdate[0].version

        // Errors
        if(!getPlgSrc || !getPlgVer || !PluginLib.getPluginData(getPlgSrc)) {showToast('Failed to update this plugin.'); return}
        if(plugin.version == getPlgVer) {showToast(`"${plugin.name}" is up to date.`); return}
        if(PluginLib.getPluginData(getPlgSrc).name != plugin.name) {showToast('Plugin names don\'t match.'); return}

        // Find & Attempt Update
        plugins = plugins.map(plg => {
            let found = pluginToUpdate.find(s => s['name'] == plg['name'])
            if(found) {plg = Object.assign(plg, found)}
            return plg
        })
        chrome.storage.local.set({'plugins': JSON.stringify(plugins)})

        // Refresh  
        refreshPluginList(plugins, pluginsDiv)

        // Toast
        showToast(`"${plugin.name}" has been updated to V${getPlgVer}.`)
    }

    document.body.addEventListener('click', (e)=> {

        var githubdiv = document.querySelector('#loadGithubDiv')
        var githubbtn = document.querySelector('#loadPlgGitHub')
        var loadGitHub = document.querySelector('#loadPlgBtn')
        var pluginURL = document.querySelector('#pluginURL')


        // Show Load from GitHub div
        if(e.target == githubbtn || githubdiv.contains(e.target))[
            githubdiv.style.opacity = '1',
            githubdiv.style.transform = 'none',
            githubdiv.style.pointerEvents = 'all'
        ]

        // Hide Load from GitHub div
        else{
            githubdiv.style.opacity = '0',
            githubdiv.style.transform = 'translateY(-5px)',
            githubdiv.style.pointerEvents = 'none'
        }


        // Load button
        if(e.target == loadGitHub){
            chrome.storage.local.get(['plugins'], (sv)=>{

                loadPluginURL(pluginURL.value, JSON.parse(sv.plugins))
                githubdiv.style.opacity = '0',
                githubdiv.style.transform = 'translateY(-5px)',
                githubdiv.style.pointerEvents = 'none'
                pluginURL.value = ''
            })
        }


        // Delete Plugin button
        if(e.target.id == 'deletePlg'){
            deletePluginByName(e.target.getAttribute('plgName'))
        }


        // Update Plugin button
        if(e.target.id == 'updatePlg'){
            chrome.storage.local.get(['plugins'], (sv)=>{
                let plugins = JSON.parse(sv.plugins)
                for(var i=0;i<plugins.length;i++){
                    if(plugins[i].name == e.target.getAttribute('plgName')){
                        updatePlugin(plugins[i], sv.plugins)
                    }
                }
            })
        }

    })


    // Show plugins
    refreshPluginList(JSON.parse(saved.plugins), pluginsDiv, true)

    
    // Animation on load
    .then(()=>{
        setTimeout(()=> {
            $('.plgCard').each(function(i){
                var $this = $(this)
                setTimeout(function(){
                    $this.css('opacity', '1')
                    $this.css('transform', 'none')
                }, i*60)
            });
        }, 1)
    })


    // Enable/Disable plugin slider
    function pluginSliders(){
        document.querySelectorAll('#pluginswitch').forEach(slider => {

            slider.addEventListener('change', (e)=> {
                let plgName = e.target.getAttribute('plgName')
    
                // Enable
                if(e.target.checked){
                    chrome.storage.local.get(['plugins'], (sv)=>{
    
                        // Plugins var
                        let plugins = JSON.parse(sv.plugins)
    
                        // Find & Enable
                        for(var i=0;i<plugins.length;i++) {if(plugins[i].name == plgName) {
                            plugins[i].enabled = true
                        }}
                        chrome.storage.local.set({'plugins': JSON.stringify(plugins)})
                        showToast(`${plgName} has been enabled.`)
                    })
                }
    
                // Disable
                else{
                    chrome.storage.local.get(['plugins'], (sv)=>{
    
                        // Plugins var
                        let plugins = JSON.parse(sv.plugins)
    
                        // Find & Disable
                        for(var i=0;i<plugins.length;i++) {if(plugins[i].name == plgName) {
                            plugins[i].enabled = false
                        }}
                        chrome.storage.local.set({'plugins': JSON.stringify(plugins)})
                        showToast(`${plgName} has been disabled.`)
                    })
                }
            })
        })
    }


    // Drag & Drop plugin file
    dropDiv.addEventListener('drop', (e)=> {
        e.preventDefault()

        var reader = new FileReader()
        var filetoread = e.dataTransfer.files[0]

        if(e.dataTransfer.files.length == 0) {dragLeaveHandler(); return}
        if(!filetoread.name.endsWith('.bwrd.js')) {showToast('File name must end with .bwrd.js.'); dragLeaveHandler(); return}

        reader.onload = (e) => {
            chrome.storage.local.get('plugins', (sv)=> {
                loadPlugin(PluginLib.getPluginData(e.target.result), JSON.parse(sv.plugins))
            })
        }

        reader.readAsText(filetoread)
        dragLeaveHandler()
    })

    dropDiv.addEventListener('dragenter', dragEnterHandler)
    dropDiv.addEventListener('dragleave', dragLeaveHandler)
    dropDiv.addEventListener('dragover', (e)=> {e.preventDefault()})

    function dragEnterHandler(){
        dropDiv.style.background = '#ffffff08'
        dropDiv.lastElementChild.style['pointer-events'] = 'none'
    }
    function dragLeaveHandler(){
        dropDiv.style.background = 'transparent'
        dropDiv.lastElementChild.style['pointer-events'] = 'auto'
    }


    // Switch view mode
    const listViewBtn       = document.querySelector('#list-view'),
          gridViewBtn       = document.querySelector('#grid-view'),
          wideGridViewBtn   = document.querySelector('#widegrid-view')

    listViewBtn.parentElement.addEventListener('click', e => {

        // Set list view
        if(e.target == listViewBtn){
            switchView('list')
            localStorage['pluginsViewMode'] = 'list'
        }

        // Set grid view
        else if(e.target == gridViewBtn){
            switchView('grid')
            localStorage['pluginsViewMode'] = 'grid'
        }

        // Set widegrid view
        else if(e.target == wideGridViewBtn){
            switchView('widegrid')
            localStorage['pluginsViewMode'] = 'widegrid'
        }
    })

    function switchView(view){
        if(view == 'list')
        { // Grid
            listViewBtn.classList.add('selected-view')
            gridViewBtn.classList.remove('selected-view')
            wideGridViewBtn.classList.remove('selected-view')
            
            mainDiv.classList.remove('wide-plugins')
            pluginsDiv.setAttribute('mode', 'list')
        }

        else if(view == 'grid')
        { // List
            listViewBtn.classList.remove('selected-view')
            gridViewBtn.classList.add('selected-view')
            wideGridViewBtn.classList.remove('selected-view')
            
            mainDiv.classList.remove('wide-plugins')
            pluginsDiv.setAttribute('mode', 'grid')
        }

        else if(view == 'widegrid')
        { // Wide Grid
            listViewBtn.classList.remove('selected-view')
            gridViewBtn.classList.remove('selected-view')
            wideGridViewBtn.classList.add('selected-view')

            pluginsDiv.setAttribute('mode', 'grid')
            mainDiv.classList.add('wide-plugins')
        }
    }

    switchView(localStorage['pluginsViewMode'])
})