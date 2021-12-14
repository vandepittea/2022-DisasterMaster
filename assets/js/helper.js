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
    name = name.replaceAll(" ", "-");
    return name.toLowerCase();
}

function idToName(id){
    id = id.replaceAll("-", " ");
    return id.charAt(0).toUpperCase() + id.slice(1);
}
// Add additional functions below