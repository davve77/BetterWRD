// Name: Dark Text Editor
// Desc: Makes the text editor dark. Looks best with Night theme enabled

function darkeditor(){
   toolbarbtns = document.querySelectorAll('.tox .tox-tbtn svg')
   toolbar = document.querySelector('.tox-toolbar__primary')
   stbar = document.getElementsByClassName('tox-statusbar')[0]
   if(document.getElementById('editor_ifr')) {editor = document.getElementById('editor_ifr').contentWindow}
   else {editor = document.getElementById('signature_ifr').contentWindow}
   editortinymce = editor.document.getElementById('tinymce')

   for(var i=0, l=toolbarbtns.length; i<l; i++) {toolbarbtns[i].style.fill = 'rgb(200,200,200)'}

   toolbar.style.background = 'rgb(37,37,37)'
   toolbar.style.borderBottom = '1px solid rgb(80,80,80)'
   stbar.style.backgroundColor = 'rgb(37,37,37)'
   stbar.style.borderTop = '1px solid rgb(80,80,80)'

   editor.document.documentElement.style.colorScheme = 'dark'
   editor.document.head.appendChild(document.createElement('style')).innerHTML = `.mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before { display: none; }`
   document.getElementsByClassName('tox-tinymce')[0].style.border = '0px'
   
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-dialog-wrap__backdrop{background-color:rgb(0 0 0 / 75%);}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-swatches__picker-btn svg{fill:white;}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox .tox-tbtn svg{fill:rgb(200,200,200);}'
   document.head.appendChild(document.createElement('style')).innerHTML = '.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type){border-right:1px solid rgb(80,80,80);}'

   editortinymce.style.color = 'white'
   editortinymce.style.background = 'rgb(40,40,40)'
   editortinymce.setAttribute('data-mce-placeholder', '')
}

setTimeout(()=> {
   if(localStorage.getItem('bwrd_thememode') == 'night' && !getComputedStyle(document.body).background.includes('255, 168, 237')){
      // For post create page
      if(document.getElementsByClassName('g-recaptcha')[0]){document.querySelector('.tox-edit-area').firstElementChild.contentWindow.document.getElementById('tinymce')
         document.head.appendChild(document.createElement('script')).innerHTML = `tinymce.remove('#editor'); tinymce.init({ selector: '#editor', menubar: false, plugins: 'link hr lists codesample', toolbar: 'bold italic underline strikethrough | alignleft aligncenter alignright | fontsizeselect forecolor | bullist numlist blockquote link hr codesample | undo redo', height: 300, content_style: "p {margin: 0}", relative_urls: false, remove_script_host : true, skin: 'oxide-dark', codesample_languages: [ { text: 'Lua', value: 'lua' }, { text: 'C++', value: 'cpp' }, { text: 'C#', value: 'csharp' }, { text: 'PHP', value: 'php' }, { text: 'JavaScript', value: 'javascript' }, { text: 'HTML/XML', value: 'markup' }, { text: 'CSS', value: 'css' }, ], });`
         setTimeout(()=> {
            try {darkeditor()}
            catch {setTimeout(darkeditor, 1500)}
         }, 500)
      }
   
      // For profile manager page
      else{
         document.head.appendChild(document.createElement('script')).innerHTML = `tinymce.remove('#signature'); tinymce.init({selector: '#signature', menubar: false, plugins: 'link hr lists', toolbar: 'italic underline strikethrough | alignleft aligncenter alignright | forecolor | link | undo redo', height: 160, content_style: "p {margin: 0}", relative_urls: false, remove_script_host : true, skin: 'oxide-dark'});`
         setTimeout(()=> {
            try {darkeditor()}
            catch {setTimeout(darkeditor, 1500)}
         }, 500)
      }
   }
}, 400)