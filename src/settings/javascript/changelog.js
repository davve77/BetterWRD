// BetterWRD Changelogs


// Variables
const changelogDiv = document.getElementById('changelogdiv')
const overlay = document.getElementById('changelogoverlay')


// Open/close changelog menu
document.addEventListener('click', e => {
    switch(e.target){

        // Open
        case document.getElementById('changelogbtn'):
            setTimeout(()=> {
                changelogDiv.style.display = 'block'
                overlay.classList.add('show')
            }, 150)
            break

        // Close
        case document.getElementById('closechangelog'):
            changelogDiv.style.opacity = 0
            setTimeout(()=> {changelogDiv.style.display = 'none'; changelogDiv.style.opacity = 1}, 300)
            break
    }
})


// Choose version
document.addEventListener('click', e => {

    let chosenVer = e.target.getAttribute('ver')
    let clDiv = document.querySelector(`#ver-${chosenVer}`)
    let currentList = document.querySelector('.current-ver-div')

    if(!clDiv || clDiv.id.includes(currentList.getAttribute('ver'))) return

    // Change current changelog
    document.querySelectorAll('.changelog-panel').forEach(panel => {
        if(panel == clDiv) return
        panel.style.transform = 'translateX(150%)'
        setTimeout(()=> { panel.style.display = 'none' }, 400)
    })
    clDiv.style.display = 'block'
    clDiv.style.transform = 'translateX(-130%)'
    setTimeout(()=> { clDiv.style.transform = 'none' }, 120)
    
    // Select version in list
    currentList.classList.remove('current-ver-div')
    document.querySelector(`#versions-list > [ver="${chosenVer}"]`).classList.add('current-ver-div')
})


// Fullscreen changelog
var isFullscreen = ()=> localStorage['fullscreenChangelog'] == 'true'
if(isFullscreen()) overlay.classList.add('changelog-fullscreen')

window.addEventListener('keyup', e => {
    if(e.key.toLowerCase() != 'f') return

    // enable fullscreen
    if(!isFullscreen()){
        overlay.classList.add('changelog-fullscreen')
        localStorage['fullscreenChangelog'] = 'true'
    }

    // disable fullscreen
    else if(isFullscreen()){
        overlay.classList.remove('changelog-fullscreen')
        localStorage['fullscreenChangelog'] = 'false'
    }
})


// Show changelogs after update
if(localStorage.getItem('lastChangelog') != chrome.runtime.getManifest().version){
    document.getElementById('changelogbtn').click()
    setTimeout(()=> {
        document.querySelectorAll('.changelog-panel')[0].style.animation = 'changelogAnim .3s ease-in'
    }, 650)

    localStorage.setItem('lastChangelog', chrome.runtime.getManifest().version)
}