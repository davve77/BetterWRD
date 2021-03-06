// Load Live Editor

var jseditor
var csseditor
var editor = document.getElementById('monaco')
var monacoURL = document.getElementById('monacoscript').getAttribute('monacoUrl')

require.config({ paths: { 'vs': `${monacoURL}/monaco/vs` }})
require(["vs/editor/editor.main"], () => {
    monaco.editor.defineTheme('transparentbg', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          "editor.background": '#00000000',
          'editor.lineHighlightBorder': '#00000000',
        }
      })

    jseditor = monaco.editor.create(document.getElementById('jsmonaco'), {
        language: 'javascript',
        theme: 'transparentbg',
        automaticLayout: true,
        minimap:{enabled:false},
        value: editor.getAttribute('themejs')
    })
    
    csseditor = monaco.editor.create(document.getElementById('cssmonaco'), {
        language: 'css',
        theme: 'transparentbg',
        automaticLayout: true,
        minimap:{enabled:false},
        value: editor.getAttribute('themecss')
    })

    jseditor.getModel().onDidChangeContent((e) => {
        editor.setAttribute('themejs', jseditor.getValue())
    })
    csseditor.getModel().onDidChangeContent((e) => {
        editor.setAttribute('themecss', csseditor.getValue())
        document.getElementById('bwrdThemeCSS').innerHTML = csseditor.getValue()
    })
})