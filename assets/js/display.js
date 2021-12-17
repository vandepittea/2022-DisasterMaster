"use strict";
// Determine parameters for this function yourself
function renderDisasters(selector, disasters) {
    const $location = document.querySelector(selector);
    $location.innerHTML = "";

    for(const disaster of disasters){
        $location.insertAdjacentHTML('beforeend', renderBasicInfo(disaster, selector));

        const idName = determineIdDisaster(disaster, selector);
        const $locationExtraInfo = document.querySelector(`#${idName} dl`);
        $locationExtraInfo.insertAdjacentHTML('beforeend', renderExtraInfo(disaster, selector));
        $locationExtraInfo.insertAdjacentHTML('afterend', renderAid(disaster, selector));
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
    </article>`
}

function renderAid(disaster, selector){
    if(selector === "#submitted-disasters div"){
        return `<ul>
                    <li>
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
                            <li>goal: <span>${disaster.currencyGoal}</span></li>
                        </ul>
                    </li>
                </ul>`
    }
    else{
        return '';
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

function displayFeedbackDisasterSaved(article){
    const idDisaster = article.id;
    const disasterName = idToName(idDisaster, true);
    const countryName = idToCountry(idDisaster);
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
    const selectedDisaster = selectObject(submittedDisastersLocalStorage, disasterName, countryName);

    if(selectedDisaster.aidProgress >= selectedDisaster.aidGoal || selectedDisaster.currencyProgress >= selectedDisaster.currencyGoal) {
        article.classList.add("success");
        showConfirmationMessage(idDisaster, selectedDisaster);
    }
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

function showConfirmationMessage(idDisaster, disasterObject){
    const aidName = disasterObject.requestedAid;
    const aidObject = selectObject(aid, aidName);
    const addCode =`<p class="success">${aidObject.confirmationMessage}</p>`;

    showExtraInformationAfterUlDisaster(`#${idDisaster}`, ".success", addCode);
}

function showForm(idDisaster){
    const form = `<form> 
                <label for="support-package">donate aid packages</label>
                <select id="support-package">
                    <option value="food">Food</option>
                    <option value="medicine">Medicine</option>
                    <option value="diplomats">Diplomats</option>
                </select>
                <input type="submit" value="Have my support"/>
                <label for="currency">donate currency</label>
                <input type="number" id="currency"/>
                <input type="submit" value="Take my money!"/>
            </form>`;

    showExtraInformationAfterUlDisaster(`#${idDisaster}`, "form", form)
}

function showExtraInformationAfterUlDisaster(idDisaster, deleteElement, addCode){
    const $location = document.querySelector(`${idDisaster} ul`);

    const $delete = document.querySelector(`${idDisaster} ${deleteElement}`);
    if($delete){
        $delete.parentNode.removeChild($delete);
    }

    $location.insertAdjacentHTML('afterend', addCode);
}
