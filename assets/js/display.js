"use strict";
// Determine parameters for this function yourself
function renderDisasters(selector, disasters) {
    const $location = document.querySelector(selector);
    $location.innerHTML = "";

    for(const disaster of disasters){
        const imageOrIdName = nameToImageOrID(disaster.name);
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(disaster));
        document.querySelector(`#${imageOrIdName} dl`).insertAdjacentHTML('beforeend', renderAid(disaster));
    }
}

function renderBasicInfo(disaster){
    const imageOrIdName = nameToImageOrID(disaster.name);

    return `<article id="${imageOrIdName}">
        <h3>${disaster.name}</h3>
        <figure>
            <img src="images/${imageOrIdName}.svg" alt="${disaster.name}" title="${disaster.name}">
        </figure>
        <dl></dl>
    </article>`
}

function renderAid(disaster){
    return `<dt>Category:</dt>
            <dd>${disaster.category}</dd>
            <dt>Level</dt>
            <dd>${disaster.level}</dd>`
}

function displayThankYou(selector, message) {

}

function renderAvailableAid(aid, selector) {
    const $location = document.querySelector(selector)
    $location.innerHTML = "";

    for(const assistance of aid){
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(assistance));

        const disasterTypesString = assistance.disasterTypes.join();
        const idName = nameToImageOrID(assistance.name);
        document.querySelector(`#${idName} dl`).insertAdjacentHTML('beforeend', `<dt>applies to</dt><dd>${disasterTypesString}</dd>`);
    }
}

function displayFeedbackDisasterSaved(){

}

// Add additional functions below
