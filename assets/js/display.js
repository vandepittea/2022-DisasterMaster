"use strict";
// Determine parameters for this function yourself
function renderDisasters(selector, disasters) {
    const $location = document.querySelector(selector);
    $location.innerHTML = "";

    for(const disaster of disasters){
        const imageOrIdName = nameToImageOrID(disaster.name);
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(disaster));
        document.querySelector(`#${imageOrIdName} dl`).insertAdjacentHTML('beforeend', renderExtraInfo(disaster, selector));
        document.querySelector(`#${imageOrIdName} ul`).insertAdjacentHTML('beforeend', renderAid(disaster, selector));
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
        <ul></ul>
    </article>`
}

function renderAid(disaster, selector){
    if(selector === "#submitted-disasters div"){
        return `<li>
                <h4>Aid:</h4>
                <ul>
                    <li>progress: <span>${disaster.aidProgress}</span></li>
                    <li>goal: <span>${disaster.aidGoal}</span></li>
                </ul>
            </li>
            <li>
                <h4>Currency</h4>
                <ul>
                    <li>progress: <span>${disaster.currencyProgress}</span></li>
                    <li>goal: <span>${disaster.aidGoal}</span></li>
                </ul>
            </li>`
    }
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
function renderExtraInfo(disaster, selector){
    const basicAid =  `<dt>Category:</dt>
            <dd>${disaster.category}</dd>
            <dt>Level</dt>
            <dd>${disaster.level}</dd>`;

    const extraAid = `<dt>Location:</dt>
                        <dd>${disaster.location}</dd>`;

    if(selector === ".disasters"){
        return basicAid;
    }
    else{
        return `${basicAid}
        ${extraAid}`;
    }
}
