// Name: Text Editor Spellcheck
// Desc: Turns on spellcheck for the Text Editor

setTimeout(()=> {
    // Support for both create post page amd profile manager page
    const editor = document.querySelector('.tox-edit-area').firstElementChild.contentWindow.document.getElementById('tinymce')

    try {
        editor.setAttribute('spellcheck', 'true')}
    catch {setTimeout(()=> {
        editor.setAttribute('spellcheck', 'true')
    }, 1500)}   
}, 500)