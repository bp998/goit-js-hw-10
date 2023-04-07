const fetchCountries = countryName => {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(cb => {
      if (!cb.ok) {
        throw new Error(cb.status);
      }
      return cb.json();
    })
    .then(outcome => {
      return outcome;
    })
    .catch(console.error);
};

export { fetchCountries };
