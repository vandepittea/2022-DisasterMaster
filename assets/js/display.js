"use strict";
// Determine parameters for this function yourself
function renderDisasters() {
    const $div = document.querySelector(`.disasters`);
    $div.innerHTML = "";

    for(const disasterType of disasterTypes){
        $div.insertAdjacentHTML('beforeend', renderBasicInfo(disasterType.name, disasterType.category, disasterType.level));
    }
}

function renderBasicInfo(disaster, category, level){
    return `<article>
        <h3>${disaster}</h3>
        <figure>
            <img src="images/flood.svg" alt="${disaster}" title="${disaster}">
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
