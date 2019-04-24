const fs = require('fs');

var regionIds = {
  "Mainland U.S.: Alaska & Canada": 0,
  "Hawaii": 1,
  "Mexico": 2,
  "Caribbean": 3,
  "Central America": 4,
  "Northern South America": 5,
  "Southern South America": 6,
  "Europe": 7,
  "Middle East": 8,
  "Northern Africa": 9,
  "Central & Southern Africa": 10,
  "North Asia": 11,
  "Central Asia": 12,
  "South Asia": 13,
  "Japan": 14,
  "Oceania": 15,
  "Australia & New Zealand": 16
};

var regions = {
  "Afghanistan": "Central Asia",
  "Alaska": "Mainland U.S.: Alaska & Canada",
  "Albania": "Europe",
  "Algeria": "Northern Africa",
  "American Samoa": "Oceania",
  "Angola": "Central & Southern Africa",
  "Anguilla": "Caribbean",
  "Antigua and Barbuda": "Caribbean",
  "Argentina": "Southern South America",
  "Armenia": "Europe",
  "Aruba": "Caribbean",
  "Austria": "Europe",
  "Azerbaijan": "Middle East",
  "Bahamas": "Caribbean",
  "Bahrain": "Middle East",
  "Bangladesh": "South Asia",
  "Barbados": "Caribbean",
  "Belarus": "Europe",
  "Belgium": "Europe",
  "Belize": "Central America",
  "Benin": "Central & Southern Africa",
  "Bermuda": "Caribbean",
  "Bhutan": "South Asia",
  "Bolivia": "Southern South America",
  "Bosnia & Herzegovina": "Europe",
  "Botswana": "Central & Southern Africa",
  "Brazil": "Southern South America",
  "British Virgin Islands": "Caribbean",
  "Brunei": "South Asia",
  "Bulgaria": "Europe",
  "Burkina Faso": "Central & Southern Africa",
  "Burundi": "Central & Southern Africa",
  "Cambodia": "South Asia",
  "Cameroon": "Central & Southern Africa",
  "Canada": "Mainland U.S.: Alaska & Canada",
  "Canary Islands": "Northern Africa", // Part of Spain
  "Cape Verde": "Central & Southern Africa",
  "Cayman Islands": "Caribbean",
  "Central African Republic": "Central & Southern Africa",
  "Chad": "Central & Southern Africa",
  "Chile": "Southern South America",
  "China": "North Asia",
  "Colombia": "Northern South America",
  "Comoros": "Central & Southern Africa",
  "Cook Islands": "Oceania",
  "Costa Rica": "Central America",
  "Cote d'Ivoire": "Central & Southern Africa",
  "Croatia": "Europe",
  "Cuba": "Caribbean",
  "Cyprus": "Europe",
  "Czech Republic": "Europe",
  "Congo (Brazzaville)": "Central & Southern Africa",
  "Congo (Kinshasa)": "Central & Southern Africa",
  "Denmark": "Europe",
  "Djibouti": "Central & Southern Africa",
  "Dominica": "Caribbean",
  "Dominican Republic": "Caribbean",
  "Ecuador": "Northern South America",
  "Egypt": "Middle East",
  "El Salvador": "Central America",
  "Equatorial Guinea": "Central & Southern Africa",
  "Eritrea": "Central & Southern Africa",
  "Estonia": "Europe",
  "Ethiopia": "Central & Southern Africa",
  "Fiji": "Oceania",
  "Finland": "Europe",
  "France": "Europe",
  "French Guiana": "Northern South America",
  "French Polynesia": "Oceania",
  "Gabon": "Central & Southern Africa",
  "Gambia": "Central & Southern Africa",
  "Georgia": "Europe",
  "Germany": "Europe",
  "Ghana": "Central & Southern Africa",
  "Greece": "Europe",
  "Greenland": "Europe",
  "Grenada": "Caribbean",
  "Guadeloupe": "Caribbean",
  "Guam": "Oceania",
  "Guatemala": "Central America",
  "Guinea": "Central & Southern Africa",
  "Guinea-Bissau": "Central & Southern Africa",
  "Guyana": "Northern South America",
  "Haiti": "Caribbean",
  "Hawaii": "Hawaii", // Part of U.S.
  "Honduras": "Central America",
  "Hong Kong": "South Asia",
  "Hungary": "Europe",
  "Iceland": "Europe",
  "India": "Central Asia",
  "Indonesia": "South Asia",
  "Iran": "Middle East",
  "Iraq": "Middle East",
  "Ireland": "Europe",
  "Israel": "Middle East",
  "Italy": "Europe",
  "Jamaica": "Caribbean",
  "Japan": "Japan",
  "Jordan": "Middle East",
  "Kazakhstan": "Central Asia",
  "Kenya": "Central & Southern Africa",
  "Kuwait": "Middle East",
  "Kyrgyzstan": "Central Asia",
  "Laos": "South Asia",
  "Latvia": "Europe",
  "Lebanon": "Middle East",
  "Lesotho": "Central & Southern Africa",
  "Liberia": "Central & Southern Africa",
  "Libya": "Northern Africa",
  "Lithuania": "Europe",
  "Luxembourg": "Europe",
  "Macau": "South Asia",
  "Macedonia": "Europe",
  "Madagascar": "Central & Southern Africa",
  "Malawi": "Central & Southern Africa",
  "Malaysia": "South Asia",
  "Maldives": "Central Asia",
  "Mali": "Central & Southern Africa",
  "Malta": "Europe",
  "Marshall Islands": "Oceania",
  "Martinique": "Caribbean",
  "Mauritania": "Central & Southern Africa",
  "Mauritius": "Central & Southern Africa",
  "Mexico": "Mexico",
  "Micronesia": "Oceania",
  "Moldova": "Europe",
  "Mongolia": "North Asia",
  "Montenegro": "Europe",
  "Morocco": "Northern Africa",
  "Mozambique": "Central & Southern Africa",
  "Myanmar": "South Asia",
  "Namibia": "Central & Southern Africa",
  "Nepal": "Central Asia",
  "Netherlands": "Europe",
  "Netherlands Antilles": "Caribbean",
  "New Caledonia": "Oceania",
  "Nicaragua": "Central America",
  "Niger": "Central & Southern Africa",
  "Nigeria": "Central & Southern Africa",
  "Northern Mariana Islands": "Oceania",
  "Norway": "Europe",
  "Oman": "Middle East",
  "Pakistan": "Central Asia",
  "Palau": "Oceania",
  "Panama": "Central America",
  "Papua New Guinea": "Oceania",
  "Paraguay": "Southern South America",
  "Peru": "Northern South America",
  "Philippines": "South Asia",
  "Poland": "Europe",
  "Portugal": "Europe",
  "Puerto Rico": "Caribbean",
  "Qatar": "Middle East",
  "Reunion": "Central & Southern Africa",
  "Romania": "Europe",
  "Russia": "Europe",
  "Rwanda": "Central & Southern Africa",
  "Samoa": "Oceania",
  "Sao Tome and Principe": "Central & Southern Africa",
  "Saudi Arabia": "Middle East",
  "Senegal": "Central & Southern Africa",
  "Serbia": "Europe",
  "Seychelles": "Central & Southern Africa",
  "Sierra Leone": "Central & Southern Africa",
  "Singapore": "South Asia",
  "Slovakia": "Europe",
  "Slovenia": "Europe",
  "Somalia": "Central & Southern Africa",
  "South Africa": "Central & Southern Africa",
  "South Korea": "North Asia",
  "South Sudan": "Central & Southern Africa",
  "Spain": "Europe",
  "Sri Lanka": "Central Asia",
  "Saint Kitts and Nevis": "Caribbean",
  "Santa Lucia": "Caribbean",
  "Sudan": "Central & Southern Africa",
  "Suriname": "Northern South America",
  "Swaziland": "Central & Southern Africa",
  "Sweden": "Europe",
  "Switzerland": "Europe",
  "Syria": "Middle East",
  "Taiwan": "North Asia",
  "Tajikistan": "Central Asia",
  "Tanzania": "Central & Southern Africa",
  "Thailand": "South Asia",
  "Togo": "Central & Southern Africa",
  "Tonga": "Oceania",
  "Trinidad and Tobago": "Caribbean",
  "Tunisia": "Northern Africa",
  "Turkey": "Europe",
  "Turkmenistan": "Central Asia",
  "Turks and Caicos Islands": "Caribbean",
  "Uganda": "Central & Southern Africa",
  "Ukraine": "Europe",
  "United Arab Emirates": "Middle East",
  "United Kingdom": "Europe",
  "United States": "Mainland U.S.: Alaska & Canada",
  "Uruguay": "Southern South America",
  "Uzbekistan": "Central Asia",
  "Vanuatu": "Oceania",
  "Venezuela": "Northern South America",
  "Vietnam": "South Asia",
  "Virgin Islands": "Caribbean",
  "Yemen": "Middle East",
  "Zambia": "Central & Southern Africa",
  "Zimbabwe": "Central & Southern Africa",
};

