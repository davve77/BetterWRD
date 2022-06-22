// BetterWRD Settings Toast/Notification

let timer = null

function showToast(text){
    let toast = document.getElementById('toast')
    if(timer) clearTimeout(timer)   

    toast.textContent = text
    toast.style.transform = 'translateY(0px)'

    timer = setTimeout(()=> {
        toast.style.transform = 'translateY(60px)'
        timer = null
    }, 2000)
}