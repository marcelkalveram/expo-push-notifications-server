/* eslint-disable */

$(document).ready(function () {
  
  $('.js-send-notification').on('click', function() {

    var $row = $(this).closest('tr');
    var name = $row.find('td.name').text().trim();

    $('.modal').modal('show');
    $('.modal .modal-title span').text(name);

  });

  $('.js-send-notification-submit').on('click', function() {
    
    $('.modal').modal('hide');
  });

});
