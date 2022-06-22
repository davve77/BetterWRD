// BWRD Open Settings Popup

chrome.tabs.create({active: true, url: chrome.runtime.getURL('settings/index.html')})
close()