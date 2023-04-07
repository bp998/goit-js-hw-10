import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const userInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

userInput.addEventListener(
  'input',
  debounce(e => {
    fetchCountries(userInput.value.trim())
      .then(outcome => {
        if (outcome.length > 10) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        if (outcome.length >= 2 && outcome.length <= 10) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          [...outcome].forEach(country => {
            let newCountry = `<li style="display: flex; gap: 5px;"><img class="country-flag" width=40 src="${country.flags.svg}" alt="${country.flags.alt}"></img>
            <p><b>${country.name.official}</b></p></li>`;
            countryList.innerHTML += newCountry;
          });
          Notiflix.Notify.success(
            `Hurray! There is ${outcome.length} matches!`
          );
        }
        if (outcome.length === 1) {
          countryInfo.innerHTML = '';
          countryList.innerHTML = '';
          countryInfo.innerHTML = `<h2><img src="${
            outcome[0].flags.svg
          }" alt="${outcome[0].flags.alt}" width=40></img>
        ${outcome[0].name.official}</h2>
        <p><b>Capital:</b> ${outcome[0].capital}</p>
        <p><b>Population:</b> ${outcome[0].population}</p>
        <p><b>Languages:</b> ${Object.values(outcome[0].languages).join(
          ', '
        )}</p>`;
          Notiflix.Notify.success(`Hurray! There is ${outcome.length} match!`);
        }
      })
      .catch(err => {
        Notiflix.Notify.failure(`Oops, there is no data with that name`);
      });
  }, DEBOUNCE_DELAY)
);
