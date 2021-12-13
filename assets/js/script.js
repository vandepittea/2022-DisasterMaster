"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector("#disaster-location input").addEventListener('input', suggestCountry);
    document.querySelector("#disaster-location ul").addEventListener('click', selectCountry);
    document.querySelector(".disasters").addEventListener('click', selectDisaster);

    const buttons = document.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener('click', navigate);
    });
}

function initSubmitDisaster(){

}

function initSupportDisasters() {

}

// No other functions in this file aside from the ones already declared!

