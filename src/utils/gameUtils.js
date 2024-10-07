import { playableCountries } from "../data/playableCountries";
import countryData from "../data/country_data.json";

export function getRandomPlayableCountry() {
  const filteredCountries = countryData.features.filter((country) =>
    playableCountries.includes(country.properties.NAME)
  );
  return filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
}