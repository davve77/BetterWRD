// Name: Sticky Navigation Bar
// Desc: The navbar will always be at the top of your screen even when you scroll down on the page

navbar = document.getElementById('navigationbar')

if(navbar){
    navbar.style.position = 'sticky'
    navbar.style.top = '0'
    navbar.style.zIndex = '1'
}