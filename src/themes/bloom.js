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
    transition: .25s background-image;
    box-shadow: inset 0 0 0 100vmax var(--fds-card-background-secondary);
}
.theme1:not(footer, .btn, button, .menu, .btnmentionm, .userinfobg), .theme2, #navigationbar, button:not(.tox-tbtn){
    background: #ffffff0d!important;
    backdrop-filter: blur(60px) saturate(125%);
}
.prefix, #medias, input, .release-card-button{
    background: #ffffff11!important;
}
.btn, .button:not(li), button:not(.tox-tbtn), .threadbtn, .btnmention, .btnDownload, .downloadbtn, .btn_newrelpy{
    background-color: hsla(0, 0%, 100%, .061)!important;
    background-clip: padding-box;
    border: 1px solid rgba(255, 255, 255, 0.07)!important;
    border-top: 1px solid rgba(255, 255, 255, 0.094)!important;
    color: white;
    transition: .12s all;
}
.btn:hover, .button:not(li):hover, button:hover, .threadbtn:hover .release-card-button:hover, .btnmention:hover, .btnDownload:hover, .downloadbtn:hover, .btn_newrelpy:hover{
    background-color: rgba(255, 255, 255, 0.095)!important;
}
.thread_replierdata, .signature{
    background: none!important;
    backdrop-filter: none!important;
}
.signature{
    border-top: 1px solid rgb(78, 78, 78);
}
.nonVisibleMenu{
    display: none!important;
}
.emoteMenu{
    transition: none!important;
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
#d_disp{
    background: 0!important;
}
.forumcontainer h2 {
    border-bottom: 1px solid #d3d3d333;
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

document.head.appendChild(bloom)




// Custom Wallpaper //


// Set Chosen Wallpaper
function setWallpaper(){
    switch(localStorage.getItem('bwrd_bloomwallpaper')){
        case 'bloom':
            document.body.style.backgroundImage = 'url(https://fluent-svelte.vercel.app/bloom-mica-dark.png)'
            break;
        case 'glowdark':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/glowdark.jpg)'
            break;
        case 'glow':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/glow.jpg)'
            break;
        case 'capturedmotion':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/capturedmotion.jpg)'
    }
}
setWallpaper()


// Choose wallpaper
if(location.pathname.match(/manager\/settings/)){
    main = document.querySelector('main')
    choosewallpaper = document.createElement('div')
    main.appendChild(choosewallpaper)
    main.insertBefore(choosewallpaper, document.querySelectorAll('.manager_container')[1])
    choosewallpaper.innerHTML = `
    <div class="manager_container gapchildren theme1 round border1">
    <h2>Bloom Theme</h2>
    <p>Choose a wallpaper.</p>
    <div style="
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 10px;
        border-radius: 10px;
        overflow: hidden;
        gap: 10px;
        background: rgb(255 255 255 / 5%);
        border: 1px solid rgba(255, 255, 255, 0.07);
        ">
        <div onclick="localStorage.setItem('bwrd_bloomwallpaper', 'bloom'); setWallpaper()" style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
            border-radius: 10px;
            cursor: pointer;
            ">
            <img src="https://fluent-svelte.vercel.app/bloom-mica-dark.png" style="
                width: 300px;
                height: 180px;
                border-radius: 10px;
                ">
            <h3>Bloom</h3>
        </div>
        <div onclick="localStorage.setItem('bwrd_bloomwallpaper', 'glowdark'); setWallpaper()" style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
            border-radius: 10px;
            cursor: pointer;
            ">
            <img src="https://betterwrd.vercel.app/bwrd/bloom/glowdark.jpg" style="
                width: 300px;
                height: 180px;
                border-radius: 10px;
                ">
            <h3>Glow (Darker)</h3>
        </div>
        <div onclick="localStorage.setItem('bwrd_bloomwallpaper', 'glow'); setWallpaper()" style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
            border-radius: 10px;
            cursor: pointer;
            ">
            <img src="https://betterwrd.vercel.app/bwrd/bloom/glow.jpg" style="
                width: 300px;
                height: 180px;
                border-radius: 10px;
                ">
            <h3>Glow</h3>
        </div>
        <div onclick="localStorage.setItem('bwrd_bloomwallpaper', 'capturedmotion'); setWallpaper()" style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 5px;
            border-radius: 10px;
            cursor: pointer;
            ">
            <img src="https://betterwrd.vercel.app/bwrd/bloom/capturedmotion.jpg" style="
                width: 300px;
                height: 180px;
                border-radius: 10px;
                ">
            <h3>Captured Motion</h3>
        </div>
    </div>
    </div>
    <br>`


    // Preload wallpapers
    const preloadimages = [
        "https://fluent-svelte.vercel.app/bloom-mica-dark.png",
        "https://betterwrd.vercel.app/bwrd/bloom/glowdark.jpg",
        "https://betterwrd.vercel.app/bwrd/bloom/glow.jpg",
        "https://betterwrd.vercel.app/bwrd/bloom/capturedmotion.jpg"
    ]
    var preloadedimages = []

    for (var i = 0; i < preloadimages.length; i++){
        preloadedimages[i] = new Image()
        preloadedimages[i].src = preloadimages[i]
    }
}