// Name: Sticky Navigation Bar
// Desc: The navbar will always be at the top of your screen even when you scroll down on the page

const wrdnavbar = document.getElementById('navigationbar')
if(wrdnavbar){
    wrdnavbar.style.position = 'sticky'
    wrdnavbar.style.top = '0'
    wrdnavbar.style.zIndex = '1'
}