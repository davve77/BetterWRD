// BetterWRD About Page

var currentVer = chrome.runtime.getManifest().version

// Version number
document.getElementById('ver').textContent = `Version: ${currentVer}`

// Latest version
{(async ()=> {
    let out = await fetch('https://api.github.com/repos/davve77/BetterWRD/releases/latest').then(e => e.json())
    let latestVer = out['tag_name']

    if(!latestVer || /BETA/.test(latestVer)) return
    document.getElementById('ver').nextElementSibling.nextElementSibling.textContent = (latestVer == currentVer) ? 'Latest: Yes' : 'Latest: No'
})()}