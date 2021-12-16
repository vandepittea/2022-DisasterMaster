"use strict";

function submitDisaster(e){
    e.preventDefault();

    if(selectedAid !== undefined){ // global variable
        const disasterObject = selectDisasterObject();
        const disaster = saveDisaster(disasterObject, selectedCountry, selectedAid, determineAid(determineAvailableAid(), aid), determineCurrency(disasterObject, selectedCountry));

        const submittedDisastersLocalStorage = loadExistingArrayFromStorageOrCreateNewArray(config.submittedDisastersKey);

        let doubleDisasterInSameCountry = doubleDisasterInSameCountryCheck(submittedDisastersLocalStorage, disaster);

        submitArrayOrError(doubleDisasterInSameCountry, submittedDisastersLocalStorage, disaster, config.submittedDisastersKey);
    }
}

function saveDisaster(disaster, countryName, aidName, aidGoal, currencyGoal){
    return {
        "name": disaster.name,
        "category": disaster.category,
        "level": disaster.level,
        "location": countryName,
        "aidProgress": 0,
        "currencyProgress": 0,
        "aidGoal": aidGoal,
        "currencyGoal": currencyGoal,
        "requestedAid": aidName
    }
}

// Add additional functions below
function doubleDisasterInSameCountryCheck(submittedDisastersLocalStorage, disaster){
    for(const submittedDisaster of submittedDisastersLocalStorage){
        if(submittedDisaster.name === disaster.name && submittedDisaster.location === disaster.location){
            return true;
        }
    }
    return false;
}

function submitArrayOrError(condition, submittedArrayLocalStorage, arrayItem, key){
    if(condition === false){
        submittedArrayLocalStorage.push(arrayItem);
        saveToStorage(key, submittedArrayLocalStorage);
    }
    else{
        console.log("ERROR: double disaster in same country");
    }
}

function loadExistingArrayFromStorageOrCreateNewArray(key){
    let submittedArrayLocalStorage = loadFromStorage(key);

    if (submittedArrayLocalStorage == null){
        submittedArrayLocalStorage = [];
    }

    return submittedArrayLocalStorage;
}