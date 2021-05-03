// Name: Save Post Drafts
// Desc: Save posts as drafts and post/continue writing them later

// Add draft elements
document.getElementsByClassName('menu')[1].appendChild(document.createElement('p')).outerHTML = '<p class="dropMenu_option" onmouseup="showDrafts()">Drafts</p>'

if(localStorage.getItem('bwrd_draftsinfo') == null){
    draftsinfo = document.getElementsByClassName('g-recaptcha')[0].parentNode.appendChild(document.createElement('span'))

    if(document.getElementById('replyform')) {draftsinfo.outerHTML = '<p style="text-align: right; padding-top: 15px;">Open the dropmenu in the navbar to manage drafts</p>'}
    else {draftsinfo.outerHTML = '<p style="text-align: right;">Open the dropmenu in the navbar to manage drafts</p>'}
}

document.head.appendChild(document.createElement('style')).innerHTML = '.draftelement{position: relative; transition: all .2s ease-out; width: 600px; height: 50px; cursor: pointer; margin: 0 auto;} .draftelement:hover{transform: scale(1.01); opacity: .5;} .ebtns{transition: all .2s ease-out;} .ebtns:hover{opacity: .5;} @keyframes opacityanim{0%{opacity:0;} 100%{opacity:1;}} #drafts{animation: opacityanim .2s;}'

// Show drafts menu
function showDrafts(){
    if(localStorage.getItem('bwrd_draftsinfo') == null) {localStorage.setItem('bwrd_draftsinfo', 'shown')}
    if(localStorage.getItem('bwrd_drafts') == null) {localStorage.setItem('bwrd_drafts', '[]')}
    document.body.style.overflow = 'hidden'

    var draftsdiv = document.createElement('div')
    document.body.appendChild(draftsdiv)
    draftsdiv.outerHTML = '<div id="drafts" style="bottom: 0; left: 0; position: absolute; right: 0; top: 0; z-index: 1; background-color: rgb(0 0 0 / 75%);"> <div id="draftsmenu" style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);text-align: center;width: 700px;height: 650px;box-shadow: 0 1rem 3rem rgba(0,0,0,0.100)!important;border-radius: 4px;user-select: none;" class="theme1"> <div id="draftsgrid" style=" position: absolute; width: 700px; height: 500px; top: 130px; overflow: auto; ">  </div> <div id="bottomdiv" style=" position: absolute; bottom: 0; height: 50px; width: 700px; "><a id="plusbottom" class="ebtns" style=" font-size: 35px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); cursor: pointer;" title="Add a Draft">+</a></div> <a style=" font-size: 35px; position: absolute; right: 12px; cursor: pointer;" class="ebtns" onmouseup="hideDrafts()">×</a>  <h1 class="style=&quot;font-size:" style="position: absolute;margin-top: 20px;margin-left: 20px;font-size: 30px;"><strong><em>Your Drafts</em></strong></h1> <h1 style="position: absolute;font-size: 18px;opacity:.8;margin-left: 20px;margin-top: 60px;"><em>your drafts will stay here even after you reinstall BetterWRD.</em></h1></div> </div>'

    document.getElementById('plusbottom').addEventListener('mouseup', ()=> {
        document.getElementById('bottomdiv').appendChild(document.createElement('div')).outerHTML = '<input id="draftnametb" maxlength="50" onkeyup="blacklistedChar()" style=" position: absolute; top: 50%; transform: translate(-50%, -50%); height: 30px; width: 300px; right: 45px; outline: 0; padding: 5px; " placeholder=" Draft Name" onchange="addDraft()">'
        document.getElementById('draftnametb').focus()
    })

    refreshDrafts()
}

// Blacklisted characters for draft names
function blacklistedChar() {draftnametb.value = draftnametb.value.replace(/'|"|\/|\\/g, '')}

// Hide drafts menu
function hideDrafts(){
    document.getElementById('drafts').remove()
    document.body.style.removeProperty('overflow')
}

// Refresh drafts
function refreshDrafts(){
    var drafts = JSON.parse(localStorage.getItem('bwrd_drafts'))

    // Show the 'You don't have any drafts' text if the user doesn't have any drafts
    if(drafts.length == 0) {document.getElementById('draftsmenu').appendChild(document.createElement('a')).innerHTML = `<a id="nodrafts" style="position: absolute;top: 50%;transform: translate(-50%, -50%);font-size: 20px;opacity: .8;">¯\\_(ツ)_/¯<br>You don't have any drafts.<br>Click '+' to create one.</a>`}
    else if(document.getElementById('nodrafts')) {document.getElementById('nodrafts').remove()}

    document.getElementById('draftsgrid').innerHTML = '' // Clear the list

    drafts.forEach(function(draft){
        var draftelm = document.createElement('div')
        draftelm.innerHTML = `<div class="draftelement theme1" title="Click to yeet Draft in the Editor"> <a style=" font-size: 30px; opacity: .7; position: absolute; right: 10px; bottom: 10px; " title="Delete Draft" class="deletedr" onmouseup="deleteDraft('${draft.name}')">×</a> <text style=" position: absolute; left: 10px; top: 8px; opacity: .9; ">${draft.name}</text><text style=" position: absolute; left: 10px; top: 26px; font-size: 14px; opacity: .6; ">Created on ${draft.date}</text> </div>`
        
        draftelm.addEventListener('mouseup', function(e) {
            if(e.target.title == 'Delete Draft') return
            document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce').innerHTML = draft.content
            document.querySelector('[role="application"]').style.height = `${draft.height}px`
            hideDrafts()
            // I used .innerHTML instead of tinymce's set/getContent functions because it saves the font size of empty lines which is important for long threads
        })

        document.getElementById('draftsgrid').appendChild(draftelm)
    })
}

// Add draft
function addDraft(){
    var date = new Date()
    var drafts = JSON.parse(localStorage.getItem('bwrd_drafts'))

    drafts.push({
    'name': draftnametb.value, 
    'content': document.getElementById('editor_ifr').contentWindow.document.getElementById('tinymce').innerHTML,
    'date': `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
    'height': document.querySelector('[role="application"]').offsetHeight})

    localStorage.setItem('bwrd_drafts', JSON.stringify(drafts))

    draftnametb.remove()
    refreshDrafts()
}

// Delete draft
function deleteDraft(draftname){
    var drafts = JSON.parse(localStorage.getItem('bwrd_drafts'))

    for(var i=0;i<drafts.length;i++){
        if(drafts[i].name == draftname) {drafts.splice(i, 1)}
    }

    localStorage.setItem('bwrd_drafts', JSON.stringify(drafts))
    refreshDrafts()
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(keyevent){
    if(keyevent.key == '+' && !document.getElementById('draftnametb')){
        document.getElementById('bottomdiv').appendChild(document.createElement('div')).outerHTML = '<input id="draftnametb" maxlength="50" onkeyup="blacklistedChar()" style=" position: absolute; top: 50%; transform: translate(-50%, -50%); height: 30px; width: 300px; right: 45px; outline: 0; padding: 5px; " placeholder=" Draft Name" onchange="addDraft()">'
        document.getElementById('draftnametb').focus()
    }
    if(keyevent.key == 'Escape') {hideDrafts()}
})