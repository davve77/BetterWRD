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

    // BWRD V3.0 top ad
    fetch('https://flameplus.vercel.app/bwrd/notifs/v3.json')
    .then(res => res.json())
    .then((out) => {
        if(out.released == 'yes'){
            var notifelm = document.createElement('div')
            notifelm.innerHTML = `<div style="position: relative;height: 100px;width: 100%;background: #2d2d2d;margin-top: 45px;border-radius: 8px;/*display: none;*/"><img style="position: absolute;left: 0;width: 100px;height: 100%;margin-left: 15px;" src="https://i.gyazo.com/9e64301669cf394065e2a0195d7e18f4.png" draggable="false">
            <div style="margin-left: 130px;height: 100%;padding: 10px;padding-left: 15px;background: rgb(40,40,40);border-radius: 0 8px 8px 0;">
                <p style="font-size: 20px;color: rgb(207,207,207);display: table;margin-bottom: 10px;">BWRD Version 3.0 is out! Go check it out now.<br></p><a href="https://github.com/davve77/BetterWRD/releases/latest" class="btn btn-primary" id="carddl" style="width: 160px; display: table;border-style: none;box-shadow: none;background: linear-gradient(to right, #8aaaff, rgba(237,98,206,0.88))!important;color: black;" type="button">Download now<span class="material-icons-outlined settingtextspan" style="margin-left: 2px;vertical-align: text-top;font-size: 20px;">file_download<br></span></a>
                <p style="font-size: 19px;color: rgba(207,207,207,0.6);display: none;">BetterWRD V4.0 is out! Go check it out.<br></p>
            </div>
        </div>`

            document.getElementById('settingsdiv').prepend(notifelm)
        }
    })
}