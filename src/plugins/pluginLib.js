// BetterWRD Plugin Library

class PlgLib {
    async checkForUpdates(allPlugins){
        var needsUpdate = false
        var isPaused = localStorage['bwrd_pluginpausecheck'] == 'paused'
        var updateQueue = []
        const updateNotifier = document.createElement('div')
        const uSeconds = Math.floor(Date.now() / 1000)
        const threeHours = 10800

        // TODO: Changeable update check interval
        // Check every 3 hours
        !(localStorage['bwrd_pluginupdate']) && (localStorage['bwrd_pluginupdate'] = uSeconds + threeHours)
        !(localStorage['bwrd_pluginpausecheck']) && (localStorage['bwrd_pluginpausecheck'] = 'false')

        if(uSeconds <= localStorage['bwrd_pluginupdate'] && !isPaused) return
        localStorage['bwrd_pluginupdate'] = uSeconds + threeHours

        // Create notifier div
        updateNotifier.innerHTML = `<div id="plgupdnotifier" class="theme2" style="animation: fadeUp .3s cubic-bezier(0.3, 0, 0.5, 1); position: fixed;bottom: 0; left: 0; width: 100%;padding: 10px 20px;margin-top: -9px;text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: center;gap: 10px;"><p>The following BetterWRD plugin(s) need to be updated: </p> <div id="updatepluginlist" style=" display: flex; gap: 10px; "></div> <div style="display: block;justify-self: flex-end;align-self: flex-end;"><a id="updatepluginsbtn" class="btn button theme1" style="padding: 5px 20px;">Update</a></div></div> <style>#plgupdnotifier, #plgupdnotifier * {margin: 0; height: auto;} .pluginname{color: #55b5ff!important; font-weight: 500; white-space: nowrap; max-width: 300px; overflow: hidden; text-overflow: ellipsis;} @keyframes fadeUp { 0% { transform: translateY(100px); } 100% { transform: none; } } </style>`

        // Main
        for await (let plg of allPlugins){
            let getPluginSource = await fetch(plg.source).then(e => e.text()).catch()
            let pluginData = this.getPluginData(getPluginSource)
            let getPluginVer = pluginData.version

            if(getPluginSource && pluginData && getPluginVer
            && plg.name == pluginData.name && this.errorCheck(pluginData)){

                // Update
                if(plg.version != getPluginVer){
                    needsUpdate = true
                    updateQueue.push(this.getPluginData(getPluginSource))

                    let fragmentElm = document.createDocumentFragment()
                    let pluginElm = document.createElement('a')

                    pluginElm.setAttribute('class', 'pluginname')
                    pluginElm.setAttribute('target', '_blank')
                    pluginElm.setAttribute('href', plg.source)
                    pluginElm.textContent = plg.name

                    fragmentElm.appendChild(pluginElm)
                    updateNotifier.firstChild.children[1].appendChild(fragmentElm)
                }
            }
        }

        if(!needsUpdate){
            localStorage['bwrd_pluginpausecheck'] = 'false'
            return
        }

        localStorage['bwrd_pluginpausecheck'] = 'paused'
        document.body.appendChild(updateNotifier)

        // Update button
        document.querySelector('#updatepluginsbtn').addEventListener('click', ()=> {
            this.overwritePlugins(updateQueue, allPlugins)
            updateNotifier.firstElementChild.innerHTML = `<p>Successfully updated the plugin(s). Reload the page.</p><div style="display: block;justify-self: flex-end;align-self: flex-end;"><a onclick="location.reload()" class="btn button theme1" style="padding: 5px 20px;">Refresh</a></div>`
            localStorage['bwrd_pluginpausecheck'] = 'false'
        })
    }


    overwritePlugins(plugins, allplugins){
        allplugins = allplugins.map(plg => {
            let found = plugins.find(s => s['name'] == plg['name'])
            if(found) {plg = Object.assign(plg, found)}
            return plg
        })
        chrome.storage.local.set({'plugins': JSON.stringify(allplugins)})
    }


