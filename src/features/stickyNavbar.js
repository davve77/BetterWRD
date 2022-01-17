// Name: Sticky Navigation Bar
// Desc: The navbar will always be at the top of your screen even when you scroll down on the page

const wrdnavbar = document.getElementById('navigationbar')
if(wrdnavbar){
    Object.assign(wrdnavbar.style, {
        position: 'sticky',
        top: '0',
        zIndex: '1'
    })
}