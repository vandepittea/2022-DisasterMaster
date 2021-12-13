"use strict";
// Determine parameters for this function yourself
function renderDisasters(location, array) {
    const $location = document.querySelector(location);
    $location.innerHTML = "";

    for(const element of array){
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(element.name, element.category, element.level));
    }
}

function renderBasicInfo(disaster, category, level){
    const imageName = nameToImageOrID(disaster);

    return `<article>
        <h3>${disaster}</h3>
        <figure>
            <img src="images/${imageName}.svg" alt="${disaster}" title="${disaster}">
        </figure>
        <dl>
            <dt>Category:</dt>
            <dd>${category}</dd>
            <dt>Level</dt>
            <dd>${level}</dd>
        </dl>
    </article>`
}

function renderAid(disaster){

}

function displayThankYou(selector, message) {

}

function renderAvailableAid(aid, selector) {

}

function displayFeedbackDisasterSaved(){

}

// Add additional functions below
