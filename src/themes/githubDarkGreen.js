// Theme Name: Github Dark & Green
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = 'rgb(22, 27, 34)'

// Main
document.body.style.backgroundColor = 'rgb(9, 12, 16)'
document.head.appendChild(document.createElement('style')).innerHTML = '.theme1, .theme2, .thread_replierdata, .signature{background: rgb(13, 17, 23)!important; border: 1px solid #238636!important;}'
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #238636')
document.head.appendChild(document.createElement('style')).innerHTML = '.prefix, #links a{background: #161b22!important; color: white; border: 1px solid #238636!important;}'
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#161b22'; elm.style.border = '1px solid #238636'; elm.style.color = 'white'; elm.style.setProperty('-moz-appearance', 'none')})
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, .btnThreadControl, .forum_btnnewthread').forEach(elm => {elm.style.border = '1px solid #238636'; elm.style.background = 'rgb(13, 17, 23)'})
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(13, 17, 23)'; document.querySelector('#medias').style.border = '1px solid #30363d'}
document.head.appendChild(document.createElement('style')).innerHTML = `.latestthreads{background: rgb(17 20 26) !important;}`

// Etc
document.head.appendChild(document.createElement('style')).innerHTML = '.theme1{background-color: rgb(13, 17, 23); border: 1px solid #30363d;} pre[class*=language-]{background: rgb(23 29 38)!important;} .border1-bottom { border-bottom: 1px solid rgb(35 134 54 / 67%); }'

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.innerHTML = `
.menu{
   background: rgb(33, 37, 43)!important;
}
.dropmenu > div{
   border-bottom: 1.6px solid rgb(35, 134, 54)!important;
}
.navbtn, .notification{
    border: 1px solid transparent;
}
.navbtn:hover, .notification:hover{
   background: rgb(38, 44, 51);
   border: 1px solid rgb(35, 134, 54);
}
.notif-time{
   color: rgb(235, 235, 235)!important;
}
`
document.head.appendChild(dm)

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}