$(function () {
  function buildHTML(message) {
    var insertImage = message.image == undefined ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message">
                 <div class="upper-message">
                  <div class="upper-message__user-name">
                  ${message.name}
                  </div>
                  <div class="upper-message__date">
                  ${message.date}
                  </div>
                  </div>
                 <div class="lower-meesage">
                   <p class="lower-message__content">
                   ${message.content}
                   </p>
                   ${insertImage}
                </div>
             </div>`;
      return html;
  }
  
  $('#new_message').on('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr("action");

      $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
      })
  .done(function (meesage) {
      var html = buildHTML(meesage);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
      $('#new_message')[0].reset("");          
  })
  .fail(function () {
      alert('error');
  })
  .always(function(message){
    $('.form__submit').prop('disabled', false);
  })
  })
});