"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
        initSubmitDisaster();
        initSupportDisasters();
}

function initSubmitDisaster(){
    document.querySelector("#disaster-location input").addEventListener('input', suggestCountry);
    document.querySelector("#disaster-location ul").addEventListener('click', selectCountry);
    document.querySelector("#disaster-location button").addEventListener('click', showDisasters);
    document.querySelector(".disasters").addEventListener('click', selectDisaster);
    document.querySelector("#show-aid").addEventListener('click', showAid);
    document.querySelector(".aids").addEventListener('click', selectAid);
    document.querySelector("button[type='submit']").addEventListener('click', submitDisaster);

    const buttons = document.querySelectorAll("button")
    buttons.forEach((button) => {
        button.addEventListener('click', navigate);
    });
}

function initSupportDisasters() {

}

// No other functions in this file aside from the ones already declared!

