// BetterWRD Plugin Executor

(function pluginExecutor(){

    const Plugins = JSON.parse(decodeURIComponent(document.currentScript.src.split('plugins=')[1]))
    const Fragment = document.createDocumentFragment()

    window.LoadedPlugins = []
    
    // Main
    Plugins.forEach(plg => {
        let plgScript = document.createElement('script')
    
        // Attributes
        plgScript.setAttribute('name', plg.name)
        plgScript.setAttribute('version', plg.version)
        plgScript.setAttribute('source', plg.source)
        plgScript.setAttribute('type', 'application/javascript')
    
        // Code
        plgScript.textContent = plg.code
    
        // Append to fragment
        Fragment.appendChild(plgScript)
        window.LoadedPlugins.push(plg.name)
    })
    
    // Plugin error handler
    window.addEventListener('error', e => {
        if(!document.currentScript) return

        let script = document.currentScript
        let plgName = script.getAttribute('name')

        if(plgName && window.LoadedPlugins.includes(plgName)){
            e.preventDefault()
            bwrd.alert(plgName + ' has errored', `${e.message} (line ${e.lineno})`)
        }
    })

    // Append fragment to head
    document.head.appendChild(Fragment)
})()