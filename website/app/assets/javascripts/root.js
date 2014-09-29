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
            shared: true
        },
        plotOptions: {
            bar: {
                stacking: 'percent'
            }
        },
        series: gon.chart_data.reverse()
    });
  }


if (gon.map_data){

    var data = gon.map_data

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
    merge_data_shapes(data_picker(1, data), shapes)
    
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
            ('<b>' + props.name + '</b>: ' + (props.data == undefined ? 'N/A' : props.data + ' %'))
            : 'Hover over a Region');
    };
    
    info.addTo(map);
    
// merge the picked data into the shapes so can map choropleth of data
function merge_data_shapes(data, shapes){
  $.each(shapes.features, function(index, feature){
    feature.properties["data"] = data[feature.properties.name]
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
        fillColor: getColor(feature.properties.data),
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
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
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
        merge_data_shapes(data_picker(data_id, data), shapes)
        console.log(geojson);
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
      

  $('#datatable').dataTable({
    "dom": '<"top"f>t<"clear">'
  });    

  $('.selectpicker').selectpicker();    

  // turn off all but first active tab
  // - this is hack so map and charts load properly
  $('.tab-content .tab-pane').removeClass('active');
  $('.tab-content .tab-pane:first').addClass('active');
});


