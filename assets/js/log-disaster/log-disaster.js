"use strict";

function suggestCountry(e){
    /* search */

    fillCountriesList(countries, "#disaster-location");
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