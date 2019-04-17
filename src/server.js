const express = require('express');
const url = require('url');
const unirest = require('unirest');
const morgan = require('morgan');
const fs = require('fs');
const haversine = require('haversine');

const rapidKeyPath = '/var/flights/key';
const host = '0.0.0.0';
const port = 8080;

console.log('Reading RapidApi Key...');
const key = fs.readFileSync(rapidKeyPath, 'utf8').trim();

console.log('Reading Airport Data...');
const airportDataBlob = fs.readFileSync('airports.csv', 'utf8').trim();
var airportDataLined = airportDataBlob.split(/\r?\n/);
var airportData = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function finalizedLoadingFunction(callbackRes, result) {
  var idMapper = (map, obj) => {
    map[obj.Id] = obj;
    return map;
  };

  var places      = result.body.Places.reduce(idMapper, {});
  var carriers    = result.body.Carriers.reduce(idMapper, {});
  var segments    = result.body.Segments.reduce(idMapper, {});
  var legs        = result.body.Legs.reduce(idMapper, {});
  // Not ID-ed.
  var itineraries = result.body.Itineraries.sort((a,b) => a.PricingOptions[0].Price - b.PricingOptions[0].Price);

  var simplifiedIts = [];

  for (var itid in itineraries) {
    var itinerary = itineraries[itid];
    var newIt = {
      Link: itinerary.PricingOptions[0].DeeplinkUrl,
      Price: itinerary.PricingOptions[0].Price,
      Flights: [],
    }
    var itlegs = legs[itinerary.OutboundLegId];
    for (var segid in itlegs.SegmentIds) {
      var segment = segments[itlegs.SegmentIds[segid]];

      var carrier = carriers[segment.Carrier];
      var depAirport = places[segment.OriginStation];
      var destAirport = places[segment.DestinationStation];

      var depAirportInfo = airportData[depAirport.Code];
      var destAirportInfo = airportData[destAirport.Code];

      var airportsDistance = haversine([depAirportInfo.Latitude, depAirportInfo.Longitude],
        [destAirportInfo.Latitude, destAirportInfo.Longitude],
        {unit: 'mile', format: '[lat,lon]'}).toFixed(2);

      newIt.Flights.push({
        Carrier: carrier.Code,
        Number: segment.FlightNumber,
        From: depAirport.Code,
        To: destAirport.Code,
        Departs: segment.DepartureDateTime,
        Arrives: segment.ArrivalDateTime,
        Distance: airportsDistance,
      });
    }
    simplifiedIts.push(newIt);
  }

  callbackRes.setHeader('Content-Type', 'application/json');
  callbackRes.json(simplifiedIts);
  callbackRes.status(200);
  callbackRes.end();
};

function keepTrying(callbackRes, loc) {
  unirest.get('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/' + loc)
    .header('X-RapidAPI-Key', key)
    .end(async (res) => {
      if (res.body.Status === 'UpdatesPending') {
        console.log('Loading...');
        await sleep(500);
        keepTrying(callbackRes, loc);
      } else {
        console.log('Not Pending -> ' + res.body.Status);
        finalizedLoadingFunction(callbackRes, res);
      }
    });
}

for (var lineId in airportDataLined) {
  const airportDataLine = airportDataLined[lineId];
  var airportDataItems = airportDataLine.split(',');

  // We don't need airports without IATA, we rarely can buy tickets for those.
  if (airportDataItems[4] !== '\\N') {
    const iata = airportDataItems[4].replace(/"/g, '');
    airportData[iata] = {
      'Id'       : airportDataItems[0].replace(/"/g, ''),
      'Name'     : airportDataItems[1].replace(/"/g, ''),
      'City'     : airportDataItems[2].replace(/"/g, ''),
      'Country'  : airportDataItems[3].replace(/"/g, ''),
      'IATA'     : airportDataItems[4].replace(/"/g, ''),
      'ICAO'     : airportDataItems[5].replace(/"/g, ''),
      'Latitude' : airportDataItems[6].replace(/"/g, ''),
      'Longitude': airportDataItems[7].replace(/"/g, ''),
      'Altitude' : airportDataItems[8].replace(/"/g, ''),
      'Timezone' : airportDataItems[9].replace(/"/g, ''),
      'DST'      : airportDataItems[10].replace(/"/g, ''),
      'Tz'       : airportDataItems[11].replace(/"/g, ''),
      'Type'     : airportDataItems[12].replace(/"/g, ''),
      'Source'   : airportDataItems[13].replace(/"/g, ''),
    };
  }
}

var app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname + '/web'));

app.get('/:dep/:arr/:date', (req, res) => {
  unirest.post('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0')
  .header('X-RapidAPI-Key', key)
  .header('Content-Type', 'application/x-www-form-urlencoded')
  .send('country=US')
  .send('currency=USD')
  .send('locale=en-US')
  .send('originPlace='     +req.params['dep']+'-sky')
  .send('destinationPlace='+req.params['arr']+'-sky')
  .send('outboundDate='    +req.params['date'])
  .send('adults=1')
  .end(function (result) {
    var arglist = result.headers['location'].split('/')
    var loc = arglist[arglist.length-1];
    console.log('Id: ' + loc);

    // keepTrying(res, loc);
  });
});

app.listen(port);

console.log('Started Server...')


/// Places:
// { Id: 14074,
  // ParentId: 5062,
  // Code: 'MIA',
  // Type: 'Airport',
  // Name: 'Miami International' }

/// Carriers:
// { Id: 1949,
  // Code: 'CT',
  // Name: 'Alitalia CityLiner',
  // ImageUrl: 'https://s1.apideeplink.com/images/airlines/XM.png',
  // DisplayCode: 'CT' }

/// Segments:
// { Id: 41,
  // OriginStation: 16216,
  // DestinationStation: 12712,
  // DepartureDateTime: '2019-05-10T15:10:00',
  // ArrivalDateTime: '2019-05-10T23:55:00',
  // Carrier: 851,
  // OperatingCarrier: 851,
  // Duration: 345,
  // FlightNumber: '104',
  // JourneyMode: 'Flight',
  // Directionality: 'Outbound' }

/// Legs:
// { Id: '15821-1905101814--32171-0-12712-1905102007',
  // SegmentIds: [ 40 ],
  // OriginStation: 15821,
  // DestinationStation: 12712,
  // Departure: '2019-05-10T18:14:00',
  // Arrival: '2019-05-10T20:07:00',
  // Duration: 113,
  // JourneyMode: 'Flight',
  // Stops: [],
  // Carriers: [ 870 ],
  // OperatingCarriers: [ 870 ],
  // Directionality: 'Outbound',
  // FlightNumbers: [ { FlightNumber: '1186', CarrierId: 870 } ] }

/// Itineraries:
// { OutboundLegId: '15821-1905100700--32593-1-12712-1905102355',
  // PricingOptions:
   // [ { Agents: [Array],
       // QuoteAgeInMinutes: 123,
       // Price: 276.6,
       // DeeplinkUrl: freakinbig
     // { Agents: [Array],
       // QuoteAgeInMinutes: 123,
       // Price: 288.78,
       // DeeplinkUrl: freakinbig
  // BookingDetailsLink:
   // { Uri:
      // '/apiservices/pricing/v1.0/1cd3b421-fb97-4fa0-ad33-7ee556
// 724886/booking',
     // Body:
      // 'OutboundLegId=15821-1905100700--32593-1-12712-1905102355
// &InboundLegId=',
     // Method: 'PUT' } }
