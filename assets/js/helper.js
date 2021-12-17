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

function idToName(id, deleteLocation){
    id = id.replaceAll("-", " ");
    id = id.charAt(0).toUpperCase() + id.slice(1);

    if(deleteLocation === true){
        const indexLastSpace = id.lastIndexOf(" ");
        id = id.substring(0, indexLastSpace);
    }

    return id;
}
// Add additional functions below
function selectObject(array, selectedElement){
    for (const element of array){
        if (element.name === selectedElement){
            return element;
        }
    }
}