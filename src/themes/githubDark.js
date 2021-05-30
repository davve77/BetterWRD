// Theme Name: Github Dark
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = 'rgb(22, 27, 34)'

// Main
document.body.style.backgroundColor = 'rgb(9, 12, 16)'
document.querySelectorAll('.theme1, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = 'rgb(13, 17, 23)'; elm.style.border = '1px solid #30363d'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #30363d')
document.querySelectorAll('.prefix, input, select').forEach(elm => {elm.style.backgroundColor = '#161b22'; elm.style.color = 'white'; elm.style.border = '1px solid #30363d'})
document.head.appendChild(document.createElement('style')).innerHTML = `.themebtn{
    border: 1px solid #30363d;
    background-color: rgb(13, 17, 23);
    transition: .2s all cubic-bezier(.3,0,.5,1);`
document.querySelectorAll('.btn, .button, .btn_newrelpy, #links a, .btnThreadControl, .pagetextbox, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).innerHTML = '.themebtn:hover, .themebtn:focus{background-color: rgb(48, 54, 61);}'
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(13, 17, 23)'; document.querySelector('#medias').style.border = '1px solid #30363d'}

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}

// Make Dark
if(document.getElementById('themecss')){
    document.getElementById('themecss').href = '/css/themes/night.css'
}
while(document.documentElement.style.colorScheme != 'dark') {document.documentElement.style.colorScheme = 'dark'}