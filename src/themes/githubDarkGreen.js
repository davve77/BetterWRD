// Theme Name: Github Dark & Green
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = 'rgb(22, 27, 34)'

// Main
document.body.style.backgroundColor = 'rgb(9, 12, 16)'
document.head.appendChild(document.createElement('style')).textContent = '.theme1, .theme2, .thread_replierdata, .signature{background: rgb(13, 17, 23)!important; border: 1px solid #238636!important;}'
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #238636')
document.head.appendChild(document.createElement('style')).textContent = '.prefix, #links a{background: #161b22!important; color: white; border: 1px solid #238636!important;}'
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#161b22'; elm.style.border = '1px solid #238636'; elm.style.color = 'white'; elm.style.setProperty('-moz-appearance', 'none')})
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, .btnThreadControl, .forum_btnnewthread').forEach(elm => {elm.style.border = '1px solid #238636'; elm.style.background = 'rgb(13, 17, 23)'})
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(13, 17, 23)'; document.querySelector('#medias').style.border = '1px solid #30363d'}
document.head.appendChild(document.createElement('style')).textContent = `.latestthreads{background: rgb(17 20 26) !important;}`

// Etc
document.head.appendChild(document.createElement('style')).textContent = '#d_disp{background: 0!important;} .theme1{background-color: rgb(13, 17, 23); border: 1px solid #30363d;} pre[class*=language-]{background: rgb(23 29 38)!important;} .border1-bottom { border-bottom: 0px solid rgb(35 134 54 / 67%); }'

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.textContent = `
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

// TinyMCE CSS
document.head.appendChild(document.createElement('style')).textContent = `
/* Forum Editor CSS */
.tox-toolbar__primary{
    background: 0!important;
}
.tox-toolbar-overlord{
    background: 0!important;
}
.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
    border-right: 1px solid #ffffff29!important;
}
.tox-statusbar{
    background: 0!important;
    border-top: 0!important;
}
.tox-sidebar-wrap{
    width: 99%!important;
    margin: auto!important;
    border-radius: 10px;
    overflow: hidden;
}
#editor_ifr{
    background: 0!important;
}`
if(document.querySelector('#replyform, #editor')){
    window.addEventListener('load', ()=> {
        editor = document.getElementsByClassName('tox-edit-area__iframe')[0].contentWindow.document
        editor.head.appendChild(editor.createElement('style')).innerHTML = 'body{background: #161b22;}'
    })
}

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}