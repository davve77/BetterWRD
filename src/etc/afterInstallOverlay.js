// Name: After install overlay div
// Desc: Main purpose of this is to show the changelogs when the user clicks Okay


// Vars
var notfirstuse = localStorage.getItem('bwrd_notfirstuse')
var savedver = localStorage.getItem('bwrd_lastchangelog')
var version = chrome.runtime.getManifest().version

if(!document.getElementById('CreditCard') && !document.getElementById('cf-wrapper') && !notfirstuse || !savedver || version != savedver){

  // Styles
  document.head.appendChild(document.createElement('style')).textContent = `
  .bwrdbtn{
    position: relative;
    margin-left: auto;
    transition: .17s all ease;
    padding: 8px 60px;
    background: #373737;
    border: 1px solid #4d4d4dad;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bwcentertext{
    text-align: left!important;
  }
  .bwrdbtn:hover{
    background: #3d3d3d;
  }
  .lds-ring { display: inline-block; position: relative; width: 80px; height: 80px; } .lds-ring div { box-sizing: border-box; display: block; position: absolute; width: 64px; height: 64px; margin: 8px; border: 8px solid #fff; border-radius: 50%; animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; border-color: #fff transparent transparent transparent; } .lds-ring div:nth-child(1) { animation-delay: -0.45s; } .lds-ring div:nth-child(2) { animation-delay: -0.3s; } .lds-ring div:nth-child(3) { animation-delay: -0.15s; } @keyframes lds-ring { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  #bwrdoverlay span { float: none!important; }
  `

  // For browsers that don't support backdrop-filter
  document.head.appendChild(document.createElement('style')).textContent = `
  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)){
    #bwrdoverlay{background: #2e2e2e!important};
  }
  `

  // HTML
  document.body.appendChild(document.createElement('div')).outerHTML = `
  <div id="bwrdoverlay" style="position: fixed;display: flex;user-select: none;pointer-events: all;width: 98.5%;height: 98%;transition: .11s cubic-bezier(0.42, 0, 0, 1.21) all;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);z-index: 1;background: #2e2e2ed9;color: white!important;border: 1px solid #434343;backdrop-filter: blur(20px);align-items: center;justify-content: center;border-radius: 10px;flex-direction: column;text-align: center;overflow: hidden;"><h1 class="bwcentertext" style="position: absolute;color: white;font-weight: 400;font-size: 35px;top: 30px;">How to use BetterWRD</h1><h1 class="bwcentertext" style="position: absolute;color: white;opacity: .6;font-size: 22px;top: 70px;">A quick tutorial showing you how to get to the BetterWRD Settings</h1>
  <div style="
    background: #32323294;
    padding: 30px;
    border: 1px solid #383838a6;
    border-radius: 10px;
    text-align: left;
    transform: scale(.9);
  ">
  <h1 class="bwcentertext" style="color: #fffffffa;font-size: 25px;margin-bottom: 10px;"><span style="
    font-size: 45px;
    font-weight: 400;
    margin-right: 10px;
    vertical-align: sub;
    background: linear-gradient(to bottom, rgb(83 172 255 / 68%) 30%, rgba(255,29,205,0.88) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  ">1</span>Click on your username in the navigation bar.</h1>
  <img draggable="false" src="https://cdn.discordapp.com/attachments/843145657463472138/908025135833956382/unknown.png" style="
    border: 1px solid #363636;
    border-radius: 5px;
  "><h1 class="bwcentertext" style="margin-top: 40px;color: #fffffffa;font-size: 25px;margin-bottom: 10px;"><span style="
    font-size: 45px;
    font-weight: 400;
    margin-right: 10px;
    vertical-align: sub;
    background: linear-gradient(to bottom, rgb(83 172 255 / 68%) 30%, rgba(255,29,205,0.88) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  ">2</span>Click 'BetterWRD' to open the BWRD Settings.</h1>
  <img draggable="false" src="https://cdn.discordapp.com/attachments/843145657463472138/908026261484486686/unknown.png" style="
    border: 1px solid #363636;
    border-radius: 5px;
  ">
  <h1 class="bwcentertext" style="margin-top: 40px;color: #fffffffa;font-size: 25px;margin-bottom: 10px;"><span style="
    font-size: 45px;
    font-weight: 400;
    margin-right: 10px;
    vertical-align: sub;
    background: linear-gradient(to bottom, rgb(83 172 255 / 68%) 30%, rgba(255,29,205,0.88) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  ">3</span>You're ready to use <span style="
    font-weight: 400;
    font-size: 25px;
    background: linear-gradient(to right, rgb(80 170 255) 30%, rgb(255 47 209) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  ">BetterWRD</span>!</h1></div>
  <div style="
    position: absolute;
    bottom: 0;
    padding: 20px;
    width: 100%;
    background: #282828c7;
    display: flex;
    flex-direction: row;
    align-items: center;
  ">
  <p style="
    opacity: .7;
  ">Version ${version}</p>
  <button class="bwrdbtn" style="
"><span class="lds-ring" style="
    transform: scale(.3);
    position: absolute;
    opacity: .4;
    display: none;
"><div></div><div></div><div></div><div></div></span>Okay</button></div>
  `

  // Okay Button
  document.querySelector('.bwrdbtn').addEventListener('click', ()=> {
    const btn = document.querySelector('.bwrdbtn')
    btn.style.color = 'transparent'
    btn.children[0].style.removeProperty('display')

    localStorage.setItem('bwrd_notfirstuse', 'yes')
    
    if(version != savedver){
      setTimeout(()=> {
        window.open(chrome.runtime.getURL('../settings/index.html'))
        location.reload()
      }, 400)
      localStorage.setItem('bwrd_lastchangelog', version)
    }
  })

  // Make div opaque if WRD theme is Bright
  if(document.cookie.split('wrdtheme=')[1] && document.cookie.split('wrdtheme=')[1].includes('bright')){
    document.getElementById('bwrdoverlay').style.background = '#2e2e2e'
  }
}