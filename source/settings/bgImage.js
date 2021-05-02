// For the Background Image page

var bgimageurl = document.getElementById('bgimageUrl')
preview = document.getElementById('preview')
transpStuff = document.getElementById('transpStuff')
setbgimg = document.getElementById('setbgimg')
resetbgimg = document.getElementById('resetbgimg')

// Load settings
chrome.storage.local.get(['bgimgUrl','transpStuff'], function(saved){
    if(saved.bgimgUrl){
        preview.src = saved.bgimgUrl
        bgimageurl.value = saved.bgimgUrl
    }
    transpStuff.checked = saved.transpStuff
})

// Save settings
setbgimg.addEventListener('mouseup', ()=>{
    if(bgimageurl.value == '') return
    chrome.storage.local.set({'bgimgUrl': bgimageurl.value})

    document.getElementById('toast').className = 'show'
    setTimeout(()=>{document.getElementById('toast').classList.remove('show')}, 2000)
})

// Reset settings
resetbgimg.addEventListener('mouseup', ()=>{
    bgimageurl.value = ''
    preview.src = 'https://media.discordapp.net/attachments/800294579856605204/833375088631873536/none.png'
    chrome.storage.local.set({'bgimgUrl': null})

    document.getElementById('toast').className = 'show'
    setTimeout(()=>{document.getElementById('toast').classList.remove('show')}, 2000)
})

// Other
bgimageurl.addEventListener('change', ()=> {preview.src = bgimageurl.value})
transpStuff.addEventListener('click', ()=> {chrome.storage.local.set({'transpStuff': transpStuff.checked})})
preview.addEventListener('error', ()=>{
    bgimageurl.value = ''
    preview.src = 'https://media.discordapp.net/attachments/800294579856605204/831632044479086642/Can_not_find_that_image.png'
})