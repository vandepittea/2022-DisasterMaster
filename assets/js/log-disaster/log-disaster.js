"use strict";

let selectedCountry;
let selectedDisaster;
let selectedAid;

function suggestCountry(e){
    const suggest = e.target.value.toLowerCase();
    const result = countries.filter(containsCountry.bind(this, suggest));

    fillCountriesList(result, "#disaster-location");
}

function selectCountry(e){
    if (e.target.nodeName.toLowerCase() === 'li') {
        selectedCountry = e.target.innerHTML;
        document.querySelector("#location").value = selectedCountry;
        fillCountriesList("", "#disaster-location");
    }
}

function navigate(e){
    e.preventDefault();

    const target = e.target.dataset.target;
    const $source = document.querySelector("fieldset:not(.hidden)");
    const $target = document.querySelector(`#${target}`);

    if ((target === "disaster-aid" && selectedCountry !== undefined && selectedDisaster !== undefined) || target === "disaster-location" || (target === "disaster-type" && selectedCountry !== undefined)){
        $target.classList.remove("hidden");
        $source.classList.add("hidden");
    }
    else{
        navigationErrors();
    }
}

function selectDisaster(e){
    const $article = e.target.closest("article");

    if ($article) {
        selectArticle($article, ".disasters");
        selectedDisaster = idToName($article.id, false);
    }
}

function showAid(e){
    e.preventDefault();

    if(selectedDisaster !== undefined) {
        renderAvailableAid(determineAvailableAid(), ".aids");
        selectArticleWhenRerender(selectedAid);
    }
}

function selectAid(e){
    const $article = e.target.closest("article");

    if ($article) {
        selectArticle($article, ".aids");
        selectedAid = idToName($article.id, false);
    }
}

// Add additional functions below
function containsCountry(suggest, country){
    country = country.toLowerCase();
    suggest = replaceForRegex(suggest);
    console.log(suggest);
    const regex = new RegExp(`.*${suggest}.*`);
    return regex.test(country);
}

function fillCountriesList(countries, id){
    const $ul = document.querySelector(`${id} ul`);
    $ul.innerHTML = "";

    for(const country of countries){
        $ul.insertAdjacentHTML('beforeend', `<li>${country}</li>`);
    }
}

function showDisasters(e){
    e.preventDefault();

    renderDisasters(disasterTypes, ".disasters");
    selectArticleWhenRerender(selectedDisaster);
}

function determineAvailableAid(){
    let availableAid = [];
    const disaster = selectObject(disasterTypes, selectedDisaster);

    for (const assistance of aid) {
        if (assistance.disasterTypes.includes(disaster.category) && assistance.minimalLevel <= disaster.level) {
            availableAid.push(assistance);
        }
    }

    return availableAid;
}

function selectArticle(article, selector){
    const selectedArticles = document.querySelectorAll(`${selector} .selected`);
    selectedArticles.forEach((selectedArticle) => {
        selectedArticle.classList.remove('selected');
    });

    article.classList.add("selected");
}

function selectArticleWhenRerender(article){
    if(article !== undefined){
        const idArticle = nameToImageOrID(article);
        if(document.querySelector(`#${idArticle}`)){
            document.querySelector(`#${idArticle}`).classList.add("selected");
        }
    }
}

function navigationErrors(){
    if(selectedCountry === undefined){
        alert("ERROR: enter the country where the disaster happened.");
    }
    else if(selectedDisaster === undefined){
        alert("ERROR: click on a type of disaster.");
    }
    else if(selectedAid === undefined){
        alert("ERROR: click on an aid to solve the disaster.");
    }
}