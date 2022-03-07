// BetterWRD Plugin API

const bwrd = {
    injectStyle: (style) => {
        document.head.appendChild(document.createElement('style')).textContent = style
    },

    includeLibrary: (url, isModule = false) => {
        let script = document.createElement('script')
        script.src = url
        script.type = (isModule) ? 'module' : 'application/javascript'
        return document.head.appendChild(script)
    },

    getSettings: () => {
        !(localStorage['bwrd_plugindata']) && (localStorage['bwrd_plugindata'] = '{}')
        return JSON.parse(localStorage['bwrd_plugindata'])
    },

    setSettings: (settings) => {
        !(localStorage['bwrd_plugindata']) && (localStorage['bwrd_plugindata'] = '{}')
        if(typeof settings != 'object') return false
        
        let current = JSON.parse(localStorage['bwrd_plugindata'])
        current = Object.assign(current, settings)
        localStorage['bwrd_plugindata'] = JSON.stringify(current)
    },

    getVersion: () => {
        return document.querySelector('#BWRDPluginAPI').getAttribute('bwrdversion')
    },

    getPlugin: () => {
        // Return if function isn't called from a plugin script
        if(!bwrd.isRanFromPlugin()) return

        let plugin = document.currentScript
        return {'name': plugin.getAttribute('name'), 'version': plugin.getAttribute('version'), 'source': plugin.getAttribute('source')}
    },

    copyToClipboard: (string) => {
        if(typeof string !== 'string') return false
        return util.copyToClipboard(string)
    },

    handleErrors: (fn, ...params) => {
        if (typeof fn !== 'function') return false
        try {fn(...params)}
        catch {}
    },

    validateJSON: (string) => {
        return util.validateJSON(string)
    },

    stripHTML: (html) => {
        return util.strip(html)
    },

    getUser: async(uidnum) => {
        let userID = (uidnum) ? `https://wearedevs.net/profile?uid=${uidnum}` : 'https://wearedevs.net/profile'
        let doc = new DOMParser().parseFromString(await fetch(userID).then(e => e.text()), 'text/html')
        if(!doc || !doc.querySelector('#profile_contentcontainer')) return false
        return {
            "id": doc.querySelectorAll('.profile_sidecard')[2].nextElementSibling.href.split('uid=')[1],
            "name": doc.querySelector('.username').textContent,
            "alias": doc.querySelector('.alias').textContent.replace('(','').replace(')',''),
            "avatar": doc.querySelector('#profile_mainprofilepicture').src,
            "bio": (doc.querySelector('.biography')) ? doc.querySelector('.biography').textContent : '',
            "reputation": doc.querySelector('.alias').nextElementSibling.firstElementChild.firstElementChild.textContent,
            "joinDate": doc.querySelector('.alias').nextElementSibling.nextElementSibling.textContent.split(': ')[1],
            "badgesCount": doc.querySelectorAll('[alt="badge"]').length
        }
    },

    showChangelog: (updateDate, changelogContent) => {
        !(localStorage['bwrd_pluginchangelogs']) && (localStorage['bwrd_pluginchangelogs'] = '{}')

        // Return if function isn't called from a plugin script
        if(!bwrd.isRanFromPlugin()) return

        let changelogMenu = document.createElement('div')
        let existing = JSON.parse(localStorage['bwrd_pluginchangelogs'])
        let pluginInfo = bwrd.getPlugin()
        let changelogContentString = ''

        // Return if update date or changelog content isn't valid
        if(!updateDate || typeof updateDate !== 'string' || !Array.isArray(changelogContent)) return

        // Don't show changelog menu if it was already shown
        if(existing[pluginInfo.name] == pluginInfo.version) return

        // Don't show changelog menu if user's on Cloudflare page
        if(document.getElementById('CreditCard') || document.getElementById('cf-wrapper')) return

        // Format changelog content for the menu
        changelogContent.forEach(content => {
            changelogContentString += `<div style="display:flex;"><span>-</span><p style="padding-left:10px;">${util.strip(content)}</p></div>`
        })

        // Show changelog menu
        document.body.appendChild(changelogMenu)
        changelogMenu.outerHTML = `<div style=" z-index: 2; position: fixed; width: 100%; height: 100%; background: #00000085; display: flex; align-items: center; justify-content: center; "><div class="theme1 border1 round" style=" width: 550px; max-height: 90%; display: flex; flex-direction: column; box-shadow: rgb(0 0 0 / 10%) 0px 10px 50px; overflow: hidden; "><div class="theme2 padding" style="display: flex;flex-direction: row;justify-content: space-between;align-items: center; padding: 11px 20px;"><div style=" display: flex; flex-direction: column; gap: 2px; "><h1 style="white-space: pre; max-width: 450px; overflow: hidden; text-overflow: ellipsis;">${util.strip(pluginInfo.name)}</h1> <p style="opacity: .5;font-size: 14px; white-space: pre; max-width: 450px; overflow: hidden; text-overflow: ellipsis;">V${util.strip(pluginInfo.version)} — ${util.strip(updateDate)}</p></div><div onclick="this.parentElement.parentElement.parentElement.remove()" style=" display: flex; align-items: center; justify-content: center; cursor: pointer; "><svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 0 24 24" width="27" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></div> </div><div class="padding" style=" flex: 1; padding: 20px 15px; overflow: overlay;"><h1 style=" padding-bottom: 15px; ">Changelog</h1> <div id="pluginChangelogMain" style=" line-height: 1.5; font-size: 16px; padding-left: 10px; display: flex; flex-direction: column; gap: 5px;">${changelogContentString}</div></div> </div></div>`

        // Set plugin version to current version
        existing[pluginInfo.name] = pluginInfo.version
        localStorage['bwrd_pluginchangelogs'] = JSON.stringify(existing)
    },

    alert: (title, content) => {
        
        // Create alert div
        let alertDiv = document.createElement('div')
        alertDiv.innerHTML = `<div class="alert-background" style=" position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #0000008f; z-index: 3; display: flex; align-items: center; justify-content: center; "><div class="theme1" style=" border-radius: 15px; width: 460px; height: 300px; display: flex; flex-direction: column; overflow: hidden; "><div class="alert-title-div" style=" padding: 25px; "><h2 class="alert-title" style=" font-weight: 600; text-overflow: ellipsis; overflow: hidden;">${util.strip(title)}</h2></div> <div class="alert-content-div" style=" padding: 0 25px; height: 700px; "><p style=" font-size: 18px; max-width: 400px; max-height: 110px; overflow: hidden; text-overflow: ellipsis; overflow-wrap: break-word; ">${util.strip(content)}</p></div> <div class="theme2" style=" width: 100%; height: 100%; display: flex; align-items: center; justify-content: flex-end; padding: 0 10px; "><a style=" cursor: pointer; user-select: none; background: #a3c2ff; color: black; font-weight: 400; border-radius: 9px; padding: 9px 55px; " class="okay-alert">Okay</a></div></div></div>`
        document.body.appendChild(alertDiv)

        // Okay button
        alertDiv.querySelector('.okay-alert').onclick = () => {
            alertDiv.remove()
        }
    },

    isRanFromPlugin: () => {
        return (document.currentScript != null && document.currentScript.getAttribute('source') != null) ? true : false
    }
}