    getPluginData(plgHeader){
        try{
            var NAME          = plgHeader.match(/(?<=@name )(.*)/gm)[0]
            var VERSION       = plgHeader.match(/(?<=@version )(.*)/gm)[0]
            var DESCRIPTION   = plgHeader.match(/(?<=@description )(.*)/gm)[0] || 'No description'
            var AUTHOR        = plgHeader.match(/(?<=@author )(.*)/gm)[0] || 'No author'
            var SOURCE        = plgHeader.match(/(?<=@source )(.*)/gm)[0]
        }
        catch {return null}
        return {'name': NAME, 'version': VERSION, 'description': DESCRIPTION, 'author': AUTHOR, 'source': SOURCE, 'code': plgHeader}
    }


    errorCheck(plgData){
        let array = Object.keys(plgData).map((key) => {return plgData[key]})
        if(!array) return false
        for(let str of array){
            if(str.trim() == '') return false
        }
        return true
    }


    loadPlugins(plugins){
        const pluginExecutor = document.createElement('script')
        const pluginArray = []

        plugins.forEach(plg => {
            if(plg.enabled) pluginArray.push(plg)
        })

        // Load
        pluginExecutor.src = chrome.runtime.getURL('plugins/pluginExecutor.js') + '?plugins=' + encodeURIComponent(JSON.stringify(pluginArray))
        pluginExecutor.setAttribute('type', 'application/javascript')
        document.head.appendChild(pluginExecutor)
    }


    async checkNewPlugins(){
        if(document.querySelector('.notifbell')){
    
            var notifbell = document.querySelector('.notifbell')
            var notifCount = document.querySelector('.notifcount')
            var storageSaved = localStorage['bwrd_pluginsnotifs']
            var latestUpdateDate = await fetch('https://betterwrd.vercel.app/bwrd/latestPluginNotif.txt').then(e => e.text())
            var isSingleNotif = false
        
            if(storageSaved == latestUpdateDate) return
            !(localStorage['bwrd_pluginsnotifs']) && (localStorage['bwrd_pluginsnotifs'] = '')
        
            
            // User has no notifications
            if(!notifCount){
                isSingleNotif = true
    
                let menu = document.querySelector('.menu')
                let notifications = document.createElement('div')
                notifbell.appendChild(document.createElement('span')).outerHTML = '<span class="notifcount">1</span>'
                menu.firstElementChild.style.display = 'none'
                
                // Create notifs div
                notifications.setAttribute('class', 'notifications')
                menu.prepend(notifications)
            }

            // User already has notifications
            else notifCount.textContent = Number(notifCount.textContent) + 1

            
            // Create plugin notification
            let notificationsDiv = document.querySelector('.notifications')
            let plgNotif = document.createElement('div')
    
            plgNotif.setAttribute('class', 'notification bwrdnotification')
            plgNotif.innerHTML = `<img src="https://cdn.discordapp.com/attachments/800294579856605204/940276151207751750/bwrdlogo-text.png"></img>
                                  <div> <a target="_blank" href="${chrome.runtime.getURL('settings/pluginstore.html')}">A New Plugin has been added to the store! Check it out.</a>
                                  <p class="notif-time">BetterWRD Plugins</p></div>
                                  <p class="notif-exit-2" style="cursor: pointer; color: rgb(255, 69, 69); font-size: 25px; margin-left: 14px;">×</p>`
            notificationsDiv.prepend(plgNotif)
            
            
            // Delete notification
            plgNotif.addEventListener('click', ()=> {
                localStorage['bwrd_pluginsnotifs'] = latestUpdateDate
    
                if(isSingleNotif){
                    plgNotif.parentElement.remove()
                    document.querySelector('.menu').firstElementChild.style.display = 'flex'
                    document.querySelector('.notifcount').remove()
                }
                else{
                    plgNotif.remove()
                    document.querySelector('.notifcount').textContent = Number(document.querySelector('.notifcount').textContent) - 1
                }
            })
        }
    }
}

const PluginLib = new PlgLib()