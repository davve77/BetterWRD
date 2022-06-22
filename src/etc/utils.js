// BetterWRD Utils

var util = {

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

    addRule: (css) => {
        let stylesheet = document.styleSheets[0]
        let newRule = stylesheet.insertRule(css, stylesheet.cssRules.length)
        return newRule
    },

    deleteRule: (rule) => {
        let stylesheet = document.styleSheets[0]
        if(rule) stylesheet.deleteRule(rule)
    },

    isOnLoadingPage(){
        return document.querySelector('#CreditCard') != null && document.querySelector('#cf-wrapper') != null
    },

    detectFirefox(){
        return typeof InstallTrigger != 'undefined'
    },

    addElement: (tag, location, content, innerOnly) => {
        let elm = document.createElement(tag)
        location.appendChild(elm)
        if(innerOnly) elm.textContent = content
        else elm.outerHTML = content
        return location.lastElementChild
    },

    findElementByText(text){
        return document.evaluate(`//a[text()='${text}']`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }
}

if(!document.currentScript && chrome.storage && location.protocol != 'chrome-extension:'){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('etc/utils.js')
}