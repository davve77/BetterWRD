// Name: Set Theme
// Desc: Sets the theme that you chose

    function loadTheme(themepath, themename){
        document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL(`themes/${themepath}.js`)
    
        if(document.querySelector('.switch')){
            themeswitch = document.querySelector('.switch')
            themeswitch.parentNode.innerHTML = `<a target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}">Theme: ${themename}</a>`
            themeswitch.remove()
        }
    }
    
    function runThemes(){
        if(document.getElementById('cf-wrapper')) return
        
        chrome.storage.local.get(['theme','customtheme','customthemes'], saved => {
            if(saved.customtheme == null && !saved.theme || saved.theme == 'None') return
        
            // Load Default Theme
            switch(saved.theme){
                case 'GitHub: Smooth Dark':
                    loadTheme('githubDark', 'GitHub Smooth Dark')
                    break;
                case 'GitHub: Dark & Green':
                    loadTheme('githubDarkGreen', 'GitHub Dark & Green')
                    break;
                case 'Dark Mint Green':
                    loadTheme('darkMintGreen', 'Dark Mint Green')
                    break;
                case 'Midnight Gray':
                    loadTheme('midnightGray', 'Midnight Gray')
                    break;
                case 'Deep Night':
                    loadTheme('deepNight', 'Deep Night')
                    break;
                case 'GitHub: Light Mode':
                    loadTheme('githubLight', 'GitHub Light Mode')
            }
    
            // Load Custom Theme
            if(saved.customtheme != null){
                var customthemes = JSON.parse(saved.customthemes)
    
                // Load Custom Theme
                document.head.appendChild(document.createElement('script')).innerHTML = customthemes[saved.customtheme].js
                document.head.appendChild(document.createElement('style')).innerHTML = customthemes[saved.customtheme].css
    
                // Replace theme switch with custom theme name
                themeswitch = document.querySelector('.switch')
                themeswitch.parentNode.innerHTML = `<a target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}">Theme: ${customthemes[saved.customtheme].name}</a>`
                themeswitch.remove()
    
                // Set Dark Mode
                if(customthemes[saved.customtheme].mode == 'dark'){
                    if(document.getElementById('themecss')){
                        document.getElementById('themecss').href = '/css/themes/night.css'
                    }
                    while(document.documentElement.style.colorScheme != 'dark') {document.documentElement.style.colorScheme = 'dark'}
                }
    
                // Set Light Mode
                else{
                    if(document.getElementById('themecss')){
                        document.getElementById('themecss').href = '/css/themes/bright.css'
                    }
                    while(document.documentElement.style.colorScheme != 'light') {document.documentElement.style.colorScheme = 'light'}
                    if(location.pathname.includes('guidelines') || location.pathname.includes('privacy') || location.pathname.includes('terms')) {document.body.style.color = 'black'}
                }
            }
        }
    )
}

setTimeout(runThemes, 100)