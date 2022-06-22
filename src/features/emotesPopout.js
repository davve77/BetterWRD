// Name: Emote Popout
// Desc: Opens a popout when the user clicks on an emote


if(document.querySelector('[target*="BetterWRD Emote"]')){

    if(!localStorage['bwrd_emotes']) localStorage['bwrd_emotes'] = '[]'

    const viewerCSS = util.addCSS(document.currentScript.getAttribute('url') + '/css/emotePopout.css')
    const popoutHTML = `<div class="bwrd-emote-popout emote-hidden theme2"> <img class="pop-image" src="" style="max-width: 55px; min-width: 55px;"> <div> <p class="pop-name" style=" font-size: 16px; font-weight: 600; ">Emote Name</p> <p style=" font-size: 13px; opacity: .75; ">This is a user-generated BetterWRD Emote.</p> <button class="pop-add button" style=" margin-top: 12px; padding: 4px 12px; font-size: 12px; transition: 167ms cubic-bezier(0.55,0.55,0,1); background: #ffffff1a;">Add to your Emotes</button> </div> </div>`

    function createPopout(elm){

        // Create element
        let popout = document.createElement('div')
        document.body.appendChild(popout)
        popout.outerHTML = popoutHTML
        popout = document.querySelector('.bwrd-emote-popout')

        // Animate
        setTimeout(()=> {
            popout.classList.remove('emote-hidden')
            popout.style.height = popout.clientHeight + 'px'
        })

        // Set content
        let emoteSrc = elm.querySelector('img').src
        let emoteName = elm.target.replace('BetterWRD Emote', '').trim()
        popout.querySelector('.pop-image').src = emoteSrc
        popout.querySelector('.pop-name').textContent = emoteName

        // Add to Emotes button
        let addEmoteBtn = popout.querySelector('.pop-add')
        addEmoteBtn.addEventListener('click', e => {
            addToEmotes(emoteSrc, emoteName)

            addEmoteBtn.style.opacity = '0'
            addEmoteBtn.style.transform = 'translateY(150%)'
            
            setTimeout(()=> {
                addEmoteBtn.style.display = 'none'
                popout.style.height = popout.offsetHeight - 40 + 'px'
            }, 120)
        })

        // User already has emote
        if(existingEmoteCheck(emoteName)){
            addEmoteBtn.style.display = 'none'
        }

        // Set position
        let imgElm = elm.querySelector('img')
        let pos = imgElm.getBoundingClientRect()
        
        popout.style.setProperty('left', pos.left + window.scrollX + imgElm.offsetWidth + 10 + 'px')
        popout.style.setProperty('top', (pos.top + window.scrollY) + (imgElm.offsetHeight / 2) - (popout.clientHeight / 2) + 'px')

        return popout
    }

    function deletePopout(elm){
        elm.classList.add('emote-hidden')
        setTimeout(()=> { elm.remove() }, 167)
    }

    function addToEmotes(url, name){
        let currentEmotes = JSON.parse(localStorage['bwrd_emotes'])
        currentEmotes.push({
            'name': name,
            'url': url
        })
        localStorage['bwrd_emotes'] = JSON.stringify(currentEmotes)
    }

    function existingEmoteCheck(name){
        let currentEmotes = JSON.parse(localStorage['bwrd_emotes'])
        let exists = false

        for(var i=0;i<currentEmotes.length;i++){
            if(currentEmotes[i].name == name){
                return exists = true
            }
        }

        return exists
    }


    let activePopout = null
    let popoutElements = []

    document.querySelectorAll('[target*="BetterWRD Emote"]').forEach(elm => {
        popoutElements.push(elm.querySelector('img'))

        elm.addEventListener('click', ()=> {

            // Remove popout
            if(activePopout){
                deletePopout(activePopout)
                activePopout = null
            }

            // Create popout
            else{
                activePopout = createPopout(elm)
            }
        })
    })

    document.body.addEventListener('click', e => {
        if(activePopout && !popoutElements.includes(e.target) && !activePopout.contains(e.target)){
            deletePopout(activePopout)
            activePopout = null
        }
    })
}