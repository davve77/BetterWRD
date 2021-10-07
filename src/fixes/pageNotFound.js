// Name: Page Not Found Error Fix
// Desc: Self-explanatory, easy to fix as shown in the code below

var notfound = document.getElementsByTagName('p')[0]

if(notfound && notfound.textContent.includes('The requested') && location.href.includes('__')){
    location = location.href.split('?_')[0]
    notfound.textContent = 'Redirecting to the working page...'
    notfound.style.color = 'yellow'
}