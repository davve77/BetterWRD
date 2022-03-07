// Theme Name: Classic Bright Theme
// Theme Mode: Bright

document.head.appendChild(document.createElement('style')).textContent = `
body{
    background-color:#f3f2f2;
    color:#313030
}
#navigationbar{
    background:-webkit-linear-gradient(left,white,#EEEEEE);
    background:-o-linear-gradient(left,white,#EEEEEE);
    background:-webkit-gradient(linear,left top,right top,from(white),to(#EEEEEE));
    background:linear-gradient(90deg,white,#EEEEEE)
}
.navItem > * {
    color: black!important;
}
.theme1{
    background-color:#fff
}
.theme2{
    background-color:#eee
}
.border1{
    border:1px solid rgba(0,0,0,.12)
}
.border1-left{
    border-left:1px solid rgba(0,0,0,.12)
}
.border1-bottom{
    border-bottom:1px solid rgba(0,0,0,.12)
}`