// BetterWRD Beta Testing

const betaTestingInput = document.querySelector('#betaTesting')

chrome.storage.local.get(['betaTesting'], sv => {
    if(sv.betaTesting) betaTestingInput.checked = true
})

betaTestingInput.addEventListener('click', ()=> {
    chrome.storage.local.set({'betaTesting': betaTestingInput.checked})
    showToast(`Beta Testing has been turned ${betaTestingInput.checked ? 'on' : 'off'}.`)
})