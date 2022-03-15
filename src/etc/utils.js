// BetterWRD Utils

const util = {

    strip: (string) => {
        let doc = new DOMParser().parseFromString(string, 'text/html')
        return doc.body.textContent || ''
    },

    validateJSON: (string) => {
        try {return JSON.parse(string)}
        catch {return false}
    },

    copyToClipboard: (string) => {
        let textarea = document.createElement('textarea')
        textarea.textContent = string
        textarea.style.position = 'fixed'
        document.body.appendChild(textarea)
        textarea.select()
        try {return document.execCommand('copy')}
        catch {}
        finally {textarea.remove()}
    },

    addCSS: (src) => {
        let css = document.createElement('link')
        css.rel = 'stylesheet'
        css.type = 'text/css'
        css.href = src
        return document.head.appendChild(css)
    },

    isOnLoadingPage(){
        return document.querySelector('#CreditCard') != null && document.querySelector('#cf-wrapper') != null
    }
}

if(chrome.storage && location.protocol != 'chrome-extension:'){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('etc/utils.js')
}