// Theme Name: WeAreFemboys
// Theme Mode: Bright
// By Shade_0122

// CSS
document.head.appendChild(document.createElement('style')).innerHTML = `
#navigationbar {
	box-shadow: 0 0 5px 0 #ffffff;
}

.menu {
	background: rgb(255 115 225)!important;
	box-shadow: rgb(255 255 255 / 25%) 0px 1rem 3rem!important;
}

.date, .threadmd, .usertitle, .perk_card p:first-of-type {
	color: #ffffffb3!important;
}

input, select {
	border: 1px solid white;
}

.userinfobg {
	filter: none!important;
	background: #ee66db!important;
}

input::placeholder {
	color: white;
}

.searchbarcontainer {
	border-left: 1px solid #ffffff75!important;
}

.menu {
	color: white;
}

.dropmenu>div {
	border-bottom: 1.6px solid #ffffff8c!important;
}

.deleteallnotifs {
	color: white!important;
}

.notification>div>a {
	color: white;
}

.notification:hover {
	background: #ff87e6;
}

.notif-time {
	color: rgb(235, 235, 235)!important;
}

.thread_replytime {
	color: white;
}

.threadbtn{
	filter: none!important;
}

#d_disp {
	display: flex;
	background-color: #ff87e6;
}

 ::placeholder {
	color: white;
}

.download_metadata>p {
	color: white;
	flex: 1;
	text-align: left;
}

.forumcategory {
	background-color: #ff87e6;
}

#btnDownload {
	background: #f15be8;
}

p {
	color: white!important;
}

hr {
	background: white;
}

.manager_descriptor {
	color: white;
}

.signature {
	border-top: 1px solid #ffffffcc;
}

.forumcontainer h2,
.forumcontainer h1 {
	border-bottom: 1px solid #f3f2f2;
	font-size: 25px;
}

body {
	background-color: #ffa8ed!important;
	color: #ffffff!important;
}

.theme2 {
	background-color: #ff87e6;
}

.prefix {
	background-color: #ff66df!important;
	color: white!important;
}

.theme1 {
	background-color: #ff87e6;
}

.border1 {
	border: 1px solid #ffffff;
}

.btnThreadControl{
	border: 1px solid #ffffff;
}

.navHeader_dropmenu>div {
	z-index: 1;
	display: none;
	position: absolute;
	right: 0;
	background-color: #ff87e6;
	width: 300px;
	padding: 12px;
	margin-top: 5px;
	box-shadow: 0 0 8px 0 #ffffff;
}

#medias {
	background-color: #ff9cea;
	text-align: right;
	padding-left: 180px;
}

.theme2 {
	background-color: #ffa8ed;
	color: #ffffff;
}

.theme2 {
	background-color: #ff87e6;
	color: #ffffff;
}

.release-card-button {
	margin-top: -8px;
	margin-left: 3px;
	padding: 5px 12px;
	background-color: #ffa8ed;
	color: #fff;
	border-radius: 3px;
}

.profile_sidecard {
	border-bottom: 1px solid white;
	margin-bottom: 10px;
}

.alias {
	font-size: 14px;
	color: white;
	margin-bottom: 12px;
}

.navItem {
	list-style: none;
	padding: 5px 10px;
	display: inline-block;
	font-size: 17px;
	text-align: center;
	opacity: 1;
	position: relative;
	z-index: 1;
	color: #fff;
}

.btnDownload {
	padding: 12px;
	background-color: #ffa8ed;
	color: #fff;
	min-width: 190px;
	text-align: center;
	margin: auto;
	position: relative;
	font-size: 18px;
	cursor: pointer;
	display: flex;
	justify-content: center;
}

.downloadTitle {
	font-size: 16px;
	position: absolute;
	text-align: center;
	background-color: rgb(255 168 237);
	color: #fff;
	width: 100%;
	padding: 2px;
	bottom: 0px;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}

#buybutton{
	background: #f966e0!important
}

.themebtn:hover, .themebtn:focus {
	background-color: rgb(255, 156, 234);
}

.navbtn a {
	color: #ffffff!important;
}

.navbtn:hover {
	background: rgb(255 142 231)!important;
}

td p {
	color: #ffffff96!important;
}

.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
	border-right: 1px solid rgb(220, 220, 220)!important;
}

.tox.tox-tinymce {
	border: 1px solid white;
	border-radius: 8px;
}

.tox-toolbar__primary {
	background: rgb(255, 135, 230)!important;
}

.tox-statusbar {
	background: #ff8de7!important;
	border-top: 0!important
}

.tox .tox-tbtn svg {
	fill: white!important;
}

span.tox-tbtn__select-label {
	color: white!important;
}

.tox .tox-statusbar__text-container {
	display: none!important;
}

pre[class*=language-] {
	background: #ff9cf7!important;
}

footer {
	color: #ffffffc9!important;
}

.latestthreads a {
	color: white;
}

.latestthreads {
	background: #ff8ee7 !important;
}

.thread {
	color: white!important;
}

.threadData{
	color: #ffffffbf!important;
}

.border1-left {
	border-left: 1px solid #ffffff;
}

.border1-bottom {
    border-bottom: 1px solid #ffffff;
}
`

// JS
setTimeout(()=> {
	document.querySelectorAll('.btn, .button, .btn_newrelpy, .pagetextbox, #links a, .btnThreadControl, .release-card-button, .btnmention, .forum_btnnewthread, .btnDownload, .btnThreadControl').forEach(elm => {
		elm.classList.add('themebtn')
		elm.style.removeProperty('background-color')
	})
}, 200)
if(document.getElementById('d_disp')){
    document.getElementById('d_disp').style.background = '#ff87e6'
}
if(document.getElementById('navigationbar')){
    document.getElementById('navigationbar').style.background = '#ff87e6'
}
if(document.getElementById('foologo')){
    document.getElementById('foologo').firstChild.textContent = 'WeAreFemboys'
}
if(document.getElementById('CreditCard')){
    document.querySelector('img').src = 'https://media.discordapp.net/attachments/787629359074115604/848942195927285780/download_1.png'

    document.head.appendChild(document.createElement('style')).innerHTML = `*{color: white;}`
}
if(document.getElementById('cf-content')){
    cfcontent = document.getElementById('cf-content')
    cfcontent.textContent = 'Checking your browser before accessing wearefemboys.net.'
    cfcontent.style.fontSize = '30px'
    cfcontent.style.fontWeight= '900'
}
if(document.getElementsByClassName('forumcategory')[0]){
    document.getElementsByClassName('forumcategory')[0].children[0].textContent = 'WeAreFemboys'
}
if(document.getElementById('WeAreDevs')){
	document.getElementById('WeAreDevs').children[0].textContent = 'WeAreFemboys'
}
if(document.getElementsByClassName('footerlinks')[0]){
    document.getElementsByTagName('footer')[0].children[3].textContent = '© 2021 WeAreFemboys'
}
if(document.getElementsByClassName('pagetextbox')[0]){
    document.getElementsByClassName('pagetextbox')[0].classList.add('border1')
}

// TinyMCE Editor
setTimeout(()=> {
    if(document.getElementsByClassName('g-recaptcha')[0] || document.getElementById('saveinfo')){ // Checks if you're on create post or profile manager page
        if(document.getElementById('editor_ifr')) {editor = document.getElementById('editor_ifr').contentWindow}
        else {editor = document.getElementById('signature_ifr').contentWindow}
        editortinymce = editor.document.getElementById('tinymce')
        
        editortinymce.style.color = 'white'
        editortinymce.style.background = '#ff7ee4'
        editortinymce.setAttribute('data-mce-placeholder', '')
    }
}, 450)