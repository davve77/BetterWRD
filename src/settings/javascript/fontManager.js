// BetterWRD Font Manager

const saveBtn = document.getElementById('saveFont')
const resetBtn = document.getElementById('resetFont')
const customFInput = document.getElementById('customFontTextbox')
const fontsDiv = document.querySelector('.fontsdiv')

fetch('https://betterwrd.vercel.app/bwrd/fonts.json').then((response)=>{return response.json()}).then((fonts) => {
    fonts.forEach(font => {
        fontName = font.name
        fontImport = font.import
        fontDiv = document.createElement('div')

        fontsDiv.appendChild(fontDiv)
        fontDiv.outerHTML = `
        <div name="${fontName}" import="${fontImport}" style="animation: fadein .5s;" class="fontdiv">
        <h1 style="font-family: ${fontName}; animation: fadeSlideLeft .35s;">${font.name == 'Roboto' ? 'Roboto (default)' : font.name}</h1>
        <p style="font-family: ${fontName}; animation: fadeSlideLeft .35s; animation-delay: .02s;" class="text1">${fontName}</p>
        <p style="font-family: ${fontName}; animation: fadeSlideLeft .35s; animation-delay: .04s;" class="text2">${fontName}</p>
        <p style="font-family: ${fontName}; animation: fadeSlideLeft .35s; animation-delay: .06s;" class="text3">${fontName}</p>
        <p style="font-family: ${fontName}; animation: fadeSlideLeft .35s; animation-delay: .08s;" class="text4">${fontName}</p>
        <p class="fonttext">Click to select this font</p>
        </div>
        `

        document.head.appendChild(document.createElement('style')).textContent = fontImport
    })
}).catch()

// Funcs
function resetFontBorder(){
    if(!document.querySelector('.selectedfont')) return
    document.querySelector('.selectedfont').classList.remove('selectedfont')
}
function loadCustomFont(fontUrl){
    customFInput.value = fontUrl

    // Reset Google Font Border
    resetFontBorder()
}
function saveCustomFont(fontUrl){
        if(fontUrl.replace(/\s+/g,'') == ''){
            showToast('Custom Font URL cannot be empty.')
            return
        }

        // Save
        chrome.storage.local.set({'font': 'custom', 'fontImport': fontUrl})

        // Reset Google Font Border
        resetFontBorder()

        // Toast
        showToast('Custom Font has been saved.')
}
function resetFont(){
    chrome.storage.local.set({'font': null, 'fontImport': null})
    customFInput.value = ''
    resetFontBorder()
    document.querySelector(`[name="Roboto"]`).classList.add('selectedfont')

    // Toast
    showToast('Font has been reset.')
}

saveBtn.addEventListener('click', ()=> {saveCustomFont(customFInput.value)})
resetBtn.addEventListener('click', ()=> {resetFont()})

setTimeout(()=> {
    document.querySelectorAll('.fontdiv').forEach(e => {

        // Select Google Font
        e.addEventListener('click', ()=> {
            // Save
            chrome.storage.local.set({'font': e.getAttribute('name'), 'fontImport': e.getAttribute('import')})

            // Add border
            resetFontBorder()
            e.classList.add('selectedfont')

            // Reset text box value
            customFInput.value = ''
        })

        // Click to select font Animation
        e.addEventListener('mouseenter', ()=> {
            e.lastElementChild.style.transform = 'none'
            e.lastElementChild.style.opacity = '1'
        })
        e.addEventListener('mouseleave', ()=> {
            e.lastElementChild.style.transform = 'translateY(30px)'
            e.lastElementChild.style.opacity = '0'
        })
    })

    // Load
    chrome.storage.local.get(['font','fontImport'], saved => {
        const isCustom = saved.font == 'custom'
        const isRoboto = saved.fontImport == 'none'

        if(!saved.font){
            document.querySelector(`[name="Roboto"]`).classList.add('selectedfont')
            return
        }

        if(isRoboto){
            document.querySelector(`[name="${saved.font}"]`).classList.add('selectedfont')
            return
        }
        
        if(isCustom){
            loadCustomFont(saved.fontImport)
            return
        }

        // Add border
        if(!document.querySelector(`[name="${saved.font}"]`)) return
        document.querySelector(`[name="${saved.font}"]`).classList.add('selectedfont')
    })
}, 500)