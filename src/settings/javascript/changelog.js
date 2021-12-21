// BetterWRD Changelogs


// Main
changelogdiv = document.getElementById('changelogdiv')
overlay = document.getElementById('changelogoverlay')
clcontent = document.getElementById('clcontent')
clcurrent = document.getElementById('clcurrent')
clcurbtmdiv = document.getElementById('clcbottomdiv')

function showWhatsNew(){
    clcurrent.scrollTo({top: 0})
    clcontent.style.transform = 'translateX(-850px)'
    setTimeout(()=> {clcurrent.style.transform = 'translateX(0px)'}, 30)
}

function showAllChangelogs(){
    clcurrent.style.transform = 'translateX(850px)'
    setTimeout(()=> {clcontent.style.transform = 'translateX(0)'}, 30)
}

document.addEventListener('click', (e)=> {
    switch(e.target){
        case document.getElementById('changelogbtn'):
            setTimeout(()=> {
                changelogdiv.style.display = 'block'
                overlay.className = 'show'
            }, 150)
            break

        case document.getElementById('closechangelog'):
            changelogdiv.style.opacity = 0
            setTimeout(()=> {changelogdiv.style.display = 'none'; changelogdiv.style.opacity = 1}, 300)
            break

        case document.getElementById('whatsnewbtn'):
            showWhatsNew()
            break

        case document.getElementById('clprevious'):
            showAllChangelogs()
            break

        case scrolltotop:
            clcurrent.scrollTo({top: 0, behavior: 'smooth',})
            break

         case document.getElementById('clcbackbtn'):
            showAllChangelogs()
    }
})

clcurrent.addEventListener('scroll', ()=> {
    if(clcurrent.scrollTop > 200 && clcurrent.scrollHeight - clcurrent.scrollTop != clcurrent.clientHeight){
        clcurbtmdiv.style.opacity = '1'
        clcurbtmdiv.style.pointerEvents = 'auto'
    }
    else{
        clcurbtmdiv.style.opacity = '0'
        clcurbtmdiv.style.pointerEvents = 'none'
    }
})


// Show changelogs after update
if(localStorage.getItem('lastChangelog') != chrome.runtime.getManifest().version){
    document.getElementById('changelogbtn').click()
    setTimeout(showWhatsNew, 500)

    localStorage.setItem('lastChangelog', chrome.runtime.getManifest().version)
}