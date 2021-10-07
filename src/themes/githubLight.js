// Theme Name: Github Light
// Theme Mode: Bright

// Navbar
if(document.getElementById('navigationbar')) document.getElementById('navigationbar').style.background = '#24292e'

// Main
document.body.style.backgroundColor = '#f6f8fa'
document.querySelectorAll('.theme1, .thread_replierdata, .signature').forEach(elm => {elm.style.backgroundColor = '#fff'; elm.style.border = '1px solid #eaecef'})
document.querySelectorAll('.forumcontainer h2, .forumcontainer h1').forEach(elm => elm.style.borderBottom = '1px solid #eaecef')
document.querySelectorAll('.prefix').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'})
document.querySelectorAll('input, select').forEach(elm => {elm.style.backgroundColor = '#f6f8fa'; elm.style.border = '1px solid #eaecef'; elm.style.color = 'black'; elm.style.setProperty('-moz-appearance', 'none')})
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
if(document.querySelector('#medias')) {document.querySelector('#medias').style.backgroundColor = 'rgb(13, 17, 23)'; document.querySelector('#medias').style.border = '1px solid #eaecef'}

// Footer
if(document.querySelector('footer')){
    document.querySelector('footer').style.backgroundColor = 'rgb(0 0 0 / 0%)'
}

// Make Light
if(document.getElementById('themecss')){
    document.getElementById('themecss').href = '/css/themes/bright.css'
}
while(document.documentElement.style.colorScheme != 'light') {document.documentElement.style.colorScheme = 'light'}
if(location.pathname.includes('guidelines') || location.pathname.includes('privacy') || location.pathname.includes('terms')) {document.body.style.color = 'black'}