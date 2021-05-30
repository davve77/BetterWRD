// BWRD Load Monaco

var jseditor
var csseditor

require.config({ paths: {'vs':'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs'}})
require(['vs/editor/editor.main'], ()=> {
    jseditor = monaco.editor.create(document.getElementById('jsmonaco'), {
        value: `// JS Example:\n// WARNING: Do not paste anything in here that you don't understand.\n\ndocument.getElementById('navigationbar').style.background = 'red'`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    })
    
    csseditor = monaco.editor.create(document.getElementById('cssmonaco'), {
        value: `/* CSS Example: */\n\n#navigationbar{\n   background: red;\n}`,
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true
    })
})

if(!location.pathname.includes('edit')){
    document.getElementById('fullscreenmonacojs').addEventListener('click', ()=> {
        document.getElementById('jsmonacobg').requestFullscreen()
    })
    
    document.getElementById('fullscreenmonacocss').addEventListener('click', ()=> {
        document.getElementById('cssmonacobg').requestFullscreen()
    })
}