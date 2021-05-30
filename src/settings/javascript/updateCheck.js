// Temporary BWRD Update Checker
// Checks if there's a newer version everytime you open the BWRD settings page, it's not good and I'm aware of that. That's why it's temporary

if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox, update checks aren't needed for Firefox as it auto-updates
    fetch('https://flameplus.vercel.app/bwrd/ver.json')
    .then(res => res.json())
    .then((out) => {
        if(out.version != chrome.runtime.getManifest().version){
            updatediv = document.getElementById('updatediv')
            updatediv.style.display = 'block'

            document.getElementById('downloadbtn').addEventListener('click', ()=> {open(out.link)})
            document.getElementById('hidebtn').addEventListener('click', ()=> {
                updatediv.style.animation = 'fadeout .2s'
                setTimeout(() => {updatediv.remove()}, 190) 
            })
        }
    })
}