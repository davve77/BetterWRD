// BetterWRD Emotes
// This feature is still in BETA. Expect bugs.


if(document.querySelector('#editor')){

    /*
    *
    * // Create Emote Picker Div //
    *
    */

    const form = document.querySelector('form')
    const emotesdiv = document.createElement('div')

    form.style.position = 'relative'
    form.appendChild(emotesdiv)
    emotesdiv.outerHTML = `<div class="theme1 border1 round" id="emotesdiv" style=" position: absolute; bottom: 0; left: -240px; height: 280px; width: 230px; display: flex; flex-direction: column; overflow: hidden; "><p class="bold padding" style=" font-size: 20px; ">Emotes<span style=" font-size: 14px; opacity: .4; margin-left: 5px; vertical-align: middle; ">BETA</span></p> <div class="scrollemotes" style=" flex: 1; overflow: overlay; "> <div id="mainemotesdiv" style=" display: grid; grid-gap: 10px; grid-template-columns: repeat(auto-fill, minmax(30px, 0fr) ); padding: 0 10px; padding-bottom: 10px; overflow: visible; "></div><h1 id="noemotes" style="display: block; font-size: 16px; text-align: center; font-weight: 100;">You have no emotes <img src="https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/3x" style=" width: 25px; height: 25px; margin-left: 3px; vertical-align: bottom; "></h1></div> <div class="theme2" id="viewEmote" style="display: none;align-items: center;gap: 10px;padding: 0 10px;"><img src="https://cdn.discordapp.com/attachments/888810992371392512/932317606969507883/919387155602743356.png" style=" width: 30px; height: 25px; "> <div style=" height: 100%; padding: 7px 0; padding-bottom: 0; "><h1 id="emoteNamePreview" style=" font-size: 15px; font-weight: 100; opacity: 1; margin-bottom: -2px; display: block; white-space: pre; max-width: 150px; overflow: hidden; text-overflow: ellipsis; ">emote name</h1><span id="emoteUrlPreview" style=" font-size: 13px; opacity: .6; display: block; white-space: pre; max-width: 170px; overflow: hidden; text-overflow: ellipsis; ">emote url</span></div></div> <div class="theme2" id="createEmote" style="display: none; flex-direction: column; justify-content: center; padding: 10px; padding-bottom: 5px; gap: 10px; "><div style=" display: flex; justify-content: space-between; align-items: center; padding-bottom: 5px; "><h1 style=" font-size: 17px; ">Add Emote</h1><span id="closeaddemote" style=" cursor: pointer; ">✕</span></div><input id="emote-name" placeholder="Emote Name" class="theme1 border round" type="text" style="padding: 6px;padding-left: 10px;font-size: 14px;outline: none;"> <input id="emote-url" placeholder="Emote URL" class="theme1 border round" type="text" style="padding: 6px;padding-left: 10px;font-size: 14px;outline: none;"></div> <div class="theme2" style=" height: 50px; padding: 9px; "><a id="addemotebtn" class="button theme1" style=" width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; ">Add Emote</a></div></div>`

    
    
    /*
    *
    * // Show the user's emotes //
    *
    */

    const savedEmotes = localStorage.getItem('bwrd_emotes')
    const emotes = JSON.parse(savedEmotes)
    const emotesDiv = document.getElementById('mainemotesdiv')
    const noEmotes = document.getElementById('noemotes')

    // Create emotes key
    if(!savedEmotes) {localStorage.setItem('bwrd_emotes','[]')}

    // Show 'No Emotes' text if user doesn't have emotes
    if(!emotes || emotes.length == 0){
        noEmotes.style.display = 'block'
    }

    // Display user's emotes
    if(emotes) {refreshEmotes()}

    // Display emotes function
    function refreshEmotes(){
        document.querySelectorAll('.emoteContainer').forEach(elm => elm.remove())

        JSON.parse(localStorage.getItem('bwrd_emotes')).forEach(emote => {
            emoteElm = document.createElement('div')
            emotesDiv.prepend(emoteElm)
            emoteElm.outerHTML = `<div title="${emote.name}" class="emoteContainer" style=" overflow: hidden; max-height: 30px; max-width: 30px; cursor: pointer; "><img class="emoteimg" src="${emote.url}" style=" height: 30px; width: 30px; "> </div>`
        })

        noEmotes.style.display = (JSON.parse(localStorage.getItem('bwrd_emotes')).length == 0) ? 'block' : 'none'
    }



    /*
    *
    * // Add Emote //
    *
    */

    const addEmoteBtn = document.getElementById('addemotebtn')
    const addEmoteDiv = document.getElementById('createEmote')
    const closeAddEmoteDiv = document.getElementById('closeaddemote')
    var isCreateOpen = false

    function createEmote(name, url){
        var nowemotes = JSON.parse(localStorage.getItem('bwrd_emotes'))

        nowemotes.push({
        'name': name, 
        'url': url
        })

        localStorage.setItem('bwrd_emotes', JSON.stringify(nowemotes))
    }

    addEmoteBtn.addEventListener('click', ()=> {
        if(!isCreateOpen){
            isCreateOpen = true
            addEmoteDiv.style.display = 'flex'
            addEmoteBtn.textContent = 'Add'
        }
        else{
            emoteName = document.getElementById('emote-name')
            emoteURL = document.getElementById('emote-url')

            function checkImage(imgsrc, callback){
                var img = new Image()
                img.onload = ()=> {callback(true, img.width, img.height, new URL(imgsrc).host)}
                img.onerror = ()=> {callback(false)}
                img.src = imgsrc
            }

            if(emoteName.value.trim() == '' || emoteURL.value.trim() == ''){
                alert('Please fill the required fields to create the emote.')
                return
            }

            if(emoteURL.value.slice(-3) != 'png') {emoteURL.value = 'The image has to be a PNG.'; return}

            checkImage(emoteURL.value, (exists, width, height, host)=> {

                // Check if image URL is valid
                if(!exists){
                    emoteURL.value = 'This image doesn\'t exist.'
                    return
                }

                // Check if URL hostname is Discord, Gyazo, Imgur etc.
                if(host != 'discord.com' && host != 'cdn.discordapp.com' && host != 'gyazo.com' && host != 'i.gyazo.com' && host != 'imgur.com' && host != 'i.imgur.com' && host != 'ibb.co' && host != 'i.ibb.co'){
                    alert('Only discord, gyazo, imgur & imgbb images are allowed.')
                    return
                }

                // Check if image width/height is greater or equal to 200
                if(width >= 200 || height >= 200){
                    if(!window.confirm(`This emote's size is ${width} x ${height} which might look huge on posts. Do you still want to create it?`)) return
                }

                isCreateOpen = false
                addEmoteDiv.style.display = 'none'
                addEmoteBtn.textContent = 'Add Emote'
        
                // Create and Refresh
                createEmote(emoteName.value.trim(), emoteURL.value.trim())
                refreshEmotes()
            })
        }
    })

    closeAddEmoteDiv.addEventListener('click', ()=> {
        isCreateOpen = false
        addEmoteDiv.style.display = 'none'
        addEmoteBtn.textContent = 'Add Emote'  
    })



    /*
    *
    * // Insert Emote in Forum Editor //
    *
    */

    document.body.addEventListener('click', (e)=> {
        if(e.target.className && e.target.className.includes('emoteimg')){
            tinymce.activeEditor.execCommand('mceInsertContent', false, `<p><img src="${e.target.src}" style="max-width: 60px; max-height: 60px;"><p style="display: none;">${e.target.src}</p></img></p>`)
        }
    })



    /*
    *
    * // Show/Hide Emote Inspector //
    *
    */

    document.body.addEventListener('mouseover', (e)=> {
        if(e.target.classList && e.target.classList.length != 0){

            const emotePreview = document.getElementById('viewEmote')

            if(e.target.className.includes('emoteimg')){
                emotePreview.style.display = 'flex'
                emotePreview.firstElementChild.src = e.target.src
                emotePreview.lastElementChild.firstChild.textContent = e.target.parentNode.title
                emotePreview.lastElementChild.lastChild.textContent = e.target.src
            }
    
            else if(!e.target.className.includes('emoteContainer')){
                emotePreview.style.display = 'none'
            }
        }
    })
}