// search area start here
document.getElementById('button-addon2').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    const h1 = document.getElementById('write-something');

    if (searchField.value == '') {
        // alert('Please write something');
        h1.innerText = 'Please write something'
    } else {
        console.log(searchFieldText);
        searchField.value = '';

        // error message
        h1.innerText = '';
        h1.style.height = '0vh';

        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFieldText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.meals))
            .catch(error => errorMessage(error))
    }
})
// search area end here

// please try again later start here
const errorMessage = eMessage => {
    const h1 = document.getElementById('write-something');
    h1.innerHTML = 'No Search Result Found.Please Try Again Later.';
    h1.classList.add('no-search');
}
// please try again later end here



// display search result start here
const displaySearchResult = display => {
    const row = document.getElementById('row');
    row.textContent = '';
    // console.log(display);
    display.forEach(result => {
        console.log(result);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" onclick="foodDetailsShow('${result.idMeal}')">
            <img src="${result.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Foods Name: ${result.strMeal}</h5>
              <p class="card-text">Instructions: ${result.strInstructions.slice(0,100)}</p>
            </div>
          </div>
        `
        row.appendChild(div);
    })
}
// display search result end here


const foodDetailsShow = details => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
    fetch(url)
        .then(response => response.json())
        .then(data => clickCardDisplay(data.meals[0]))
}

// display details start here
// text
const h2 = document.getElementById('food-del');
h2.classList.add('food-hide');

const foodDetailsWrapper = document.getElementById('food-details-wrapper');
foodDetailsWrapper.style.marginBottom = '0%';

const clickCardDisplay = display => {
    // text
    h2.classList.add('food-show');
    console.log(display.strMeal);

    const foodDetailsWrapper = document.getElementById('food-details-wrapper');
    foodDetailsWrapper.textContent = '';
    const createDiv = document.createElement('div');
    createDiv.classList.add('col');
    createDiv.innerHTML = `
        <div class="card">
        <img src="${display.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Food Name: ${display.strMeal}</h5>
        <h6 class="card-title">Food ID: ${display.idMeal}</h6>
        <p class="card-text">${display.strInstructions.slice(0,50)}</p>
        </div>
        </div>
    `
    foodDetailsWrapper.appendChild(createDiv);
}
// display details end here