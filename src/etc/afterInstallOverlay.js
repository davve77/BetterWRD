// Name: After install overlay div
// Desc: Main purpose of this is to show the changelog after updating


// Vars
var notfirstuse = localStorage.getItem('bwrd_notfirstuse')
var savedver = localStorage.getItem('bwrd_lastchangelog')
var version = chrome.runtime.getManifest().version

if(!document.getElementById('CreditCard') && !document.getElementById('cf-wrapper') && !notfirstuse || !savedver || version != savedver){


    // CSS
    util.addCSS(chrome.runtime.getURL('etc/css/overlay.css'))


    // Create overlay
    let overlay = document.createElement('div')
    document.body.appendChild(overlay)
    overlay.outerHTML = `<div id="bwrdoverlay" style=" position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #00000094; backdrop-filter: blur(16px) contrast(.7); z-index: 9999999; display: flex; align-items: center; justify-content: center; user-select: none;"> <div style="z-index: 1; position: relative; width: 850px; border-radius: 10px; background: #252525; box-shadow: rgb(0 0 0 / 11%) 0px 22px 70px 4px; padding: 20px; padding-top: 0; display: flex; flex-direction: column; align-items: center; margin-top: 125px!important; transition: .167s cubic-bezier(0,0,0,1); transform: translateY(10px); opacity: 0;"><span style=" position: absolute; bottom: 15px; left: 15px; color: #ffffff24; font-size: 12px; ">${version}</span><div style=" position: absolute; top: -125px; "><img draggable="false" src="https://betterwrd.vercel.app/assets/img/BetterWRD_Background.png" style=" max-width: 700px; max-height: 250px; border-radius: 5px; border: 1px solid #ffffff0d; "></div><h1 style=" padding-top: 155px; font-size: 30px; font-weight: 400; color: #e5e5e5; " id="thanks">Thanks for installing<span style="padding-left: 7px; background: linear-gradient(to right,#448fff,#ff37d3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; ">BetterWRD</span></h1> <p style=" padding-top: 15px; color: #dbdbdb; font-size: 18px; ">Here's a quick guide on how to get to the settings</p> <div style=" display: flex; flex-direction: row; align-items: center; gap: 70px; padding-top: 40px; padding-bottom: 40px; "><div style=" display: flex; flex-direction: column; gap: 15px; "><div style=" height: 150px; display: flex; align-items: center; justify-content: center; "><img src="https://cdn.discordapp.com/attachments/800294579856605204/950114196740259840/unknown.png" style=" box-shadow: rgb(0 0 0 / 32%) 0px 22px 70px 4px; border-radius: 5px; height: 70px; "></div> <span style="color: white; text-align: left;">1. Click your username in the navigation bar.</span></div> <div style=" display: flex; flex-direction: column; gap: 15px; "><img src="https://cdn.discordapp.com/attachments/800294579856605204/949694997706465300/unknown.png" style=" box-shadow: rgb(0 0 0 / 32%) 0px 22px 70px 4px; border-radius: 5px; height: 150px; "> <span style="color: white; text-align: left;">2. Click "BetterWRD".</span></div></div> <a class="bwrdbtn">Okay</a></div> <div style="opacity: 0;" class="loading"></div> </div>`


    // Animate
    setTimeout(()=> {
        let mainDiv = document.querySelector('#bwrdoverlay').firstElementChild
        mainDiv.style.opacity = '1'
        mainDiv.style.transform = 'none'
    }, 200)


    // Show updating instead of installing
    let thx = document.querySelector('#bwrdoverlay #thanks')
    if(notfirstuse) {thx.firstChild.textContent = 'Thanks for updating'}


    // Okay Button
    document.querySelector('.bwrdbtn').addEventListener('click', ()=> {

        // Animation
        overlay = document.querySelector('#bwrdoverlay')
        overlay.firstElementChild.style.opacity = '0'
        overlay.firstElementChild.style.transform = 'scale(1.1)'
        overlay.lastElementChild.style.removeProperty('opacity')

        setTimeout(()=> {

            if(version != savedver){
                window.open(chrome.runtime.getURL('../settings/index.html'))
            }
    
            localStorage.setItem('bwrd_notfirstuse', 'yes')
            localStorage.setItem('bwrd_lastchangelog', version)
            location.reload()
        }, 200)
    })


    // Make div opaque if WRD theme is Bright
    if(localStorage['bwrd_thememode'] == 'bright'){
        document.querySelector('#bwrdoverlay').style.background = '#2e2e2e'
    }
}