"use strict";
// Determine parameters for this function yourself
function renderDisasters(selector, disasters) {
    const $location = document.querySelector(selector);
    $location.innerHTML = "";

    for(const disaster of disasters){
        const idName = determineIdDisaster(disaster, selector);
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(disaster, selector));
        document.querySelector(`#${idName} dl`).insertAdjacentHTML('beforeend', renderExtraInfo(disaster, selector));
        document.querySelector(`#${idName} ul`).insertAdjacentHTML('beforeend', renderAid(disaster, selector));
    }
}

function renderBasicInfo(disaster, selector){
    const imageName = nameToImageOrID(disaster.name);
    const idName = determineIdDisaster(disaster, selector);

    return `<article id="${idName}">
        <h3>${disaster.name}</h3>
        <figure>
            <img src="images/${imageName}.svg" alt="${disaster.name}" title="${disaster.name}">
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

function determineIdDisaster(disaster, selector){
    if(selector === "#submitted-disasters div"){
        return nameToImageOrID(`${disaster.name} ${disaster.location}`);
    }
    else{
        return nameToImageOrID(disaster.name);
    }
}
