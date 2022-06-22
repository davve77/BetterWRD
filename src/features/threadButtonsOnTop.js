// Name: Thread Navigation Buttons on Top
// Desc: Adds the thread navigation buttons on top


// Create document fragment
const navigationButtons = document.createDocumentFragment()


// Find elements & append cloned elements to fragment
const prevBtn = util.findElementByText('Prev')
const nextBtn = util.findElementByText('Next')
const lastPageBtn = util.findElementByText('>>>')

if(prevBtn)     navigationButtons.appendChild(prevBtn.cloneNode(true))
if(nextBtn)     navigationButtons.appendChild(nextBtn.cloneNode(true))
if(lastPageBtn) navigationButtons.appendChild(lastPageBtn.cloneNode(true))


// Append fragment to top buttons div
document.querySelector('[style="text-align: right"]').prepend(navigationButtons)