// Name: Multi Mentions
// Desc: Allows users to mention multiple people in a single post.

if(document.getElementsByClassName('replygroup')[0] && document.querySelectorAll('[style="text-align: right"]')[1].firstElementChild){ // Checks if you're on a thread page

    // Consts
    const mentionList = []
    const mentionButtons = document.querySelectorAll('.btnmention')

    // Funcs
    function addToMentions(mentionbtn){
        var getid = mentionbtn.parentElement.previousElementSibling.href.split('uid=')[1]
        
        mentionList.push(`<@uid:${getid}>`)

        document.querySelectorAll('.multimentionbtn').forEach(btn => {
            if(btn.parentElement.previousElementSibling.href.split('uid=')[1] == getid) {

                var id = btn.parentElement.previousElementSibling.href.split('uid=')[1]
                var rmvbtn = btn.parentElement.lastElementChild

                btn.style.display = 'none'


                rmvbtn.textContent.includes('Remove')
                ? rmvbtn.style.display = 'inline'
                : createRemoveFromMentionBtn(btn.cloneNode(), btn.parentElement, id)
        
                replybtn = document.querySelector('#replyMultiMentionBtn')
                if(mentionList.length >= 2){
                    replybtn.style.display = 'inline'
                    replybtn.href = location.href + '/newreply?multimention=' + mentionList.toString().replace(/,/g,' ')
                }
            }
        })
    }

    function removeFromMentions(elm){
        var getrmvid = elm.parentElement.previousElementSibling.href.split('uid=')[1]

        for(var i = 0; i < mentionList.length;i++){ 
            if(mentionList[i] == `<@uid:${getrmvid}>`){
                mentionList.splice(i, 1)
            }
        }

        document.querySelectorAll('.rmvmultimentionbtn').forEach(btn => {
            if(btn.parentElement.previousElementSibling.href.split('uid=')[1] == getrmvid){
                
                btn.previousElementSibling.style.display = 'inline'
                btn.style.display = 'none'
        
                replybtn = document.querySelector('#replyMultiMentionBtn')
                mentionList.length >= 2
                ? replybtn.style.display = 'inline'
                : replybtn.style.display = 'none'
                replybtn.href = location.href + '/newreply?multimention=' + mentionList.toString().replace(/,/g,' ')
            }
        })
    }

    function createAddToMentionBtn(mmentionbtn, parentdiv){
        mmentionbtn.textContent = 'Add to Multi-Mention'
        mmentionbtn.removeAttribute('href')
        mmentionbtn.style.cursor = 'pointer'
        mmentionbtn.style.marginLeft = '3px'
        mmentionbtn.style.setProperty('backdrop-filter', 'none', 'important')
        mmentionbtn.classList.add('multimentionbtn')
        mmentionbtn.setAttribute('onclick', `addToMentions(this)`)

        parentdiv.appendChild(mmentionbtn)
    }

    function createRemoveFromMentionBtn(removeBtn, parentdiv, id){
        removeBtn.textContent = 'Remove from Multi-Mention'
        removeBtn.style.marginLeft = '3px'
        removeBtn.style.setProperty('backdrop-filter', 'none', 'important')
        removeBtn.classList.add('rmvmultimentionbtn')
        removeBtn.style.display = 'inline'
        removeBtn.setAttribute('onclick', `removeFromMentions(this)`)

        parentdiv.appendChild(removeBtn)
    }

    // Create Multi-Mention Buttons
    mentionButtons.forEach(mentionbtn => {
        createAddToMentionBtn(mentionbtn.cloneNode(mentionbtn), mentionbtn.parentNode)
    })

    // Create Reply with Multi-Mentions Button
    bottomdiv = document.querySelectorAll('[style="text-align: right"]')[1]
    replyMentionBtn = bottomdiv.firstElementChild.cloneNode()
    replyMentionBtn.id = 'replyMultiMentionBtn'
    replyMentionBtn.textContent = 'New Multi-Mention Reply'
    replyMentionBtn.style.display = 'none'
    bottomdiv.prepend(replyMentionBtn)
}

if(location.href.includes('newreply?multimention')){ // Checks if you're on multi-mention reply page
    const multiMentions = location.href.split('multimention=')[1].replace(/%3C/g,'<').replace(/%3E/g,'>').replace(/%20/g,' ')
    function addEditorText(text){
        editor = document.getElementById('editor_ifr').contentWindow.document
        newtext = editor.createElement('p')
        newtext.textContent = text
        editor.getElementById('tinymce').innerHTML = newtext.outerHTML
    }
    window.addEventListener('load', ()=> {
        setTimeout(()=> {
            try {addEditorText(multiMentions)}
            catch {setTimeout(addEditorText(multiMentions), 2500)}
        }, 500)
    })
}