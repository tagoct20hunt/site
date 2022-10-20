  var staticUrl = 'https://docs.google.com/spreadsheets/d/1Jf9pb8QTu4gk08pgIq12GefLTxbrHvDcBN9ZOI9OFqU/gviz/tq?tqx=out:json';
  var scores = [];
  $.ajax({url: staticUrl, type: 'GET', dataType: 'text'})
    .done(function(data) {
    const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (r && r.length == 2) {
      const obj = JSON.parse(r[1]);
      const table = obj.table;
      const header = table.cols.map(({label}) => label);
      const rows = table.rows.map(({c}) => c.map(({v}) => v));

    console.log("Spreadsheet retrieved");
    console.log(rows);
    pushTable(rows, "scoreboardContainer");
   }
    })
    .fail((e) => console.log(e.status));

function pushTable(scores, id) {
  var wrap = document.createElement('table');

  for(var i = 0; i < scores.length; i++) {
    var subwrap = document.createElement('tr');
    for(var j = 0; j < scores[i].length; j++) {
      var cell = document.createElement('td');
      var span = document.createElement('span');
      var score = scores[i][j];
      if(i != (scores.length - 1)) {
        span.innerHTML += "-";
        if(score == "#N/A" || score == 0) {
          span.classList += "zero";
        } else {
          span.classList += "nonzero";
        } 
      } else {
        console.log("shit");
        span.classList += "team";
        span.innerHTML += score;
      }
      cell.appendChild(span);
      subwrap.appendChild(cell);
    }
    wrap.appendChild(subwrap);
  }
  document.getElementById(id).appendChild(wrap);
};