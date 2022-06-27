// Theme Name: Bloom
// Theme Mode: Dark
// Credits: Fluent Svelte, Windows 11



/*

    * Theme CSS *

*/

const bloom = document.createElement('style')
bloom.id = 'bloom'
bloom.innerHTML = `

/* Main */

body{
    background-image: url(https://fluent-svelte.vercel.app/bloom-mica-dark.png);
    background-attachment: fixed;
    background-size: 170%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #191919;
    transition: .25s background-image;
    box-shadow: inset 0 0 0 100vmax var(--fds-card-background-secondary);
}
.theme1:not(footer, .btn, button, .menu, .btnmentionm, .userinfobg), .theme2, #navigationbar, button:not(.tox-tbtn){
    background: #ffffff0d;
    backdrop-filter: blur(60px) saturate(125%);
    backface-visibility: hidden;
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
    backface-visibility: hidden;
}
#navigationbar{
    border-bottom: 1px solid #4242429e!important;
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
    transition: .167s cubic-bezier(0,0,0,1)!important;
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
@media only screen and (max-width: 600px) {
    body{
        background-size: cover;
    }
}
.forumcontainer h2 {
    border-bottom: 1px solid #d3d3d333;
}
.border1{
    border: 1px solid #42424240;
}
.border1-bottom{
    border-bottom: 1px solid transparent;
}
footer{
    background: 0!important;
}
pre[class*=language-]{
    background: #ffffff0a!important;
}
.userinfobg{
    background: #36363638!important;
}
option{
    background: #2b2b2b!important;
}
.grecaptcha-badge{
    display: none!important;
}

/* Browsers that don't support "backdrop-filter" */

@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)){
    #navigationbar{
        background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.42) 100%)!important;
    }
    #quickProfileView, #quickThreadView{
        background: #25282f!important;
    }
    #navigationbar{
        border: none!important;
    }
    .alert-bwrd{
        background: #242424 !important
    }
}

/* Forum Editor */

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

document.head.appendChild(bloom)



/*

    * Custom Wallpapers *

*/

// Set Chosen Wallpaper
function setWallpaper(){
    switch(localStorage.getItem('bwrd_bloomwallpaper')){
        case 'bloom':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/bloom.png)'
            break
        case 'glow1':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow1.jpg)'
            break
        case 'glow2':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow2.png)'
            break
        case 'glow3':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow3.png)'
            break
        case 'glow4':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow4.png)'
            break
        case 'capturedmotion1':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion1.png)'
            break
        case 'capturedmotion2':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion2.png)'
            break
        case 'capturedmotion3':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion3.png)'
            break
        case 'capturedmotion4':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion4.png)'
            break
        case 'macosmonterey':
            document.body.style.backgroundImage = 'url(https://betterwrd.vercel.app/bwrd/bloom/wallpapers/macosmonterey.png)'
    }
}
setWallpaper()


// Select wallpaper
if(location.pathname.match(/manager\/settings/)){
    let main = document.querySelector('main')
    let choosewallpaper = document.createElement('div')
    main.appendChild(choosewallpaper)
    main.insertBefore(choosewallpaper, document.querySelectorAll('.manager_container')[1])
    choosewallpaper.innerHTML = `
    <div class="manager_container gapchildren theme1 round border1">
	<h2>Bloom Theme</h2>
	<p>Choose a wallpaper.</p>
	<div class="wallpapers" style="
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
		<div wallpaper="bloom">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/bloom.png">
			<h3>Bloom</h3>
		</div>
		<div wallpaper="glow1">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow1.jpg">
			<h3>Glow 1</h3>
		</div>
		<div wallpaper="glow2">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow2.png">
			<h3>Glow 2</h3>
		</div>
		<div wallpaper="glow3">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow3.png">
			<h3>Glow 3</h3>
		</div>
	</div>
	<div class="showmore padding round" style=" background: rgb(255 255 255 / 5%); border: 1px solid rgba(255, 255, 255, 0.07); cursor: pointer; "><span style=" display: flex; align-items: center; justify-content: center; gap: 5px;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg> Show more (about 6)</span>
	</div>
    </div>
    <style>div[wallpaper]{display: flex; flex-direction: column; gap: 10px; padding: 5px; border-radius: 10px; cursor: pointer;} div[wallpaper] > img{width: 300px; height: 180px; border-radius: 10px;}</style>
    <br>`


    // Wallpepr on click
    document.body.addEventListener('click', (e)=> {
        if(e.target.parentElement && e.target.parentElement.getAttribute('wallpaper')){
            localStorage.setItem('bwrd_bloomwallpaper', e.target.parentElement.getAttribute('wallpaper'))
            setWallpaper()
        }
    })


    // Show more wallpapers
    document.querySelector('.showmore').addEventListener('click', (e)=> {
        e.currentTarget.remove()
        document.querySelector('.wallpapers').innerHTML += `
		<div wallpaper="glow4">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow4.png">
			<h3>Glow 4</h3>
		</div>
		<div wallpaper="capturedmotion1">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion1.png">
			<h3>Captured Motion 1</h3>
		</div>
		<div wallpaper="capturedmotion2">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion2.png">
			<h3>Captured Motion 2</h3>
		</div>
		<div wallpaper="capturedmotion3">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion3.png">
			<h3>Captured Motion 3</h3>
		</div>
		<div wallpaper="capturedmotion4">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion4.png">
			<h3>Captured Motion 4</h3>
		</div>
		<div wallpaper="macosmonterey">
			<img src="https://betterwrd.vercel.app/bwrd/bloom/wallpapers/macosmonterey.png">
			<h3>macOS Monterey</h3>
		</div>
        `
    })


    // Preload hidden wallpapers
    const preloadimages = [
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/glow4.png',
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion1.png',
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion2.png',
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion3.png',
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/capturedmotion4.png',
        'https://betterwrd.vercel.app/bwrd/bloom/wallpapers/macosmonterey.png'
    ]
    var preloadedimages = []
    for(var i = 0; i < preloadimages.length; i++){
        preloadedimages[i] = new Image()
        preloadedimages[i].src = preloadimages[i]
    }
}