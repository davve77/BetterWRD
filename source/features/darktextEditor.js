// Name: Dark Text Editor
// Desc: Makes the text editor dark. Looks best with Night theme enabled

function darkeditor(){
   toolbarbtns = document.querySelectorAll('.tox .tox-tbtn svg')
   toolbar = document.querySelector('.tox-toolbar__primary')
   stbar = document.getElementsByClassName('tox-statusbar')[0]
   textbox = document.getElementById('topic')
   editor = document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce')

   for(var i=0, l=toolbarbtns.length; i<l; i++) {toolbarbtns[i].style.fill = 'rgb(200,200,200)'}

   toolbar.style.background = 'rgb(37,37,37)'
   toolbar.style.borderBottom = '1px solid rgb(80,80,80)'
   stbar.style.backgroundColor = 'rgb(37,37,37)'
   stbar.style.borderTop = '1px solid rgb(80,80,80)'

   document.getElementById('editor_ifr').contentWindow.document.documentElement.style.colorScheme = 'dark'
   document.getElementsByClassName('tox-tinymce')[0].style.border = '0px'
   
   if(textbox){
      textbox.style.backgroundColor = 'rgb(40,40,40)'; textbox.style.color = 'white'
      textbox.style.border = '0px'; textbox.style.outline = 'none'
      textbox.style.padding = '10px'; textbox.style.marginTop = '10px'
   }
   
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-dialog-wrap__backdrop{background-color:rgb(0 0 0 / 75%);}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-swatches__picker-btn svg{fill:white;}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-tbtn svg{fill:rgb(200,200,200);}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type){border-right:1px solid rgb(80,80,80);}'

   editor.style.color = 'white'
   editor.style.background = 'rgb(40,40,40)'
   editor.setAttribute('data-mce-placeholder', '')
}

document.head.appendChild(document.createElement('script')).innerHTML = `tinymce.remove('#editor'); tinymce.init({ selector: '#editor', menubar: false, plugins: 'link hr lists codesample', toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright | fontsizeselect forecolor | bullist numlist blockquote link hr codesample | undo redo', height: 300, content_style: "p {margin: 0}", relative_urls: false, remove_script_host : true, skin: 'oxide-dark', codesample_languages: [ { text: 'Lua', value: 'lua' }, { text: 'C++', value: 'cpp' }, { text: 'C#', value: 'csharp' }, { text: 'PHP', value: 'php' }, { text: 'JavaScript', value: 'javascript' }, { text: 'HTML/XML', value: 'markup' }, { text: 'CSS', value: 'css' }, ], });`
setTimeout(()=> {
   try {darkeditor()}
   catch {setTimeout(darkeditor, 1500)}
}, 500)