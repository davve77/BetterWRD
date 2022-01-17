// Theme Name: Bloom
// Theme Mode: Dark
// Credits: Fluent Svelte, Windows 11

const bloom = document.createElement('style')
bloom.id = 'bloom'
bloom.innerHTML = `

body{
    background-image: url(https://fluent-svelte.vercel.app/bloom-mica-dark.png);
    background-attachment: fixed;
    background-size: 170%;
    background-position: 50%;
    background-repeat: no-repeat;
    box-shadow: inset 0 0 0 100vmax var(--fds-card-background-secondary);
}
.theme1:not(footer, .btn, button, .menu, .btnmentionm, .userinfobg), .theme2, #navigationbar, button:not(.tox-tbtn){
    background: #ffffff0d!important;
    backdrop-filter: blur(60px) saturate(125%);
}
.prefix, #medias, input, .release-card-button{
    background: #ffffff11!important;
}
.btn, .button:not(li), button:not(.tox-tbtn), .threadbtn, .btnmention{
    background-color: hsla(0, 0%, 100%, .061)!important;
    background-clip: padding-box;
    border: 1px solid rgba(255, 255, 255, 0.07)!important;
    border-top: 1px solid rgba(255, 255, 255, 0.094)!important;
    color: white;
    transition: .12s all;
}
.btn:hover, .button:not(li):hover, button:hover, .threadbtn:hover .release-card-button:hover, .btnmention:hover{
    background-color: rgba(255, 255, 255, 0.095)!important;
}
.thread_replierdata, .signature{
    background: none!important;
    backdrop-filter: none!important;
}
.signature{
    border-top: 1px solid rgb(78, 78, 78);
}
.navItem{
    border-radius: 6px;
    transition: .13s all!important;
    transform: scale(1)!important;
}
.navItem:hover{
    background: #ffffff0d!important;
}
.categoryGroup h2 {
    background: transparent!important;
}
.border1{
    border: 1px solid #0000001a;
}
.border1-bottom{
    border-bottom: 1px solid transparent;
}
footer{
    background: 0!important;
}
.userinfobg{
    background: #36363638!important;
}
.grecaptcha-badge{
    display: none!important;
}
@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)){
    #navigationbar{
        background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.42) 100%)!important;
    }
    #quickProfileView, #quickThreadView{
        background: #25282f!important;
    }
}
`

document.head.appendChild(bloom)