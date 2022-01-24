// Theme Name: Github Light
// Theme Mode: Bright

// Navbar
if(document.getElementById('navigationbar')) {document.head.appendChild(document.createElement('style')).textContent = '#navigationbar{background: #24292e; color: #ffffffde;}'}

// Main
document.body.style.backgroundColor = '#f6f8fa'
document.querySelectorAll('.theme1, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = '#fff'; elm.style.border = '1px solid #eaecef'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #eaecef')
document.querySelectorAll('.prefix').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'})
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'; elm.style.setProperty('-moz-appearance', 'none')})
document.head.appendChild(document.createElement('style')).textContent = `.latestthreads{background: #f1f1f1 !important;}`
document.head.appendChild(document.createElement('style')).textContent = `.themebtn{
    border: 1px solid rgba(27,31,35,0.15);
    background-color: #fafbfc);
    transition: .2s all cubic-bezier(.3,0,.5,1);
    padding-top: 16px
    padding-bottom: 16px`
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).textContent = '#d_disp{background: 0!important;} .themebtn:hover, .themebtn:focus{background-color: rgb(243, 244, 246);}'
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(247 247 247)'; document.querySelector('#medias').style.border = '1px solid #eaecef'}

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.textContent = `
.menu{
    background: rgb(255, 255, 255)!important;
 }
 .dropmenu > div{
    border-bottom: 1.6px solid #d0d7de!important;
 }
 .navbtn:hover, .notification:hover{
    background: rgb(235, 235, 235);
 }
 .notification > div > a, .navbtn > a, .menu{
    color: black!important;
 }
 .notif-time{
    color: gray!important;
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
.tox-tbtn svg, .tox-tbtn{
    fill: black!important;
    color: black!important;
}`
if(document.querySelector('#replyform, #editor')){
    window.addEventListener('load', ()=> {
        editor = document.getElementsByClassName('tox-edit-area__iframe')[0].contentWindow.document
        editor.head.appendChild(editor.createElement('style')).innerHTML = 'body{background: #f6f8fa; color:black;}'
    })
}

// Etc
if(document.getElementById('CreditCard')){
    document.head.appendChild(document.createElement('style')).textContent = `*{color: black;}`
}

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}