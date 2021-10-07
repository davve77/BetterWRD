// Theme Name: Midnight Gray
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = '#2d333b'

// Main
document.body.style.backgroundColor = '#1e2228'
document.querySelectorAll('.theme1, .forumcontainer, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = '#22272e'; elm.style.border = '1 px solid red'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #444c56')
document.querySelectorAll('.prefix').forEach(elm => {elm.style.backgroundColor = '#373e47'; elm.style.border = '1px solid #373e47'})
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#373e47'; elm.style.color = 'white'; elm.style.border = '1px solid #373e47'; elm.style.color = 'white'; elm.style.setProperty('-moz-appearance', 'none')})
document.head.appendChild(document.createElement('style')).innerHTML = '.signature{border-top: 1px solid #cccccc4d;}'
document.head.appendChild(document.createElement('style')).innerHTML = `.themebtn{
    border: 1px solid #444c56;
    background-color: #373e47;
    transition: .2s all cubic-bezier(.3,0,.5,1);`
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).innerHTML = '.themebtn:hover, .themebtn:focus{background-color: rgb(68, 76, 86); border: 1px solid rgb(118, 131, 144);}'
if(document.querySelector('#medias')){
    document.querySelector('#medias').style.backgroundColor = 'rgb(13 17 23 / 16%)'
    document.querySelector('#medias').style.borderTop = '1px solid rgb(55, 62, 71)'
}

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