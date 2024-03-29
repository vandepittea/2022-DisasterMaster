"use strict";

let blnAscDesc = 1;
const idsAlreadySubmittedForm = [];

function selectSupportableDisaster(e) {
    e.preventDefault();

    const $article = e.target.closest("article");
    const $form = e.target.closest("form");

    if ($article && $form == null) {
        const idDisaster = $article.id;

        if(!(document.querySelector(`#${idDisaster} .thankyou`) || document.querySelector(`#${idDisaster} .success`))){
            showForm($article.id);
        }
    }
}

function supportDisaster(e) {
    e.preventDefault();

    const $article = e.target.closest("article");

    if ($article) {
        if(e.target.nodeName.toLowerCase() === 'input' && e.target.type === "submit") {
            submitGrantForm(e, $article);
        }
    }
}

// Add additional functions below
function submitGrantForm(e, disaster){
    const idDisaster = disaster.id;
    const disasterName = idToName(idDisaster, true);
    const countryName = idToCountry(idDisaster);
    const valueButton = e.target.value;

    const grantAwarded = grantOfSupport(idDisaster, disasterName, countryName, valueButton);
    if (grantAwarded){
        deleteForm(idDisaster);
        displayFeedbackDisasterSaved(disaster, idDisaster, disasterName, countryName);
        displayThankYou("Thank you for your submission", `#${idDisaster} ul`);
    }
}

function deleteForm(idDisaster){
    const $form = document.querySelector(`#${idDisaster} form`);
    if($form){
        $form.remove();
    }
}

function clickSort(e){
    e.preventDefault();

    if(blnAscDesc === 1){
        blnAscDesc = 0;
    }
    else{
        blnAscDesc = 1;
    }

    searchDisaster();
}

function searchDisaster(){
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
    const result = submittedDisastersLocalStorage.filter(containsDisaster);

    showSupportableDisasters(result);
}

function containsDisaster(disaster){
    disaster = disaster.name.toLowerCase();
    const search = replaceForRegex(document.querySelector("#name").value.toLowerCase());
    const regex = new RegExp(`.*${search}.*`);
    return regex.test(disaster);
}

function showSupportableDisasters(result){
    if(result === undefined){
        const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
        toggleSort(submittedDisastersLocalStorage);
    }
    else{
        toggleSort(result);
    }
}

function toggleSort(array){
    if (blnAscDesc === 1){
        sortListAsc(array,"#submitted-disasters div");
        changeButtonText("aside button", blnAscDesc);
    }
    else{
        sortListDesc(array,"#submitted-disasters div");
        changeButtonText("aside button", blnAscDesc);
    }
}

function changeButtonText(selector, blnAscDesc){
    if (blnAscDesc === 1){
        document.querySelector(selector).innerHTML = "descending";
    }
    else{
        document.querySelector(selector).innerHTML = "ascending";
    }
}

function sortListAsc(array, id){
    renderDisasters(array.sort(compareAscending), id);
    checkDisastersForSuccess();
    checkDisastersForSubmission();
}

function sortListDesc(array, id){
    renderDisasters(array.sort(compareDescending), id);
    checkDisastersForSuccess();
    checkDisastersForSubmission();
}

function checkDisastersForSuccess(){
    const disasters = document.querySelectorAll("article");
    disasters.forEach((disaster) => {
        const idDisaster = disaster.id;
        const disasterName = idToName(idDisaster, true);
        const countryName = idToCountry(idDisaster);
        displayFeedbackDisasterSaved(disaster, idDisaster, disasterName, countryName);
    });
}

function checkDisastersForSubmission(){
    const forms = document.querySelectorAll("article");

    forms.forEach((form) => {
        const idDisaster = form.id;
        if(idsAlreadySubmittedForm.includes(idDisaster)){
            displayThankYou("Thank you for your submission", `#${idDisaster} ul`);
        }
    })
}

function compareDescending(a, b){
    let sortA;
    let sortB;

    const sortBy = document.querySelector("select").value;
    if(sortBy === "name"){
        sortA = a.name;
        sortB = b.name;
    }
    else if(sortBy === "level"){
        sortA = a.level;
        sortB = b.level;
    }
    else{
        sortA = a.category;
        sortB = b.category;
    }

    if (sortA > sortB) {
        return -1;
    }
    if (sortA < sortB){
        return 1;
    }
    return 0;
}

function compareAscending(a, b){
    const number = compareDescending(a, b);

    if(number === 1){
        return -1;
    }
    else{
        return 1;
    }
}

function grantOfSupport(idDisaster, disasterName, countryName, valueButton){
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
    const selectedDisaster = selectObject(submittedDisastersLocalStorage, disasterName, countryName);
    const indexArray = submittedDisastersLocalStorage.indexOf(selectedDisaster);

    if(valueButton === "Have my support"){
        return grantOfAid(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexArray);
    }
    else{
        return grantOfCurrency(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexArray);
    }
}

function grantOfAid(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexSubmittedDisastersLocalStorage){
    const aidPackage = document.querySelector(`#${idDisaster} #support-package`).value;
    let aidProgress = selectedDisaster.aidProgress;

    aidProgress += determineAidProgress(aidPackage);
    submittedDisastersLocalStorage[indexSubmittedDisastersLocalStorage].aidProgress = aidProgress;

    saveToLocalStorageOrToMemory(submittedDisastersLocalStorage);

    document.querySelector(`#${idDisaster} .aid-progress`).innerHTML = `progress: ${aidProgress}`;
    idsAlreadySubmittedForm.push(idDisaster);

    return true;
}

function determineAidProgress(aidPackage){
    if(aidPackage === "food"){
        return 10;
    }
    else if(aidPackage === "medicine"){
        return 50;
    }
    else{
        return 100;
    }
}

function grantOfCurrency(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexSubmittedDisastersLocalStorage){
    const currency = document.querySelector(`#${idDisaster} #currency`).value;

    if(currency >= 1 && currency <= 9999){
        grantOfCurrencyMeetsConditions(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexSubmittedDisastersLocalStorage, currency);
        idsAlreadySubmittedForm.push(idDisaster);

        return true;
    }
    else{
        alert("ERROR: the currency must be a minimum of 1 and a maximum of 9999.");

        return false;
    }
}

function grantOfCurrencyMeetsConditions(idDisaster, selectedDisaster, submittedDisastersLocalStorage, indexSubmittedDisastersLocalStorage, currency){
    let currencyProgress = selectedDisaster.currencyProgress;

    currencyProgress += parseInt(currency);
    submittedDisastersLocalStorage[indexSubmittedDisastersLocalStorage].currencyProgress = currencyProgress;

    saveToLocalStorageOrToMemory(submittedDisastersLocalStorage);

    document.querySelector(`#${idDisaster} .currency-progress`).innerHTML = `progress: ${currencyProgress}`;
}