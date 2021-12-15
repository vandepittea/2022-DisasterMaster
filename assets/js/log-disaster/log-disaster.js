"use strict";

let selectedCountry;
let selectedDisaster;
let selectedAid;

function suggestCountry(e){
    const result = countries.filter(containsCountry);

    fillCountriesList(result, "#disaster-location");
}

function containsCountry(country){
    country = country.toLowerCase();
    const suggest = document.querySelector("#location").value.toLowerCase();
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
}

function selectDisaster(e){
    const $article = e.target.closest("article");

    if ($article) {
        if ($article.nodeName.toLowerCase() === 'article') {
            selectArticle($article, ".disasters");
            selectedDisaster = idToName($article.id);
        }
    }
}

function showAid(e){
    e.preventDefault();

    if(selectedDisaster !== undefined){
        let availableAid = [];
        const disaster = selectDisasterObject();

        for (const assistance of aid){
            for (const disasterType of assistance.disasterTypes){
                if (disasterType === disaster.category && assistance.minimalLevel <= disaster.level){
                    availableAid.push(assistance);
                }
            }
        }

        renderAvailableAid(availableAid, ".aids");
        selectArticleWhenRerender(selectedAid);

        return availableAid;
    }
}

function selectAid(e){
    const $article = e.target.closest("article");

    if ($article) {
        if ($article.nodeName.toLowerCase() === 'article') {
            selectArticle($article, ".aids");
            selectedAid = idToName($article.id);
        }
    }
}

// Add additional functions below

function selectArticle(article, selector){
    const selectedArticles = document.querySelectorAll(`${selector} .selected`);
    selectedArticles.forEach((selectedArticle) => {
        selectedArticle.classList.remove('selected');
    });

    article.classList.add("selected");
}

function selectArticleWhenRerender(article){
    if(article !== undefined){
        const idArticle = nameToImageOrID(article)
        if(document.querySelector(`#${idArticle}`)){
            document.querySelector(`#${idArticle}`).classList.add("selected");
        }
    }
}

function selectDisasterObject(){
    for (const disaster of disasterTypes){
        if (disaster.name === selectedDisaster){
            return disaster;
        }
    }
}

function showDisasters(e){
    e.preventDefault();

    renderDisasters(".disasters", disasterTypes);
    selectArticleWhenRerender(selectedDisaster);
}