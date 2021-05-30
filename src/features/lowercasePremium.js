// Name: Lowercased Premium Usernames
// Desc: Disables forced username uppercase for users with Premium

var premiumusers = document.getElementsByClassName('patron')
for(var i=0, l=premiumusers.length; i<l; i++) {premiumusers[i].style.textTransform = 'none'}