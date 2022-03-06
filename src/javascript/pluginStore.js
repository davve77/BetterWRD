// BetterWRD Plugin Store


const pluginsDiv = document.querySelector('#pluginsDiv')

fetch('https://betterwrd.vercel.app/bwrd/listedPlugins.json').then((response)=>{return response.json()}).then(async (plugins) => {

    // List plugins
    for await (let plg of plugins){
        let fetchPlugin = await fetch(plg.source).then(e => e.text())
        let pluginData = lib.getPluginData(fetchPlugin)
        
        if(!plg.listed) return

        let plgDiv = document.createElement('div')
        pluginsDiv.prepend(plgDiv)
        plgDiv.innerHTML = `<div plgName="${pluginData.name}" class="plgCard" style="height: 270.5px; transition: .15s cubic-bezier(0.3, 0, 0.5, 1); width: 400px; background: rgb(40,40,40);border: 1px solid rgba(255,255,255,0.04);box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;display: flex;flex-direction: column;border-radius: 8px;overflow: hidden;text-align: left!important;"> <div style=" display: flex; align-items: center; max-height: 100px; overflow: hidden; "><img src="${plg.image}" style=" width: 100%; "></div> <div style="height: 60px;background: rgb(35,35,35);padding: 15px;display: flex;align-items: center;justify-content: space-between;"> <div style="display: flex;flex-direction: row;"> <div class="material-icons-outlined" style="display: flex;align-items: center;padding-right: 10px;"><span>extension</span></div> <div> <h1 style="font-size: 17px;margin: 0!important;color: rgb(242,242,242); white-space: pre; max-width: 250px; overflow: hidden; text-overflow: ellipsis;">${pluginData.name}</h1> <p style="margin: 0;font-size: 13px;opacity: .6; white-space: pre; max-width: 250px; overflow: hidden; text-overflow: ellipsis;">by ${pluginData.author}&nbsp; —&nbsp; v${pluginData.version}</p> </div> </div>  </div> <div style="padding: 15px;"> <p style="font-size: 15px; white-space: pre; text-overflow: ellipsis; overflow: hidden;">${pluginData.description}</p> </div> <div style="padding: 10px;flex: 1;display: flex;justify-content: space-between;"> <div style="display: flex;align-items: center;padding-left: 5px;gap: 7px;opacity: .7;"><a href="https://github.com${new URL(pluginData.source).pathname.replace('/main/', '/blob/main/')}" style="border-radius: 6ps;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill="white" width="22" height="22" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a></div> <div style="display: flex;gap: 7px;"><button class="btn btn-primary plg-download" id="downloadPlg" plgName="${pluginData.name}" plg="${btoa(JSON.stringify(pluginData))}" type="button">Download</button><p style="align-self: center; opacity: .75; display: none;" class="plg-installed">Installed</p></div></div></div>`

        // Plugin is already installed
        chrome.storage.local.get('plugins', (sv)=> {
            let currentPlugins = JSON.parse(sv.plugins)
            currentPlugins.forEach(installedPlg => {
                if(installedPlg.name == pluginData.name){
                    plgDiv.querySelector('.plg-installed').style.display = 'flex'
                    plgDiv.querySelector('#downloadPlg').style.display = 'none'
                }
            })
        })
    }

    // Download buttons
    document.body.addEventListener('click', (e)=> {
        if(e.target.id != 'downloadPlg') return

        chrome.storage.local.get('plugins', (sv)=> {
            let currentPlugins = JSON.parse(sv.plugins)
            let pluginData = JSON.parse(atob(e.target.getAttribute('plg')))

            // Plugin is already installed
            if(currentPlugins.find(s => s.name == pluginData.name)) {showToast(`"${pluginData.name}" is already installed.`); return}

            // Install plugin
            currentPlugins.push(pluginData)
            chrome.storage.local.set({'plugins': JSON.stringify(currentPlugins)})
            location.assign('plugins.html')
        })
    })

}).then(()=> {

    // Animation on load
    setTimeout(()=> {
        document.querySelector('#loadingAnim').style.opacity = '0'
        setTimeout(()=> {document.querySelector('#loadingAnim').style.display = 'none'}, 250)
        $('.plgCard').each(function(i){
            var $this = $(this)
            setTimeout(function(){
                $this.css('opacity', '1')
                $this.css('transform', 'none')
            }, i*60)
        });
    }, 250)

}).catch()