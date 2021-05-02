// Name: First use Popup
// Desc: Opens new tab of the first use page

if(localStorage.getItem('bwrd_notfirstuse') == null){
  window.open(chrome.runtime.getURL('etc/popup.html'))
  localStorage.setItem('bwrd_notfirstuse', 'yes')
}