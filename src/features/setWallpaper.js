// Name: Set Wallpaper
// Desc: Sets the wallpaper and its settings on WRD

const bg = document.body
const navbar = document.getElementById('navigationbar')
const themer = document.getElementById('themer')

chrome.storage.local.get(['bgimgUrl','transpStuff','repeatBg','fixbgImg','blurBgImg'], saved => {
    if(saved.bgimgUrl == null) return
    if(document.getElementsByTagName('span')[0].innerHTML.includes('Checking')) return

    // Set wallpaper
    bg.style.background = `url(${saved.bgimgUrl})`

    // Make stuff half transparent
    function setDark(){
        setTimeout(()=> {
            document.querySelectorAll('.theme1, .theme2').forEach(el => el.style.backgroundColor = 'rgb(0 0 0 / 50%)')
            navbar.style.background = 'rgb(0 0 0 / 50%)'
            document.getElementsByTagName('footer')[0].style.color = 'white'
        }, 150)
    }
    function setBright(){
        document.querySelectorAll('.theme1, .theme2').forEach(el => el.style.backgroundColor = 'rgb(255 255 255 / 50%)')
        navbar.style.background = 'linear-gradient(90deg,#f4364c69,#55acee73)'
        document.getElementsByTagName('footer')[0].style.color = 'black'
    }

    // Set Bg image settings
    if(saved.repeatBg) {bg.style.backgroundRepeat = 'repeat'} else {bg.style.backgroundRepeat = 'no-repeat'}
    if(saved.fixbgImg) {bg.style.backgroundAttachment = 'fixed'}
    if(saved.blurBgImg) {bg.style.backdropFilter = 'blur(8px)'; bg.style.overflowX = 'hidden'}
    if(saved.transpStuff){
        if(saved.theme != null || saved.customtheme != null){
            if(document.cookie.includes('night')) {setTimeout(setDark, 120)}
            else {setTimeout(setBright, 120)}
        }
        else{
            if(document.cookie.includes('night')) {setDark()}
            else {setBright()}
        }
    }
    if(themer) {themer.addEventListener('click', ()=> {
        if(themer.checked) {setBright()}
        else {setDark()}
    })}
})