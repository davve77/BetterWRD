// Theme Name: Github Dark
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) {document.head.appendChild(document.createElement('style')).textContent = '#navigationbar{background: rgb(22, 27, 34); color: #ffffffc2;}'}

// Main
document.body.style.backgroundColor = 'rgb(9, 12, 16)'
document.querySelectorAll('.theme1, .theme2, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = 'rgb(13, 17, 23)'; elm.style.border = '1px solid #30363d'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #30363d')
document.head.appendChild(document.createElement('style')).textContent = '.prefix, input, select{background: #161b22!important; color: white; border: 1px solid #30363d!important;}'
document.head.appendChild(document.createElement('style')).textContent = `.latestthreads{background: rgb(17 20 26) !important;}`
document.head.appendChild(document.createElement('style')).textContent = `.themebtn{
    border: 1px solid #30363d;
    background-color: rgb(13, 17, 23);
    transition: .2s all cubic-bezier(.3,0,.5,1);`
document.querySelectorAll('.btn, .button, .btn_newrelpy, #links a, .btnThreadControl, .pagetextbox, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).textContent = '.themebtn:hover, .themebtn:focus{background-color: rgb(48, 54, 61);}'
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(13, 17, 23)'; document.querySelector('#medias').style.border = '1px solid #30363d'}
notfound = document.getElementsByTagName('h1')[0]
if(notfound && notfound.textContent.includes('Error 404')) {document.getElementsByTagName('div')[0].style.background = 'none'}

// Etc
document.head.appendChild(document.createElement('style')).textContent = '#d_disp{background: 0!important;} .theme1{background-color: rgb(13, 17, 23); border: 1px solid rgb(48, 54, 61);} pre[class*=language-]{background: rgb(23 29 38)!important;} .border1-bottom { border-bottom: 1px solid rgb(48 54 61 / 46%); }'

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.textContent = `
.menu{
    background: rgb(33, 37, 43)!important;
 }
 .dropmenu > div{
    border-bottom: 1.6px solid rgb(100,100,100)!important;
 }
 .navbtn:hover, .notification:hover{
    background: rgb(48, 54, 61);
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
}
`
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