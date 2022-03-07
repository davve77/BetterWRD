// Name: Set Theme
// Desc: Sets the theme you chose from BetterWRD on WRD

const pageFooter = document.querySelector('footer')
const openicon = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" style=" margin-left: 5px; vertical-align: text-top; " fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>`
var themeURL
Array.from(document.querySelectorAll('[type="text/css"]')).filter((item) => {
    if(item.href.includes('night')) {themeURL = item}
})

function setDark(){
    if(location.pathname.match(/(guidelines|privacy|terms)/gm)) {document.body.style.color = 'white'}
    while(document.documentElement.style['color-scheme'] != 'dark') {document.documentElement.style['color-scheme'] = 'dark'}
    localStorage.setItem('bwrd_thememode', 'night')
}

function setLight(){
    if(themeURL) {themeURL.href = '/css/themes/bright.css'}
    if(location.pathname.match(/(guidelines|privacy|terms)/gm)) {document.body.style.color = 'black'}
    while(document.documentElement.style['color-scheme'] != 'light') {document.documentElement.style['color-scheme'] = 'light'}
    localStorage.setItem('bwrd_thememode', 'bright')
}

function loadTheme(themepath, themename){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL(`themes/${themepath}.js`)
    createThemeInformer(themename)
}

function runThemes(){
    if(document.getElementById('cf-wrapper')) return
    
    chrome.storage.local.get(['theme','customtheme','customthemes'], saved => {
        if(saved.customtheme == null && !saved.theme || saved.theme == 'None') return
    
        // Load Default Theme
        switch(saved.theme){
            case 'Bloom':
                loadTheme('bloom', 'Bloom')
                setDark()
                break;
            case 'GitHub: Smooth Dark':
                loadTheme('githubDark', 'GitHub Smooth Dark')
                setDark()
                break;
            case 'Discord Dark':
                loadTheme('discordDark', 'Discord Dark')
                setDark()
                break;
            case 'Midnight Gray':
                loadTheme('midnightGray', 'Midnight Gray')
                setDark()
                break;
            case 'GitHub: Dark & Green':
                loadTheme('githubDarkGreen', 'GitHub Dark & Green')
                setDark()
                break;
            case 'Dark Mint Green':
                loadTheme('darkMintGreen', 'Dark Mint Green')
                setDark()
                break;
            case 'WeAreFemboys':
                loadTheme('weAreFemboys', 'WeAreFemboys')
                setDark()
                break;
            case 'Classic Bright Theme':
                loadTheme('WRDBright', 'Classic Bright Theme')
                setLight()
                break;
            case 'Discord Light':
                loadTheme('discordLight', 'Discord Light')
                setLight()
                break;
            case 'GitHub: Light Mode':
                loadTheme('githubLight', 'GitHub Light Mode')
                setLight()
        }

        // Load Custom Theme
        if(saved.customtheme != null){
            const customthemes = JSON.parse(saved.customthemes)

            // Load Custom Theme
            themestyle = document.createElement('style')
            themescript = document.createElement('script')

            themestyle.id = 'bwthemecss'
            themescript.id = 'bwthemejs'

            themestyle.innerHTML = customthemes[saved.customtheme].css
            themescript.innerHTML = customthemes[saved.customtheme].js

            document.head.appendChild(themestyle)
            document.head.appendChild(themescript)

            // Replace theme switch with custom theme name
            createThemeInformer(customthemes[saved.customtheme].name)

            // Set Dark Mode
            if(customthemes[saved.customtheme].mode == 'dark'){
                setDark()
                document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixnight')
            }

            // Set Light Mode
            else{
                setLight()
                document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixbright')
            }
        }
    })
}

function createThemeInformer(themeName){
    if(pageFooter){
        let themeN = document.createElement('div')
        themeN.className = 'verticalCenter'
        themeN.innerHTML = `<a id="themedisplayer" target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}">Theme: ${themeName + openicon}</a>`
        pageFooter.appendChild(document.createElement('br'))
        pageFooter.appendChild(themeN)
    }
}

runThemes()