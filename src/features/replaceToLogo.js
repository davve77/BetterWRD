// Name: Replace text with logo
// Desc: Replaces the 'WeAreDevs' text in navbar with WRD logo

var e = document.getElementById('foologo')
var wrdlogo = document.createElement('img')

try{
    wrdlogo.src = 'https://i.imgur.com/60mVQky.png'
    wrdlogo.style.display = 'block'
    e.appendChild(wrdlogo)
    e.firstChild.remove()
}catch{}