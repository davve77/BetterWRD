// BWRD Update Checker
// Checks if there's a newer version of BWRD

const extensionver = chrome.runtime.getManifest().version

if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox, update checks aren't needed for Firefox as it auto-updates
    fetch('https://api.github.com/repos/davve77/BetterWRD/releases/latest')
    .then(res => res.json())
    .then((out) => {

        if(!out['tag_name']) return

        // Check version
        if(out['tag_name'] != extensionver && !out['tag_name'].includes('BETA')){

            // Show Update Popup
            updatediv = document.getElementById('updatediv')
            updatediv.style.display = 'block'
            document.getElementById('updatebwrddiv').className = 'show'

            document.getElementById('downloadbtn').addEventListener('click', ()=> {open(out['html_url'])})
            document.getElementById('hidebtn').addEventListener('click', ()=> {
                updatediv.style.opacity = 0
                setTimeout(()=> {updatediv.style.display = 'none'; updatediv.style.opacity = 1}, 300)
            })

            // Update Notification
            document.getElementById('updatebanner').style.display = 'block'
        }
    })
}