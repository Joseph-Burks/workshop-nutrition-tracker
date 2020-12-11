window.addEventListener('DOMContentLoaded', () => {

    const breakfastUL = document.querySelector('.breakfast-item-container');
    const lunchUL = document.querySelector('.lunch-item-container');
    const dinnerUL = document.querySelector('.dinner-item-container');
    const snackUL = document.querySelector('.snack-item-container');

    const addBreakfast = document.querySelector('#add-breakfast')
    const addLunch = document.querySelector('#add-lunch');
    const addDinner = document.querySelector('#add-dinner');
    const addSnack = document.querySelector('#add-snack');

    const form = document.createElement('form')
    const label = document.createElement('label')
    label.innerText = 'Search foods: '
    const input = document.createElement('input');
    input.setAttribute('type', 'text')
    const searchButton = document.createElement('button')
    searchButton.innerText = 'Search'
    form.append(label, input, searchButton)

    const searchContainer = document.querySelector('#search-container');
    const buildSearch = () => {
        searchContainer.innerHTML = ''
        searchContainer.append(form)
    }
    
    addBreakfast.addEventListener('click', () => {
        let selectedFood = buildSearch()
    })
    addLunch.addEventListener('click', () => {});
    addDinner.addEventListener('click', () => {});
    addSnack.addEventListener('click', () => {});

})
