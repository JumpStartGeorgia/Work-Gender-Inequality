
$(document).ready(function(){

  $('table#stories-admin').dataTable({
    "dom": '<"top"f>t<"bottom"lpi><"clear">',
    "language": {
      "url": gon.datatable_i18n_url
    },
    "columnDefs": [
      { orderable: false, "targets": [0,5] }
    ],
    "order": [[ 1, "desc" ]]
  });


  // when moderate button is clicked, update the status
  $('a.btn-moderate').click(function(e){
    e.preventDefault();

    $.ajax({
        type: "POST",
        dataType: 'json',
        url: $(this).data('url')
    }).success(function(data){
      if (data.success == true){
        // hide all statuses first
        $('ul#story-meta-list li#status div').hide();
        $('ul#story-meta-list li#status div.story-moderate-' + data.status).fadeIn(1000, 'easeInCirc');
      }
    });


  });

});
