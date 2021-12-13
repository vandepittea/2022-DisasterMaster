"use strict";

let selectedCountry;

function suggestCountry(e){
    const result = countries.filter(containsCountry);

    fillCountriesList(result, "#disaster-location");
}

function containsCountry(country){
    country = country.toLowerCase();
    const suggest = document.querySelector("#location").value.toLowerCase();
    const regex = new RegExp(`.*${suggest}.*`);
    return regex.test(country);
}

function fillCountriesList(countries, id){
    const $ul = document.querySelector(`${id} ul`);
    $ul.innerHTML = "";

    for(const country of countries){
        $ul.insertAdjacentHTML('beforeend', `<li>${country}</li>`);
    }
}

function selectCountry(e){
    if (e.target.nodeName.toLowerCase() === 'li') {
        selectedCountry = e.target.innerHTML;
        document.querySelector("#location").value = selectedCountry;
        fillCountriesList("", "#disaster-location");
    }
}

function navigate(e){
    e.preventDefault();

    if(selectedCountry !== undefined){
        const target = e.target.dataset.target;
        const $source = document.querySelector("fieldset:not(hidden)");
        const $target = document.querySelector(`#${target}`);

        $target.classList.remove("hidden");
        $source.classList.add("hidden");

        if(target === "disaster-type"){
            renderDisasters();
        }
    }
}
function selectDisaster(e){
    if (e.target.closest("article")) {
        if (e.target.closest("article").nodeName.toLowerCase() === 'article') {
            const selectedArticles = document.querySelectorAll('.selected');
            selectedArticles.forEach((selectedArticle) => {
                selectedArticle.classList.remove('selected');
            });

            e.target.closest("article").classList.add("selected");
        }
    }
}

function showAid(e){

}


function selectAid(e){

}

// Add additional functions below