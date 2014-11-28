
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

  // edit the story
  $('h3 a#edit-story').click(function(e){
    e.preventDefault();

    $('form.story').show();
    $('div#story').hide();
    $('h3 span').hide();
  });

  // cancel the story edit
  $('a#cancel-edit').click(function(e){
    e.preventDefault();

    $('form.story').hide();
    $('div#story').show();
    $('h3 span').show();
  });

  // delete the edited story
  $('a#delete-story').click(function(e){
    e.preventDefault();

    $('form.story #story_content').val('');
    $('form.story').submit();

    // $.ajax({
    //     type: "PUT",
    //     dataType: 'html',
    //     data: {content: null},
    //     url: $('form.place').attr('action')
    // })

    // return false;
  });

});
