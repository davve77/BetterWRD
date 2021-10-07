// Name: Dark theme guidelines page
// Desc: Doesn't exterminate your eyes when you decide to read the rules & other pages

if(document.cookie.includes('night') && location.pathname.includes('guidelines') || location.pathname.includes('privacy') || location.pathname.includes('terms')){
    document.body.style.backgroundColor = '#181919'
    document.body.style.color = 'white'
}