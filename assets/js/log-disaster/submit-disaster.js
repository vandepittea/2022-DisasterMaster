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

}

// Add additional functions below