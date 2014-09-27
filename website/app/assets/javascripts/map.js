if (gon.map_data){

  var data = gon.map_data

  // initiate map
  var url = 'http://ec2-54-76-157-122.eu-west-1.compute.amazonaws.com/open-en/{z}/{x}/{y}.png'
  var map = L.map('map').setView([42.2529, 43.8300], 8);

  L.tileLayer(url).addTo(map);
  
  // for testing only
  merge_data_shapes(data_picker(1, data), shapes)
  
  geojson = L.geoJson(shapes, {
    style: style,
    onEachFeature: onEachFeature
  }).addTo(map);
  
  // add info box to the map
  var info = L.control();

  info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };
  
  // method that we will use to update the control based on feature properties passed
  info.update = function (props) {
      this._div.innerHTML = '<h4>props.name</h4>' +  (props ?
          '<b>' + props.name + '</b><br />' + props.data + ' %<sup>2</sup>'
          : 'Hover over a state');
  };
  
  
  



  info.addTo(map);

  // add legend to the map
  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0],
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
  
}

// pick the column of data to display on choropleth map
var picked_data;
function data_picker(name, data){
  return data[name]
}

// merge the picked data into the shapes so can map choropleth of data
function merge_data_shapes(data, shapes){
  $.each(shapes.features, function(index, feature){
    feature.properties["data"] = data[feature.properties.name]
  });
};



// set color range for choropleth map
function getColor(d) {
  return  d > 90 ? '#f7fbff' :
          d > 80 ? '#deebf7' :
          d > 70 ? '#c6dbef' :
          d > 60 ? '#9ecae1' :
          d > 50 ? '#6baed6' :
          d > 40 ? '#4292c6' :
          d > 30 ? '#2171b5' :
          d > 20 ? '#08519c' :
          d > 10 ? '#08306b' :
          d >  0 ? '#FFFFFF' :
                   '#CCCCCC' ;
}


//
function style(feature) {
    return {
        fillColor: getColor(feature.properties.data),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
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

var geojson;
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}