var alaskaAirports = [
  "MRI", "ANC", "ANI", "BRW", "BET",
  "CDV", "SCC", "DLG", "FAI", "GAL",
  "HOM", "JNU", "ENA", "KTN", "AKN",
  "ADQ", "OTZ", "OME", "PSG", "SIT",
  "KSM", "UNK", "DUT", "VDZ", "WRG",
  "YAK", "AUK", "AKP", "BKC", "CYF",
  "VAK", "CDB", "CXF", "CGA", "EEK",
  "EMK", "FYU", "GAM", "GST", "HNS",
  "HNH", "HPB", "HSL", "ILI", "BTI",
  "KLG", "KUK", "IAN", "KPN", "KVL",
  "KVL", "KLW", "KKH", "KOT", "KWT",
  "KWK", "KLN", "KMO", "MLL", "MCG",
  "MTM", "MOU", "WWT", "WTK", "ORV",
  "NUP", "OLH", "PQS", "PHO", "KWN",
  "RSH", "SNP", "SDP", "SVA", "SCM",
  "WLK", "SOV", "SHH", "SGY", "TAL",
  "KTB", "OOK", "TLT", "WTL", "AIN"
];

var hawaiiAirports = [
  "ITO", "HNL", "OGG", "KOA", "MKK",
  "LNY", "LIH", "HNM", "LUP", "MUE",
  "JHM", "PAK", "UPP", "HDH", "HIK",
  "BKH", "BSF", "HHI", "HPV"
];

