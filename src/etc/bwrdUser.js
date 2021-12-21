// BetterWRD User
// Shows other BWRD users that a post creator used BetterWRD when making that post

var textelm = `<p><a target="bwrdUser"> </a></p>`

// Show 'BWRD User' in user stats div
if(document.getElementsByClassName('replygroup')[0]){

    // Styles
    document.head.appendChild(document.createElement('style')).innerHTML = `#bwrduser{ display: inline-flex; align-items: center; font-size: 18px; font-style: italic; font-weight: 400; user-select: none; margin-top: -10px; } #bwrduserimg{ width: 55px; height: 55px; -webkit-user-drag: none; margin-right: 2px; }`

    // Main
    const userstatsdivs = document.querySelectorAll('.userstats')
    userstatsdivs.forEach(elms => {
        if(!elms.parentNode.parentNode.innerHTML.includes('target="bwrdUser"')) return
        elms.appendChild(document.createElement('div')).innerHTML = `<span id="bwrduser" title="This user has used BetterWRD when creating this post."><img id="bwrduserimg" src="https://i.imgur.com/CSDfsvi.png" style="">User</span>`
    })
}

// Show other BWRD users that you're using BetterWRD
function bwrduser(){
    const tinymcetext = document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce')
    if(tinymcetext.innerHTML.includes(textelm)) return
    tinymcetext.innerHTML += textelm
}
if(document.getElementsByClassName('g-recaptcha')[0]){
    setTimeout(()=> {
        try {bwrduser()}
        catch {setTimeout(bwrduser, 3000)}
     }, 2500)
}