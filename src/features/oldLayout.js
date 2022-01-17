// Name: Old Layout
// Desc: Brings back the old WRD forum home page layout

chrome.storage.local.get('oldUI', saved => {
    if(!document.querySelectorAll('.buttons')[0] || !saved.oldUI) return

    // CSS
    document.head.appendChild(document.createElement('style')).innerHTML = `
    td:nth-child(4), th:nth-child(4) {
        width: 100%;
    }
    td, th {
        min-width: 120px;
        padding: 5px 12px 5px 0;
    }
    th {
        font-weight: 400;
    }
    .forumcontainer table {
        padding: 20px;
        width: 100%;
        text-align: left;
    }
    .forumcontainer h2 {
        font-size: 25px;
        padding: 12px 20px;
        border-bottom: 1px solid #d3d3d3;
    }
	@media only screen and (max-width:700px) {
        .forumcategory th:nth-child(2),
        .forumcategory td:nth-child(2),
        .forumcategory th:nth-child(3),
        .forumcategory td:nth-child(3) {
            display: none!important
        }
    }
    .forumcontainer {
        overflow: hidden;
    }
    .thread {
        margin-bottom: 0;
    }`

    // Vars
    var buttonsdiv = document.querySelector('.buttons').outerHTML
    var onlineusers = document.querySelector('.onlineList').outerHTML
    var categorydivs = document.querySelectorAll('.category')

    // Funcs
    function getSubCatPosts(categoryelm){
        return `<td>${categoryelm.nextElementSibling.textContent}</td>`
    }
    function getSubCatReplies(categoryelm){
        return `<td>${categoryelm.nextElementSibling.nextElementSibling.textContent}</td>`
    }
    function getLatestThread(categoryelm){
        title = categoryelm.nextElementSibling.nextElementSibling.nextElementSibling
        return !title.textContent.includes('Posts') ? title.firstElementChild.outerHTML : '- No Posts yet -'
    }

    // Main
    (async() =>{
        const layout = await fetch('https://betterwrd.vercel.app/bwrd/layout.txt').then(e => e.text())
        localStorage['bwrd_layoutcache'] = layout
        var layoutcache = localStorage['bwrd_layoutcache'] || layout
        document.querySelector('main').outerHTML = eval('`'+layoutcache+'`')
    })()
})