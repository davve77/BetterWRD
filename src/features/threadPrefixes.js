// Name: Custom Thread Prefixes
// Desc: Creates custom prefixes for every thread title that has a prefix one

document.head.appendChild(document.createElement('style')).textContent =`.prefix{font-size: 15px; white-space: nowrap; text-transform: capitalize; margin-right: 5px; border-radius: 5px; display: inline-block; padding: 2px 3.5px 2px 3.5px; text-align: center; max-width: 300px;}`
document.head.appendChild(document.createElement('style')).textContent =`.prefixnight{background-color: rgb(52 53 53); color: white!important;}`
document.head.appendChild(document.createElement('style')).textContent =`.prefixbright{background-color: #e8e8e8; color: black!important;}`

function setCustomPrefix(thread, text, link){
    if(location.href.includes('profile')) return

    // Vars
    var prefixtext = text.toLowerCase().trim()
    const newprefix = document.createElement('a')

    // Tweak the Custom Prefix
    switch(prefixtext){
        case 'rel':
            prefixtext = 'release'
            break
        case 'req':
            prefixtext = 'request'
            break
        case 'q':
            prefixtext = 'question'
            break
        case 'cw':
            newprefix.style.textTransform = 'uppercase'
    }

    // Set Prefix Theme
    if(localStorage.getItem('bwrd_thememode') == 'night') {newprefix.className = 'prefix prefixnight'}
    else {newprefix.className = 'prefix prefixbright'}

    // Remove the old prefix
    thread.textContent = thread.textContent.replace(`[${text}]`, '')

    // Create & Add the Custom Prefix
    newprefix.textContent = prefixtext
    newprefix.href = link
    thread.prepend(newprefix)

    // BWRD Prefix
    if(thread.textContent.match(/BetterWRD|BWRD/g) && thread.parentElement.tagName != 'TD' && thread.nextElementSibling.firstElementChild.textContent == 'davidTube'){
        newprefix.textContent = 'BWRD'
        newprefix.setAttribute('style', 'background: linear-gradient(to right, #035caf, #930874)!important; color: white!important; font-weight: 500; padding: 3px 6px;')
    }
}

// Set Custom Prefixes for every prefix
setTimeout(()=> {
    const threads = document.querySelectorAll('.thread, .thread-title')
    for(var i=0, l=threads.length; i<l; i++){
        const prefixes = threads[i].textContent.trim().match(/^\[(.*?)\]/)
    
        if(prefixes != null && prefixes[1].length <= 30){
            setCustomPrefix(threads[i], prefixes[1], threads[i].href)
        }
    }
}, 150)

// Add space between table columns if on category page
if(document.querySelector('.forumMenu')){
    document.head.appendChild(document.createElement('style')).textContent = `
    td{
        padding: 4px 0;
    }`
}

// Change Prefix Theme on WRD Theme change
if(document.getElementById('themer')){
    thm = document.getElementById('themer')
    thm.addEventListener('click', ()=> {
        if(thm.checked) {document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixbright')}
        else {document.querySelectorAll('.prefix').forEach(customprefix => customprefix.className = 'prefix prefixnight')}
    })
}