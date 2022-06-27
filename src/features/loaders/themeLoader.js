
// BetterWRD Theme Loader //

const themeURL = document.querySelector('[href*="night"]')
const pageFooter = document.querySelector('footer')
const openSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" style=" margin-left: 5px; vertical-align: text-top; " fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>`


const ThemeLoader = {

    /*
        //
        //    Load Default Theme    //
        //
    */

    load: (path, name)=> {
        let theme = document.createElement('script')
        theme.setAttribute('src', chrome.runtime.getURL(`themes/${path}.js`))
        document.head.appendChild(theme)
        ThemeLoader.createThemeInformer(name)
    },



    /*
        //
        //    Initialize Themes    //
        //
    */

    initialize: async ()=> {
        chrome.storage.local.get(['theme','customtheme','customthemes'], saved => {

            // No theme
            if(saved.customtheme == null && !saved.theme || saved.theme == 'None'){
                EventEmitter.emit('ThemeLoaded', 'night')
                return ThemeLoader.dark()
            }

            // Default Theme
            switch(saved.theme){
                case 'Bloom':
                    ThemeLoader.load('bloom', 'Bloom')
                    ThemeLoader.dark()
                    break;
                case 'GitHub: Smooth Dark':
                    ThemeLoader.load('githubDark', 'GitHub Smooth Dark')
                    ThemeLoader.dark()
                    break;
                case 'Discord Dark':
                    ThemeLoader.load('discordDark', 'Discord Dark')
                    ThemeLoader.dark()
                    break;
                case 'Midnight Gray':
                    ThemeLoader.load('midnightGray', 'Midnight Gray')
                    ThemeLoader.dark()
                    break;
                case 'GitHub: Dark & Green':
                    ThemeLoader.load('githubDarkGreen', 'GitHub Dark & Green')
                    ThemeLoader.dark()
                    break;
                case 'Dark Mint Green':
                    ThemeLoader.load('darkMintGreen', 'Dark Mint Green')
                    ThemeLoader.dark()
                    break;
                case 'WeAreFemboys':
                    ThemeLoader.load('weAreFemboys', 'WeAreFemboys')
                    ThemeLoader.dark()
                    break;
                case 'Classic Bright Theme':
                    ThemeLoader.load('WRDBright', 'Classic Bright Theme')
                    ThemeLoader.light()
                    break;
                case 'Discord Light':
                    ThemeLoader.load('discordLight', 'Discord Light')
                    ThemeLoader.light()
                    break;
                case 'GitHub: Light Mode':
                    ThemeLoader.load('githubLight', 'GitHub Light Mode')
                    ThemeLoader.light()
            }


            // Custom Theme
            if(saved.customtheme != null){
                const customthemes = JSON.parse(saved.customthemes)
                let themestyle = document.createElement('style')
                let themescript = document.createElement('script')

                themestyle.id = 'bwrdThemeCSS'
                themescript.id = 'bwrdThemeJS'
                themestyle.textContent = customthemes[saved.customtheme].css
                themescript.textContent = customthemes[saved.customtheme].js
                document.head.appendChild(themestyle)
                document.head.appendChild(themescript)

                // Add theme link
                ThemeLoader.createThemeInformer(customthemes[saved.customtheme].name)

                // Set Dark Mode
                if(customthemes[saved.customtheme].mode == 'dark'){
                    ThemeLoader.dark()
                    document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixnight')
                }

                // Set Light Mode
                else{
                    ThemeLoader.light()
                    document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixbright')
                }
            }


            // Theme Loaded Event
            EventEmitter.emit('ThemeLoaded', localStorage['bwrd_thememode'])
        })
    },



    /*
        //
        //    Theme modes    //
        //
    */

    dark: ()=> {
        if(location.pathname.match(/(guidelines|privacy|terms)/gm)) document.body.style.color = 'white'
        localStorage.setItem('bwrd_thememode', 'night')
    },

    light: ()=> {
        if (themeURL) {themeURL.href = '/css/themes/bright.css'}
        if (location.pathname.match(/(guidelines|privacy|terms)/gm)) document.body.style.color = 'black'

        // Forum Editor
        if(document.querySelector('#replyform, #editor, .manager_descriptor')){
            window.addEventListener('load', ()=> {
                let editor = document.getElementsByClassName('tox-edit-area__iframe')[0].contentWindow.document
                let editorStyle = document.querySelector('#mce-u0')

                editor.head.appendChild(editor.createElement('style')).innerHTML = 'body{background: #f6f8fa; color:black;}'
                if(editorStyle) {editorStyle.setAttribute('href', 'https://cdn.tiny.cloud/1/no-origin/tinymce/5.10.3-128/skins/ui/oxide/skin.min.css')}
            })
        }

        // Code blocks
        if(document.querySelector('pre[class*=language-]')){
            document.head.appendChild(document.createElement('style')).textContent = `
            pre[class*=language-] {background: #f7f7f7 !important;}
            code[class*=language-], pre[class*=language-] {color: black;}
            .token.punctuation, .token.atrule, .token.builtin, .token.important, .token.keyword, .token.selector {color: #bd36c0 !important;}`
        }

        localStorage.setItem('bwrd_thememode', 'bright')
    },



    /*
        //
        //    Theme Link in Footer    //
        //
    */

    createThemeInformer: (name)=> {
        if(pageFooter){
            let div = document.createElement('div')
            div.className = 'verticalCenter'
            div.innerHTML = `<a id="themedisplayer" target="_blank" href="${chrome.runtime.getURL('settings/themes.html')}">Theme: ${name + openSVG}</a>`
            pageFooter.appendChild(document.createElement('br'))
            pageFooter.appendChild(div)
        }
    }
}