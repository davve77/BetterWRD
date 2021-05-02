// Name: Thread title Prefixes
// Desc: Creates custom prefixes for every thread title that starts with or contains one

if(document.getElementsByClassName('forumcategory')[0]){ // Checks if you're on the main forum page
    var threads = document.querySelectorAll('tr td:nth-child(4) a')

    document.head.appendChild(document.createElement('style')).textContent =`.prefix{
        font-size: 15px;border-radius: 3px;background-color: #5a5a5a;color: #ffffff;display: inline-block;argin-right: 5px;padding-left: 4px;padding-right: 4px;padding-top: 1px;padding-bottom: 1px;text-align: center;}`
    
    function prefix(thread, text){
        newprefix = document.createElement('span')
        newprefix.classList.add('prefix')
        newprefix.textContent = text
        thread.parentNode.appendChild(newprefix)
        thread.parentNode.insertBefore(newprefix, thread.parentNode.firstChild)
    }
    function delfirstprefix(thread, text) {thread.textContent = thread.textContent.replace(text, '')}
    
    for(var i=0, l=threads.length; i<l; i++){
        var titles = threads[i].textContent.toUpperCase()
        switch(true){
            case titles.startsWith('[REL]'):
                prefix(threads[i], 'Release')
                delfirstprefix(threads[i], '[REL]')
                break
            case titles.startsWith('[RELEASE]'):
                prefix(threads[i], 'Release')
                delfirstprefix(threads[i], '[RELEASE]')
                break
            case titles.startsWith('[REQ]'):
                prefix(threads[i], 'Request')
                delfirstprefix(threads[i], '[REQ]')
                break
            case titles.startsWith('[REQUEST]'):
                prefix(threads[i], 'Request')
                delfirstprefix(threads[i], '[REQUEST]')
                break
            case titles.startsWith('[CW]'):
                prefix(threads[i], 'CW')
                delfirstprefix(threads[i], '[CW]')
                break
    
            case titles.includes('POLL'):
                 prefix(threads[i], 'Poll')
                break
            case titles.includes('SCRIPT'):
                prefix(threads[i], 'Script')
                break
            case titles.includes('GIVEAWAY'):
                prefix(threads[i], 'Giveaway')
        }
    }
}