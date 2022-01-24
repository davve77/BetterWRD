// Name: Create textbox for thread pages
// Desc: Makes thread page navigation easier, just write the page number in the textbox and you'll get redirected there

var input = document.createElement('input')
topdiv = document.querySelector('[style="text-align: right"]')

document.head.appendChild(document.createElement('style')).textContent = '.pagetextbox{margin-right:3px;color:white;outline:0px;width:45px;margin-top:-10px;margin-bottom:-10px;text-align:center;}'

input.id = 'pageinput'
input.type = 'text'
input.placeholder = '1'
input.style.position = ''
input.classList.add('theme1', 'round', 'pagetextbox', 'btn_newrelpy')
topdiv.appendChild(input)
topdiv.insertBefore(input, topdiv.firstChild)

if(location.href.includes('page')) {input.placeholder = location.href.split('=')[1].split('&')[0]}
if(document.cookie.includes('bright')) {input.style.color = 'black'}

input.addEventListener('change', ()=>{
    if(!isNaN(parseInt(input.value))){ // Checks if input.value is a number
        if(location.href.includes('page')) {location = `${location.href.split('=')[0]}=${input.value}`}
        else {location.href += `?page=${input.value}`}
    }
})

if(document.getElementById('themer')){
    document.getElementById('themer').addEventListener('click', ()=> {
        if(document.cookie.includes('night')) {input.style.color = 'white'}
        else {input.style.color = 'black'}
    })
}

setTimeout(()=> {
    if(localStorage.getItem('bwrd_thememode') == 'night') {input.style.color = 'white'}
    else {input.style.color = 'black'}
}, 400)