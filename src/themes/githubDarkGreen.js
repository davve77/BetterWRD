// Theme Name: Github Dark & Green
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = 'rgb(22, 27, 34)'

// Main
document.body.style.backgroundColor = 'rgb(9, 12, 16)'
document.querySelectorAll('.theme1, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = 'rgb(13, 17, 23)'; elm.style.border = '1px solid #30363d'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #238636')
document.querySelectorAll('.prefix, #links a').forEach(elm => {elm.style.backgroundColor = '#161b22'; elm.style.border = '1px solid #238636'})
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#161b22'; elm.style.border = '1px solid #238636'; elm.style.color = 'white'; elm.style.setProperty('-moz-appearance', 'none')})
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, .btnThreadControl, .forum_btnnewthread').forEach(elm => elm.style.border = '1px solid #238636')
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