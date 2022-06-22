// Name: More Embeds
// Desc: Allows more embeds on posts


const atags = document.getElementsByTagName('a')

for(var i=0, l=atags.length; i<l; i++){
    
    // For strawpoll.me
    if(atags[i].href.includes('strawpoll.me')){
        atags[i].innerHTML += `<br><iframe src="https://strawpoll.me/embed_1/${atags[i].href.split('me/')[1]}" style="width:680px;height:342px;border:0;"><strong>BetterWRD</strong><br><br>Loading poll...</iframe>`
    }

    // For strawpoll.com
    if(atags[i].href.includes('strawpoll.com')){
        atags[i].innerHTML += `<iframe width="620" height="480" src="https://strawpoll.com/embed/${atags[i].href.split('com/')[1]}" style="width: 100%; height: 480px;" frameborder="0" allowfullscreen></iframe>`
    }
}