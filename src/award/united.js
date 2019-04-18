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
  "Alaska": "Mainland U.S.: Alaska & Canada", // Part of USA
  "Albania": "Europe",
  "Algeria": "Northern Africa",
  "American Samoa": "Oceania",
  "Angola": "Central & Southern Africa",
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
  "United States": "Mainland U.S.: Alaska & Canada",
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

var costs = {
  "Mainland U.S.: Alaska & Canada": {
    "Mainland U.S.: Alaska & Canada": {
      "Economy": 12.5,
      "Business": 25,
      "First": 35,
    },
    "Hawaii": {
      "Economy": 22.5,
      "Business": 40,
      "First": 50,
    },
    "Mexico": {
      "Economy": 17.5,
      "Business": 30,
      "First": 40,
    },
    "Central America": {
      "Economy": 17.5,
      "Business": 30,
      "First": 40,
    },
    "Caribbean": {
      "Economy": 17.5,
      "Business": 30,
      "First": 40,
    },
    "Northern South America": {
      "Economy": 20,
      "Business": 35,
      "First": 45,
    },
    "Southern South America": {
      "Economy": 30,
      "Business": 60,
      "First": 80,
    },
    "Europe": {
      "Economy": 30,
      "Business": 70,
      "First": 110,
    },
    "Northern Africa": {
      "Economy": 40,
      "Business": 80,
      "First": 130,
    },
    "Central & Southern Africa": {
      "Economy": 40,
      "Business": 80,
      "First": 130,
    },
    "Middle East": {
      "Economy": 42.5,
      "Business": 85,
      "First": 140,
    },
    "Central Asia": {
      "Economy": 42.5,
      "Business": 85,
      "First": 140,
    },
    "South Asia": {
      "Economy": 40,
      "Business": 90,
      "First": 140,
    },
    "North Asia": {
      "Economy": 35,
      "Business": 80,
      "First": 120,
    },
    "Japan": {
      "Economy": 35,
      "Business": 80,
      "First": 110,
    },
    "Oceania": {
      "Economy": 35,
      "Business": 80,
      "First": 110,
    },
    "Australia & New Zealand": {
      "Economy": 40,
      "Business": 90,
      "First": 130,
    }
  }
}


module.exports = {
  mileageCost: function(countryA, countryB, distance) {
    var reg1 = regions[countryA];
    var reg2 = regions[countryB];

    var regId1 = regionIds[reg1];
    var regId2 = regionIds[reg2];

    if (regId1 === regId2 && distance < 800 && reg1 !== "Japan") {
      return 8;
    }

    if (regId1 > regId2) {
      var reg3 = reg2;
      reg2 = reg1;
      reg1 = reg3;
    }

    return costs[reg1][reg2].Economy;
  }
};
