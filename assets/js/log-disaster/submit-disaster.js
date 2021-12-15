"use strict";

function submitDisaster(e, disaster, countryName, aidName, aidGoal, currencyGoal){
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

function saveDisaster(disaster){
    let submittedDisastersLocalStorage = loadFromStorage(config.submittedDisastersKey);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = [];
    }

    submittedDisastersLocalStorage.push(disaster);
    saveToStorage(config.submittedDisastersKey, submittedDisastersLocalStorage);
}

// Add additional functions below