$(function () {
  //$('body').removeClass('loader loaded')
//  loadDefaultCity()
//  $('#homeCitySelect').val( $.cookie('stad'))
  $("html").addClass('loaded')
  $('#bestInAreaSlider').parent().addClass('block-loaded')
})

var loader_count = 0


function loadDefaultCity (fromLoader = false) {
  let city = $('#homeCitySelect').val()
  setCity(city, fromLoader)
  console.log("loadDefault")
 // refreshBarbers()
}

function refreshBarbers(fromLoader = false){
  let country = $('#homeCountry').val()
  let city = $('#homeCitySelect').val()
  var sendData = {
    func: 'search_barberShop_city',
    country  : country,
    limit  : 30,
    city  :  city && city.trim().length > 0 ? city.trim() : 'Alle',
  }
  fetchBarbersData(sendData, fromLoader)
}

function setCountryCode (countryCode = 'nl') {
  let date = new Date()
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
  let expires = '; expires=' + date.toUTCString()
  document.cookie = 'country_code=' + (countryCode || '') + expires + '; path=/'
  console.log("setCountryCode", countryCode)
  fetchCities(countryCode)
  clearCity()
  //window.location.reload(true)
}

function clearCity () {
  $.cookie('stad', '', { expires: -1, path: '/' })
  console.log("clearCity")
  refreshBarbers()
}

function setCity (city, fromLoader =false) {
  $.cookie('stad', city, { expires: 9999, path: '/' })
  // window.location.reload()
  if(loader_count > 0){
    refreshBarbers(fromLoader)
  }
  loader_count++
}

function fetchBarbersData (params, fromLoader  = false) {
  if(!fromLoader){
    $('#bestInAreaSlider').parent().removeClass('block-loaded')
    $("html").removeClass('loaded')
  }
  fetchData(params).done(function (data) {
    populateBestInAreaList(data)
  }).fail((xhr, textStatus, thrownError) => {

  })
}

function populateBestInAreaList (data) {
  $('#bestInAreaSlider').html('')
  if (data.length > 0) {
    let containerInfo = getBestInAreaContainer()
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      containerInfo.container.append(barberCardHelper.buildHtmlBarberShopsCard(item, (url) => {
        window.location.href =  siteData.baseUrl +url
      }))
    }
    let containerWidth = containerInfo.container.innerWidth()
    let itemWidth = $('#bestInAreaSlider .slide').outerWidth()
    let itemCount = data.length
    showArrows((Math.ceil(containerWidth / itemWidth) < itemCount))
    $("html").addClass('loaded')
    $('#bestInAreaSlider').parent().addClass('block-loaded')
  }
}

function getBestInAreaContainer () {
  let container = $('#bestInAreaSlider')
  return {
    container: container,
    arrows: container.parent().find('.arrow')
  }
}


formValidator.createValidator($('#form-search'),{},()=>{
  let countryName = $('select[name="country"]').val()
  let city = $('select[name="city"]').val()
  let query = $('input[name="query"]').val()
  let re = new RegExp(' ', 'g')
  window.location.href = `/kapper-zoeken/${countryName.replace(re, '-')}/${city.replace(re, '-')}/${query ? query.replace(re, '-') : ''}`
})

function showArrows (show) {
  let data = getBestInAreaContainer()
  let holder = data.container.parent().parent().parent()
  if (show) {
    $(holder).addClass('has-scroll')
  } else {
    $(holder).removeClass('has-scroll')
  }
}

progressModal.setLoading()
$('#gotosearch').click(function () {
  $('html, body').animate({
    scrollTop: $('#search-section').offset().top
  }, 2000)
  $('input[name=\'search_string\']').focus()
})

$(document).on('click', '.dropdown-menu a', function () {
  var selText = $(this).html()
  $(this).parents('.dropdown').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>')
})
