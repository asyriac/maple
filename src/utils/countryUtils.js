import countryData from "../data/country_data.json";

export function findCountry(countryName, list = countryData.features) {
  return list.find((country) => {
    const { NAME, NAME_LONG, ABBREV, ADMIN, BRK_NAME, NAME_SORT } = country.properties;
    const searchName = countryName.toLowerCase();
    return [
      NAME, NAME_LONG, ADMIN, ABBREV, ABBREV.replace(/\./g, ""),
      NAME.replace(/-/g, " "), BRK_NAME, NAME_SORT
    ].some(name => name.toLowerCase() === searchName);
  });
}