// Name: Navigation Bar Height
// Desc: Changes nav bar height to the user's choice

const chosenHeight = document.currentScript.getAttribute('data')
const navBar = document.querySelector('#navigationbar')

if(chosenHeight && navBar && chosenHeight != 'auto'){
    navBar.style.height = chosenHeight + 'px'
}