/* Login validation and check function */
formValidator.createValidator($('#login'), {
  username: { email: true, required: true },
  password: { required: true }
}, ()=>{
  var sendData = {
    username: $('#emailField').val(),
    password: sha256_digest($('#passwordField').val()),
    rememberme: $('#rememberme').val(),
    func: 'checkLogin'
  }
  progressModal.setLoading(true)
  fetchData(sendData).done(function (data) {
    progressModal.setLoading(false)
    if (data.success) {
      setTimeout(function () {
        var d = new Date()
        var udmy = d.getFullYear() + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2)
        window.location.href = siteData.baseUrl + 'overzicht/' + udmy
      }, 300)
    } else {
      showError({
        message : data.message
      })
      return false
    }
  }).fail(function (xhr, textStatus, thrownError) {
    progressModal.setLoading(false)
    showError()
  })
  return false
})