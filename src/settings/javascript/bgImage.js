// For the Background Image page

var bgimageurl = document.getElementById('bgimageUrl')
preview = document.getElementById('preview')
transpStuff = document.getElementById('transpStuff')
repeatBg = document.getElementById('repeatBg')
fixbgImg = document.getElementById('fixbgImg')
setbgimg = document.getElementById('setbgimg')
resetbgimg = document.getElementById('resetbgimg')
blurBgImg = document.getElementById('blurBgImg')

// Load settings
chrome.storage.local.get(['bgimgUrl','transpStuff','repeatBg','fixbgImg','blurBgImg'], saved => {
    if(saved.bgimgUrl){
        preview.src = saved.bgimgUrl
        bgimageurl.value = saved.bgimgUrl
    }
    if(saved.blurBgImg){
        preview.style.filter = 'blur(8px)'
    }
    transpStuff.checked = saved.transpStuff
    repeatBg.checked = saved.repeatBg
    fixbgImg.checked = saved.fixbgImg
    blurBgImg.checked = saved.blurBgImg
})

// Save settings
setbgimg.addEventListener('click', ()=>{
    if(bgimageurl.value == '') return
    chrome.storage.local.set({'bgimgUrl': bgimageurl.value})

    document.getElementById('toast').className = 'show'
    setTimeout(()=>{document.getElementById('toast').classList.remove('show')}, 2000)
})

document.addEventListener('click', e => {
    switch(e.target){
        case transpStuff:
            chrome.storage.local.set({'transpStuff': transpStuff.checked})
            break;

        case repeatBg:
            chrome.storage.local.set({'repeatBg': repeatBg.checked})
            break;

        case fixbgImg:
            chrome.storage.local.set({'fixbgImg': fixbgImg.checked})
            break;

        case blurBgImg:
            chrome.storage.local.set({'blurBgImg': blurBgImg.checked})
    }
})

// Reset settings
resetbgimg.addEventListener('click', ()=>{
    bgimageurl.value = ''
    preview.src = 'https://media.discordapp.net/attachments/800294579856605204/833375088631873536/none.png'
    chrome.storage.local.set({'bgimgUrl': null})

    document.getElementById('toast').className = 'show'
    setTimeout(()=>{document.getElementById('toast').classList.remove('show')}, 2000)
})

// Other
bgimageurl.addEventListener('change', ()=> {preview.src = bgimageurl.value})
preview.addEventListener('error', ()=>{
    bgimageurl.value = ''
    preview.src = 'https://media.discordapp.net/attachments/800294579856605204/831632044479086642/Can_not_find_that_image.png'
})
blurBgImg.addEventListener('click', ()=> {
    if(blurBgImg.checked) {preview.style.filter = 'blur(8px)'}
    else {preview.style.removeProperty('filter')}
})