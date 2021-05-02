//Name: Fix Vermillion Profile media link
//Desc: Gets rid of 'amp;' in the v3rm link, the bug causes you to get redirected to your own v3rm profile

var verm = document.querySelector('[title="V3rmillion Profile"]')
if(verm) {verm.href = verm.href.replace('amp;', '')}