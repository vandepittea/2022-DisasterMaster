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

        id = doubleCheckDisasterName(id);
    }

    return id;
}
// Add additional functions below
function selectObject(array, selectedElement, selectedCountry=undefined){
    for (const element of array){
        if (element.name === selectedElement){
            if(selectedCountry !== undefined){
                if(element.country === selectedCountry){
                    return element
                }
            }
            else{
                return element;
            }
        }
    }
}

function doubleCheckDisasterName(disasterName){
    const disasterObject = selectObject(loadFromMemoryOrLocalStorage(config.submittedDisastersKey), disasterName);

    if(disasterObject === undefined){
        return idToName(disasterName, true);
    }
    else{
        return disasterName;
    }
}

function idToCountry(id){
    id = id.replaceAll("-", " ");
    id = id.substring(id.indexOf(" ") + 1);
    const arrayWords = id.split(" ");

    for(let i = 0; i < arrayWords.length; i++){
        arrayWords[i] = arrayWords[i] = arrayWords[i].charAt(0).toUpperCase() + arrayWords[i].slice(1);
    }

    id = arrayWords.join(" ");

    if(countries.includes(id) === false){
        id = idToCountry(id);
    }

    return id;
}