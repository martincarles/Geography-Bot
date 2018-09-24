const fs = require("fs");

const world = JSON.parse(fs.readFileSync("./countries.json"));
const currencies = JSON.parse(fs.readFileSync("./currency.json"));

const names = world.map(c => c.name.common.toLowerCase());

const getCountryIndex = country => names.indexOf(country.toLowerCase());
const getCurrencyIndex = c => currencies.indexOf(c);

const isCountryValid = country => (names.indexOf(country.toLowerCase()) > -1) ? world[getCountryIndex(country)] : false;
const isCurrencyValid = c => (currencies.hasOwnProperty(c)) ? `${currencies[c].name} (${currencies[c].symbol_native})` : c;

const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const randomInRange = (start,end) => Math.floor(Math.random() * (end - start + 1) + start);

const formattedAnswer = message => {
    const country = isCountryValid(message);
    if (country) {
        const answer =
        `Some information about ${country.name.common} \n ${country.flag}\n\n`
        + `Common name: ${country.name.common}\n`
        + `Official name: ${country.altSpellings[2]} \n`
        + `Capital city: ${country.capital[0]} \n`
        + `Region: ${country.subregion} \n`
        + `Currency: ${isCurrencyValid(country.currency[0])} \n`
        + `Area: ${numberWithCommas(country.area)} km2\n`
        // + `Population: not yet implemented` // ${numberWithCommas(country.area)} km2\n`
        // + `Highest point: not yet implemented` // ${numberWithCommas(country....)} km2\n`
        return answer;
    } else {
        return `Sorry, ${message} is not part of our recognized country list. Please try again.`;
    }
};

exports.formattedAnswer = formattedAnswer;
