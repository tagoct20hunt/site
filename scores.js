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
    pushTable(rows);
   }
    })
    .fail((e) => console.log(e.status));

function pushTable(scores){
  var $table = $('<table id="scoreboard"/>');

  $.each(scores, function(i, item){
      var $tr = $('<tr />');
      $tr.appendTo($table);
      $.each(item, function(a, subitem) {
          if(a != 0) 
            if(subitem == 0 || subitem == "#N/A") {
              $tr.append('<td class="zero">'+ "-" + '</td>');
            } else {
            $tr.append('<td class="nonzero">'+ "-" + '</td>');
          } else {
            $tr.append('<td class="teamtitle">'+ subitem + '</td>');
          }
      });
  });
  
  $.each(scores, function(i, item){
      $("#groupContainer").append('<option value="' + item[0] + '" required>' + item[0] + '</option>');
      });

  $("#scoreboardContainer").append($table);
};