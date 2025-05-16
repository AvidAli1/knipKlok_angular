let showError = function (options) {
  if (options && options.title) {
    setErrorTitle(options.title)
  }
  if (options && options.message) {
    setErrorMsg(options.message)
  } else {
    setErrorMsg(trans('modals.something_went_wrong'))
  }
  $('body').addClass('error-active')
  if (options && options.action) {
    $('.popup-error .btn').on('click', () => {
      options.action()
    })
  }
}
let closeError = function () {
  $('body').removeClass('error-active');
}

function setErrorTitle (title) {
  $('.popup-error .error-title').html(title)
}

function setErrorMsg (message) {
  $('.popup-error .error-message').html(message)
}