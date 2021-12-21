// Name: Online Users at bottom
// Desc: Moves the online users list back at the bottom of the page

setTimeout(()=> {
    const onlineusers = document.querySelector('.onlineList')
    if(onlineusers){
        const main = onlineusers.parentNode
        bottomonlineusers = document.createElement('div')
    
        main.appendChild(bottomonlineusers)
        main.replaceChild(onlineusers, bottomonlineusers)
    }
}, 180)