// Name: Create textbox for thread pages
// Desc: Makes thread page navigation easier, just write the page number in the textbox and you'll get redirected there

var input = document.createElement('input')
topdiv = document.getElementsByTagName('main')[0].children[4]

document.head.appendChild(document.createElement('style')).innerHTML = '.pagetextbox{margin-right:3px;color:white;outline:0px;padding:8px;margin-top:-10px;margin-bottom:-10px;width:35px;text-align:center;}'

input.id = 'pageinput'
input.type = 'text'
input.placeholder = '1'
input.style.position = ''
input.classList.add('theme1', 'round', 'pagetextbox')
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