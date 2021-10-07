// Name: Set Background Image
// Desc: Sets the bg image and the bg image settings

var bg = document.body
navbar = document.getElementById('navigationbar')
themer = document.getElementById('themer')

chrome.storage.local.get(['bgimgUrl','transpStuff','repeatBg','fixbgImg','blurBgImg'], saved => {
    if(saved.bgimgUrl == null) return
    if(document.getElementsByTagName('span')[0].innerHTML.includes('Checking')) return

    // Set bg image
    bg.style.background = `url(${saved.bgimgUrl})`

    // Make stuff transparent
    function setdark(){
        document.querySelectorAll('.theme1, .theme2').forEach(el => el.style.backgroundColor = 'rgb(0 0 0 / 50%)')
        navbar.style.background = 'rgb(0 0 0 / 50%)'
        document.getElementsByTagName('footer')[0].style.color = 'rgb(255,255,255)'
    }
    function setbright(){
        document.querySelectorAll('.theme1, .theme2').forEach(el => el.style.backgroundColor = 'rgb(255 255 255 / 50%)')
        navbar.style.background = 'linear-gradient(90deg,#f4364c69,#55acee73)'
        document.getElementsByTagName('footer')[0].style.color = 'rgb(0,0,0)'
    }

    // Set Bg image settings
    if(saved.repeatBg) {bg.style.backgroundRepeat = 'repeat'} else {bg.style.backgroundRepeat = 'no-repeat'}
    if(saved.fixbgImg) {bg.style.backgroundAttachment = 'fixed'}
    if(saved.blurBgImg) {bg.style.backdropFilter = 'blur(8px)'; bg.style.overflowX = 'hidden'}
    if(saved.transpStuff){
        if(document.cookie.includes('night')) {setdark()}
        if(document.cookie.includes('bright')) {setbright()}
    }
    if(themer) {themer.addEventListener('click', ()=> {
        if(themer.checked) {setbright()}
        else {setdark()}
    })}
})