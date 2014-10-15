  var geojson, map, map_info, datatable, i, j, json_data;

$(document).ready(function() {


  ////////////////////////////////////////////////
  // pick the column of data to display on choropleth map
  var picked_data;
  function data_picker(name, data){
    return data[name]
  }
        

  ////////////////////////////////////////////////
  // merge the picked data into the shapes so can map choropleth of data
  function merge_data_shapes(percents, counts, shapes){
    $.each(shapes.features, function(index, feature){
      feature.properties["percent"] = percents[feature.properties.name]
      feature.properties["count"] = counts[feature.properties.name]
    });
  };


  ////////////////////////////////////////////////
  // set color range for choropleth map
  function getColor(d) {
    return  d > 80 ? '#08306b' :
            d > 60 ? '#08519c' :
            d > 50 ? '#2171b5' :
            d > 40 ? '#4292c6' :
            d > 30 ? '#6baed6' :
            d > 20 ? '#9ecae1' :
            d > 15 ? '#c6dbef' :
            d > 10 ? '#deebf7' :
            d >  5 ? '#f7fbff' :
            d >  0 ? '#FFFFFF' :
                     '#CCCCCC' ;
  /*  return  d > 90 ? '#08306b' :
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
  */}


  ////////////////////////////////////////////////
  // set style for shape in mape
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

  ////////////////////////////////////////////////
  // turn off any highlighting and revert to normal state
  function resetHighlight(e) {
      geojson.resetStyle(e.target);
      map_info.update();
  }

  ////////////////////////////////////////////////
  // add events for each shape in the map
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }

  ////////////////////////////////////////////////
  // highlight the shape in the map
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    map_info.update(layer.feature.properties);

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
  }


  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  // build crosstab chart
  function build_crosstab_chart(json){
    if (json.chart && json.chart.data){
      // set languaage text
      Highcharts.setOptions({
        lang: {
          contextButtonTitle: gon.highcharts_context_title
        }
      });

      $('#chart').highcharts({
          chart: {
              type: 'bar'
          },
          title: {
              text: json.title.html,
              useHTML: true,
              style: {'text-align': 'center'}
          },
          xAxis: {
              categories: json.chart.labels,
              title: {
                  text: json.row_question
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: gon.percent
              }
          },
          legend: {
              title: {
                  text: json.column_question
              },
              reversed: true,
              symbolHeight: 14,
              itemMarginBottom: 5,
              itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "14px", "fontWeight": "bold" }
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
          series: json.chart.data.reverse(),
          exporting: {
            filename: json.title.text,
            buttons: {
              contextButton: {
                menuItems: [
                  {
                    text: gon.highcharts_png,
                    onclick: function () {
                        this.exportChart({type: 'image/png'});
                    }
                  }, 
                  {
                    text: gon.highcharts_jpg,
                    onclick: function () {
                        this.exportChart({type: 'image/jpeg'});
                    }
                  }, 
                  {
                    text: gon.highcharts_pdf,
                    onclick: function () {
                        this.exportChart({type: 'application/pdf'});
                    }
                  }, 
                  {
                    text: gon.highcharts_svg,
                    onclick: function () {
                        this.exportChart({type: 'image/svg+xml'});
                    }
                  }
                ]
              }
            }
          }
      });    
    }
  }

  ////////////////////////////////////////////////
  // build pie chart
  function build_pie_chart(json){
    if (json.chart && json.chart.data){
      // set languaage text
      Highcharts.setOptions({
        lang: {
          contextButtonTitle: gon.highcharts_context_title
        }
      });

      $('#chart').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
              text: json.title.html,
              useHTML: true,
              style: {'text-align': 'center'}
          },
          tooltip: {
              formatter: function () {
                return '<b>' + this.key + ':</b> ' + this.point.options.count + ' (' + this.y + '%)';
              }
          },
          plotOptions: {
              pie: {
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false
                  },
                  showInLegend: true
              }
          },
          legend: {
              symbolHeight: 14,
              itemMarginBottom: 5,
              itemStyle: { "color": "#333333", "cursor": "pointer", "fontSize": "14px", "fontWeight": "bold" }
          },
          series: [{
              type: 'pie',
              data: json.chart.data
          }],
          exporting: {
            filename: json.title.text,
            buttons: {
              contextButton: {
                menuItems: [
                  {
                    text: gon.highcharts_png,
                    onclick: function () {
                        this.exportChart({type: 'image/png'});
                    }
                  }, 
                  {
                    text: gon.highcharts_jpg,
                    onclick: function () {
                        this.exportChart({type: 'image/jpeg'});
                    }
                  }, 
                  {
                    text: gon.highcharts_pdf,
                    onclick: function () {
                        this.exportChart({type: 'application/pdf'});
                    }
                  }, 
                  {
                    text: gon.highcharts_svg,
                    onclick: function () {
                        this.exportChart({type: 'image/svg+xml'});
                    }
                  }
                ]
              }
            }
          }

      });
    }
  }


  ////////////////////////////////////////////////
  // build map
  function build_map(json){
    if (json.map && json.map.counts && json.map.percents){

      // set the map title
      $('#tab-map h3').html(json.title.html);

      // adjust the width of the map to fit its container
      $('#map').width($('#explore-tabs').width());

      // turn off filter
      if (json.type != 'crosstab'){
        $('#map-filter-container').hide();
      }

      // initiate map
      var url = 'http://ec2-54-76-157-122.eu-west-1.compute.amazonaws.com/open-en/{z}/{x}/{y}.png'
      if (map == undefined){
        map = L.map('map', {zoomControl: false}).setView([42.2529, 43.8300], 7);
        map.dragging.disable();
        
        L.tileLayer(url, {
                    maxZoom: 7,
                    minZoom: 7,
                    zoomControl: false,
                    opacity: 0.5
                }).addTo(map);

        // add legend to the map
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
      //          grades = [90, 80, 70, 60, 50, 40, 30, 20, 10, 0];
                grades = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '%<br>' : '+%');
            }

            return div;
        };

        legend.addTo(map);
      }

      // remove map_info if exists
      if (map_info != undefined){
        map_info.removeFrom(map);
      }

      // add info box to the map
      map_info = L.control();

      map_info.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
          this.update();
          return this._div;
      };
      
      // popup
      if (json.type == 'crosstab'){
        map_info.update = function (props) {
            this._div.innerHTML = '<h4>' + $('span#default_id').html() + '</h4>' +  (props ?
                ('<b>' + props.name + ':</b> ' + 
                  (props.count == undefined ? gon.na : props.count + ' ') + 
                  (props.percent == undefined ? '' : '(' + props.percent + '%)'))
                : gon.hover_region);
        };
      }else{
        map_info.update = function (props) {
            this._div.innerHTML = (props ?
                ('<b>' + props.name + ':</b> ' + 
                  (props.count == undefined ? gon.na : props.count + ' ') + 
                  (props.percent == undefined ? '' : '(' + props.percent + '%)'))
                : gon.hover_region);
        };
      }
      
      map_info.addTo(map);


      // remove shapes if exists
      if (geojson != undefined){
        map.removeLayer(geojson);
      }

      // merge data into shapes
      if (json.type == 'crosstab'){
        merge_data_shapes(data_picker(1, json.map.percents), data_picker(1, json.map.counts), shapes)
      }else{
        merge_data_shapes(json.map.percents, json.map.counts, shapes)
      }
      
      geojson = L.geoJson(shapes, {
        style: style,
        onEachFeature: onEachFeature
      });
      
      geojson.addTo(map);
      
      // build and show map filter
      if (json.type == 'crosstab'){
        // header text
        $('#map-filter-container #map-filter-header').html($('#map-filter-container #map-filter-header').data('orig').replace('[replace]', json.map.filter));
        // show first item by default
        $('#map-filter-container #default_id').html(json.map.filters[0][1]);
        // empty the exist list items
        $('#map-filter-container ul').empty();
        // build drop down lists
        for(i=0; i<json.map.filters.length; i++){
          $('#map-filter-container ul').append('<li class="map_filter"><a href="#" data-id="' + json.map.filters[i][0] + '">' + json.map.filters[i][1] + '</a></li>');
        }      

        // map filter click event
        $('#map-filter-container ul li.map_filter a').on('click', function(e) {
          e.preventDefault();
          
          var name = $(this).html();
          var data_id = $(this).data("id");
          $('span#default_id').text(name);
          merge_data_shapes(data_picker(data_id, json_data.map.percents), data_picker(data_id, json_data.map.counts), shapes)
          map.removeLayer(geojson);
          
          L.geoJson(shapes, {
            style: style,
            onEachFeature: onEachFeature
          }).addTo(map);
          
        });

        // show filter
        $('#map-filter-container').show();
      }

      // show map tabs
      $('#explore-tabs #nav-map').show();
    }else{
      // no map so hide tab
      $('#explore-tabs #nav-map').hide();
      // make sure these are not active
      $('#explore-tabs #nav-map, #explore-content #tab-map').removeClass('active');
    }
  }

  ////////////////////////////////////////////////
  // build data table
  function build_datatable(json){
    // set the map title
    $('#tab-table h3').html(json.title.html);

    // if the datatable alread exists, kill it
    if (datatable != undefined){
      datatable.fnDestroy();
    }


    // build the table
    var table = '';

    // build head
    table += "<thead>";
    if (json.type == 'crosstab'){
      // 3 headers of:
      //                col question
      //                col answers .....

      // row question   count percent count percent .....
      table += "<tr class='th-center'>";
      table += "<th class='var1-col'></th>";
      table += "<th colspan='" + (2*(json.column_answers.length+1)).toString() + "'>";
      table += json.column_question;
      table += "</th>";
      table += "</tr>";
      table += "<tr class='th-center'>";
      table += "<th class='var1-col'></th>";
      for(i=0; i<json.column_answers.length;i++){
        table += "<th colspan='2'>";
        table += json.column_answers[i][1].toString();
        table += "</th>"
      }
      table += "</tr>";
      table += "<tr>";
      table += "<th class='var1-col'>";
      table += json.row_question;
      table += "</th>";
      for(i=0; i<json.column_answers.length;i++){
        table += "<th>";
        table += $('#datatable').data('count');
        table += "</th>"
        table += "<th>";
        table += $('#datatable').data('percent');
        table += "</th>"
      }
      table += "</tr>";
    }else{
      // 1 header of: row question, count, percent
      table += "<tr class='th-center'>";
      table += "<th class='var1-col'>";
      table += json.row_question;
      table += "</th><th>";
      table += $('#datatable').data('count');
      table += "</th><th>";
      table += $('#datatable').data('percent');
      table += "</th></tr>";
    }
    table += "</thead>";

    // build body
    table += "<tbody>";
    if (json.type == 'crosstab'){
      // cells per row: row answer, count/percent for each col
      for(i=0; i<json.row_answers.length; i++){
        table += "<tr>";
        table += "<td class='var1-col'>";
        table += json.row_answers[i][1];
        table += "</td>";
        for(j=0; j<json.counts[i].length; j++){
          table += "<td>";
          table += json.counts[i][j];
          table += "</td>";
          table += "<td>";
          table += json.percents[i][j].toFixed(2);
          table += "%</td>";
        }
        table += "</tr>";
      }
    }else{
      // cells per row: row answer, count, percent
      for(i=0; i<json.row_answers.length; i++){
        table += "<tr>";
        table += "<td class='var1-col'>";
        table += json.row_answers[i][1];
        table += "</td><td>";
        table += json.counts[i];
        table += "</td><td>";
        table += json.percents[i].toFixed(2);
        table += "%</td>";
        table += "</tr>";
      }
    }


    table += "</tbody>";

    $('#datatable').html(table);

    // compute how many columns need to have this sort
    var sort_array = [];
    for(var i=1; i<$('#datatable > thead tr:last-of-type th').length; i++){
      sort_array.push(i);
    }

    // initalize the datatable
    datatable = $('#datatable').dataTable({
      "dom": '<"top"fT>t<"clear">',
      "language": {
        "url": gon.datatable_i18n_url
      },
      "columnDefs": [
          { "type": "formatted-num", targets: sort_array }
      ],
      "tableTools": {
        "sSwfPath": "/assets/dataTables/extras/swf/copy_csv_xls.swf",
        "aButtons": [
          {
            "sExtends": "copy",
            "sButtonText": gon.datatable_copy_title,
            "sToolTip": gon.datatable_copy_tooltip
          },
          {
            "sExtends": "csv",
            "sButtonText": gon.datatable_csv_title,
            "sToolTip": gon.datatable_csv_tooltip
          },
          {
            "sExtends": "xls",
            "sButtonText": gon.datatable_xls_title,
            "sToolTip": gon.datatable_xls_tooltip
          }
        ]        
      }
    });    

  }

  ////////////////////////////////////////////////
  // build details (question and possible answers)
  function build_details(json){
    // clear out content first
    $('#tab-details #details-row-question, #tab-details #details-row-answers, #tab-details #details-col-question, #tab-details #details-col-answers').html('');

    // add row question/answers
    if (json.row_question && json.row_answers){
      $('#tab-details #details-row-question').html(json.row_question);    
      for(var i=0;i<json.row_answers.length;i++){
        $('#tab-details #details-row-answers').append('<li>' + json.row_answers[i][1] + '</li>');
      }
    }

    // add col question/answers
    if (json.column_question && json.column_answers){
      $('#tab-details #details-col-question').html(json.column_question);    
      for(var i=0;i<json.column_answers.length;i++){
        $('#tab-details #details-col-answers').append('<li>' + json.column_answers[i][1] + '</li>');
      }
      $('#tab-details #details-col').show();
    }else{
      // no column data so hide this section
      $('#tab-details #details-col').hide();
    }
  }

  ////////////////////////////////////////////////
  // build the visualizations for the explore data page
  function build_explore_data_page(json){

    if (json.type == 'crosstab'){
      build_crosstab_chart(json);
    }else{
      build_pie_chart(json);
    }
    build_map(json);
    build_datatable(json);
    build_details(json);

    // if no visible tab is marked as active, mark the first active one
    if ($('#explore-tabs li.active:visible').length == 0){
      // turn on tab and its content
      $('#explore-tabs li:visible:first a').trigger('click'); 
    }
  }

  ////////////////////////////////////////////////
  // get data and load page
  function get_explore_data(is_back_button){
    if (is_back_button == undefined){
      is_back_button = false;
    }
    // get params
    // do not get any hidden fields (utf8 and authenticity token)
    var querystring;
    if (is_back_button){
      var split = window.location.href.split('?');
      if (split.length == 2){
        querystring = split[1];
      }
    } else{
      querystring = $("form#form-explore-data select, form#form-explore-data input:not([type=hidden])").serialize();
    }

    // call ajax
    $.ajax({
      type: "GET",
      url: gon.explore_data_ajax_path,
      data: querystring,
      dataType: 'json'
    })
    .error(function( jqXHR, textStatus, errorThrown ) {
      console.log( "Request failed: " + textStatus  + ". Error thrown: " + errorThrown);
    })
    .success(function( json ) {
      json_data = json;
      // update content
      build_explore_data_page(json);

      // update url
      var new_url = [location.protocol, '//', location.host, location.pathname, '?', querystring].join('');

      // change the browser URL to the given link location
      if (!is_back_button && new_url != window.location.href){
        window.history.pushState({path:new_url}, '', new_url);
      }
    });
  }

  ////////////////////////////////////////////////
  // reset the filter forms and select a random variable for the row
  function reset_filter_form(){

//    $('select#row').val('');
    $('select#col').val('');
    $('select#filter_variable').val('');
    $('select#filter_value').val('');
    $('input#exclude_dkra').removeAttr('checked');

    // reload the lists
//    $('select#row').selectpicker('refresh');
    $('select#col').selectpicker('refresh');
    $('#btn-swap-vars').hide();
    $('select#filter_variable').selectpicker('refresh');
    $('select#filter_value').selectpicker('refresh');
    $('#filter_value_container').hide();

  }


  ////////////////////////////////////////////////
  ////////////////////////////////////////////////

  // due to using tabs, the map, chart and table cannot be properly drawn
  // because they may be hidden. 
  // this event catches when a tab is being shown to make sure 
  // the item is properly drawn
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    switch($(this).attr('href')){
      case '#tab-map':
        map.invalidateSize(false);
        break;
      case '#tab-table':
        var ttInstances = TableTools.fnGetMasters();
        for (i in ttInstances) {
        if (ttInstances[i].fnResizeRequired()) 
          ttInstances[i].fnResizeButtons();
        }
        break;
      case '#tab-chart':
        $('#chart').highcharts().reflow();        
        break;
    }
  });

  // catch the form submit and call the url with the
  // form values in the url
  $("form#form-explore-data").submit(function(){
    get_explore_data();
    return false;
  });

  // reset the form fields
  $("form#form-explore-data input#btn-reset").click(function(e){
    e.preventDefault();
    reset_filter_form();
    get_explore_data();

  });


  // initalize the fancy select boxes
  $('select.selectpicker').selectpicker();    
  $('select.selectpicker-filter').selectpicker();    

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

      // if val != '' then turn on swap button
      if (val == ''){
        $('button#btn-swap-vars').fadeOut();
      }else{
        $('button#btn-swap-vars').fadeIn();
      }
    }

    // update filter list
    var row = $('select.selectpicker#row').val();
    var col = $('select.selectpicker#col').val();
    // if filter is one of these values, reset filter to no filter
    if (($('select#filter_variable').val() == row && row != '') || ($('select#filter_variable').val() == col && col != '')){
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

  // get the initial data
  get_explore_data();

  // the below code is to override back button to get the ajax content without page reload
  $(window).bind('popstate', function() {
    console.log('url = ' + window.location.href);

    // pull out the querystring
    params = queryStringToJSON(window.location.href);

    // for each form field, reset if need to
    // row
    if (params.row != $('select#row').val()){
      if (params.row == undefined){
        $('select#row').val('');
      }else{
        $('select#row').val(params.row);
      }
      $('select#row').selectpicker('refresh');
    }

    // col
    if (params.col != $('select#col').val()){
      if (params.col == undefined){
        $('select#col').val('');
      }else{
        $('select#col').val(params.col);
      }
      $('select#col').selectpicker('refresh');
    }
    if ($('select#col').val() == ''){
      $('#btn-swap-vars').hide();
    }else{
      $('#btn-swap-vars').show();
    }

    // filter variable
    if (params.filter_variable != $('select#filter_variable').val()){
      if (params.filter_variable == undefined){
        $('select#filter_variable').val('');
      }else{
        $('select#filter_variable').val(params.filter_variable);
      }
      $('select#filter_variable').selectpicker('refresh');
    }

    // filter value
    if (params.filter_variable == ''){
      // no filter, so hide the filter values
      $('#filter_value_container').fadeOut();
      // mark all disabled
      $('select#filter_value option:not([disabled])').attr('disabled','disabled');
    } else{
      // deselect what is there
      $('select#filter_value').val('');

      // mark all disabled
      $('select#filter_value option:not([disabled])').attr('disabled','disabled');

      // turn on the values that have the filter variable value
      $('select#filter_value option[data-code="' + params.filter_variable + '"]').removeAttr('disabled');

      // set the value
      $('select#filter_value option[data-code="' + params.filter_variable + '"][value="' + params.filter_value + '"]').attr('selected', 'selected');

      // show list
      $('#filter_value_container').fadeIn();
    }
    $('select#filter_value').selectpicker('refresh');

    // exclude dkra
    if (params.exclude_dkra == 'true'){
      $('input#exclude_dkra').attr('checked', 'checked');
    }else{
      $('input#exclude_dkra').removeAttr('checked');
    }

    // reload the data
    get_explore_data(true);
  });  
});

// convert the querystring variables into json
function queryStringToJSON(url) {
  if (url === ''){
    return '';    
  }
  var u = url.split('?');
  if (u.length != 2){
    return '';
  }
  var pairs = u[1].split('&');
  var result = {};
  for (var idx in pairs) {
    var pair = pairs[idx].split('=');
    if (!!pair[0])
      result[pair[0].toLowerCase()] = decodeURIComponent(pair[1] || '');
  }
  return result;
}