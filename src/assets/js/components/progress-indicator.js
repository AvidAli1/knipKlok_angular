$(function () {
  progressModal.setLoading(false)
})

let progressModal = {
  setLoading (loading) {
    let loader = $('.loader')
    loading ?
      loader.removeClass('loaded') :
      loader.addClass('loaded')
  }
}