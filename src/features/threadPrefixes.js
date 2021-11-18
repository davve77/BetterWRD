// Name: Thread title Prefixes
// Desc: Creates custom prefixes for every thread title that starts with or contains one

var threads = document.querySelectorAll('tr td:nth-child(4) a')

if(document.cookie.includes('night')){
    document.head.appendChild(document.createElement('style')).textContent =`.prefix{font-size: 15px;text-transform: capitalize;margin-right:1px;border-radius: 3px;background-color: #3C3C46;color: white;display: inline-block;padding: 2px 3.5px 2px 3.5px;text-align: center; max-width: 300px;}`
} else{
    document.head.appendChild(document.createElement('style')).textContent =`.prefix{font-size: 15px;text-transform: capitalize;margin-right:1px;border-radius: 3px;background-color: #e8e8e8;color: black;display: inline-block;padding: 2px 3.5px 2px 3.5px;text-align: center; max-width: 300px;}`
}

function setCustomPrefix(thread, text){
    // Vars
    prefixtext = text.toLowerCase().trim()
    newprefix = document.createElement('span')

    // Tweak the Custom Prefix text
    switch(prefixtext){
        case 'rel':
            prefixtext = 'release'
            break
        case 'req':
            prefixtext = 'request'
            break
        case 'cw':
            newprefix.style.textTransform = 'uppercase'
    }

    // Create the Custom Prefix
    newprefix.classList.add('prefix')
    newprefix.textContent = prefixtext
    thread.parentNode.appendChild(newprefix)
    thread.parentNode.insertBefore(newprefix, thread.parentNode.firstChild)

    // Remove the old prefix
    thread.textContent = thread.textContent.replace(`[${text}]`, '')
}

for(var i=0, l=threads.length; i<l; i++){
    prefixes = threads[i].textContent.match(/^\[(.*?)\]/)

    if(prefixes != null && prefixes[1].length <= 30){
        setCustomPrefix(threads[i], prefixes[1])
    }
}

// Make it work with the old forum homepage
setTimeout(()=> {
    if(document.querySelectorAll('.forumcontainer')[0]){
        const tablethreads = document.querySelectorAll('td:nth-child(4) > a')
        for(var i=0, l=tablethreads.length; i<l; i++){
            const tprefixes = tablethreads[i].textContent.match(/^\[(.*?)\]/)
            
            if(tprefixes != null && tprefixes[1].length <= 30){
                setCustomPrefix(tablethreads[i], tprefixes[1], tablethreads[i].href)
            }
        }
    }
}, 200)
