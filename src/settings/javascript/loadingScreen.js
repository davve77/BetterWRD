// BWRD Loading screen, I will make it better over time

document.addEventListener('readystatechange', ()=> {
    if(document.readyState == 'complete'){
        var funfun = [
            'press CTRL + A to enable all the settings',
            'press CTRL + Delete to disable all the settings',
            'use keys like ESC and + to do stuff faster in the Drafts menu',
            'press enter on the settings page to save the settings',
            'hi hello welcome good morning greetings ello',
            'unsaved themes are saved in the create theme page'
        ]
        
            document.getElementById('funfuntext').textContent = funfun[Math.floor(Math.random() * funfun.length)]

            setTimeout(()=> {
                document.getElementById('loading').style.animation = 'fadeout .3s'
                setTimeout(()=> {document.getElementById('loading').remove()}, 290) 
        }, 700)
    }
})