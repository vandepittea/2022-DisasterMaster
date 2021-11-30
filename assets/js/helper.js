"use strict";

/****************
 Storage helpers
 ***************/

function saveToStorage(key, value) {
    if (localStorage) {
        return localStorage.setItem(key,JSON.stringify(value));
    }
}

// Returns null if not set
function loadFromStorage(key) {
    if (localStorage) {
        return JSON.parse(localStorage.getItem(key));
    }
}


/*******************
 Conversion helpers
 ******************/

function nameToImageOrID(name){

}

function idToName(id){

}
// Add additional functions below