"use strict";

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

}

function navigate(e){

}
function selectDisaster(e){


}

function showAid(e){

}


function selectAid(e){

}

// Add additional functions below