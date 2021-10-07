// BWRD JS Script for all settings pages

window.addEventListener('load', ()=> {
    // Turn off autocomplete for textboxes:
    document.querySelectorAll('input').forEach(elm => elm.setAttribute('autocomplete', 'off'))

    // Make every input textbox type=text
    document.querySelectorAll('.textbox').forEach(elm => elm.setAttribute('type', 'text'))
})