function makeDirection(flights, itid) {
  var innerHTML = '';

  if (flights.length === 1) {
    innerHTML += '<b>NONSTOP!</b> ';
  }
  innerHTML += '<br />';

  innerHTML += '<div id="flight' + itid + '">';
  for (var flid in flights) {
    var flight = flights[flid];
    innerHTML +=
      '<img src="' + flight.Image + '" style="vertical-align:middle"> ' +
      flight.Carrier + flight.Number +
      ' From ' + flight.From +
      ' To ' + flight.To +
      ' Departs At ' + flight.Departs +
      ' Arrives At ' + flight.Arrives +
      ' Distance ' + flight.Distance + ' miles ' +
      '<br />';
    innerHTML += '</div>';
  }

  return innerHTML;
}

var processingTimeouts = [];

function reveal() {
  var dep = document.getElementById("departure").value;
  var arr = document.getElementById("arrival").value;
  var outbound = document.getElementById("outbound").value;
  var inbound = document.getElementById("inbound").value;

  var oneway = document.getElementById("oneway").checked;

  for (var timId in processingTimeouts) {
    clearTimeout(processingTimeouts[timId]);
  }
  processingTimeouts = [];
  var lddiv = document.getElementById('loading');
  if (lddiv !== undefined && lddiv !== null) {
    lddiv.parentNode.removeChild(lddiv);
  }
  var flid = document.getElementById('flights');
  if (flid !== undefined && flid !== null) {
    flid.parentNode.removeChild(flid);
  }

  var loading = document.createElement('div');
  loading.id = 'loading';
  loading.className = 'row';
  loading.innerHTML = '<p>Loading...</p>';
  document.getElementById('content').appendChild(loading);

  fetch('http://localhost:8080/' + dep + '/' + arr + '/' + outbound + (oneway ? '' : ('/' + inbound)))
  .then((resp) => resp.json())
  .then((data) => {

    var div = document.createElement('div');
    div.id = 'flights';
    div.innerHTML = '';
    document.getElementById('content').appendChild(div);

    var innerHTML = '';
    for (let itid = 0; itid < data.length; itid++) {
      processingTimeouts.push(setTimeout(() => {
        innerHTML += '<a href=' + data[itid].PurchaseLink + '>Flight option #' + itid + ' ($' + data[itid].Price + ')</a>. ';
        if (data[itid].Mileages.length > 0) {
          innerHTML += ' Costs ' + data[itid].Mileages[0].Cost + 'k ' + data[itid].Mileages[0].Carrier + ' miles.';
        }
        innerHTML += '<br />';
        innerHTML += 'Outbound: ';
        innerHTML += makeDirection(data[itid].Flights.Outbound, itid);
        if (data[itid].Flights.Inbound !== undefined) {
          innerHTML += '<br />';
          innerHTML += 'Inbound: ';
          innerHTML += makeDirection(data[itid].Flights.Inbound, itid);
        }
        if (itid%10 === 0) {
          div.innerHTML += innerHTML;
          innerHTML = '';
        }
      }, itid * 100));
    }

    processingTimeouts.push(setTimeout(() => {
      div.innerHTML += innerHTML;
      document.getElementById('content').removeChild(loading);
    }, data.length * 100));

  })
  .catch((err) => {
  })
}
