$(document).ready(function() {
  if (gon.chart_data != undefined){
    // bar charts
    $('#chart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: gon.chart_title,
            useHTML: true,
            style: {'text-align': 'center'}
        },
        xAxis: {
            categories: gon.chart_labels,
            title: {
                text: gon.chart_row_label
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Percent'
            }
        },
        legend: {
            title: {
                text: gon.chart_col_label
            },
            reversed: true
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            followPointer: true
        },
        plotOptions: {
            bar: {
                stacking: 'percent'
            }
        },
        series: gon.chart_data.reverse()
    });
  }


if (gon.map_counts && gon.map_percents){

    var map_counts = gon.map_counts;
    var map_percents = gon.map_percents;

    // initiate map
    var url = 'http://ec2-54-76-157-122.eu-west-1.compute.amazonaws.com/open-en/{z}/{x}/{y}.png'
    var map = L.map('map', {zoomControl: false}).setView([42.2529, 43.8300], 7);
    map.dragging.disable();
    
    L.tileLayer(url, {
                maxZoom: 7,
                minZoom: 7,
                zoomControl: false,
                opacity: 0.5
            }).addTo(map);
    
    // default map filter
    merge_data_shapes(data_picker(1, map_percents), data_picker(1, map_counts), shapes)
    
    var geojson;
    geojson = L.geoJson(shapes, {
      style: style,
      onEachFeature: onEachFeature
    });
    
    geojson.addTo(map);
    
    // add info box to the map
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    
    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        this._div.innerHTML = '<h4>' + $('span#default_id').html() + '</h4>' +  (props ?
            ('<b>' + props.name + '</b>: ' + (props.count == undefined ? 'N/A' : props.count + ' ') + (props.percent == undefined ? '' : '(' + props.percent + '%)'))
            : 'Hover over a Region');
    };
    
    info.addTo(map);
    
// merge the picked data into the shapes so can map choropleth of data
function merge_data_shapes(percents, counts, shapes){
  $.each(shapes.features, function(index, feature){
    feature.properties["percent"] = percents[feature.properties.name]
    feature.properties["count"] = counts[feature.properties.name]
  });
};



// set color range for choropleth map
function getColor(d) {
  return  d > 90 ? '#08306b' :
          d > 80 ? '#08519c' :
          d > 70 ? '#2171b5' :
          d > 60 ? '#4292c6' :
          d > 50 ? '#6baed6' :
          d > 40 ? '#9ecae1' :
          d > 30 ? '#c6dbef' :
          d > 20 ? '#deebf7' :
          d > 10 ? '#f7fbff' :
          d >  0 ? '#FFFFFF' :
                   '#CCCCCC' ;
}


//
function style(feature) {
    return {
        fillColor: getColor(feature.properties.percent),
        weight: 2,
        opacity: 1,
        color: '#999',
        dashArray: '3',
        fillOpacity: 0.8
    };
}




