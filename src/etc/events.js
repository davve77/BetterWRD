// BetterWRD Events

class Events{
    on(type, cb) {
        this['_on' + type] = this['_on' + type] || []
        this['_on' + type].push(cb)
    }

    emit(type, args) {
        this['_on' + type] && this['_on' + type].forEach(cb => cb(args))
    }
}

const EventEmitter = new Events()

if(!document.currentScript && chrome.storage && location.protocol != 'chrome-extension:'){
    document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('etc/events.js')
}