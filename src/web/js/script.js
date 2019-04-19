function reveal() {
  var dep = document.getElementById("departure").value;
  var arr = document.getElementById("arrival").value;
  var outbound = document.getElementById("outbound").value;
  var inbound = document.getElementById("inbound").value;

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

  fetch('http://localhost:8080/' + dep + '/' + arr + '/' + outbound)
  .then((resp) => resp.json())
  .then((data) => {
    var div = document.createElement('div');

    div.id = 'flights';
    div.innerHTML = '';

    for (var itid in data) {
      div.innerHTML += '<a href=' + data[itid].Link + '>Flight option #' + itid + ' ($' + data[itid].Price + ')</a>. ';
      if (data[itid].Flights.length === 1) {
        div.innerHTML += '<b>NONSTOP!</b> ';
      }
      if (data[itid].Mileages.length > 0) {
        div.innerHTML += ' Costs ' + data[itid].Mileages[0].Cost + 'k ' + data[itid].Mileages[0].Carrier + ' miles.';
      }
      div.innerHTML += '<br />';
      for (var flid in data[itid].Flights) {
        var flight = data[itid].Flights[flid];
        div.innerHTML +=
          'Flight ' + flight.Carrier + flight.Number +
          ' From ' + flight.From +
          ' To ' + flight.To +
          ' Departs At ' + flight.Departs +
          ' Arrives At ' + flight.Arrives +
          ' Distance ' + flight.Distance + ' miles ' +
          '<br />';
      }
    }

    document.getElementById('content').removeChild(loading);
    document.getElementById('content').appendChild(div);
  })
  .catch((err) => {
  })
}
