// Name: Dark Code blocks
// Desc: Makes the recently added code blocks dark theme, for the night theme users

if(document.querySelectorAll('pre[class*=language-]')){ // Checks if there are any code blocks on the page
    document.querySelectorAll('pre[class*=language-]').forEach(cblocks => cblocks.style.backgroundColor = 'rgb(28, 30, 33)')
    document.querySelectorAll('.token.operator').forEach(cblocks => cblocks.style.backgroundColor = 'rgb(28, 30, 33)')
    document.querySelectorAll('code[class*=language-]').forEach(cblocks => {cblocks.style.textShadow = 'none'; cblocks.style.color = 'rgb(255,255,255)'})
}