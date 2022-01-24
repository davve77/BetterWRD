// Name: Set Font
// Desc: Sets the font the user has selected in the settings

chrome.storage.local.get(['font','fontImport'], saved => {
    const fontStyle = document.createElement('style')
    const isCustom = saved.font == 'custom'
    const isRoboto = saved.fontImport == 'none'
    const openIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" style=" margin-left: 5px; vertical-align: text-top; " fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>`

    if(!saved.font || !saved.fontImport || isRoboto) return

    // Load Google Font
    if(!isCustom || isRoboto){
        fontStyle.textContent = `
        ${saved.fontImport}
        *{
            font-weight: 400!important;
            font-family: '${saved.font}'!important;
        }
        .buttons .btn {width: auto;}
        `
    }

    // Load Custom Font
    if(isCustom){
        fontStyle.textContent = `
        @font-face {
            font-family: 'Custom Font';
            font-style: normal;
            font-display: swap;
            src: url(${saved.fontImport}) format('woff2');
          }
        *{
            font-weight: 400!important;
            font-family: 'Custom Font'!important;
        }
        `
    }

    // Append font style
    document.head.appendChild(fontStyle)

    // Show Font at page bottom
    const footerdiv = document.querySelector('footer').lastElementChild
    if(footerdiv){
        footerdiv.appendChild(document.createElement('a')).outerHTML = `<a style="display: block; padding-top: 10px; flex-basis: 100%;" target="_blank" href="${chrome.runtime.getURL('settings/fonts.html')}">Font: ${saved.font + openIcon}</a>`
        footerdiv.style.flexFlow = 'row wrap'
        footerdiv.style.justifyContent = 'center'
    }
})