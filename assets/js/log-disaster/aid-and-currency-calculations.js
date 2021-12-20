"use strict";

function determineAid(disaster, aid){
    return aid.length * disaster.length * 100;
}

function determineCurrency(disaster, country){
    return disaster.level * country.length * 200;
}

// Add additional functions below