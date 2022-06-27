// BetterWRD Settings Backup


function saveBackup(Settings){
    if(!Settings) return

    let dlelm = document.createElement('a')
    let date = new Date()

    // Download
    dlelm.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(Settings)}`)
    dlelm.setAttribute('download', `BetterWRD Settings ${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}.backup`)
    dlelm.style.display = 'none'
    document.body.appendChild(dlelm)
    dlelm.click()
    dlelm.remove()
}

function loadBackup(){
    let selectfile = document.querySelector('#selectfile')

    selectfile.addEventListener('change', ()=> {
        let filetoread = selectfile.files[0]
        let filereader = new FileReader()

        // Name doesn't end with .backup
        if(!filetoread.name.endsWith('.backup')) {showToast('This is not a backup file.'); return}

        filereader.addEventListener('load', (e)=> {
            let result = e.target.result

            // Error
            try{JSON.parse(result)} catch{showToast('Failed to load backup.'); return}

            // Clear settings & load backup
            chrome.storage.local.clear(()=> {
                chrome.storage.local.set(JSON.parse(result))
                showToast('Backup has been loaded.')
            })
        })
        
        filereader.readAsText(filetoread, 'UTF-8')
    })

    selectfile.click()
}


// Save backup button
document.querySelector('#saveBackupBtn').addEventListener('click', ()=> {
    chrome.storage.local.get(null, (saved)=> {
        saveBackup(JSON.stringify(saved))
    })
})

// Load backup button
document.querySelector('#loadBackupBtn').addEventListener('click', loadBackup)