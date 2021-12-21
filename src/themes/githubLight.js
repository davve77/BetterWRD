// Theme Name: Github Light
// Theme Mode: Bright

// Navbar
if(document.getElementById('navigationbar')) {document.head.appendChild(document.createElement('style')).innerHTML = '#navigationbar{background: #24292e; color: #ffffffde;}'}

// Main
document.body.style.backgroundColor = '#f6f8fa'
document.querySelectorAll('.theme1, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = '#fff'; elm.style.border = '1px solid #eaecef'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #eaecef')
document.querySelectorAll('.prefix').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'})
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'; elm.style.setProperty('-moz-appearance', 'none')})
document.head.appendChild(document.createElement('style')).innerHTML = `.latestthreads{background: #f1f1f1 !important;}`
document.head.appendChild(document.createElement('style')).innerHTML = `.themebtn{
    border: 1px solid rgba(27,31,35,0.15);
    background-color: #fafbfc);
    transition: .2s all cubic-bezier(.3,0,.5,1);
    padding-top: 16px
    padding-bottom: 16px`
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).innerHTML = '.themebtn:hover, .themebtn:focus{background-color: rgb(243, 244, 246);}'
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(247 247 247)'; document.querySelector('#medias').style.border = '1px solid #eaecef'}

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.innerHTML = `
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

// Etc
if(document.getElementById('CreditCard')){
    document.head.appendChild(document.createElement('style')).innerHTML = `*{color: black;}`
}

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}