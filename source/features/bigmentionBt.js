// Name: Bigger mention button
// Desc: Makes the 'Mention' button in threads bigger

var mentionbuttons = document.getElementsByClassName('btnmention')

for(var i=0, l=mentionbuttons.length; i<l; i++){
    mentionbuttons[i].style.width = '70px'
    mentionbuttons[i].style.height = '30px'
    mentionbuttons[i].style.textAlign = 'center'
    mentionbuttons[i].style.padding = '5px 6px'
}