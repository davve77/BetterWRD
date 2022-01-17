// Theme Name: Midnight Gray
// Theme Mode: Dark


// CSS
const  midnightgray = document.createElement('style')
midnightgray.type = 'text/css'
midnightgray.innerHTML = `
body{
    background: #1e2228;
}

#navigationbar{
    background: #2d333b;
}

.theme1, .theme2, .forumcontainer, .thread_replierdata, .signature{
    background: #22272e;
}

.forumcontainer h2, .forumcontainer h1{
    border-bottom: 1px solid #37383c;
}

.prefix{
    background: rgb(52 57 64);
    border: 1px solid rgb(70 73 76);
    border-radius: 8px;
    color: white;
}

.signature{
    border-top: 1px solid #cccccc4d;
}

.latestthreads{
    background: rgb(40 45 52) !important
}

.theme1{
    background: #22272e;
}

.border1{
    border: 1px solid #37383c;
}

pre[class*=language-]{
    background: rgb(39 44 52)!important;
}

input, select{
    background: #373e47;
    color: white;
    border: 1px solid #373e47;
    -moz-appearance: none;
}

.themebtn{
    background: rgb(34, 39, 46);
    border: 1px solid #444c56!important;
    transition: .15s all cubic-bezier(.3,0,.5,1);
}
.themebtn:hover, .themebtn:focus{
    background: rgb(68, 76, 86);
    border: 1px solid rgb(118, 131, 144);
}

#medias{
    background: #22272e7d;
    border-top: 1px solid rgb(55, 62, 71);
}

#d_disp {
    display: block;
    background-color: #00000000;
    border: 1px solid #3a3a3a;
    border-radius: 10px;
    width: 90%;
    margin: auto;
}

footer{
    background: transparent!important;
}

.border1-left {
    border-left: 1px solid #37383c;
}

.border1-bottom {
    border-bottom: 1px solid #37383c;
}

.menu{
    background: #373e47!important;
}
.dropmenu > div{
    border-bottom: 1.6px solid rgb(100,100,100)!important;
}
.navbtn:hover, .notification:hover{
    background: rgb(68, 76, 86)!important;
}`
document.head.appendChild(midnightgray)


// JS
setTimeout(()=> {
    document.querySelectorAll('.btn, .button:not(li), #searchbar, #order, .btn_newrelpy, .btnDownload, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread').forEach(elm => {
        elm.classList.add('themebtn')
    })
}, 200)