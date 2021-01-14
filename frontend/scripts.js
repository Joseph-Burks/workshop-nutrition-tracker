const addBreakfast = document.querySelector('#add-breakfast');
const searchContainer = document.querySelector('#search-container')

addBreakfast.addEventListener('click', () => {
    console.log('Add breakfast item was clicked');
    // searchContainer.innerHTML = ''
    searchContainer.append(form)
});

const form = document.createElement('form');

const input = document.createElement('input');
input.setAttribute('type', 'text')
input.setAttribute('placeholder', 'Search foods')

const searchButton = document.createElement('button')
searchButton.innerText = 'Search'

form.append(input, searchButton)