$(function () {
  // loadDefaultCity()
  /*$('#homeCitySelect').val($.cookie('stad'))
  updateState()*/
})

function loadDefaultCity () {
  let city = $('#homeCitySelect').val()
  setCity(city)
}

function setCountryCode (countryCode = 'nl') {
  let date = new Date()
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
  let expires = '; expires=' + date.toUTCString()
  document.cookie = 'country_code=' + (countryCode || '') + expires + '; path=/'
  clearCity()
  updateState()
  $('html').removeClass('loaded')
  fetchCities(countryCode).then(res=>{
    submitForm($('#form-search'))
  })

}

function updateState () {
  let countryCode = $('select[name="country"]').val()
  let city = $('#homeCitySelect').val()
  let query = $('#form-search input[name="query"]').val()
  let path = `/kapper-zoeken/${countryCode}/${city ? city : 'Alle'}/${(query && query != undefined && query != null && query.length > 0) ? query.replace(/ /g,'-') : ''}`
  window.history.pushState('', '', path)
}

function clearCity () {
  $.cookie('stad', '', { expires: -1, path: '/' })
}

function setCity (city) {
  $.cookie('stad', city, { expires: 9999, path: '/' })
  submitForm($('#form-search'))
}

$(function () {
  // submitForm($('#form-search'))
})

formValidator.createValidator($('#form-search'), {}, (form) => {
  submitForm(form)
})
$('#form-search input[name="query"]').on('input', (ev) => {
  toggleClearSearchBtn()
})

function toggleClearSearchBtn () {
  let val = $('#form-search input[name="query"]').val()
  if (val != '' && val != undefined && val != null && (val && val.length > 0)) {
    $('#clearSearch').show()
  } else {
    $('#clearSearch').hide()
  }
}

$(() => {
  toggleClearSearchBtn()
})
$('#clearSearch').on('click', () => {
  $('input[name="query"]').val('')
  demoResult()
  setTimeout(() => {
    submitForm($('#form-search'))
    toggleClearSearchBtn()
  }, 100)
})

function submitForm (form) {
  let formData = $(form).serializeArray()
  let data = {}
  let url = window.location
  for (let i = 0; i < formData.length; i++) {
    let item = formData[i]
    data[item.name] = item.value
    url = replaceUrlParam(url.href, item.name, item.value)
  }
  updateState()
  data.func = 'search_barberShop_city'
  $('html').removeClass('loaded')
  fetchBarbersData(data)
}

let barbersPageData = {}
let barbersList = []
let currentPage = 1

function fetchBarbersData (params) {

  fetchData(params).done(function (data) {
    barbersList = data
    barbersPageData = paginator.paginate(data)
    populateSearchResult(barbersPageData.data)
  }).fail((xhr, textStatus, thrownError) => {
    showError({
      message: thrownError
    })
  })
}

function demoResult () {
  $('#searchResult').html('')
  // $('#searchResult').parent().removeClass('block-loaded')
  for (let i = 0; i < 10; i++) {
    let card = barberCardHelper.buildHtmlBarberShopsCard({}, (url) => {
      window.location.href = siteData.baseUrl + url
    }, 'col')
    $('#searchResult').append(card)
  }
}

function populateSearchResult (data) {
  $('#searchResult').html('')
  // $('#searchResult').parent().removeClass('block-loaded')
  data.forEach(item => {
    let card = barberCardHelper.buildHtmlBarberShopsCard(item, (url) => {
      window.location.href = siteData.baseUrl + url
    }, 'col')
    $('#searchResult').append(card)
  })
  buildPagination()
  $('#searchResult').parent().addClass('block-loaded')
  $('html').addClass('loaded')

}

function buildPagination () {
  let paginationContainer = $('#barbersListPagination')
  paginationContainer.html('')

  if (barbersPageData.pages <= 1) return

  if (barbersPageData.prevPage)
    paginationContainer.append(buildPrevButton())

  for (let i = 1; i <= barbersPageData.pages; i++) {
    paginationContainer.append(buildPageButton(i))
  }
  console.log(barbersPageData.nextPage)
  if (barbersPageData.nextPage)
    paginationContainer.append(buildNextButton())
}

function buildPrevButton () {
  let html = '<li><a href="#" onclick="' + 'gotoPage(' + (currentPage - 1) + ')' + '" class="btn">'
  html += '<i class="icon icon-arrow-back"></i>'
  html += `<span class="text">${trans('barbers.prev')}</span>`
  html += '</a></li>'
  return html
}

function buildPageButton (page) {
  let html = '<li>'
  html += '<a href="#" onclick="' + 'gotoPage(' + page + ')' + '" class="' + (page === currentPage ? 'current' : '') + '">' + page + '</a>'
  html += '</li>'
  return html
}

function buildNextButton () {
  let html = '<li><a href="#" onclick="' + 'gotoPage(' + (currentPage + 1) + ')' + '" class="btn">'
  html += `<span class="text">${trans('barbers.next')}</span>`
  html += '<i class="icon icon-arrowo-forward"></i>'
  html += '</a></li>'
  return html
}

function gotoPage (page) {
  if (page > 0 && page <= barbersPageData.pages) {
    currentPage = page
    barbersPageData = paginator.paginate(barbersList, page)
    populateSearchResult(barbersPageData.data)
  }
}
