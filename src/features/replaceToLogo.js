// Name: Replace text with logo
// Desc: Replaces the 'WeAreDevs' text in navbar with WRD logo


chrome.storage.local.get(['replaceText','WRDLogo'], saved => {
    const elm = document.getElementById('foologo')
    if(!saved.replaceText || !elm) return

    // Create image
    const wrdlogo = document.createElement('img')
    wrdlogo.src = 'https://i.imgur.com/60mVQky.png' // Default = light logo
    wrdlogo.style.display = 'block'
    wrdlogo.style.height = '45px'
    wrdlogo.style.width = '45px'
    elm.appendChild(wrdlogo)
    elm.firstChild.remove()
    elm.style.alignItems = 'center'

    // Dark/Light Image
    if(saved.WRDLogo == 'dark'){
        wrdlogo.src = 'https://i.imgur.com/frqpbRZ.png'
    }
})