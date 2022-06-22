// Name: Better Post Buttons
// Desc: Adds icons to post buttons (like, edit, delete)


// Main
if(document.querySelector('.replygroup')){

    function modernizeButton(elm, classlist){
        elm.style.setProperty('padding',    '5px 10px')
        elm.style.setProperty('cursor',     'pointer')
        elm.style.setProperty('display',    'flex')
        elm.style.setProperty('border',     '1px solid #ffffff17', 'important')
        elm.style.setProperty('filter',     'brightness(1.25)')
        elm.className = ((/liked/).test(elm.className)) ? classlist += ' liked' : classlist
    }

    function buttonCheck(elm, string){
        return elm.innerHTML.match(string, 'g')
    }

    document.querySelectorAll('.reply_menu').forEach(e => {
        if(!e.firstElementChild) return

        const likeDiv           = e.firstElementChild
        const editDiv           = e.childNodes[3]
        const delDIv            = e.childNodes[5]
        const modDelDiv         = e.children[1]
        const editIcon          = `<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style=" "><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></path></svg>`
        const deleteIcon        = `<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path></svg>`

        // Like button
        if(likeDiv && buttonCheck(likeDiv, 'btnLikeReply')){
            let likeBtn = likeDiv.firstElementChild
            likeBtn.style.gap = '2px'
            modernizeButton(likeBtn, 'themebtn btn theme1 round border1 btnLikeReply verticalCenter threadbtn')
        }

        // Edit post button
        if(editDiv && buttonCheck(editDiv, 'Edit')){
            let editBtn = editDiv.firstElementChild
            editBtn.innerHTML = editIcon
            modernizeButton(editBtn, 'themebtn btn theme1 round border1 threadbtn')
        }
 
        // Delete post button
        if(delDIv && buttonCheck(delDIv, 'btn_deletereply')){
            let delBtn = delDIv.firstElementChild
            delBtn.innerHTML = deleteIcon
            modernizeButton(delBtn, 'themebtn btn theme1 round border1 btn_deletereply threadbtn')
        }

        // Moderator delete post button
        if(modDelDiv && buttonCheck(modDelDiv, 'btn_deletereply')){
            let modDelBtn = modDelDiv.firstElementChild
            modDelBtn.innerHTML = deleteIcon
            modernizeButton(modDelBtn, 'themebtn btn theme1 round border1 btn_deletereply threadbtn')
        }

        e.style.padding = '5px 10px'
    })

    // CSS
    util.addRule('.reply_menu li>*{margin-left: 4px!important; height: 31px!important;}')

    // Better contrast for Light mode
    if(localStorage['bwrd_thememode'] == 'bright'){
        util.addRule('.threadbtn{filter: brightness(.95)!important;}')
    }
}


// Change Like button background color when liked
if(document.querySelector('.replygroup')){

    const activeColor = '#a5a5a536'
    const likeButtons = []
    const isLiked = btn => (/liked/).test(btn.className)

    function setButton(isLiked, btn){
        if(isLiked) btn.style.setProperty('background', activeColor, 'important')
        else btn.style.removeProperty('background')
    }

    document.querySelectorAll('.btnLikeReply').forEach(likeBtn => {

        // Set button opacity to 1
        likeBtn.style.opacity = '1'

        // Stop if user is logged out
        if(document.querySelector('[href="/login"]')) return

        // Change background on load
        setButton(isLiked(likeBtn), likeBtn)

        // Add like btn to array
        likeButtons.push(likeBtn)
    })

    document.body.addEventListener('click', e => {
        if(likeButtons.includes(e.target)) setButton(!isLiked(e.target), e.target)
    })
}