var unitedPartnerCodes = [
  "JP", "OZ", "MS", "ZH", "TG", "A3",
  "OS", "ET", "SQ", "TK", "AC", "AV",
  "BR", "SA", "UA", "CA", "SN", "LO",
  "LX", "NZ", "CM", "LH", "NH", "OU",
  "SK", "TP", "EI", "VW", "EN", "4B",
  "9K", "WK", "EW", "HA", "OA", "3M",
  "UA"
];

function loadCosts(filename, saveVar) {
  const saveVarBlob = fs.readFileSync(filename, 'utf8').trim();
  var saveVarLined = saveVarBlob.split(/\r?\n/);
  for (var lineId in saveVarLined) {
    saveVar[lineId] = {};

    const saveVarLine = saveVarLined[lineId];
    var saveVarItems = saveVarLine.split(',');

    for (var itemId in saveVarItems) {
      saveVar[lineId][itemId] = saveVarItems[itemId];
    }
  }
}

var unitedEconomyCosts = {};
loadCosts('src/award/united-economy.csv', unitedEconomyCosts);
var partnerEconomyCosts = {};
loadCosts('src/award/united-partners-economy.csv', partnerEconomyCosts);

module.exports = {
  mileageCost: function(flights, airportData) {
    var allUAflights = flights.reduce((acc, curr) => acc && (curr.Carrier == 'UA'), true);
    var eligibleRoute = flights.reduce((acc, curr) => acc && (unitedPartnerCodes.includes(curr.Carrier)), true);
    if (eligibleRoute !== true) {
      return {};
    }

    var firstAirport = flights[0].From;
    var lastAirport = flights[flights.length-1].To;

    var country1 = airportData[firstAirport].Country;
    var country2 = airportData[lastAirport].Country;

    var regId1, regId2;
    if (hawaiiAirports.includes(firstAirport)) {
      regId1 = regionIds["Hawaii"];
    } else {
      regId1 = regionIds[regions[country1]];
    }

    if (hawaiiAirports.includes(lastAirport)) {
      regId2 = regionIds["Hawaii"];
    } else {
      regId2 = regionIds[regions[country2]];
    }

    var totalDistance = flights.reduce((acc, curr) => (parseInt(acc,10) + parseInt(curr.Distance)), 0)

    // Intra Mainland US flights.
    if (regId1 === regId2 &&
        regId1 === 0) {
      // Extra 5k for flights to/from Alaska.
      var toAlaska = ((alaskaAirports.includes(firstAirport) ? 1 : 0) +
                      (alaskaAirports.includes(lastAirport) ? 1 : 0))
                     == 1 ? 5 : 0;

      if (totalDistance < 700 && allUAflights) {
        return {Carrier: 'UA', Cost: 10 + toAlaska};
      }
      return {Carrier: 'UA', Cost: 12.5 + toAlaska};
    }

    if (flights.length === 1 &&
        flights[0].Distance < 800 &&
        regId1 === regId2 &&
        regId1 !== 0 &&
        regId1 !== 14) {
      return {Carrier: 'UA', Cost: 8};
    }

    if (allUAflights === true) {
      return {Carrier: 'UA', Cost: unitedEconomyCosts[regId1][regId2]};
    }
    return {Carrier: 'UA', Cost: partnerEconomyCosts[regId1][regId2]};
  }
};
