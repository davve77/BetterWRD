// Name: Create textbox for thread pages
// Desc: Makes thread page navigation easier, just write the page number in the textbox and you'll get redirected there

// CSS
util.addRule(`
.pagetextbox{
    margin-right:3px;
    color:white;
    outline:0px;
    width:45px;
    margin-top:-10px;
    margin-bottom:-10px;
    text-align:center;
}`)

// Create input
const input = document.createElement('input')

// Attributes
Object.assign(input, {
    id: 'pageinput',
    type: 'text',
    placeholder: (/page/.test(location.href)) ? location.href.split('page=')[1].split('&')[0].split('?')[0] : '1',
    className: 'theme1 border1 round pagetextbox btn_newreply padding',
})

// Event
input.setAttribute('onchange', 'inputPage(this)')

// Change page number
function inputPage(elm){
    if(isNaN(elm.value)) return

    if(/page/.test(location.href) && elm.value != 1){
        location = `${location.href.split('=')[0]}=${elm.value}`
    }
    else{
        if(elm.value == 1){
            location.href = location.pathname
        }
        else{
            location.href += `?page=${elm.value}`
        }
    }
}

// Append to both button divs
setTimeout(()=> {
    document.querySelectorAll('[style="text-align: right"]').forEach(div => {
        div.insertBefore(input.cloneNode(true), div.firstChild)
    })
})