// Name: Text Editor Spellcheck
// Desc: Turns on spellcheck for the Text Editor

window.addEventListener('load', ()=> {
    setTimeout(()=> {
        const editor = document.querySelector('.tox-edit-area') ? document.querySelector('.tox-edit-area').firstElementChild.contentWindow.document.getElementById('tinymce') : null
        if(!editor) return

        editor.setAttribute('spellcheck', 'true')
    }, 1500)
})