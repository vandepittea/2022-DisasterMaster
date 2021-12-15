"use strict";

function submitDisaster(e){
    e.preventDefault();

    if(selectedAid !== undefined){ // global variable
        let doubleDisasterInSameCountry = false;
        const disasterObject = selectDisasterObject();
        const disaster = saveDisaster(disasterObject, selectedCountry, selectedAid, determineAid(showAid(e), aid), determineCurrency(disasterObject, selectedCountry))
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
            console.log(selectedAid);
        }
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