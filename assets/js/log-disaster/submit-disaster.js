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
    let doubleDisasterInSameCountry = false;
    let submittedDisastersLocalStorage = loadFromStorage(config.submittedDisastersKey);

    if (submittedDisastersLocalStorage == null){
        submittedDisastersLocalStorage = [];
    }

    for(const submittedDisaster of submittedDisastersLocalStorage){
        if(submittedDisaster.name === disaster.name && submittedDisaster.location === disaster.location){
            doubleDisasterInSameCountry = true;
        }
    }

    if(doubleDisasterInSameCountry === false){
        submittedDisastersLocalStorage.push(disaster);
        saveToStorage(config.submittedDisastersKey, submittedDisastersLocalStorage);
    }
    else{
        console.log("ERROR: double disaster in same country");
    }
}

// Add additional functions below