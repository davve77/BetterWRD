// Name: Read/Unread Threads
// Desc: Lowers the thread title opacity indicating if you already read the specific thread

/*
const nightRead = document.createElement('style')
const brightRead = document.createElement('style')

nightRead.innerHTML = '.thread:visited{color: rgb(185, 185, 185);}'
brightRead.innerHTML = '.thread:visited{color: rgb(70, 70, 70);}'

document.head.appendChild(nightRead)
document.head.appendChild(brightRead)

// Set
setTimeout(()=> {
    if(localStorage.getItem('bwrd_thememode') == 'night'){
        brightRead.setAttribute('media', 'not all')
        nightRead.removeAttribute('media')
    }
    else{
        brightRead.removeAttribute('media')
        nightRead.setAttribute('media', 'not all')
    }
}, 200)

// WRD theme change
if(document.getElementById('themer')){
    document.getElementById('themer').addEventListener('click', ()=> {
        if(document.cookie.includes('night')){
            brightRead.setAttribute('media', 'not all')
            nightRead.removeAttribute('media')
        }
        else{
            brightRead.removeAttribute('media')
            nightRead.setAttribute('media', 'not all')
        }
    })
}
*/