// BetterWRD Beta Testing

(async function betaTesting(){
    let betaFeatures = await fetch('https://betterwrd.vercel.app/bwrd/betaFeatures.js').then(e => e.text())
    util.addElement('script', document.head, betaFeatures, true)
})()