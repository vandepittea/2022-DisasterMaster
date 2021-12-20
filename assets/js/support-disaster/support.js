"use strict";

let blnAscDesc = 1;

function selectSupportableDisaster(e) {
    e.preventDefault();

    const $article = e.target.closest("article");
    const $form = e.target.closest("form");

    if ($article && $form == null) {
        if ($article.nodeName.toLowerCase() === 'article') {
            deleteThankYouMessage();
            showExtraInformationAfterUlDisaster("main", "form", "");
            showForm($article.id);
        }
    }
}

function supportDisaster(e) {
    e.preventDefault();

    const $article = e.target.closest("article");

    if ($article) {
        if ($article.nodeName.toLowerCase() === 'article') {
            if(e.target.nodeName.toLowerCase() === 'input' && e.target.type === "submit") {
                submitGrantForm(e, $article);
            }
        }
    }
}

// Add additional functions below
function loadFromMemoryOrLocalStorage(key){
    let submittedDisastersLocalStorage = loadFromStorage(key);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = submittedDisasters;
    }

    return submittedDisastersLocalStorage;
}

function saveToLocalStorageOrToMemory(array){
    const checkLocalStorageArrayExists = loadFromStorage(config.submittedDisastersKey);
    if(checkLocalStorageArrayExists == null){
        submittedDisasters = array;
    }
    else{
        saveToStorage(config.submittedDisastersKey, array);
    }
}

function deleteThankYouMessage(){
    const $thankYou = document.querySelector(".thankyou");
    if($thankYou){
        $thankYou.remove();
    }
}

function submitGrantForm(e, article){
    const idDisaster = article.id;
    const disasterName = idToName(idDisaster, true);
    const countryName = idToCountry(idDisaster);
    const valueButton = e.target.value;

    const grantAwarded = grantOfSupport(disasterName, countryName, valueButton);
    if (grantAwarded){
        searchDisaster();
        displayThankYou(`#${idDisaster} ul`, "Thank you for your submission");
        displayFeedbackDisasterSaved(article, idDisaster, disasterName, countryName);
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
    const search = document.querySelector("#name").value.toLowerCase();
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
        sortListAsc("#submitted-disasters div", array);
        changeButtonText("#sort", blnAscDesc);
    }
    else{
        sortListDesc("#submitted-disasters div", array);
        changeButtonText("#sort", blnAscDesc);
    }
}

function changeButtonText(id, blnAscDesc){
    if (blnAscDesc === 1){
        document.querySelector(`button${id}`).innerHTML = "descending";
    }
    else{
        document.querySelector(`button${id}`).innerHTML = "ascending";
    }
}

function sortListAsc(id, array){
    renderDisasters(id, array.sort(compareAscending));
    checkDisastersForSuccess();
}

function sortListDesc(id, array){
    renderDisasters(id, array.sort(compareDescending));
    checkDisastersForSuccess();
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

function grantOfSupport(disasterName, countryName, valueButton){
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
    const selectedDisaster = selectObject(submittedDisastersLocalStorage, disasterName, countryName);
    const indexArray = submittedDisastersLocalStorage.indexOf(selectedDisaster);

    if(valueButton === "Have my support"){
        return grantOfAid(selectedDisaster, submittedDisastersLocalStorage, indexArray);
    }
    else{
        return grantOfCurrency(selectedDisaster, submittedDisastersLocalStorage, indexArray);
    }
}

function grantOfAid(selectedDisaster, array, indexArray){
    const aidPackage = document.querySelector("#support-package").value;
    let aidProgress = selectedDisaster.aidProgress;

    aidProgress += determineAidProgress(aidPackage);
    array[indexArray].aidProgress = aidProgress;

    saveToLocalStorageOrToMemory(array);

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

function grantOfCurrency(selectedDisaster, array, indexArray){
    const currency = document.querySelector("#currency").value;

    if(currency >= 1 && currency <= 9999){
        grantOfCurrencyMeetsConditions(selectedDisaster, array, indexArray, currency);

        return true;
    }
    else{
        alert("ERROR: the currency must be a minimum of 1 and a maximum of 9999.");

        return false;
    }
}

function grantOfCurrencyMeetsConditions(selectedDisaster, array, indexArray, currency){
    let currencyProgress = selectedDisaster.currencyProgress;

    currencyProgress += parseInt(currency);
    array[indexArray].currencyProgress = currencyProgress;

    saveToLocalStorageOrToMemory(array);
}