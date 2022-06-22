// Name: Replace text with logo
// Desc: Replaces the 'WeAreDevs' text in navbar with WRD logo


(()=> {
    let elm = document.querySelector('#foologo')
    if(!elm) return

    // Create logo
    let logo = document.createElement('img')

    // CSS
    Object.assign(logo.style, {
        display: 'block',
        height: '45px',
        width: '45px'
    })
    elm.style.alignItems = 'center'

    // Set src
    logo.setAttribute('src', 'https://i.imgur.com/frqpbRZ.png')

    // Remove text
    elm.firstChild.remove()

    // Append logo
    elm.appendChild(logo)
})()