// Etc. Stuff that I wanna add to make the website look better

// 1
var navitems = document.getElementsByClassName('navItem')
for(var i=0, l=navitems.length; i<l; i++) {navitems[i].style.transition = '.5s'}

// 2
var ls = document.getElementById('loadstring')
if(ls && document.cookie.includes('night')) {ls.style.color = 'white'}

// 3
var themer = document.getElementById('themer')
if(document.cookie.includes('night')) document.head.appendChild(document.createElement('style')).innerHTML = ':root{color-scheme:dark;)'
if(themer){
    themer.addEventListener('click', ()=> {
        if(themer.checked) {document.documentElement.style.colorScheme = 'light'}
        else {document.documentElement.style.colorScheme = 'dark'}
    })
}