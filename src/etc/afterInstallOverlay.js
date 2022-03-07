// Name: After install overlay div
// Desc: Main purpose of this is to show the changelog after updating


// Vars
var notfirstuse = localStorage.getItem('bwrd_notfirstuse')
var savedver = localStorage.getItem('bwrd_lastchangelog')
var version = chrome.runtime.getManifest().version


if(!document.getElementById('CreditCard') && !document.getElementById('cf-wrapper') && !notfirstuse || !savedver || version != savedver){

  // Styles
  document.head.appendChild(document.createElement('style')).textContent = `
  .bwcentertext{
    text-align: left!important;
  }
  #bwrdoverlay * {
    margin: unset!important;
  }`

  // For browsers that don't support backdrop-filter
  document.head.appendChild(document.createElement('style')).textContent = `
  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)){
    #bwrdoverlay{background: #000000db!important};
  }`

  // HTML
  document.body.appendChild(document.createElement('div')).outerHTML = `<div id="bwrdoverlay" style=" position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #00000094; backdrop-filter: blur(16px) contrast(.7); z-index: 9999999; display: flex; align-items: center; justify-content: center; user-select: none; "><div style=" position: relative; width: 850px; border-radius: 10px; background: #252525; box-shadow: rgb(0 0 0 / 11%) 0px 22px 70px 4px; padding: 20px; padding-top: 0; display: flex; flex-direction: column; align-items: center; margin-top: 125px!important; transition: .089s all ease-out; transform: translateY(10px); opacity: 0;"><span style=" position: absolute; bottom: 15px; left: 15px; color: #ffffff24; font-size: 12px; ">${version}</span><div style=" position: absolute; top: -125px; "><img draggable="false" src="https://betterwrd.vercel.app/assets/img/BetterWRD_Background.png" style=" max-width: 700px; max-height: 250px; border-radius: 5px; border: 1px solid #ffffff0d; "></div><h1 style=" padding-top: 155px; font-size: 30px; font-weight: 400; color: #e5e5e5; ">Thanks for installing<span style="padding-left: 7px; background: linear-gradient(to right,#448fff,#ff37d3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; ">BetterWRD</span></h1> <p style=" padding-top: 15px; color: #dbdbdb; font-size: 18px; ">Here's a quick guide on how to get to the settings</p> <div style=" display: flex; flex-direction: row; align-items: center; gap: 70px; padding-top: 40px; padding-bottom: 40px; "><div style=" display: flex; flex-direction: column; gap: 15px; "><div style=" height: 150px; display: flex; align-items: center; justify-content: center; "><img src="https://cdn.discordapp.com/attachments/800294579856605204/950114196740259840/unknown.png" style=" box-shadow: rgb(0 0 0 / 32%) 0px 22px 70px 4px; border-radius: 5px; height: 70px; "></div> <span style="color: white; text-align: left;">1. Click your username in the navigation bar.</span></div> <div style=" display: flex; flex-direction: column; gap: 15px; "><img src="https://cdn.discordapp.com/attachments/800294579856605204/949694997706465300/unknown.png" style=" box-shadow: rgb(0 0 0 / 32%) 0px 22px 70px 4px; border-radius: 5px; height: 150px; "> <span style="color: white; text-align: left;">2. Click "BetterWRD".</span></div></div> <a style="cursor: pointer;user-select: none;background: #a3c2ff;color: black;font-weight: 400;border-radius: 9px;padding: 7px 70px;" class="bwrdbtn">Okay</a></div></div>`

  // Animate
  setTimeout(()=> {
    let mainDiv = document.querySelector('#bwrdoverlay').firstElementChild
    mainDiv.style.opacity = '1'
    mainDiv.style.transform = 'none'
  }, 200)

  // Okay Button
  document.querySelector('.bwrdbtn').addEventListener('click', ()=> {

    if(version != savedver){
      window.open(chrome.runtime.getURL('../settings/index.html'))
    }

    localStorage.setItem('bwrd_notfirstuse', 'yes')
    localStorage.setItem('bwrd_lastchangelog', version)
    location.reload()
  })

  // Make div opaque if WRD theme is Bright
  if(document.cookie.split('wrdtheme=')[1] && document.cookie.split('wrdtheme=')[1].includes('bright')){
    document.getElementById('bwrdoverlay').style.background = '#2e2e2e'
  }
}