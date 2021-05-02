// Name: Bright theme navigation bar
// Desc: Use the bright theme navigation bar even if you're using night theme

var navbar = document.getElementById('navigationbar')
if(!navbar.outerHTML.includes('rgba(0, 0, 0, 0.5)')){ // Don't override the navigation bar's transparent bg (if the user is using 'transparent stuff' setting)
    navbar.style.background = 'linear-gradient(90deg,#f4364c,#55acee)'
}