// BWRD Changelog Page

// After almost a month div loading thing
overlaydiv = document.getElementById('overlaydiv')
document.body.style.overflow = 'hidden'
setTimeout(()=> {
    document.getElementById('overlayh').style.opacity = '1'
    setTimeout(()=> {
        overlaydiv.style.opacity = '0'
        setTimeout(()=> {
            overlaydiv.remove()
            document.body.style.overflow = 'auto'
        }, 1000)
    }, 2000)
}, 200)

// Open all links in new tab
document.querySelectorAll('a').forEach(elm => {elm.target = '_blank'})

// Toggle background image
document.getElementById('togglewallpaper').addEventListener('click', ()=> {
    document.body.classList.toggle('changelogbgimg')
})

// Okay Button
document.getElementById('okbtn').addEventListener('click', ()=> {
    location.assign('https://discord.gg/myPZR263ks')
})

// Other
document.querySelectorAll('img').forEach(elm => {elm.setAttribute('draggable', 'false')})