function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//function zoomToFeature(e) {
//    map.fitBounds(e.target.getBounds());
//}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight
      //click: zoomToFeature
  });
}

    function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}

    // add legend to the map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
  //          grades = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
            grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
            labels = [];  

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%<br>' : '+%');
        }

        return div;
    };

    legend.addTo(map);
    
    // map filter
    var data_id;
    
    $(document).ready(function() {
      $('li.map_filter a').click(function(e)  {
        e.preventDefault();
        
        var name = $(this).html();
        data_id = $(this).data("id");
        $('span#default_id').text(name);
        merge_data_shapes(data_picker(data_id, map_percents), data_picker(data_id, map_counts), shapes)
        map.removeLayer(geojson);
        
        L.geoJson(shapes, {
          style: style,
          onEachFeature: onEachFeature
        }).addTo(map);
        
        
      });
    });
  
  } // end if

  // pick the column of data to display on choropleth map
  var picked_data;
  function data_picker(name, data){
    return data[name]
  }
      

  // - set the swf path so can use the download buttons
  // to be able to sort the jquery datatable build in the function below
  // - coming in as: xx (xx.xx%); want to only keep first number
  jQuery.fn.dataTableExt.oSort['formatted-num-asc'] = function ( a, b ) {
    var x = a.match(/\d/) ? a.replace( /\s\(\d{0,}.?\d{0,}\%\)/g, "" ) : 0;
    var y = b.match(/\d/) ? b.replace( /\s\(\d{0,}.?\d{0,}\%\)/g, "" ) : 0;
    return parseFloat(x) - parseFloat(y);
  };

  jQuery.fn.dataTableExt.oSort['formatted-num-desc'] = function ( a, b ) {
    var x = a.match(/\d/) ? a.replace( /\s\(\d{0,}.?\d{0,}\%\)/g, "" ) : 0;
    var y = b.match(/\d/) ? b.replace( /\s\(\d{0,}.?\d{0,}\%\)/g, "" ) : 0;
    return parseFloat(y) - parseFloat(x);
  };

  // compute how many columns need to have this sort
  var sort_array = [];
  for(var i=1; i<$('#datatable > thead tr:last-of-type th').length; i++){
    sort_array.push(i);
  }


  // due to using tabs, the map, chart and table cannot be properly drawn
  // because they may be hidden. 
  // this event catches when a tab is being shown to make sure 
  // the item is properly drawn
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    switch($(this).attr('href')){
      case '#tab-map':
        map.invalidateSize(false);
        break;
      case '#tab-chart':
        $('#chart').highcharts().reflow();        
        break;
      case '#tab-table':
        var ttInstances = TableTools.fnGetMasters();
        for (i in ttInstances) {
        if (ttInstances[i].fnResizeRequired()) 
          ttInstances[i].fnResizeButtons();
        }
        break;
    }
  });


  // initalize the datatable
  $('#datatable').dataTable({
    "dom": '<"top"fT>t<"clear">',
    "language": {
      "url": gon.datatable_i18n_url
    },
    "columnDefs": [
        { "type": "formatted-num", targets: sort_array }
    ],
    "tableTools": {
      "sSwfPath": "/assets/dataTables/extras/swf/copy_csv_xls.swf"
    }
  });    

  // initalize the fancy select boxes
  $('select.selectpicker').selectpicker();    

  // if option changes, make sure the select option is not available in the other lists
  $('select.selectpicker').change(function(){
    val = $(this).val();
    // if this is row, update col
    // else, vice-versa
    if ($(this).attr('id') == 'row'){
      // update col list
      // remove all disabled
      $('select.selectpicker#col option[disabled="disabled"]').removeAttr('disabled');  
      // disable the new selection
      $('select.selectpicker#col option[value="' + val + '"]').attr('disabled', 'disabled');
      // update the select list
      $('select.selectpicker#col').selectpicker('refresh');
    }else if ($(this).attr('id') == 'col'){
      // update row list
      // remove all disabled
      $('select.selectpicker#row option[disabled="disabled"]').removeAttr('disabled');  
      // disable the new selection
      $('select.selectpicker#row option[value="' + val + '"]').attr('disabled', 'disabled');
      // update the select list
      $('select.selectpicker#row').selectpicker('refresh');
    }

    // update filter list
    var row = $('select.selectpicker#row').val();
    var col = $('select.selectpicker#col').val();
    // if filter is one of these values, reset filter to no filter
    if ($('select#filter_variable').val() == row || $('select#filter_variable').val() == col){
      // reset value and hide filter answers
      $('select#filter_variable').selectpicker('val', '');
      $('#filter_value_container').fadeOut();
      $('select#filter_value option:not([disabled])').attr('disabled','disabled');
      $('select#filter_value').selectpicker('refresh');
      $('select#filter_value').selectpicker('render');
    }   
    // mark selected items as disabled
    $('select#filter_variable option[disabled="disabled"]').removeAttr('disabled');  
    $('select#filter_variable option[value="' + row + '"]').attr('disabled','disabled');
    $('select#filter_variable option[value="' + col + '"]').attr('disabled','disabled');

    $('select#filter_variable').selectpicker('refresh');
    $('select#filter_variable').selectpicker('render');
  });  

  // if filter variable is selected, update the filter values list
  $('select#filter_variable').change(function(){
    var value = $(this).val();

    if (value == ''){
      // no filter, so hide the filter values
      $('#filter_value_container').fadeOut();
      // mark all disabled
      $('select#filter_value option:not([disabled])').attr('disabled','disabled');
    }else{
      // mark all disabled
      $('select#filter_value option:not([disabled])').attr('disabled','disabled');

      // turn on the values that have the filter variable value
      $('select#filter_value option[data-code="' + value + '"]').removeAttr('disabled');

      // show list
      $('#filter_value_container').fadeIn();
    }

    // reload the list, selecting the first item in the list
    $('select#filter_value option[data-code="' + value + '"]:first').attr('selected', 'selected');
    $('select#filter_value').selectpicker('refresh');
    $('select#filter_value').selectpicker('render');

  });

  // swap vars button
  // - when clicked, swap the values and then submit the form
  $('button#btn-swap-vars').click(function(){
    // get the vals
    var var1 = $('select#row').val();
    var var2 = $('select#col').val();

    // turn off disabled options
    // so can select in next step
    $('select#row option[value="' + var2 + '"]').removeAttr('disabled');
    $('select#col option[value="' + var1 + '"]').removeAttr('disabled');

    // refresh so disabled options are removed
    $('select#row').selectpicker('refresh');
    $('select#col').selectpicker('refresh');

    // swap the vals
    $('select#row').selectpicker('val', var2);
    $('select#col').selectpicker('val', var1);

    $('select#row').selectpicker('render');
    $('select#col').selectpicker('render');

    // disable the swapped values
    $('select#row option[value="' + var1 + '"]').attr('disabled', 'disabled');
    $('select#col option[value="' + var2 + '"]').attr('disabled', 'disabled');

    // refresh so disabled options are updated
    $('select#row').selectpicker('refresh');
    $('select#col').selectpicker('refresh');

    // submit the form
    $('input#btn-submit').trigger('click');
  });


});


