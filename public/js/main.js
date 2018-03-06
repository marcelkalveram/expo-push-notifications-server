/* eslint-disable */

var recipientEmail = '';

$(document).ready(function () {

  $('.js-send-notification').on('click', function() {

    var $row = $(this).closest('tr');
    var name = $row.find('td.name').text().trim();
    var email = $row.find('td.email').text().trim();
    recipientEmail = email;

    $('.modal').modal('show');
    $('.modal .modal-title span').text(name);

  });

  $('.js-send-notification-submit').on('click', function() {
    var reqUri = window.API_URI + '/notification/' + recipientEmail;
    $.ajax({
      type: "POST",
      url: reqUri,
      data: {
        title: $('#title').val(),
        message: $('#message').val()
      },
      success: function() {
        console.log('success');
      },
      dataType: 'json'
    });
    
    $('.modal').modal('hide');
  });

});
