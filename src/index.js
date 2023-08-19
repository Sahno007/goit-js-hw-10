import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from "notiflix";
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function renderBreedOptions(breeds) {
  breedSelect.innerHTML = breeds.map(breed => {
    return `<option value="${breed.id}">${breed.name}</option>`;
  }).join("");
}

function renderCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="${cat.breeds[0].name}">
    <h2>${cat.breeds[0].name}</h2>
    <p>Description: ${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>
  `;
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showError(message) {
  error.textContent = message;
  error.classList.remove("hidden");
}

function hideError() {
  error.classList.add("hidden");
}

breedSelect.addEventListener("change", event => {
  const breedId = event.target.value;
  
  showLoader();
  hideError();
    catInfo.innerHTML = "";
    
  fetchCatByBreed(breedId)
    .then(cat => {
      renderCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      showError("Error fetching cat information.");
      hideLoader();
    });
});

showLoader();
hideError();

fetchBreeds()
  .then(breeds => {
    renderBreedOptions(breeds);
    hideLoader();
  })
  .catch(error => {
    showError("Error fetching breed list.");
    hideLoader();
  });

  new SlimSelect({
  select: '#breed-select'
});