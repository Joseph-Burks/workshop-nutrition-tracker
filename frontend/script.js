window.addEventListener('DOMContentLoaded', () => {
	let breakfastItems = [];
	let lunchItems = [];
	let dinnerItems = [];
    let snackItems = [];
    let searchResultsBranded = []
    let searchResultsCommon = [];

	const breakfastUL = document.querySelector('.breakfast-item-container');
	const lunchUL = document.querySelector('.lunch-item-container');
	const dinnerUL = document.querySelector('.dinner-item-container');
	const snackUL = document.querySelector('.snack-item-container');

	const addBreakfast = document.querySelector('#add-breakfast');
	const addLunch = document.querySelector('#add-lunch');
	const addDinner = document.querySelector('#add-dinner');
	const addSnack = document.querySelector('#add-snacks');

	const form = document.createElement('form');
	const input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('placeholder', 'Search foods');
	const searchButton = document.createElement('button');
	searchButton.innerText = 'Search';
	searchButton.addEventListener('click', (e) => {
        e.preventDefault()
        searchResultsBranded = []
        searchResultsCommon = [];
        let term = input.value
        input.value = null
		fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${term}`, {
            headers: {
                'x-app-id': 'abb87123',
                'x-app-key': '2d51279777f87f551b022b3350d44124',
            },
		})
		.then(res => res.json())
		.then(res => {
            console.log(res)
            searchResultsBranded = res.branded;
            searchResultsCommon = res.common;
            brandedResultsUl.innerHTML = '';
            commonResultsUl.innerHTML = '';
            results.append(brandedResultsDiv, commonResultsDiv);

            searchResultsBranded.map(item => {
                let listItem = document.createElement('div');
                listItem.className = 'results-li'
                const food = document.createElement('div')
                food.className = 'food-item'
                food.innerText = `${item.brand_name_item_name}`;
                const addButton = document.createElement('button')
                addButton.className = 'results-li-add';
                addButton.innerText = '+'
                listItem.append(food, addButton)
                return brandedResultsUl.append(listItem);
            });
            searchResultsCommon.map(item => {
                let listItem = document.createElement('div');
                listItem.className = 'results-li';
                const food = document.createElement('div');
                food.className = 'food-item';
                food.innerText = `${item.food_name}`;
                const addButton = document.createElement('button');
                addButton.className = 'results-li-add'
                addButton.innerText = '+';
                listItem.append(food, addButton);
                return commonResultsUl.append(listItem);
            });
        });
	});
    form.append(input, searchButton);
    
    const results = document.createElement('div')
    results.id = 'results-div'

    const brandedResultsDiv = document.createElement('div')
    brandedResultsDiv.className = 'branded-results-div'
    const brandedTitle = document.createElement('h2')
    brandedTitle.innerText = 'Branded'
    const brandedResultsUl = document.createElement('div')
    brandedResultsDiv.append(brandedTitle, brandedResultsUl)

    const commonResultsDiv = document.createElement('div');
    commonResultsDiv.className = 'common-results-div';
    const commonTitle = document.createElement('h2');
    commonTitle.innerText = 'Common';
    const commonResultsUl = document.createElement('div');
    commonResultsDiv.append(commonTitle, commonResultsUl);

	const searchContainer = document.querySelector('#search-container');
	const buildSearch = () => {
		searchContainer.innerHTML = '';
		searchContainer.append(form, results);
	};

	addBreakfast.addEventListener('click', () => {
		let selectedFood = buildSearch();
	});
	addLunch.addEventListener('click', () => {});
	addDinner.addEventListener('click', () => {});
	addSnack.addEventListener('click', () => {});
});
