// BWRD Update Checker
// Checks if there's a newer version of BWRD

const extensionver = chrome.runtime.getManifest().version

if(typeof InstallTrigger == 'undefined'){ // Check if user is not using Firefox, update checks aren't needed for Firefox as it auto-updates
    fetch('https://flameplus.vercel.app/bwrd/ver.json')
    .then(res => res.json())
    .then((out) => {
        if(out.version != extensionver && !chrome.runtime.getManifest().name.includes('PRE')){

            // Show Update Popup
            updatediv = document.getElementById('updatediv')
            updatediv.style.display = 'block'
            document.getElementById('updatebwrddiv').className = 'show'

            document.getElementById('downloadbtn').addEventListener('click', ()=> {open(out.link)})
            document.getElementById('hidebtn').addEventListener('click', ()=> {
                updatediv.style.opacity = 0
                setTimeout(()=> {updatediv.style.display = 'none'; updatediv.style.opacity = 1}, 300)
            })

            // Update Notification
            document.getElementById('updatebanner').style.display = 'block'
        }
    })
}