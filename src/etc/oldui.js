chrome.storage.local.get('oldUI', saved => {
    if(!document.querySelectorAll('.categorycontainer h2')[0] || !saved.oldUI) return

    // CSS
    document.head.appendChild(document.createElement('style')).innerHTML = `
    td:nth-child(4), th:nth-child(4) {
        width: 100%;
    }
    td, th {
        min-width: 120px;
        padding: 5px 12px 5px 0;
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
    .forumcontainer {
        overflow: hidden;
    }
    `

    // Vars
    var buttonsdiv = document.querySelector('.buttons').outerHTML
    var onlineusers = document.querySelector('main').lastElementChild.outerHTML
    var categorydivs = document.querySelectorAll('.forum')
    

    // Funcs
    function getSubCatPosts(categoryelm){
        return `<td>${categoryelm.children[0].lastElementChild.textContent.split(' Posts')[0]}</td>`
    }
    function getSubCatReplies(categoryelm){
        return `<td>${categoryelm.children[0].lastElementChild.textContent.split(', ').pop().split(' Replies')[0]}</td>`
    }
    function getLatestThread(categoryelm){
        return categoryelm.lastElementChild.children[0].children[0].outerHTML
    }
    

    // Main
    document.querySelector('main').outerHTML = `
    <main style="padding: 12px;">
    ${buttonsdiv}
    <div class="theme1 forumcontainer forumcategory round border1">
    <h2>WeAreDevs</h2>
    <table>
    <thead>
    <tr>
    <th>Forum</th>
    <th>Threads</th>
    <th>Replies</th>
    <th>Latest Thread</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><a href="https://wearedevs.net/forum/announcements">Announcements</a></td>
    ${getSubCatPosts(categorydivs[0])}
    ${getSubCatReplies(categorydivs[0])}
    <td>
    ${getLatestThread(categorydivs[0])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/suggestions">Suggestions</a></td>
    ${getSubCatPosts(categorydivs[1])}
    ${getSubCatReplies(categorydivs[1])}
    <td>
    ${getLatestThread(categorydivs[1])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/wrdeapi">WRD Exploit API</a></td>
    ${getSubCatPosts(categorydivs[8])}
    ${getSubCatReplies(categorydivs[8])}
    <td>
    ${getLatestThread(categorydivs[8])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/wrd_discussion">Discussion</a></td>
    ${getSubCatPosts(categorydivs[2])}
    ${getSubCatReplies(categorydivs[2])}
    <td>
    ${getLatestThread(categorydivs[2])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/debugging">Debugging</a></td>
    ${getSubCatPosts(categorydivs[3])}
    ${getSubCatReplies(categorydivs[3])}
    <td>
    ${getLatestThread(categorydivs[3])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/complaints">Complaints</a></td>
    ${getSubCatPosts(categorydivs[4])}
    ${getSubCatReplies(categorydivs[4])}
    <td>
    ${getLatestThread(categorydivs[4])}
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <br>
    <div class="theme1 forumcontainer forumcategory round border1">
    <h2>Exploiting</h2>
    <table>
    <thead>
    <tr>
    <th>Forum</th>
    <th>Threads</th>
    <th>Replies</th>
    <th>Latest Thread</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><a href="https://wearedevs.net/forum/roblox">Roblox</a></td>
    ${getSubCatPosts(categorydivs[6])}
    ${getSubCatReplies(categorydivs[6])}
    <td>
    ${getLatestThread(categorydivs[6])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/scripts">Scripts</a></td>
    ${getSubCatPosts(categorydivs[7])}
    ${getSubCatReplies(categorydivs[7])}
    <td>
    ${getLatestThread(categorydivs[7])}
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <br>
    <div class="theme1 forumcontainer forumcategory round border1">
    <h2>Coding</h2>
    <table>
    <thead>
    <tr>
    <th>Forum</th>
    <th>Threads</th>
    <th>Replies</th>
    <th>Latest Thread</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><a href="https://wearedevs.net/forum/lua">Lua</a></td>
    ${getSubCatPosts(categorydivs[10])}
    ${getSubCatReplies(categorydivs[10])}
    <td>
    ${getLatestThread(categorydivs[10])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/cpp">C++</a></td>
    ${getSubCatPosts(categorydivs[11])}
    ${getSubCatReplies(categorydivs[11])}
    <td>
    ${getLatestThread(categorydivs[11])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/csharp">C#</a></td>
    ${getSubCatPosts(categorydivs[12])}
    ${getSubCatReplies(categorydivs[12])}
    <td>
    ${getLatestThread(categorydivs[12])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/php">PHP</a></td>
    ${getSubCatPosts(categorydivs[13])}
    ${getSubCatReplies(categorydivs[13])}
    <td>
    ${getLatestThread(categorydivs[13])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/javascript">Javascript</a></td>
    ${getSubCatPosts(categorydivs[14])}
    ${getSubCatReplies(categorydivs[14])}
    <td>
    ${getLatestThread(categorydivs[14])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/html">HTML</a></td>
    ${getSubCatPosts(categorydivs[15])}
    ${getSubCatReplies(categorydivs[15])}
    <td>
    ${getLatestThread(categorydivs[15])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/css">CSS</a></td>
    ${getSubCatPosts(categorydivs[16])}
    ${getSubCatReplies(categorydivs[16])}
    <td>
    ${getLatestThread(categorydivs[16])}
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <br>
    <div class="theme1 forumcontainer forumcategory round border1">
    <h2>Etc</h2>
    <table>
    <thead>
    <tr>
    <th>Forum</th>
    <th>Threads</th>
    <th>Replies</th>
    <th>Latest Thread</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><a href="https://wearedevs.net/forum/sofware_hardware">Software &amp; Hardware</a></td>
    ${getSubCatPosts(categorydivs[17])}
    ${getSubCatReplies(categorydivs[17])}
    <td>
    ${getLatestThread(categorydivs[17])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/normalsellers">Normal Sellers</a></td>
    ${getSubCatPosts(categorydivs[9])}
    ${getSubCatReplies(categorydivs[9])}
    <td>
    ${getLatestThread(categorydivs[9])}
    </td>
    </tr>
    <tr>
    <td><a href="https://wearedevs.net/forum/disputes">Disputes</a></td>
    ${getSubCatPosts(categorydivs[5])}
    ${getSubCatReplies(categorydivs[5])}
    <td>
    ${getLatestThread(categorydivs[5])}
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    <br>
    ${onlineusers}
    </main>
    `
})