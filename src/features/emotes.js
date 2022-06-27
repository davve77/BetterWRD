// BetterWRD Emotes


if(document.querySelector('#editor')){

    /*
    *
    * // Create Emote Picker Div & Styles //
    *
    */

    const form = document.querySelector('form')
    const emotesdiv = document.createElement('div')
    const emotesHTML = `
    <div class="theme1 border1 round" id="emotesdiv">
    <div id="emotesView"> <div class="padding"> <div id="emoteSearchDiv" class="theme2"> <input id="emoteSearch" type="text" placeholder="Emotes"> <div style="display: flex;align-items: center;padding: 0 8px;flex: 1;"><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg></div> <div class="underline" style=" display: block; block-size: 100%; inline-size: 100%; position: absolute; border-bottom: 1px solid #ffffff45; border-radius: 5px; overflow: hidden; pointer-events: none; "></div></div></div>
    <div class="scrollemotes">
        <div style="padding-bottom: 8px;"> <div onclick="expandCollapse(this)" id="favEmotesSection" class="sectionexpand" style="user-select: none; padding: 0 10px; padding-bottom: 8px; opacity: .7; display: inline-flex; align-items: center; gap: 7px; cursor: pointer; transition: .11s opacity, filter; "><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"></path></g></svg> <h3 style=" font-weight: 100; font-size: 14px; ">Favorites</h3> <svg style="transition: transform .12s cubic-bezier(0.46, 0.03, 0.52, 0.96)" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></div> <div id="favoriteEmotes" style=" display: grid; grid-gap: 0; grid-template-columns: repeat(auto-fill, minmax(36px, 0fr) ); padding: 0 10px; padding-bottom: 10px; overflow: visible; gap: 5px;"></div> </div>
        <div> <div onclick="expandCollapse(this)" id="allEmotesSection" class="sectionexpand" style="user-select: none; padding: 0 10px;padding-bottom: 8px; opacity: .7;display: inline-flex;align-items: center;gap: 7px;cursor: pointer;transition: .11s opacity, filter;"><svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg> <h3 style=" font-weight: 100; font-size: 14px; ">All Emotes</h3> <svg style="transition: transform .12s cubic-bezier(0.46, 0.03, 0.52, 0.96)" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></div> <div id="mainemotesdiv" style=" display: grid; grid-gap: 0; grid-template-columns: repeat(auto-fill, minmax(36px, 0fr) ); padding: 0 10px; padding-bottom: 10px; overflow: visible; gap: 5px;"></div></div>
        <h1 id="noemotes">You have no emotes <img src="https://cdn.betterttv.net/emote/5e0fa9d40550d42106b8a489/3x" style=" width: 25px; height: 25px; margin-left: 3px; vertical-align: bottom;"></h1>
    </div>
    <div class="twitchscrollemotes"> <div> <div onclick="expandCollapse(this)" id="twitchEmotesSection" class="sectionexpand" style="user-select: none; padding: 0 10px;padding-bottom: 8px; opacity: .7;display: inline-flex;align-items: center;gap: 7px;cursor: pointer;transition: .11s opacity, filter;"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2400 2800" style=" width: 18px; height: 18px; " xml:space="preserve"> <g> <g id="Layer_1-2"> <path class="st0" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600    V1300z"></path> <rect x="1700" y="550" class="st0" width="200" height="600"></rect> <rect x="1150" y="550" class="st0" width="200" height="600"></rect> </g> </g> </svg> <h3 style=" font-weight: 100; font-size: 14px; ">Twitch Emotes</h3> <svg style="transition: transform 0.12s cubic-bezier(0.46, 0.03, 0.52, 0.96) 0s;" xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path></svg></div> <div id="twitchemotes" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(36px, 0fr)); padding: 0px 10px 10px; overflow: visible; gap: 5px;"></div></div> </div>
    <div class="theme2" id="viewEmote"><img style=" max-width: 30px; max-height: 30px; ">
        <div style=" height: 100%; padding: 7px 0; padding-bottom: 0; ">
            <h1 id="emoteNamePreview" style=" font-size: 15px; font-weight: 100; opacity: 1; margin-bottom: -2px; display: block; white-space: pre; max-width: 150px; overflow: hidden; text-overflow: ellipsis; "></h1><span id="emoteUrlPreview" style=" font-size: 13px; opacity: .6; display: block; white-space: pre; max-width: 170px; overflow: hidden; text-overflow: ellipsis; "></span>
        </div>
    </div>
    <div class="theme2" id="createEmote">
        <div style=" display: flex; justify-content: space-between; align-items: center; padding-bottom: 5px; ">
            <h1 style=" font-size: 17px; ">Add Emote</h1><span id="closeaddemote" style=" cursor: pointer; ">✕</span>
        </div><input id="emote-name" placeholder="Emote Name" class="theme1 border" type="text" style="padding: 6px 10px; border-radius: 7px; font-size: 14px;outline: none;"> <input id="emote-url" placeholder="Emote URL" class="theme1 border" type="text" style="padding: 6px 10px; border-radius: 7px; font-size: 14px;outline: none;">
    </div>
    <div class="theme2" style=" height: 50px; padding: 9px; display: flex; justify-content: space-between; align-items: center;"><a id="addemotebtn" class="button theme1" style="display: flex;justify-content: center;align-items: center;padding: 0;width: 35px;height: 35px;border-radius: 10px;"><svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 24 24" width="25px" fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none"></path>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
            </svg></a> <div style=" display: flex; align-items: center; gap: 8px; "><svg onclick="twitchTab()" class="twitchTabBtn tabBtn" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 2400 2800" style="width: 20px;height: 20px;opacity: .3; cursor: pointer;" xml:space="preserve"> <g> <g id="Layer_1-2"> <path class="st0" d="M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,350v-350H600V200h1600    V1300z"></path> <rect x="1700" y="550" class="st0" width="200" height="600"></rect> <rect x="1150" y="550" class="st0" width="200" height="600"></rect> </g> </g> </svg> <svg onclick="defaultTab()" class="defaultTabBtn tabBtn" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor" style=" width: 20px; height: 20px; opacity: .3; cursor: pointer; "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 10c2.7 0 5.8 1.29 6 2H6c.23-.72 3.31-2 6-2m0-12C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div> </div>
    </div><div class="theme1 emoteMenu" id="emoteEdit" style="position: absolute;width: 100%;height: 100%;flex: 1;display: flex;flex-direction: column; transform: translateX(230px); transition: .44s transform cubic-bezier(1,0,.28,.97);"><div style="font-size: 16px;display: flex;align-items: center;gap: 5px;padding: 10px;"><div onclick="closeMenus()" class="backbtn" style="transition: .09s all; display: flex; align-items: center; justify-content: center; padding: 5px; border-radius: 6px; cursor: pointer; "><svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 0 24 24" width="19px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></div> <a>Edit Emote</a></div> <div style=" flex: 1; display: flex; flex-direction: column; "><div style=" display: flex; flex-direction: row; padding: 0 15px; gap: 10px; "> <div style="max-width: 60px; max-height: 60px; display: flex; align-items: center; justify-content: center;"><img id="emotePreview" src="" style="max-width: 60px; max-height: 60px;"></div><div style=" display: flex; flex-direction: column; justify-content: flex-end; "><div id="favSymbol" style="display: none;align-items: center;padding-bottom: 2px; gap: 2px;"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="19px" viewBox="0 0 24 24" width="19px" fill="#ffc600" style=" "><g><path d="M0,0h24v24H0V0z" fill="none"></path><path d="M0,0h24v24H0V0z" fill="none"></path></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"></path></g></svg> <h3 style=" font-size: 12px; opacity: .8; user-select: none; ">FAVORITE</h3></div><h1 id="emoteNameTop" style=" font-size: 18px; font-weight: 400; white-space: pre; max-width: 135px; overflow: hidden; text-overflow: ellipsis;"></h1> <span id="emoteUrlTop" style=" white-space: pre; max-width: 135px; overflow: hidden; text-overflow: ellipsis; opacity: .7; font-size: 13px; "></span></div></div> <div style=" padding: 25px 10px 0; display: flex; flex-direction: column; gap: 5px; "> <input id="editEmoteName" placeholder="Name" class="border1" type="text" style=" padding: 6px 10px; border-radius: 7px; outline: none; background: #b1b1b112; "> <input id="editEmoteUrl" placeholder="Image URL" class="border1" type="text" style=" padding: 6px 10px; border-radius: 7px; outline: none; background: #b1b1b112; "></div></div> <div class="theme2" style=" height: 50px; display: flex; padding: 10px; align-items: center; justify-content: center; "><div id="saveEdit" onclick="updateEmote(document.getElementById('editEmoteName').value, document.getElementById('editEmoteUrl').value, this.getAttribute('emoteIndex'))" class="theme1" style=" padding: 5px 30px; border-radius: 10px; cursor: pointer; "><span>Done</span></div></div></div></div>
    `

    form.style.position = 'relative'
    form.appendChild(emotesdiv)
    emotesdiv.outerHTML = emotesHTML

    // CSS
    util.addCSS(document.currentScript.getAttribute('url') + '/css/emotes.css')

    
    
    /*
    *
    * // Show the user's emotes //
    *
    */

    const savedEmotes   = localStorage.getItem('bwrd_emotes')
    const emotes        = JSON.parse(savedEmotes)
    const emotesDiv     = document.querySelector('#mainemotesdiv')
    const favEmotesDiv  = document.querySelector('#favoriteEmotes')
    const noEmotes      = document.querySelector('#noemotes')

    // Create emotes key
    if(!savedEmotes) localStorage.setItem('bwrd_emotes','[]')

    // Show 'No Emotes' text if user doesn't have emotes
    if(!emotes || emotes.length == 0){
        noEmotes.style.display = 'block'
    }

    // Display user's emotes
    refreshEmotes()

    // Display emotes
    function refreshEmotes(){
        var favorites = 0
        document.querySelectorAll('.emoteContainer:not(.twitchEmote)').forEach(elm => elm.remove())

        JSON.parse(localStorage.getItem('bwrd_emotes')).forEach(emote => {
            emoteElm = document.createElement('div')
            emoteHTML = `<div title="${emote.name}" class="emoteContainer" style=" "><img class="emoteimg" src="${emote.url}" style="max-height: 30px; max-width: 30px;"> </div>`

            emotesDiv.prepend(emoteElm)
            emoteElm.outerHTML = emoteHTML

            if(emote.favorite){
                favEmoteElm = document.createElement('div')
                favEmotesDiv.prepend(favEmoteElm)
                favEmoteElm.outerHTML = emoteHTML
                favorites += 1
            }
        })

        noEmotes.style.display = (JSON.parse(localStorage.getItem('bwrd_emotes')).length == 0) ? 'block' : 'none'
        favEmotesDiv.parentElement.style.display = (favorites != 0) ? 'block' : 'none'
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

        for(var i=0;i<nowemotes.length;i++){
            if(nowemotes[i].name == name) {
                alert('These is already an emote with this name.')
                return
            }
        }

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
        }
        else{
            emoteName = document.getElementById('emote-name')
            emoteURL = document.getElementById('emote-url')
            emoteURLValue = emoteURL.value

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

            // Replace webp with png for discord emotes
            if(emoteURLValue.startsWith('https://cdn.discordapp.com/') && emoteURLValue.endsWith('webp')){
                emoteURLValue = emoteURLValue.replace('.webp', '.png')
            }

            if(!emoteURLValue.endsWith('png') && !emoteURLValue.endsWith('gif')) {emoteURL.value = 'Emote has to be a PNG or GIF.'; return}

            checkImage(emoteURLValue, (exists, width, height, host)=> {

                // Check if image URL is valid
                if(!exists){
                    emoteURL.value = 'This image doesn\'t exist.'
                    return
                }

                // Check if URL hostname is Discord, Gyazo, Imgur etc.
                if(host != 'discord.com' && host != 'cdn.discordapp.com' && host != 'media.discordapp.net' && host != 'gyazo.com' && host != 'i.gyazo.com' && host != 'imgur.com' && host != 'i.imgur.com' && host != 'ibb.co' && host != 'i.ibb.co'){
                    alert('Only discord, gyazo, imgur & imgbb images are allowed.')
                    return
                }

                // Check if image width/height is greater or equal to 200
                if(width >= 200 || height >= 200){
                    if(!window.confirm(`This emote's size is ${width} x ${height} which might look huge on posts. Do you still want to create it?`)) return
                }

                isCreateOpen = false
                addEmoteDiv.style.display = 'none'
        
                // Create and Refresh
                createEmote(emoteName.value.trim(), emoteURLValue.trim())
                refreshEmotes()
            })
        }
    })

    closeAddEmoteDiv.addEventListener('click', ()=> {
        isCreateOpen = false
        addEmoteDiv.style.display = 'none'
    })



    /*
    *
    * // Insert Emote in Forum Editor //
    *
    */

    document.body.addEventListener('click', (e)=> {
        if(e.target.className[0] != undefined && e.target.classList && e.target.classList.length != 0){
            if(!e.target.className.includes('emoteimg')) return

            tinymce.activeEditor.execCommand('mceInsertContent', false, `<p><img class="emoteBWRD" src="${e.target.src}" style="max-width: 60px; max-height: 60px;"><a target="BetterWRD Emote ${e.target.parentElement.title}" style="display: none;">${e.target.src}</a></img></p>`)
        }
    })



    /*
    *
    * // Show/Hide Emote Inspector //
    *
    */

    document.body.addEventListener('mouseover', (e)=> {
        if(e.target.className[0] != undefined && e.target.classList && e.target.classList.length != 0){

            const emotePreview = document.getElementById('viewEmote')

            if(e.target.className.includes('emoteimg')){
                emotePreview.style.display = 'flex'
                emotePreview.firstElementChild.src = e.target.src
                emotePreview.lastElementChild.firstElementChild.textContent = e.target.parentNode.title
                emotePreview.lastElementChild.lastElementChild.textContent = e.target.src
            }
        }
    })



    /*
    *
    * // Change background of emote on hover //
    *
    */

    var previousHover = null
    document.body.addEventListener('mouseover', (e)=> {
        if(e.target.className[0] != undefined && e.target.classList && e.target.classList.length != 0){

            isHoveringDiv = e.target.className.includes('emoteContainer')
            isHoveringImg = e.target.className.includes('emoteimg')
            
            if(isHoveringDiv || isHoveringImg){
                if(previousHover){
                    previousHover.classList.remove('theme2', 'hoveringEmote')
                }

                if(isHoveringDiv){
                    e.target.classList.add('theme2', 'hoveringEmote')
                }
                else if(isHoveringImg){
                    e.target.parentNode.classList.add('theme2', 'hoveringEmote' )
                }

                previousHover = (isHoveringDiv) ? e.target : e.target.parentNode
            }

            else if(previousHover){
                previousHover.classList.remove('theme2', 'hoveringEmote')
            }
        }
    })



    /*
    *
    * // Emote Context Menu //
    *
    */

    document.head.appendChild(document.createElement('style')).textContent = `.cmDiv{padding: 6px 8px; border-radius: 5px; display: flex; align-items: center; transition: .09s all; cursor: pointer; user-select: none;} .cmDiv:hover{background: #6969691c;} .cmDiv:active{transition: .2s; opacity: .4;}`
    document.body.appendChild(document.createElement('div')).outerHTML = `<div id="emoteCM" class="theme2 border1" style="display: none; transition: .15s opacity; box-shadow: 0 30px 90px -20px rgb(0 0 0 / 30%), 0 0 1px 1px rgb(0 0 0 / 5%); position: absolute; width: 250px; padding: 5px; border-radius: 7px; font-size: 15px; " class="theme1"><div class="cmDiv"><svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 0 24 24" width="19px" fill="currentColor" style=" margin-right: 10px; "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg> <a style=" ">Favorite Emote</a></div> <div class="cmDiv"><svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 0 24 24" width="19px" fill="currentColor" style=" margin-right: 10px; "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg> <a>Delete Emote</a></div> <div class="cmDiv"><svg xmlns="http://www.w3.org/2000/svg" height="19px" viewBox="0 0 24 24" width="19px" fill="currentColor" style=" margin-right: 10px; "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg> <a>Edit Emote</a></div> </div>`

    const emoteCM       = document.getElementById('emoteCM')
    const favEmote      = emoteCM.children[0]
    const deleteEmote   = emoteCM.children[1]
    const editEmote     = emoteCM.children[2]

    // Show CM
    document.body.addEventListener('contextmenu', (e)=> {
        if(e.target.className[0] != undefined && e.target.classList && e.target.classList.length != 0){
            isHoveringDiv = e.target.className.includes('emoteContainer')
            isHoveringImg = e.target.className.includes('emoteimg')
            isTwitchEmote = e.target.className.includes('twitch')
            isHoveringCM = e.target == emoteCM || emoteCM.contains(e.target)

            if(isTwitchEmote){
                e.preventDefault()
                return
            }
            if(!isHoveringDiv && !isHoveringImg && !isHoveringCM) return
            e.preventDefault()

            cmState('show')
            emoteCM.style.left = e.clientX + 'px'
            emoteCM.style.top = e.clientY + window.scrollY + 'px'

            emoteCM.setAttribute('emote', (isHoveringDiv) ? e.target.title : e.target.parentNode.title)

            // Show Favorite/Unfavorite text
            allemotes = JSON.parse(localStorage.getItem('bwrd_emotes'))
            emoteInfo = allemotes[allemotes.findIndex(obj => obj.name == emoteCM.getAttribute('emote'))]
            favEmote.lastElementChild.textContent = (!emoteInfo.favorite) ? 'Favorite Emote' : 'Unfavorite Emote'
        }
    })

    // Hide CM
    document.body.addEventListener('mousedown', (e)=> {
        if(e.target != emoteCM && !emoteCM.contains(e.target) && e.button == 0){
            cmState('hide')
        }
    })

    function cmState(st){
        if(st == 'show'){
            emoteCM.style.display = 'block'
            emoteCM.style.opacity = '1'
        }
        else if(st == 'hide'){
            emoteCM.style.opacity = '0'
            emoteCM.setAttribute('emote', '')
            setTimeout(()=> {
                emoteCM.style.display = 'none'
            }, 150)
        }
    }



    /*
    *
    * // Favorite Emote //
    *
    */

    favEmote.onclick = ()=> {
        const emotes = JSON.parse(localStorage.getItem('bwrd_emotes'))
        const emoteIndex = emotes.findIndex(obj => obj.name == emoteCM.getAttribute('emote'))

        // Favorite Emote
        if(!emotes[emoteIndex].favorite){
            emotes[emoteIndex].favorite = true
        }

        // Unfavorite Emote
        else if(emotes[emoteIndex].favorite){
            emotes[emoteIndex].favorite = false
        }

        localStorage.setItem('bwrd_emotes', JSON.stringify(emotes))
        refreshEmotes()
        cmState('hide')
    }



    /*
    *
    * // Delete Emote //
    *
    */

    deleteEmote.onclick = ()=> {
        allemotes = JSON.parse(localStorage.getItem('bwrd_emotes'))
        val = emoteCM.getAttribute('emote')

        for(var i=0;i<allemotes.length;i++){
            if(allemotes[i].name == val) {allemotes.splice(i, 1)}
        }
        
        localStorage.setItem('bwrd_emotes', JSON.stringify(allemotes))
        refreshEmotes()
        cmState('hide')
    }



    /*
    *
    * // Edit Emote //
    *
    */

    editEmote.onclick = ()=> {
        const emotes = JSON.parse(localStorage.getItem('bwrd_emotes'))
        const emoteIndex = emotes.findIndex(obj => obj.name == emoteCM.getAttribute('emote'))
        const emoteInfo = emotes[emoteIndex]
        editdiv = document.getElementById('emoteEdit')
        eview = document.getElementById('emotesView')

        editdiv.style.transform = 'none'
        eview.classList.add('nonVisibleMenu')

        document.getElementById('emotePreview').src = emoteInfo.url
        document.getElementById('emoteNameTop').textContent = emoteInfo.name
        document.getElementById('emoteUrlTop').textContent = emoteInfo.url
        document.getElementById('editEmoteName').value = emoteInfo.name
        document.getElementById('editEmoteUrl').value = emoteInfo.url
        document.getElementById('saveEdit').setAttribute('emoteIndex', emoteIndex)
        document.getElementById('favSymbol').style.display = (emoteInfo.favorite) ? 'flex' : 'none'

        refreshEmotes()
        cmState('hide')
    }

    function updateEmote(newName, newUrl, index){
        allemotes = JSON.parse(localStorage.getItem('bwrd_emotes'))

        function checkImage(imgsrc, callback){
            var img = new Image()
            img.onload = ()=> {callback(true, img.width, img.height, new URL(imgsrc).host)}
            img.onerror = ()=> {callback(false)}
            img.src = imgsrc
        }

        if(newName.trim() == '' || newUrl.trim() == ''){
            alert('Please fill the required fields to edit the emote.')
            return
        }

        // Replace webp with png for discord emotes
        if(newUrl.startsWith('https://cdn.discordapp.com/') && newUrl.endsWith('webp')){
            alert('fdf')
            newUrl = newUrl.replace('.webp', '.png')
            alert(newUrl)
        }
        
        if(newUrl.slice(-3) != 'png' && newUrl.slice(-3) != 'gif') {alert('Emote has to be a PNG or GIF.'); return}

        checkImage(newUrl, (exists, width, height, host) => {

            // Check if image URL is valid
            if(!exists){
                alert('This image doesn\'t exist.')
                return
            }

            // Check if URL hostname is Discord, Gyazo, Imgur etc.
            if(host != 'discord.com' && host != 'cdn.discordapp.com' && host != 'media.discordapp.net' && host != 'gyazo.com' && host != 'i.gyazo.com' && host != 'imgur.com' && host != 'i.imgur.com' && host != 'ibb.co' && host != 'i.ibb.co'){
                alert('Only discord, gyazo, imgur & imgbb images are allowed.')
                return
            }

            // Check if image width/height is greater or equal to 200
            if(width >= 200 || height >= 200){
                if(!window.confirm(`This emote's size is ${width} x ${height} which might look huge on posts. Do you still want to edit it?`)) return
            }


            allemotes[index].name = newName
            allemotes[index].url = newUrl
    
            localStorage.setItem('bwrd_emotes', JSON.stringify(allemotes))
            refreshEmotes()
            closeMenus()
        })
    }

    function closeMenus(){
        document.getElementById('emoteEdit').style.transform = 'translateX(230px)'
        document.getElementById('emotesView').classList.remove('nonVisibleMenu')
        document.querySelector('#viewEmote').style.display = 'none'
    }



    /*
    *
    * // Twitch Emotes //
    *
    */

    const twitchDiv     = document.querySelector('.twitchscrollemotes')
    const defaultDiv    = document.querySelector('.scrollemotes')
    const twitchTabBtn  = document.querySelector('.twitchTabBtn')
    const defaultTabBtn = document.querySelector('.defaultTabBtn')

    function twitchTab(){
        if(!twitchDiv.getAttribute('isloaded')){

            fetch('https://betterwrd.vercel.app/bwrd/emotes.json').then((response)=>{return response.json()}).then((emotes) => {
                emotes.forEach(emote => {
                    emoteElm = document.createElement('div')
                    twitchEmotesDiv = document.getElementById('twitchemotes')
            
                    twitchEmotesDiv.appendChild(emoteElm)
                    emoteElm.outerHTML = `<div title="${emote.name}" class="twitchEmote emoteContainer" style=" overflow: hidden; min-height: 36px; max-height: 36px; min-width: 36px; max-width: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center;"><img class="twitchemoteimg emoteimg" src="${emote.url}" style="max-height: 30px; max-width: 30px;"> </div>`
                })
            })

            twitchDiv.setAttribute('isloaded', 'yes')
        }

        localStorage.setItem('bwrd_emotestab', 'twitch')

        twitchTabBtn.style.opacity = '1'
        defaultTabBtn.style.opacity = '.3'

        defaultDiv.style.display = 'none'
        twitchDiv.style.display = 'block'
    }

    function defaultTab(){
        localStorage.setItem('bwrd_emotestab', 'default')

        defaultTabBtn.style.opacity = '1'
        twitchTabBtn.style.opacity = '.3'

        twitchDiv.style.display = 'none'
        defaultDiv.style.display = 'block'
    }

    (localStorage.getItem('bwrd_emotestab') == 'twitch') ? twitchTab() : defaultTab()



    /*
    *
    * // Expand/Collapse Sections //
    *
    */

    function expandCollapse(section, isonload){
        var isCollapsed = localStorage.getItem(`bwrd_emotesections_${section.id}`) == 'collapsed'

        function collapse(){
            section.nextElementSibling.style.display = 'none'
            section.lastElementChild.style.transform = 'rotate(-90deg)'
            document.querySelector('#noemotes').style.visibility = 'hidden'
        }
        function expand(){
            section.nextElementSibling.style.display = 'grid'
            section.lastElementChild.style.removeProperty('transform')
            document.querySelector('#noemotes').style.visibility = 'visible'
        }

        // Collapse
        if(!isCollapsed){
            if(!isonload){
                collapse()
                localStorage.setItem(`bwrd_emotesections_${section.id}`, 'collapsed')
            }
            else {expand()}
        }

        // Expand
        else if(isCollapsed){
            if(!isonload){
                expand()
                localStorage.setItem(`bwrd_emotesections_${section.id}`, 'expanded')
            }
            else {collapse()}
        }
    }

    document.querySelectorAll('.sectionexpand').forEach(el => {
        expandCollapse(el, true)
    })



    /*
    *
    * // Show/Hide Emotes Button //
    *
    */

    const containerDiv  = document.querySelector('.g-recaptcha').parentElement
    const emoteButton   = document.createElement('a')
    
    emoteButton.className = 'emoteBtn'
    emoteButton.setAttribute('style', 'float: left; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 7px; transition: .09s background; cursor: pointer;')
    emoteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 0 24 24" width="22px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path></svg>`

    // Function
    function showHideEmotes(isonload){
        let saved    = localStorage.getItem('bwrd_emotestate')
        let emotediv = document.querySelector('#emotesdiv')

        if(!saved){
            localStorage.setItem('bwrd_emotestate', 'show')
            return
        }
        
        function show(){
            emotediv.style.display = 'flex'
            setTimeout(()=> {
                emotediv.style.transform = 'none'
            }, 10)
        }

        function hide(){
            emotediv.style.transform = (document.body.offsetWidth > 1500) ? 'translateX(-50vh)' : 'scale(0)'
            if(!isonload){
                setTimeout(()=> {
                    emotediv.style.display = 'none'
                }, 333)
            }
        }

        if(saved == 'hide'){
            if(!isonload){
                show()
                localStorage.setItem('bwrd_emotestate', 'show')
            }
            else{
                hide()
            }
        }
        else if(saved == 'show'){
            if(!isonload){
                hide()
                localStorage.setItem('bwrd_emotestate', 'hide')
            }
            else{
                show()
            }
        }
    }
    showHideEmotes(true)

    // Events
    emoteButton.onclick         = ()=> {showHideEmotes()}
    emoteButton.onmouseenter    = ()=> {emoteButton.classList.add('theme1')}
    emoteButton.onmouseleave    = ()=> {emoteButton.classList.remove('theme1')}

    // Append
    containerDiv.appendChild(emoteButton)



    /*
    *
    * // Emote Search //
    *
    */

    const emoteSearch = document.querySelector('#emoteSearch')
    emoteSearch.addEventListener('keyup', ()=> {
        document.querySelectorAll('.emoteContainer').forEach(emote => {
            emote.style.display = (emote.title.toLowerCase().includes(emoteSearch.value.toLowerCase().trim())) ? 'flex' : 'none'
        })
    })
}