// BetterWRD View Theme

// Vars
var urlname = location.search.split('theme=')[1]
var theme, color1, color2, thname, thdesc, thdev, lastupdate, modeindicator, modetooltip, img1, img2


// Set variables
switch(urlname){
    case 'githubDark':
        theme = 'GitHub: Smooth Dark'

        color1 = 'rgb(9, 12, 16)'
        color2 = 'rgb(22, 27, 34)'
        thname = 'GitHub: Smooth Dark'
        thdesc = 'a nice github-like dark comfy theme'
        thdev = 'BetterWRD'
        lastupdate = 'Unknown'
        modeindicator = 'dark_mode'
        modetooltip = 'This is a Dark Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/858684298487136276/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/858684491639685120/unknown.png'

        break;

    case 'githubDarkGreen':
        theme = 'GitHub: Dark & Green'

        color1 = 'rgb(35, 134, 54)'
        color2 = 'rgb(22, 27, 34)'
        thname = 'GitHub: Dark & Green'
        thdesc = 'a nice github-like dark comfy theme with some green borders'
        thdev = 'BetterWRD'
        lastupdate = 'Unknown'
        modeindicator = 'dark_mode'
        modetooltip = 'This is a Dark Theme'
        img1 = 'https://cdn.discordapp.com/attachments/800294579856605204/858066004831764520/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/800294579856605204/858066691712090173/unknown.png'

        break;

    case 'darkMintGreen':
        theme = 'Dark Mint Green'

        color1 = 'rgb(37, 47, 55)'
        color2 = 'rgb(45, 150, 109)'
        thname = 'Dark Mint Green'
        thdesc = 'green and dark combined, looks pretty good I think'
        thdev = 'BetterWRD'
        lastupdate = 'Unknown'
        modeindicator = 'dark_mode'
        modetooltip = 'This is a Dark Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/858687869261971466/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/858687961389858846/unknown.png'

        break;

    case 'midnightGray':
        theme = 'Midnight Gray'

        color1 = 'rgb(34, 39, 46)'
        color2 = '#373e47'
        thname = 'Midnight Gray'
        thdesc = 'use this if you like gray'
        thdev = 'BetterWRD'
        lastupdate = 'Unknown'
        modeindicator = 'dark_mode'
        modetooltip = 'This is a Dark Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/911596306798096444/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/858689551640166410/unknown.png'

        break;

    case 'WeAreFemboys':
        theme = 'WeAreFemboys'

        color1 = '#ffa8ed'
        color2 = '#ff87e6'
        thname = 'WeAreFemboys'
        thdesc = 'BEST WRD THEME'
        thdev = 'Shade_0122'
        lastupdate = 'Unknown'
        modeindicator = 'light_mode'
        modetooltip = 'This is a Light Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/858694031071248454/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/858694143697223710/unknown.png'

        break;

    case 'githubLight':
        theme = 'GitHub: Light Mode'

        color1 = 'rgb(246, 248, 250)'
        color2 = 'rgb(36, 41, 46)'
        thname = 'GitHub: Light Mode'
        thdesc = 'dark navbar and white everywhere else'
        thdev = 'BetterWRD'
        lastupdate = 'Unknown'
        modeindicator = 'light_mode'
        modetooltip = 'This is a Light Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/858697296349888572/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/858697344395902986/unknown.png'

        break;

    case 'discordDark':
        theme = 'Discord Dark'

        color1 = '#5165F6'
        color2 = '#2F3136'
        thname = 'Discord Dark'
        thdesc = 'a dark discord theme'
        thdev = 'Shade_0122'
        lastupdate = 'Unknown'
        modeindicator = 'dark_mode'
        modetooltip = 'This is a Dark Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/884146899114942534/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/884147065272270848/unknown.png'

        break;

    case 'discordLight':
        theme = 'Discord Light'

        color1= '#5165F6'
        color2 = '#E3E5E8'
        thname = 'Discord Light'
        thdesc = 'a light discord theme'
        thdev = 'Shade_0122'
        lastupdate = 'Unknown'
        modeindicator = 'light_mode'
        modetooltip = 'This is a Light Theme'
        img1 = 'https://cdn.discordapp.com/attachments/843145657463472138/884150575363678208/unknown.png'
        img2 = 'https://cdn.discordapp.com/attachments/843145657463472138/884150749636997220/unknown.png'

        break;

    default:
        // Theme Not Found
        document.getElementById('themeview').style.display = 'none'
        document.getElementById('themenotfound').style.display = 'flex'
}


// Colors
document.getElementById('color1').style.background = color1
document.getElementById('color2').style.background = color2

// Theme info
document.getElementById('thname').textContent = thname
document.getElementById('thdesc').textContent = thdesc
document.getElementById('thdev').textContent = thdev
document.getElementById('lastupdate').textContent = lastupdate

// Mode indicator
document.getElementById('modeindicator').childNodes[1].textContent = modeindicator
document.getElementById('indicatortooltip').textContent = modetooltip

// Screenhots
document.getElementById('img1').src = img1
document.getElementById('img2').src = img2


// Set Button
document.getElementById('setbtn').addEventListener('click', ()=> {
    chrome.storage.local.set({'theme': theme})
    chrome.storage.local.set({'customtheme': null})
    location.assign('./themes.html?shownotif')
})