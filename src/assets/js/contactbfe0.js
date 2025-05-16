formValidator.createValidator($('#messageForm'), {
  contactName: { required: true },
  contactEmail: { email: true, required: true },
  contactPhone: { validPhone: true, required: true, minlength: 10, maxlength: 10, digits: true },
  contactMessage: { required: true }
}, (form) => {
  var sendData = 'func=sendMessageContact&' + $(form).serialize()
  progressModal.setLoading(true)
  postData(sendData).done(function (data) {
    progressModal.setLoading(false)
    $(form).trigger('reset')
    popup.success( trans('contact.thank_you'),'').then(()=>{
      $('html, body').animate({
        scrollTop: $('section.block-contact').offset().top
      }, 'slow')
    })
  }).fail(function (xhr, textStatus, thrownError) {
    progressModal.setLoading(false)
    showError()
  })
  return false
})
