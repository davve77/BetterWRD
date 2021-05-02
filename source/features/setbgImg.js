// Name: Set Background Image
// Desc: WORKS BEST WITH NIGHT THEME FOR NOW.

var bg = document.body
navbar = document.getElementById('navigationbar')

chrome.storage.local.get(['bgimgUrl', 'transpStuff'], function(saved){
    if(saved.bgimgUrl == null) return
    if(document.getElementsByTagName('span')[0].innerHTML.includes('Checking')) return

    // Set bg image
    bg.style.background = `url(${saved.bgimgUrl})`

    // Not done
    if(saved.transpStuff){
            // For main page
            document.head.appendChild(document.createElement('style')).innerHTML = '.theme1{background-color: rgb(0 0 0 / 50%);}'
            navbar.style.background = 'rgb(0 0 0 / 50%)'

            // For other pages
            document.head.appendChild(document.createElement('style')).innerHTML = '.theme2{background-color: rgb(0 0 0 / 50%);}'
            document.getElementsByTagName('footer')[0].style.color = '#ffffff'
    }
})