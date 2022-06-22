// Name: Better Change Log
// Desc: Replaces the off-site change log with an on-site one


if(document.querySelector('.footerlinks [title="Change Log"]')){

    // Consts
    var clFetched = false
    const footerLinks = document.querySelector('.footerlinks')
    const changeLogLink = footerLinks.querySelector('[title="Change Log"]')
    const betterChangelogHTML = `
    <div id="better-changelog" style="transition: 250ms cubic-Bezier(0.85, 0, 0, 1);z-index: 999;position: fixed;top: 50%;left: 15px;transform: translateY(-50%);height: calc(100% - 35px);width: 440px;background: #cccccc24;backdrop-filter: blur(90px);border-radius: 12px;display: flex;flex-direction: column;padding: 0 5px 0 25px;box-shadow: rgb(0 0 0 / 10%) 0px 10px 50px; margin-left: -455px;">
    <div style="padding-top: 40px;padding-bottom: 20px;">
        <h3 style="color: #b0b0b0;font-size: 16px;font-weight: 100;">WeAreDevs</h3>
        <h1 style="font-size: 26px;font-weight: 400;">Change Log</h1>
    </div>
    <div id="clContentDiv" style="overflow: hidden;white-space: pre-line;min-width: 100%; padding-right: 20px; display: flex;">
        <p id="clContent" style="opacity: 0; transition: opacity 200ms linear; transition-delay: 200ms; margin-top: 15px;">
            <div id="clLoading" style="display: flex;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><div class="bettercl-loading"></div></div>
        </p>
    </div>
    <div id="clHide" style="position: absolute;top: 7px;right: 7px;padding: 10px;width: 30px;height: 22px;display: flex;align-items: center;justify-content: center;border-radius: 6px;transition: 167ms cubic-Bezier(0,0,0,1);">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512,584.5L87.5,1009C77.5,1019 65.5,1024 51.5,1024C36.8333,1024 24.5833,1019.08 14.75,1009.25C4.91667,999.417 0,987.167 0,972.5C0,958.5 5,946.5 15,936.5L439.5,512L15,87.5C5,77.5 0,65.3334 0,51C0,44 1.33333,37.3334 4,31C6.66667,24.6667 10.3333,19.25 15,14.75C19.6667,10.25 25.1667,6.66669 31.5,4C37.8333,1.33337 44.5,0 51.5,0C65.5,0 77.5,5 87.5,15L512,439.5L936.5,15C946.5,5 958.667,0 973,0C980,0 986.583,1.33337 992.75,4C998.917,6.66669 1004.33,10.3334 1009,15C1013.67,19.6667 1017.33,25.0834 1020,31.25C1022.67,37.4167 1024,44 1024,51C1024,65.3334 1019,77.5 1009,87.5L584.5,512L1009,936.5C1019,946.5 1024,958.5 1024,972.5C1024,979.5 1022.67,986.167 1020,992.5C1017.33,998.833 1013.75,1004.33 1009.25,1009C1004.75,1013.67 999.333,1017.33 993,1020C986.667,1022.67 980,1024 973,1024C958.667,1024 946.5,1019 936.5,1009Z"></path>
        </svg>
    </div> <style> #clContentDiv:hover{overflow: auto!important; overflow: overlay!important;} #clHide:hover{background: #ffffff12;} #clHide:active{opacity: .6;} #clContentDiv::-webkit-scrollbar{width: 5px;} .bettercl-loading{height: 30px; width: 30px; opacity: .6; display: inline-block; border: 3px solid; border-radius: 50%; border-top-color: transparent; animation: bettercl-loading-anim 1s linear infinite;} @keyframes bettercl-loading-anim { 0% {transform: rotate(0);} 100% {transform: rotate(360deg);} } @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)){ #better-changelog{ background: rgb(49, 49, 49)!important; } } </style>
    </div>`

    // Create div
    const betterChangelogDiv = util.addElement('div', document.body, betterChangelogHTML)
    const clContent = betterChangelogDiv.querySelector('#clContent')
    const clLoading = betterChangelogDiv.querySelector('#clLoading')

    // Functions
    function showCl()   { betterChangelogDiv.style['margin-left'] = '0px';     clContent.style.opacity = '1' }
    function hideCl()   { betterChangelogDiv.style['margin-left'] = '-455px';  clContent.style.opacity = '0' }
    function isClOpen() { return parseFloat(getComputedStyle(betterChangelogDiv)['margin-left'], 10) > -455 }

    // Click changelog link
    changeLogLink.addEventListener('click', e => {
        e.preventDefault()

        if(!isClOpen()){
            getCl()
            showCl()
        }
        else hideCl()
    })

    // Close better changelog
    betterChangelogDiv.querySelector('#clHide').addEventListener('click', hideCl)

    // Get content from pastebin
    async function getCl(){

        if(clFetched) return
        clFetched = true

        let fetchPb     = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://pastebin.com/raw/TGz5N9Xa')}`).then(e => e.text()),
            pbContent   = JSON.parse(fetchPb)['contents']

        clContent.textContent = pbContent.substring(pbContent.indexOf('##'))
        clLoading.style.display = 'none'
    }
}