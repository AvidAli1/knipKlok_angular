$('.continue-link').on('click', function () {
  document.location = siteData.baseUrl + 'kapperszaak/' + siteData.shopUrlKey + '/afspraak'
  return true
})
$('.client-btn').on('click', function () {
  $('#datePickerModal .modal-body').hide()
  $('.overlay-inner').show()
  checkAuth(siteData.barberid)
  $('.ip-text-here').hide()
  $('#datePickerModal').show()
  $('.barbershop-page').append('<div class=\'mask\'></div>')
  scrollToPath('html,body', '#datePickerModal', false)
})
$(()=>{
  $('html').addClass('loaded loader')
})
checkAuth(siteData.barberid)

function checkAuth (barberid) {
  var sendData = {
    'func': 'checkAuth',
    'barberid': barberid
  }
  fetchData(sendData).done(function (data) {
    if (!data.success) {
      $('.ip-text-here b').remove()
      $('#datePickerModal h3.modal-title span.title span').text(trans('common.failed'))
      $('#datePickerModal .modal-body').html('<div class="alert alert-danger mt-0 ml-0 mr-0">' + trans('barbershop.max_limit_appointment') + '</div>')
      $('#datePickerModal .form-wizard').remove()
      $('.hide-on-ip').remove()
      $('.ip-text-here').append('<b>' +  trans('barbershop.max_limit_appointment') + '</b>')
    } else {
      $('.hide-on-ip').show()
    }
  }).fail(function (xhr, textStatus, thrownError) {
    showErrors($('#datePickerModal'))
  })
}

function showNoReviewsAlert (count) {
  if (count == 0)
    popup.warning(trans('barbershop.no_reviews_title'), trans('barbershop.no_reviews'), true, "images/ic-no-reviews.svg")
}