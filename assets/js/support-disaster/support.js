"use strict";

let blnAscDesc = 1;

function selectSupportableDisaster(e) {

}

function supportDisaster(e) {

}

// Add additional functions below
function clickSort(e){
    e.preventDefault();

    showSupportableDisasters();
}

function showSupportableDisasters(){
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);

    toggleSort(submittedDisastersLocalStorage);
}

function loadFromMemoryOrLocalStorage(key){
    let submittedDisastersLocalStorage = loadFromStorage(key);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = submittedDisasters;
    }

    return submittedDisastersLocalStorage;
}

function toggleSort(array){
    if (blnAscDesc === 1){
        sortListAsc("#submitted-disasters div", array);
        changeButtonText("#sort", blnAscDesc);
        blnAscDesc = 0;
    }
    else{
        sortListDesc("#submitted-disasters div", array);
        changeButtonText("#sort", blnAscDesc);
        blnAscDesc = 1;
    }
}

function sortListAsc(id, array){
    renderDisasters(id, array.sort(compareAscending));
}

function sortListDesc(id, array){
    renderDisasters(id, array.sort(compareDescending));
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