// Temporary BWRD Update Checker
// Checks if there's a newer version everytime you open the BWRD settings page, it's not good and I'm aware of that. That's why it's temporary.

fetch('https://flameplus.vercel.app/bwrd/ver.json')
.then(res => res.json())
.then((out) => {
    if(out.version != chrome.runtime.getManifest().version){
        var body = document.body
        var oldbody = body.innerHTML

        body.innerHTML = `<body class="unselectable" style="background-color: rgb(30,30,30);color: rgb(250,250,250);font-family: Roboto, sans-serif;"><div id="toast" class="toast">Settings saved and applied.</div> <h1 class="text-center center" style="font-size: 21px;color: rgb(205,205,205);"><strong><em>there's a new version available. please download it asap.</em></strong></h1> <div class="btn-group center" role="group" style="margin-top: 60px;"><a id="downloadbtn" class="btn btn-primary" role="button" target="_blank" style="background-color: rgb(78,79,81);border-style: none;box-shadow: none;">Okay, take me to the download page</a><button class="btn btn-primary" type="button" id="hidebtn" style="background-color: rgb(78,79,81);border-style: none;box-shadow: none;margin-left: 15px;">Not now, show me the Settings</button></div> <script src="/js/jquery-3.3.1.min.js"></script> <script src="/bootstrap/js/bootstrap.min.js"></script> </body>`
        document.getElementById('downloadbtn').href = out.link

        document.getElementById('hidebtn').addEventListener('mouseup', ()=> {
            body.innerHTML = oldbody
            document.head.appendChild(document.createElement('script')).src = chrome.runtime.getURL('settings/settingsManager.js')
        })
    }
})