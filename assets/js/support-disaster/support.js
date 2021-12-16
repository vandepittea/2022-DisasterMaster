"use strict";

function selectSupportableDisaster(e) {

}

function supportDisaster(e) {

}

// Add additional functions below
function showSupportableDisasters(e){
    e.preventDefault();

    renderDisasters("#submitted-disasters div", loadFromStorage(config.submittedDisastersKey));
}