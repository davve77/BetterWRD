// Theme Name: Discord Light
// Theme Mode: Bright
// By Shade_0122

// CSS
document.head.appendChild(document.createElement('style')).textContent = `
#navigationbar {
    box-shadow: 0 0 5px 0 #5165F6;
}
.menu{
    background: rgb(245, 245, 245)!important;
    color: black;
}
.dropmenu > div{
    border-bottom: 1.6px solid #5165F6!important;
}
.navbtn, .notification{
    border: 1px solid #5164f600;
}
.navbtn:hover, .notification:hover{
    background: rgb(223, 223, 223);
}
.notif-time{
    color: rgb(99, 99, 99)!important;
}
.notification > div > a{
    color: black;
}
.navbtn > a{
    color: rgb(10, 10, 10)!important;
}
.signature{
    border-top: 1px solid #5165F6;
}
.forumcontainer h2{
    border-bottom: 1px solid #5165F6;
}
.activitycard{
    border-radius: 16px;
    border: 1px solid #5165F6;
}
.themebtn{
    transition: .3s all;
    border: 1px solid #5165F6;
}
.themebtn:hover{
    background: #cacaca;
}
.pagetextbox{
    border: 1px solid #5165F6;
    color: black;
}
.pagetextbox::placeholder{
    color: black;
}
:not(pre)>code[class*=language-], pre[class*=language-]{
    border: 1px solid #5165F6;
}
.searchbarcontainer *{
    border: 1px solid #5165F6;
}
#order{
    border: 1px solid #5165F6;
}
body {
    background-color: #ffffff!important;
    color: rgb(0, 0, 0)!important;
}
.border1 {
    border: 1px solid #5165F6;
}
.theme1 {
    background-color: #E3E5E8;
}
.navHeader_dropmenu>div {
    z-index: 1;
    display: none;
    position: absolute;
    right: 0;
    background-color: #5165F6;
    width: 300px;
    padding: 12px;
    margin-top: 5px;
    box-shadow: 0 0 8px 0 #ffffff;
}
.theme2 {
    background-color: #F2F3F5;
}
.release-card-button {
    margin-top: -8px;
    margin-left: 3px;
    padding: 5px 12px;
    background-color: #5165F6;
    color: #fff;
}
.downloadTitle {
    font-size: 16px;
    position: absolute;
    text-align: center;
    background-color: rgb(81 101 246 / 38%);
    color: #fff;
    width: 100%;
    padding: inherit;
    bottom: 0px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
}
.btnDownload {
    padding: 12px;
    background-color: #5165F6;
    color: #fff;
    min-width: 190px;
    text-align: center;
    margin: auto;
    position: relative;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    justify-content: center;
}
#medias {
    background-color: #5165F6;
    text-align: right;
    padding-left: 180px;
}
.promo-btn {
    display: inline-flex;
    width: 120px;
    border: 1px solid #5165F6;
    padding: 5px;
    text-align: center;
    border-radius: 4px;
}
.prefix {
    font-size: 15px;
    text-transform: capitalize;
    margin-right: 1px;
    border-radius: 3px;
    background-color: #5165F6;
    color: white!important;
    display: inline-block;
    padding: 2px 3.5px 2px 3.5px;
    text-align: center;
    max-width: 300px;
}
#navigationbar{
   color: #ffffffde;
}
#d_disp{
   background: 0!important;
}
.latestthreads{
   background: #f1f1f1 !important;
}


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

// TinyMCE CSS
if(document.querySelector('#replyform, #editor')){
    window.addEventListener('load', ()=> {
        editor = document.getElementsByClassName('tox-edit-area__iframe')[0].contentWindow.document
        editor.head.appendChild(editor.createElement('style')).innerHTML = 'body{background: white; color: black!important;}'
    })
}

// JS
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread, .btnDownload').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
if(document.getElementById('d_disp')){
    document.getElementById('d_disp').style.background = '#fff'
}
if(document.getElementById('navigationbar')){
    document.getElementById('navigationbar').style.background = '#5165F6'
}
if(document.getElementById('CreditCard')){
    document.querySelector('img').src = 'https://cdn.discordapp.com/attachments/880755872781959189/880755892893671424/Discord-Logo.png'

    document.head.appendChild(document.createElement('style')).textContent = `*{color: black;}`
}