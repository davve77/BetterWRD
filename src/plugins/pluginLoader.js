// BetterWRD Plugin Loader
// Written by david77


// Load BetterWRD Plugin API
const PluginAPI = document.createElement('script')
PluginAPI.setAttribute('id', 'BWRDPluginAPI')
PluginAPI.setAttribute('type', 'application/javascript')
PluginAPI.setAttribute('bwrdversion', chrome.runtime.getManifest().version)
PluginAPI.setAttribute('url', chrome.runtime.getURL('/etc'))
PluginAPI.setAttribute('src', chrome.runtime.getURL('/plugins/bwrdAPI.js'))
PluginAPI.addEventListener('load', main)
document.head.appendChild(PluginAPI)


// Main
function main(){
    chrome.storage.local.get('plugins', saved => {

        // User has no plugins
        !(saved.plugins) && (chrome.storage.local.set({'plugins': '[]'}))
    
        const Plugins = JSON.parse(saved.plugins)
    
        // Load plugins
        PluginLib.loadPlugins(Plugins)
        
        // Check for updates
        PluginLib.checkForUpdates(Plugins)

        // Notification for new plugins
        PluginLib.checkNewPlugins()
    })
}