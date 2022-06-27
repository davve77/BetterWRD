// Name: Set Wallpaper
// Desc: Sets the wallpaper and applies its settings

let body = document.body

chrome.storage.local.get(['bgimgUrl','transpStuff','repeatBg','fixbgImg','blurBgImg'], saved => {

    if(!saved.bgimgUrl) return
    if(util.isOnLoadingPage()) return

    // Set wallpaper
    body.style.background = `url(${saved.bgimgUrl})`

    // Make UI transparent
    function transparentUI(){
        util.addRule(`
        .theme1, .theme2, #navigationbar {
            background: rgb(35 37 39 / 50%)!important;
        }`)
    }

    // Wallpaper Settings
    Object.assign(body.style, {
        backgroundRepeat:       saved.repeatBg ? 'repeat' : 'no-repeat',
        backgroundAttachment:   saved.fixbgImg ? 'fixed' : 'scroll',
        backdropFilter:         saved.blurBgImg ? 'blur(8px)' : 'none'
    })
    if(saved.transpStuff) transparentUI()
})