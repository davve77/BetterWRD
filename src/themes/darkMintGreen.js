// Theme Name: Dark Forest Green
// Theme Mode: Dark

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = 'rgb(37, 51, 61)'

// Main
document.body.style.backgroundColor = 'rgb(37, 47, 55)'
document.querySelectorAll('.theme1, .theme2, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = 'rgb(37, 51, 61)'})
document.querySelectorAll('.signature').forEach(elm => elm.style.borderTop = '1px solid #cccccc4a')
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid rgb(37, 47, 55)')
document.querySelectorAll('input, ::placeholder, .prefix, select').forEach(elm => {elm.style.backgroundColor = 'rgb(35, 140, 99)'; elm.style.color = 'white'})
document.head.appendChild(document.createElement('style')).innerHTML = `.themebtn{
    background-color: rgb(45, 150, 109);
    transition: .27s all;`
document.querySelectorAll('.btn, .button, .btn_newrelpy, #links a, .btnThreadControl, .pagetextbox, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
document.head.appendChild(document.createElement('style')).innerHTML = '.themebtn:hover, .themebtn:focus{background-color: rgb(65, 170, 129);}'
document.head.appendChild(document.createElement('style')).innerHTML = '.pagetextbox::placeholder{color: rgb(210,210,210);}'
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(37, 51, 61)'; document.querySelector('#medias').style.border = '1px solid #30363d'}
document.head.appendChild(document.createElement('style')).innerHTML = `.latestthreads{background: rgb(35 48 56) !important;}`

// Etc
document.head.appendChild(document.createElement('style')).innerHTML = '.border1-bottom { border-bottom: 1px solid rgb(45 150 109 / 48%); } pre[class*=language-]{background: rgb(45 60 70)!important;} .theme1{background-color: rgb(37, 51, 61);} .border1{border: 1px solid rgb(45 150 109 / 48%);} input{border: 1px solid rgb(45 150 109 / 48%);}'

// Dropmenus
dm = document.createElement('style')
dm.type = 'text/css'
dm.innerHTML = `
.menu{
    background: rgb(37, 51, 61)!important;
 }
 .dropmenu > div{
    border-bottom: 1.6px solid rgb(45, 150, 109)!important;
 }
 .navbtn, .notification{
     border: 1px solid transparent;
 }
 .navbtn:hover, .notification:hover{
    background: rgb(45, 150, 109);
    border: 1px solid rgb(45, 150, 109);
 }
`
document.head.appendChild(dm)

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}

// Scroll for chromium
document.head.appendChild(document.createElement('style')).innerHTML = '::-webkit-scrollbar{width: 5px;} ::-webkit-scrollbar-track{background: transparent;} ::-webkit-scrollbar-thumb{background: rgb(45, 150, 109);}'