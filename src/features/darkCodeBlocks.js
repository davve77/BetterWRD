// Name: Dark Code blocks
// Desc: Makes code blocks dark theme

setTimeout(()=> {
    if(localStorage.getItem('bwrd_thememode') == 'night'){
        document.head.appendChild(document.createElement('style')).innerHTML = `
        pre[class*=language-]{
            background: rgb(40 40 40);
            border-radius: 10px;
        }
        .token.operator, .token.entity, .token.url, .token.string{
            background: none;
        }
        code[class*=language-]{
            color: rgb(255,255,255);
            text-shadow: none;
        }`
    }
}, 200)