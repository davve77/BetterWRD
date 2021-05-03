// Name: Read/Unread Threads
// Desc: Lowers the thread title opacity indicating if you already read the specific thread

if(document.getElementsByClassName('forumcategory')[0]){ // Checks if you're on the main forum page
    if(localStorage.getItem('bwrd_unread') == null) {localStorage.setItem('bwrd_unread', '[]')} // For the upcoming unread update

    if(document.cookie.includes('night')){
        document.head.appendChild(document.createElement('style')).innerHTML = 'tr td:nth-child(4) a:visited{color: rgb(170,170,170);}'
    }
    else{
        document.head.appendChild(document.createElement('style')).innerHTML = 'tr td:nth-child(4) a:visited{color: rgb(115 115 115);}'
    }
}