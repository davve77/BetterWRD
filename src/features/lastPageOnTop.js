// Name: '>>>' Button on top of threads
// Desc: Puts the go to last page button on the top of the thread

var div = document.querySelector('[style="text-align: right"]')
var gotolast = document.getElementsByTagName('a')

for(var i=0, l=gotolast.length; i<l; i++) {if(gotolast[i].textContent == '>>>') {var foundgotolast = gotolast[i]}}

if(foundgotolast){
    clone = div.appendChild(foundgotolast.cloneNode(true))
    div.insertBefore(clone, div.firstChild)
    clone.textContent = '>>>'
    clone.href = foundgotolast.href
}