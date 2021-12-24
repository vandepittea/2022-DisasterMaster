"use strict";

function submitDisaster(e){
    e.preventDefault();

    if(selectedAid !== undefined){
        const disasterObject = selectObject(disasterTypes, selectedDisaster);
        const disaster = saveDisaster(disasterObject, selectedCountry, selectedAid, determineAid(determineAvailableAid(), aid), determineCurrency(disasterObject, selectedCountry));

        const submittedDisastersLocalStorage = loadExistingArrayFromStorageOrCreateNewArray(config.submittedDisastersKey);

        let doubleDisasterInSameCountry = doubleDisasterInSameCountryCheck(disaster, submittedDisastersLocalStorage);

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
    };
}

// Add additional functions below
function doubleDisasterInSameCountryCheck(disaster, submittedDisastersLocalStorage){
    for(const submittedDisaster of submittedDisastersLocalStorage){
        if(submittedDisaster.name === disaster.name && submittedDisaster.location === disaster.location){
            return true;
        }
    }
    return false;
}

function submitArrayOrError(condition, submittedArrayLocalStorage, submittedArrayItem, key){
    if(condition === false){
        submittedArrayLocalStorage.push(submittedArrayItem);
        saveToStorage(key, submittedArrayLocalStorage);

        document.querySelector("#submit-disaster form").classList.add("hidden");

        displayThankYou("Thank you for your submission", "#submit-disaster p + p");
    }
    else{
        alert("ERROR: the same disaster cannot happen twice in the same country.");
    }
}