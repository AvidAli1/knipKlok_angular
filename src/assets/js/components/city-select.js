$(function () {
  loadDefaultCity(true)
})

function fetchCities (country = null) {
 return new Promise(((resolve, reject) => {
   fetchData({
     country: country,
     func: 'getAllCity'
   }).done(function (data) {
     updateCities(data)
     resolve(data)
   }).fail((xhr, textStatus, thrownError) => {
     showError({
       message: thrownError
     })
     reject()
   })
 }))
}

function updateCities (cities) {
  $('.city-dropdown').html('')
  cities.forEach((item) => {
    $('.city-dropdown').append(createCitySelect(item))
  })
  jcf.getInstance($('.city-dropdown')).instance.refresh()
}

function createCitySelect (city) {
  return '<option value="' + city.city + '">' + city.city + '</option>'
}

