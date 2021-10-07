// Name: Transparent profile pic background
// Desc: Makes user's profile picture background transparent, getting rid of the grey bg.

var pfps = document.getElementsByClassName('thread_pfp')
for(var i=0, l=pfps.length; i<l; i++) {pfps[i].style.backgroundColor = '#80808000'}