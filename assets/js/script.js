"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    if(document.URL.includes("index.html")){
        initSubmitDisaster();
    }
    if(document.URL.includes("support-a-disaster.html")){
        initSupportDisasters();
    }
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
    showSupportableDisasters();

    document.querySelector("aside button").addEventListener('click', clickSort);
    document.querySelector("#name").addEventListener('input', searchDisaster);
    document.querySelector("#sort-order").addEventListener('change', searchDisaster);
    document.querySelector("#submitted-disasters div").addEventListener('click', selectSupportableDisaster);
    document.querySelector("#submitted-disasters div").addEventListener('click', supportDisaster);
}

// No other functions in this file aside from the ones already declared!