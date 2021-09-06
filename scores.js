function mapEntries(json, realrowlength, skip){
    if (!skip) skip = 0;
    var dataframe = new Array();
    
    var row = new Array();
    for (var i=0; i < json.feed.entry.length; i++) {
  
      var entry = json.feed.entry[i];
      if (entry.gs$cell.col == '1') {
        if (row != null) {
          if ((!realrowlength || row.length === realrowlength) && (skip  === 0)){
             dataframe.push(row);
          } else {
             if (skip > 0) skip--;
          }
        }
  
        var row = new Array();
      }
      row.push(entry.content.$t);
    } 
    dataframe.push(row);
    
    return dataframe;
  }
  var staticUrl = 'https://docs.google.com/spreadsheets/d/1Jf9pb8QTu4gk08pgIq12GefLTxbrHvDcBN9ZOI9OFqU/gviz/tq?tqx=out:json';
  $.ajax({url: staticUrl, type: 'GET', dataType: 'text'})
    .done(function(data) {
    const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (r && r.length == 2) {
      const obj = JSON.parse(r[1]);
      const table = obj.table;
      const header = table.cols.map(({label}) => label);
      const rows = table.rows.map(({c}) => c.map(({v}) => v));

    console.log(header);
    console.log(rows);
   }
    })
    .fail((e) => console.log(e.status));

  /*
  $.getJSON(staticUrl, function(data) {
      var scores = mapEntries(data, 11);
  
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
  });
  */