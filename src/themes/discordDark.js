// Theme Name: Discord Dark
// Theme Mode: Night
// By Shade_0122

// CSS
document.head.appendChild(document.createElement('style')).innerHTML = `#navigationbar { box-shadow: 0 0 5px 0 #202225; } .menu{ background: rgb(59, 61, 66)!important; } .dropmenu > div{ border-bottom: 1.6px solid #a7a7a7!important; } .navbtn, .notification{ border: 1px solid #5164f600; } .navbtn:hover, .notification:hover{ border: 1px solid #5165F6; background: rgb(73, 75, 80); } .notif-time{ color: rgb(235, 235, 235)!important; } .signature{ border-top: 1px solid #5165F6; } .forumcontainer h2{ border-bottom: 1px solid #5165F6; } .replycard{ background: #3c3e42; } .activitycard{ border-radius: 16px; border: 1px solid #5165F6; } .themebtn{ transition: .3s all; border: 1px solid #5165F6; } .themebtn:hover{ background: #3f4248; } .pagetextbox{ border: 1px solid #5165F6; color: white!important; } .pagetextbox::placeholder{ color: rgb(190,190,190); } :not(pre)>code[class*=language-], pre[class*=language-]{background: #303236!important; border: 1px solid #5165F6; } .searchbarcontainer *{ border: 1px solid #5165F6; } #order{ border: 1px solid #5165F6; } body { background-color: #202225; color: rgb(255, 255, 255); } .border1 { border: 1px solid #5165F6; } .border1-bottom { border-bottom: 1px solid #5165F6; } .theme1 { background-color: #2F3136; } .navHeader_dropmenu>div { z-index: 1; display: none; position: absolute; right: 0; background-color: #5165F6; width: 300px; padding: 12px; margin-top: 5px; box-shadow: 0 0 8px 0 #36393F; } .theme2 { background-color: #36393F; } .release-card-button { margin-top: -8px; margin-left: 3px; padding: 5px 12px; background-color: #5165F6; color: #fff; } .downloadTitle { font-size: 16px; position: absolute; text-align: center; background-color: rgb(81 101 246 / 38%); color: #fff; width: 100%; padding: inherit; bottom: 0px; border-bottom-right-radius: 6px; border-bottom-left-radius: 6px; } .btnDownload { padding: 12px; background-color: #5165F6; color: #fff; min-width: 190px; text-align: center; margin: auto; position: relative; font-size: 18px; cursor: pointer; display: flex; justify-content: center; } #medias { background-color: #5165F6; text-align: right; padding-left: 180px; } .promo-btn { display: inline-flex; width: 120px; border: 1px solid #5165F6; padding: 5px; text-align: center; border-radius: 4px; } .prefix { border: 1.5px solid #5165F6; color: white; display: inline-block; background: #3C3C46;}`

// JS
document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread, .btnDownload').forEach(elm => {
    elm.classList.add('themebtn')
    elm.style.removeProperty('background-color')
})
if(document.getElementById('d_disp')){
    document.getElementById('d_disp').style.background = '#202225'
}
if(document.getElementById('navigationbar')){
    document.getElementById('navigationbar').style.background = '#5165F6'
}
if(document.getElementById('CreditCard')){
    document.querySelector('img').src = 'https://cdn.discordapp.com/attachments/880755872781959189/880755892893671424/Discord-Logo.png'
}