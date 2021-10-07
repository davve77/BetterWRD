// Theme Name: Deep Night
// Theme Mode: Dark

// Main
document.querySelectorAll('*').forEach(elm => {
    elm.style.backgroundColor = 'black'
    elm.style.color = 'rgb(210,210,210)'
    elm.style.outline = 'none'
})
document.querySelectorAll('.forumcontainer h2').forEach(elm => {
    elm.style.borderBottom = 'none'
})
document.querySelectorAll('#navigationbar').forEach(elm => {
    elm.style.background = 'black'
})
document.querySelector('.notifbell').style.removeProperty('background')

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}

// Make Dark
if(document.getElementById('themecss')){
    document.getElementById('themecss').href = '/css/themes/night.css'
}
while(document.documentElement.style.colorScheme != 'dark') {document.documentElement.style.colorScheme = 'dark'}
document.head.appendChild(document.createElement('style')).innerHTML = '::-webkit-scrollbar{width: 5px;} ::-webkit-scrollbar-track{background: transparent;} ::-webkit-scrollbar-thumb{background: rgb(60,60,60);}'