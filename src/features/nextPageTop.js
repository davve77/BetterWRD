// Name: Next and Prev thread page buttons on top
// Desc: Puts the 'Next' and 'Prev' buttons on the top of the thread. By default, it's only under the thread page which is inconvenient

var div = document.getElementsByTagName('main')[0].children[2]
var next = document.getElementsByTagName('a')
var prev = document.getElementsByTagName('a')

for(var i=0, l=next.length; i<l; i++) {if(next[i].textContent == 'Next') {var foundnext = next[i]}}
for(var i=0, l=prev.length; i<l; i++) {if(prev[i].textContent == 'Prev') {var foundprev = prev[i]}}

if(foundnext){
    clone = div.appendChild(foundnext.cloneNode(true))
    div.insertBefore(clone, div.firstChild)
    clone.textContent = 'Next'
    clone.href = foundnext.href
}

if(foundprev){
    clone = div.appendChild(foundprev.cloneNode(true))
    div.insertBefore(clone, div.firstChild)
    clone.textContent = 'Prev'
    clone.href = foundprev.href
    clone.style.marginRight = '3px'
}