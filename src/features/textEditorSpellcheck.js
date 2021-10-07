// Name: Text Editor Spellcheck
// Desc: Turns on spellcheck for the Text Editor

try {
    document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce').setAttribute('spellcheck', 'true')}
catch {setTimeout(()=> {
    document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce').setAttribute('spellcheck', 'true')
}, 1500)}