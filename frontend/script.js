const appId = ''   // << input your api app id here inside the ''
const appKey = ''; // << input your api app key here inside the ''

window.addEventListener('DOMContentLoaded', () => {
    let searchResultsBranded = []
    let selectedUL = ''

    const calorieCounter = document.querySelector('#calorie-count')
	const breakfastUL = document.querySelector('#breakfast-item-container');
	const lunchUL = document.querySelector('#lunch-item-container');
	const dinnerUL = document.querySelector('#dinner-item-container');
	const snackUL = document.querySelector('#snack-item-container');

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
        let term = input.value
        input.value = null
		fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${term}`, {
            headers: {
                'x-app-id': appId,
                'x-app-key': appKey,
            },
		})
		.then(res => res.json())
		.then(res => {
            console.log(res)
            searchResultsBranded = res.branded;
            brandedResultsUl.innerHTML = '';
            results.append(brandedResultsDiv);

            searchResultsBranded.map(item => {
                let listItem = document.createElement('div');
                listItem.className = 'results-li'

                const food = document.createElement('div')
                food.className = 'food-item'
                food.innerText = `${item.brand_name_item_name}`;

                const calDiv = document.createElement('div')
                calDiv.className = 'cal-div'

                const cals = document.createElement('div')
                cals.innerText = `${item.nf_calories} calories`

                const addButton = document.createElement('button')
                addButton.className = 'add-delete-button';
                addButton.innerText = '+'
                addButton.addEventListener('click', () => {
                    createLI(item)
                    brandedResultsUl.innerHTML = '';
                    searchContainer.innerHTML = '';
                })

                calDiv.append(cals, addButton)
                listItem.append(food, calDiv)
                return brandedResultsUl.append(listItem);
            });
        });
	});
    form.append(input, searchButton);
    
    const results = document.createElement('div')
    results.id = 'results-div'

    const brandedResultsDiv = document.createElement('div')
    brandedResultsDiv.className = 'branded-results-div'
    const brandedResultsUl = document.createElement('div')
    brandedResultsDiv.append(brandedResultsUl)

	const searchContainer = document.querySelector('#search-container');
	const buildSearch = () => {
		searchContainer.innerHTML = '';
		searchContainer.append(form, results);
	};

	addBreakfast.addEventListener('click', () => {
        selectedUL = breakfastUL
		buildSearch();
	});
	addLunch.addEventListener('click', () => {
        selectedUL = lunchUL;
		buildSearch();
    });
	addDinner.addEventListener('click', () => {
        selectedUL = dinnerUL;
		buildSearch();
    });
    addSnack.addEventListener('click', () => {
        selectedUL = snackUL;
		buildSearch();
    });
    
    const createLI = food => {
        calorieCounter.innerText = parseInt(calorieCounter.innerText) + food.nf_calories;
        const foodLiDiv = document.createElement('div')
        foodLiDiv.className = 'food-li-div'

        const foodName = document.createElement('div')
        foodName.innerText = food.food_name

        const deleteButton = document.createElement('button')
        deleteButton.className = 'add-delete-button';
        deleteButton.innerText = '-'
        deleteButton.addEventListener('click', () => {
            handleDelete(foodLiDiv, food.nf_calories)
        })

        foodLiDiv.append(deleteButton, foodName)
        selectedUL.append(foodLiDiv)
    }

    const handleDelete = (li, calories) => {
        li.remove()
        calorieCounter.innerText = parseInt(calorieCounter.innerText) - calories
    }
});