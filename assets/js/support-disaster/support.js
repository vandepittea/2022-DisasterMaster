"use strict";

function selectSupportableDisaster(e) {

}

function supportDisaster(e) {

}

// Add additional functions below
function showSupportableDisasters(){
    const submittedDisastersLocalStorage = loadFromMemoryOrLocalStorage(config.submittedDisastersKey);

    renderDisasters("#submitted-disasters div", submittedDisastersLocalStorage);
}

function loadFromMemoryOrLocalStorage(key){
    let submittedDisastersLocalStorage = loadFromStorage(key);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = submittedDisasters;
    }

    return submittedDisastersLocalStorage;
}