// Name: Night theme Pinned thread icon
// Desc: Makes the Pin icon white for night theme users

var pins = document.getElementsByClassName('pin')

if(pins && document.cookie.includes('night')){
    for(var i=0, l=pins.length; i<l; i++) {pins[i].style.background = 'url(https://cdn.discordapp.com/attachments/800294579856605204/833441788521480233/pin.svg)'}
}