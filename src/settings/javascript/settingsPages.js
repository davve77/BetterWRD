// Script for all the settings pages

window.addEventListener('load', ()=> {
    
    // Turn off autocomplete for textboxes:
    document.querySelectorAll('input').forEach(elm => elm.setAttribute('autocomplete', 'off'))

    // Make every input textbox type=text
    document.querySelectorAll('.textbox').forEach(elm => elm.setAttribute('type', 'text'))

    // Remove :focus on buttons
    document.addEventListener('click', (e)=> {
        if(e.target.className.includes('btn')) {document.activeElement.blur()}
    })

    // Animate "back to /themes" button 
    if(document.querySelector('#backtothemes')){
        const backbtn = document.querySelector('#backtothemes')
        backbtn.addEventListener('mousedown', ()=> {
            backbtn.style.animation = 'backtothemes-anim .15s'
            setTimeout(()=> {
                history.back()
            }, 100)
        })
    }
})