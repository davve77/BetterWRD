// BetterWRD Wallpaper Manager

const wallpaperURL  = document.getElementById('wallpaperURL'),
      preview       = document.getElementById('preview'),
      transpStuff   = document.getElementById('transpStuff'),
      repeatBg      = document.getElementById('repeatBg'),
      fixbgImg      = document.getElementById('fixbgImg'),
      setbgimg      = document.getElementById('setbgimg'),
      resetbgimg    = document.getElementById('resetbgimg'),
      blurBgImg     = document.getElementById('blurBgImg'),
      imguploadsrc  = document.getElementById('imguploadsrc'),
      uploadbtn     = document.getElementById('uploadbtn'),
      blankimage    = 'https://media.discordapp.net/attachments/800294579856605204/833375088631873536/none.png'

// Load settings
chrome.storage.local.get(['bgimgUrl','transpStuff','repeatBg','fixbgImg','blurBgImg'], saved => {
    if(saved.bgimgUrl) {
        preview.src = saved.bgimgUrl
        wallpaperURL.value = saved.bgimgUrl

        if(saved.blurBgImg) {preview.style.filter = 'blur(8px)'}
    }

    transpStuff.checked = saved.transpStuff
    repeatBg.checked = saved.repeatBg
    fixbgImg.checked = saved.fixbgImg
    blurBgImg.checked = saved.blurBgImg
})

// Save settings
setbgimg.addEventListener('click', ()=>{
    if(wallpaperURL.value == ''){
        preview.style.filter = 'blur(0px)'
        showToast('Couldn\'t load that image URL.')
    }
    else{
        chrome.storage.local.set({'bgimgUrl': wallpaperURL.value})
        showToast('New wallpaper set.')
    }
})

document.addEventListener('click', e => {
    switch(e.target){
        case transpStuff:
            chrome.storage.local.set({'transpStuff': transpStuff.checked})
            break
        case repeatBg:
            chrome.storage.local.set({'repeatBg': repeatBg.checked})
            break
        case fixbgImg:
            chrome.storage.local.set({'fixbgImg': fixbgImg.checked})
            break
        case blurBgImg:
            chrome.storage.local.set({'blurBgImg': blurBgImg.checked})
    }
})

// Show Preview
wallpaperURL.addEventListener('keyup', ()=> {
    preview.src = wallpaperURL.value

    setTimeout(()=> {
        if(preview.src != blankimage){
            if(blurBgImg.checked) {preview.style.filter = 'blur(8px)'}
            else {preview.style.filter = 'blur(0px)'}
        }
    }, 1100)
})

document.addEventListener('click', (e)=> {
    switch(e.target){
        case blurBgImg:
            if(blurBgImg.checked) {preview.style.filter = 'blur(8px)'}
            else {preview.style.filter = 'blur(0px)'}
    }
})

// Reset settings
resetbgimg.addEventListener('click', ()=>{
    chrome.storage.local.set({'bgimgUrl': null})
    wallpaperURL.value = ''
    preview.src = blankimage

    showToast('Wallpaper has been reset.')
})

// Upload Image to Imgur
uploadbtn.addEventListener('click', ()=> {
    imguploadsrc.click()
})

imguploadsrc.addEventListener('change', e => {
    if(e.target.files.length != 0){
        uploadbtn.firstChild.style.animation = '.4s uploadbtnanim cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        showToast('Uploading image to Imgur...')
        formdata = new FormData()
        formdata.append('image', e.target.files[0])
        fetch('https://api.imgur.com/3/image/', {
            method: "POST",
            headers: {Authorization: 'Client-ID 6a5400948b3b376'},
            body: formdata
        }).then(data => data.json()).then(data => {
            try{

                wallpaperURL.value = data.data.link
                preview.src = data.data.link
                uploadbtn.firstChild.style.animation = 'none'

                if(blurBgImg.checked) {preview.style.filter = 'blur(8px)'}
                else {preview.style.filter = 'blur(0px)'}

            }catch{}
        }).catch(()=> {showToast('An error occurred.')});
    }
})

// Image doesn't exist
preview.addEventListener('error', ()=> {
    preview.src = blankimage
    preview.style.filter = 'blur(0px)'
})

// Hide wallpaper blur for Firefox
if(util.detectFirefox()){
    blurBgImg.parentElement.style.display = 'none'
}