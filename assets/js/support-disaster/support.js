"use strict";

let blnAscDesc = 1;

function selectSupportableDisaster(e) {
    e.preventDefault();

    const $article = e.target.closest("article");
    const $form = e.target.closest("form");

    if ($article && $form == null) {
        if ($article.nodeName.toLowerCase() === 'article') {
            showExtraInformationAfterUlDisaster("", "form", "");
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
                displayFeedbackDisasterSaved($article);
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

function showSupportableDisasters(result){
    if(result === undefined){
        const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);
        toggleSort(submittedDisastersLocalStorage);
    }
    else{
        toggleSort(result);
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

function sortListAsc(id, array){
    renderDisasters(id, array.sort(compareAscending));
    checkDisastersForSuccess();
}

function sortListDesc(id, array){
    renderDisasters(id, array.sort(compareDescending));
    checkDisastersForSuccess();
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

function changeButtonText(id, blnAscDesc){
    if (blnAscDesc === 1){
        document.querySelector(`button${id}`).innerHTML = "descending";
    }
    else{
        document.querySelector(`button${id}`).innerHTML = "ascending";
    }
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

function checkDisastersForSuccess(){
    const disasters = document.querySelectorAll("article");
    disasters.forEach((disaster) => {
        displayFeedbackDisasterSaved(disaster);
    });
}