var offsetY = window.pageYOffset
var $win = $(window)
var modals = []

// Use this function to check if variable is set or not @Mike 2020-02-28
function empty (mixedVar) {
  var undef
  var key
  var i
  var len
  var emptyValues = [undef, null, false, 0, '', '0']

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
  return false
}

$('.modal').on('shown.bs.modal', function (e, $modal) {
  if (modals.indexOf(e) === -1) {
    modals.push(e)
  }
  offsetY = window.pageYOffset
  $('body').css('position', 'fixed').css('overflow', 'hidden').css('top', -offsetY).css('width', '100%')
}).on('hidden.bs.modal', function (e) {
  $('.form-group.error').remove()
  var modalIndex = modals.indexOf(e)
  modals.splice(modalIndex, 1)
  if (modals.length === 0) {
    $('body').removeAttr('style')
    $win.scrollTop(offsetY)
  }
  $(this).removeClass('modal-popup')
  $('.modal-body').removeAttr('style')
}).on('hide.bs.modal', function (e) {
  var modalIndex = modals.indexOf(e)
  modals.splice(modalIndex, 1)
  if (modals.length === 0) {
    $('body').removeAttr('style')
    $win.scrollTop(offsetY)
  }
})
$(document).on('click', '.backdrop', function () {
  $(this).parent().modal('hide')
  $(this).remove()
})
$('.modal').on('hidden.bs.modal', function () {
  modalid = $(this).attr('id')
  $('#' + modalid + ' .form-control.text-danger.error').remove()
})
var pathname = window.location.pathname.replace(/^\/|\/$/g, '') // Returns path only

/* Ajax request fetch data */
var fetchData = function (query) {
  // Return the $.ajax promise
  if (typeof (query) === 'object') {
    query.page = pathname
  } else {
    query = query + '&page=' + pathname
  }
  var result = $.ajax({
    beforeSend: function (request) {
      request.setRequestHeader('Authorization', siteData.token)
    },
    data: query,
    dataType: 'json',
    url: siteData.baseUrl + 'GetAPI.php',
    type: 'POST'
  })
  result.fail(function (xhr, textStatus, thrownError) {
    if (xhr.status == 401) {
      window.location.href = siteData.baseUrl + 'logout.php'
      return false
    }
    if (xhr.status == 403) {
      window.location.reload(true)
      return false
    }
  })
  return result
}

/* Ajax request post data */
var postData = function (query, file) {
  // Return the $.ajax promise
  if (typeof (query) === 'object') {
    query.page = pathname
  } else {
    query = query + '&page=' + pathname
  }
  if (file) {
    var result = $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', siteData.token)
      },
      data: query,
      dataType: 'json',
      url: siteData.baseUrl + 'PostAPI.php',
      type: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false
    })
  } else {
    var result = $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', siteData.token)
      },
      data: query,
      dataType: 'json',
      url: siteData.baseUrl + 'PostAPI.php',
      type: 'POST'
    })
  }
  result.fail(function (xhr, textStatus, thrownError) {
    if (xhr.status == 401) {
      window.location.href = siteData.baseUrl + 'logout.php'
      return false
    }
    if (xhr.status == 403) {
      window.location.reload(true)
      return false
    }
  })
  return result
}

function multipleFormData (data) {
  return new Promise(((resolve, reject) => {
    let result = $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', siteData.token)
      },
      data: data,
      dataType: 'json',
      url: siteData.baseUrl + 'PostAPI.php',
      type: 'POST',
      mimeType: 'multipart/form-data',
      contentType: false,
      processData: false
    })
    result.done(res => {
      resolve(res)
    })
    result.fail((xhr, textStatus, thrownError) => {
      reject(thrownError)
    })
  }))
}

/* Show global errors */
function showErrors (modal, errorMessage, cls) {
  if (cls == undefined) {
    cls = ''
  }
  if (errorMessage == undefined) {
    errorMessage = translateLanguage('Er is iets fout gegaan, probeer het later nogmaals.')
  }

  /*showLoader(modal, false)*/
  modal.find('.modal-body .form-group.error').remove()
  modal.find('.modal-body .form-control.text-danger.error').remove()
  modal.find('.modal-body').append('<div class=\'form-control text-danger error ' + cls + '\'><b>' + errorMessage + '</b></div>')
  console.log(modal)
}

function showErrorsSection (modal, errorMessage, cls) {
  if (cls == undefined) {
    cls = ''
  }
  if (errorMessage == undefined) {
    errorMessage = translateLanguage('Er is iets fout gegaan, probeer het later nogmaals.')
  }
  showLoader(modal, false)
  modal.find('.form-control.error').remove()
  modal.find('form').append('<div class=\'form-control mb-0 text-danger error ' + cls + '\'><b>' + errorMessage + '</b></div>')
}

function showDots () {
  var dotCounter = 0;
  (function addDot () {
    setTimeout(function () {
      if (dotCounter++ < 5) {
        $('#dots').append('.')
        addDot()
      } else {
        window.location.href = siteData.baseUrl
      }
    }, 300)
  })()
}

/* If sessions is expired than redirect to homepage */

function redirectToHome () {
  window.location.href = siteData.baseUrl
}

/* Show loader for all modals */
function showLoader (modalDiv, enable) {
  if (enable == true) {
    $(modalDiv).find('.form-group.error').remove()
    $(modalDiv).find('.modal-header').append('<div class="slider"><div class="line"></div><div class="subline inc"></div><div class="subline dec"></div></div>')
    $(modalDiv).find('button[type="submit"]').prop('disabled', true)
  } else {
    $(modalDiv).find('.modal-header .slider').remove()
    $(modalDiv).find('button[type="submit"]').not('button[locked="true"]').removeAttr('disabled')
  }
}

function showLoaderSection (modalDiv, enable) {
  if (enable == true) {
    $(modalDiv).find('.form-control.error').remove()
    $(modalDiv).append('<div class="slider"><div class="line"></div><div class="subline inc"></div><div class="subline dec"></div></div>')
    $(modalDiv).find('button[type="submit"]').prop('disabled', true)
  } else {
    $(modalDiv).find('.slider').remove()
    $(modalDiv).find('button[type="submit"]').removeAttr('disabled')
  }
}

function showLoaderBtn (modalDiv, enable) {
  if (enable == true) {
    $(modalDiv).find('button[type=\'submit\'] i.fa').addClass('fa-spinner fa-spin').removeClass('fa-sign-in')
    $(modalDiv).find('button[type=\'submit\']').prop('disabled', true)
  } else {
    $(modalDiv).find('button[type=\'submit\'] i.fa').removeClass('fa-spinner fa-spin').addClass('fa-sign-in')
    $(modalDiv).find('button[type=\'submit\']').removeAttr('disabled')
  }
}

/* Format date in dd-mm-yyyy */
function formatDate (userDate) {
  var today = Date.parse(userDate)
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!

  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  var today = dd + '-' + mm + '-' + yyyy
  return today
}

function parseDate (pdate) {
  var x = pdate.split('-')
  return x[2] + '/' + x[1] + '/' + x[0]
}

/* Format date in dayname - dd-mm-yyyy */
function formatDateV2 (userDate, fulldates) {
  if (fulldates) {
    var days = [translateLanguage('zondag'), translateLanguage('maandag'), translateLanguage('dinsdag'), translateLanguage('woensdag'), translateLanguage('donderdag'), translateLanguage('vrijdag'), translateLanguage('zaterdag')]
  } else {
    var days = [translateLanguage('Zo'), translateLanguage('Ma'), translateLanguage('Di'), translateLanguage('Wo'), translateLanguage('Do'), translateLanguage('Vr'), translateLanguage('Za')]
  }

  var today = Date.parse(userDate)
  var dd = today.getDate()
  var mm = today.getMonth() + 1 // January is 0!
  var d = days[today.getDay()]

  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  var today = d + ' ' + dd + '-' + mm + '-' + yyyy
  return today
}

/* Pagination for table */
function paginate_table (tab, table, numberofrecords, tableid) {
  if (tableid === undefined) {
    tableid = '#logTablePagination'
  }
  var totalRows = $(table).find('tbody tr:has(td)').length
  var recordPerPage = numberofrecords
  var totalPages = Math.ceil(totalRows / recordPerPage)
  var $pages = $(tableid)
  $pages.hide()

  if (totalPages > 1) {
    for (i = 0; i < totalPages; i++) {
      $('<span id="' + (i + 1) + '" class="pageNumber">' + (i + 1) + '</span>').appendTo($pages)
    }
    $(tableid + ' .pageNumber#' + tab).addClass('pageNumberClicked')
    $pages.show()
  }

  $(table).find('tbody tr:has(td)').hide()
  var tr = $(table + ' tbody tr:has(td)')
  for (var i = 0; i <= recordPerPage - 1; i++) {
    $(tr[i]).show()
  }
  $(table).show()
  $(table).find('tbody tr:has(td)').hide()
  var nBegin = (tab - 1) * recordPerPage
  var nEnd = tab * recordPerPage - 1
  for (var i = nBegin; i <= nEnd; i++) {
    $(tr[i]).show()
  }
  $(tableid + ' span').click(function (event) {
    $(tableid + ' .pageNumber').removeClass('pageNumberClicked')
    $(this).addClass('pageNumberClicked')
    $(table).find('tbody tr:has(td)').hide()
    var nBegin = ($(this).text() - 1) * recordPerPage
    var nEnd = $(this).text() * recordPerPage - 1
    for (var i = nBegin; i <= nEnd; i++) {
      $(tr[i]).show()
    }
  })
}

/* Pagination for panels (Updates page) */
function paginate_table_updates (tab, table, numberofrecords) {
  var totalRows = $(table).find('li').length
  var recordPerPage = numberofrecords
  var totalPages = Math.ceil(totalRows / recordPerPage)
  var $pages = $('#logTablePagination')
  $pages.hide()

  if (totalPages > 1) {
    for (i = 0; i < totalPages; i++) {
      $('<span id="' + (i + 1) + '" class="pageNumber">' + (i + 1) + '</span>').appendTo($pages)
    }
    $('.pageNumber#' + tab).addClass('pageNumberClicked')
    $pages.show()
  }

  $(table).find('li').hide()
  var tr = $(table + ' li')
  for (var i = 0; i <= recordPerPage - 1; i++) {
    $(tr[i]).show()
  }
  $(table).show()
  $(table).find('li').hide()
  var nBegin = (tab - 1) * recordPerPage
  var nEnd = tab * recordPerPage - 1
  for (var i = nBegin; i <= nEnd; i++) {
    $(tr[i]).show()
  }
  $('#logTablePagination span').click(function (event) {
    $('.pageNumber').removeClass('pageNumberClicked')
    $(this).addClass('pageNumberClicked')
    $(table).find('li').hide()
    var nBegin = ($(this).text() - 1) * recordPerPage
    var nEnd = $(this).text() * recordPerPage - 1
    for (var i = nBegin; i <= nEnd; i++) {
      $(tr[i]).show()
    }
  })
}

function paginate_table_stastics (tab, table, numberofrecords) {
  var totalRows = $(table).find('.event_body').length
  var recordPerPage = numberofrecords
  var totalPages = Math.ceil(totalRows / recordPerPage)
  var $pages = $('#logTablePagination')
  $pages.hide()

  if (totalPages > 1) {
    for (i = 0; i < totalPages; i++) {
      $('<span id="' + (i + 1) + '" class="pageNumber">' + (i + 1) + '</span>').appendTo($pages)
    }
    $('.pageNumber#' + tab).addClass('pageNumberClicked')
    $pages.show()
  }

  $(table).find('.event_body').hide()
  var tr = $(table + ' .event_body')
  for (var i = 0; i <= recordPerPage - 1; i++) {
    $(tr[i]).show()
  }
  $(table).show()
  $(table).find('.event_body').hide()
  var nBegin = (tab - 1) * recordPerPage
  var nEnd = tab * recordPerPage - 1
  for (var i = nBegin; i <= nEnd; i++) {
    $(tr[i]).show()
  }
  $('#logTablePagination span').click(function (event) {
    $('.pageNumber').removeClass('pageNumberClicked')
    $(this).addClass('pageNumberClicked')
    $(table).find('.event_body').hide()
    var nBegin = ($(this).text() - 1) * recordPerPage
    var nEnd = $(this).text() * recordPerPage - 1
    for (var i = nBegin; i <= nEnd; i++) {
      $(tr[i]).show()
    }
  })
}

function paginate_table_addressBook (tab, table, numberofrecords) {
  var totalRows = $(table).find('.address_book_inner').length
  var recordPerPage = numberofrecords
  var totalPages = Math.ceil(totalRows / recordPerPage)
  var $pages = $('#logTablePagination')
  $pages.hide()

  if (totalPages > 1) {
    for (i = 0; i < totalPages; i++) {
      $('<span id="' + (i + 1) + '" class="pageNumber">' + (i + 1) + '</span>').appendTo($pages)
    }
    $('.pageNumber#' + tab).addClass('pageNumberClicked')
    $pages.show()
  }

  $(table).find('.address_book_inner').hide()
  var tr = $(table + ' .address_book_inner')
  for (var i = 0; i <= recordPerPage - 1; i++) {
    $(tr[i]).show()
  }
  $(table).show()
  $(table).find('.address_book_inner').hide()
  var nBegin = (tab - 1) * recordPerPage
  var nEnd = tab * recordPerPage - 1
  for (var i = nBegin; i <= nEnd; i++) {
    $(tr[i]).show()
  }
  $('#logTablePagination span').click(function (event) {
    $('.pageNumber').removeClass('pageNumberClicked')
    $(this).addClass('pageNumberClicked')
    $(table).find('.address_book_inner').hide()
    var nBegin = ($(this).text() - 1) * recordPerPage
    var nEnd = $(this).text() * recordPerPage - 1
    for (var i = nBegin; i <= nEnd; i++) {
      $(tr[i]).show()
    }
  })
}

/* Custom jquery validator methods */
$.validator.addMethod('le', function (value, element, param) {
  return this.optional(element) || value <= $(param).val()
}, trans('validator_message.not_valid_value'))

$.validator.addMethod('ge', function (value, element, param) {
  $(param).parent().removeClass('has-error')
  if ($(param).val() == null || $(param).val() === undefined ||  $(param).val().toLowerCase() == 'null') {
    $(param).parent().addClass('has-error')
    if($(param).parent().find('.error-msg').length === 0){
      $(param).parent().append('<div class="error-msg"></div>')
    }
    $(param).parent().find('.error-msg').show()
    $(param).parent().find('.error-msg').html(trans('validator_message.required'))
    return false
  }
  return this.optional(element) || value >= $(param).val()
}, trans('validator_message.not_valid_value'))

$.validator.addMethod('eq', function (value, element, param) {
  if ($(element).val() == 'NULL' && $(param).val() == 'NULL') {
    return true
  } else if ($(element).val() == $(param).val()) {
    return false
  } else {
    return true
  }
}, trans('validator_message.not_valid_value'))

$.validator.addMethod('checkData', function (value, element, param) {
  if ($(element).val() == 'NULL' && $(param).val() != 'NULL') {
    return false
  } else {
    return this.optional(element) || value >= $(param).val()
  }
}, trans('validator_message.not_valid_value'))

$.validator.addMethod('noFirstSpace', function (value, element) {
  if (value.charAt(0) == ' ') {
    return false
  } else {
    return true
  }
}, trans('validator_message.enter_name'))
$.validator.addMethod('noWhiteSpace', function (value, element) {
  if (value.indexOf(' ') >= 0) {
    return false
  } else {
    return true
  }
}, trans('validator_message.enter_name'))
$.validator.addMethod('validPhone', function (value, element) {
  if (value.charAt(0) != '0' && value != '') {
    return false
  } else {
    return true
  }
}, trans('validator_message.valid_phone'))

$.validator.addMethod(
  'regex',
  function (value, element) {
    return this.optional(element) || (value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/[A-Z]/))
  },
  trans('validator_message.password')
)
$.validator.addMethod('dateFormat',
  function (value, element) {
    return value.match(/^\d{4}-\d{2}-\d{2}$/)
  },
  trans('validator_message.date_format'))

$.validator.addMethod('treatment', function (value, element, param) {
  console.log('treatment', element)
  console.log('treatment value', value)
  return this.optional(element) || value <= $(param).val()
}, trans('common.value_is_required'))
$('input[name=\'name_shown_tv\']').change(function () {
  if ($(this).prop('checked')) {
    $(this).val('1')
  } else {
    $(this).val('0')
  }
})

$('input[name=\'sendEvent\']').change(function () {
  if ($(this).prop('checked')) {
    $(this).val('1')
  } else {
    $(this).val('0')
  }
})
$('input[name=\'saveToAddressBook\']').change(function () {
  if ($(this).prop('checked')) {
    $(this).val('1')
  } else {
    $(this).val('0')
  }
})
$('input[name=\'rememberme\']').change(function () {
  if ($(this).prop('checked')) {
    $(this).val('1')
  } else {
    $(this).val('0')
  }
})
/*$('input').on('keyup paste', function () {
    return $(this).val(emojiStrip($(this).val()))
})*/
var $months = {
  1: trans('months')[0],
  2: trans('months')[1],
  3: trans('months')[2],
  4: trans('months')[3],
  5: trans('months')[4],
  6: trans('months')[5],
  7: trans('months')[6],
  8: trans('months')[7],
  9: trans('months')[8],
  10: trans('months')[9],
  11: trans('months')[10],
  12: trans('months')[11]
}

var $days = {
  1: trans('days')[0],
  2: trans('days')[1],
  3: trans('days')[2],
  4: trans('days')[3],
  5: trans('days')[4],
  6: trans('days')[5],
  0: trans('days')[6]
}

$(document).ready(function () {
  $('.phone_validate').on('input', function () {
    var c = this.selectionStart
    var r = /[^0-9]/gi
    var v = $(this).val()
    if (r.test(v)) {
      $(this).val(v.replace(r, ''))
      c--
    }
    this.setSelectionRange(c, c)
  })
  $('.name_num_validateion').on('input', function () {
    var regexp = /[^a-zA-Z0-9\s]/g
    if ($(this).val().match(regexp)) {
      $(this).val($(this).val().replace(regexp, ''))
    }
  })
  $('.reg-modal-pop').on('click', function () {
    checkRegistrationIp()
  })
});
(function ($) { // Begin jQuery
  $(function () { // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $('.mobile-view nav ul li a:not(:only-child)').click(function (e) {
      $(this).siblings('.nav-dropdown').toggle()
      // Close one dropdown when selecting another
      $('.mobile-view .nav-dropdown').not($(this).siblings()).hide()
      e.stopPropagation()
    })
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function () {
      $('.mobile-view .nav-dropdown').hide()
    })
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function () {
      $('.mobile-view nav ul').slideToggle(300)
    })
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active')
    })
  }) // end DOM ready
})(jQuery) // end jQuery
function scrollToPath (path, end, mobile) {
  if (mobile) {
    if ($(window).width() < 768) {
      if ($(window).width() < 768) {
        $(path).animate({
          scrollTop: $(end).offset().top
        }, 100)
      }
    }
    $(window).on('resize', function () {
      if ($(window).width() < 768) {
        $(path).animate({
          scrollTop: $(end).offset().top
        }, 100)
      }
    })
  } else {
    $(path).animate({
      scrollTop: $(end).offset().top
    }, 100)
  }
}

function myFunction () {
  var x = document.getElementById('myTopnav')
  if (x.className === 'topnav') {
    x.className += ' responsive'
  } else {
    x.className = 'topnav'
  }
}

$(document).ready(function () {
  (function ($) {
    $('#header__icon').click(function (e) {
      e.preventDefault()
      $('body').toggleClass('with--sidebar')
    })

    $('#site-cache').click(function (e) {
      $('body').removeClass('with--sidebar')
    })
  })(jQuery)
})
/*$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip()
})*/
$(document).on('click', '.popup-img', function () {
  $('#myModal .modal-body').css('padding', '0')
  $('#myModal .modal-body').html('<img src=\'' + $(this).attr('data-image') + '\' alt=\'instagram-image\' />')
  $('#myModal').addClass('modal-popup').modal({ show: true })
})
$.datepicker.regional[siteData.region] = {
  clearText: trans('datepicker.clear'),
  clearStatus: '',
  closeText: trans('datepicker.close'),
  closeStatus: trans('datepicker.clear_unchanged'),
  prevText: trans('datepicker.previous'),
  prevStatus: trans('datepicker.previous_month'),
  nextText: trans('datepicker.next'),
  nextStatus: trans('datepicker.see_following_month'),
  currentText: trans('datepicker.current'),
  currentStatus: trans('datepicker.view_current_month'),
  monthNames: trans('datepicker.months'),
  monthNamesShort: trans('datepicker.months_shot'),
  monthStatus: trans('datepicker.view_another_month'),
  yearStatus: trans('datepicker.view_another_year'),
  weekHeader: trans('datepicker.week'),
  weekStatus: '',
  dayNames: trans('datepicker.days'),
  dayNamesShort: trans('datepicker.days_short'),
  dayNamesMin: trans('datepicker.days_short'),
  dayStatus: trans('datepicker.day_status'),
  dateStatus: trans('datepicker.date_status'),
  dateFormat: trans('datepicker.date_format'),
  firstDay: 1,
  initStatus: trans('datepicker.choose_date'),
  isRTL: false
}
$.datepicker.setDefaults($.datepicker.regional[siteData.region])

function showVideo (url, title) {
  $('#myModal').addClass('video-modal')
  $('#myModal .modal-title').html('<i class="fa video-camera"></i> ' + title + ' <button type="button" class="close" data-dismiss="modal">&times;</button>')
  $('#myModal .modal-body').html('<iframe frameborder="0" src="' + url + '" allow="autoplay" allowfullscreen>')
  $('#myModal .modal-footer').remove()
  $('#myModal').modal('show')
}

$(document).on('hidden.bs.modal', '.video-modal', function () {
  $('.video-modal .modal-body').html('')
})

function updateFirstUseSteps (step, barberid) {
  var sendData = {
    step: step,
    barberid: barberid,
    func: 'updateFirstUseSteps'
  }
  postData(sendData).done(function (data) {
    if (step == 1 && data == 1) {
      updateSteps(0)
    } else if (step == 2 && data == 1) {
      updateSteps(1)
    } else if (step == 3 && data == 1) {
      updateSteps(2)
    } else if (step == 4) {
      updateSteps(3)
    } else if (step == 5 && data == 1) {
      updateSteps(4)
    } else if (step == 6 && data == 1) {
      updateSteps(5)
    } else if (step == 7 && data == 1) {
      updateSteps(5)
    }
  }).fail(function (xhr, textStatus, thrownError) {
  })
}

function updateSteps (step) {
  /*$('.first-use ' + step).removeClass('text-danger').addClass('text-success')

  $('.first-use ' + step + ' i').removeClass('fa-circle').addClass('fa-check')*/
  /*$('.tabset a').removeClass('active')
  let contentEl = $('.tab-content .active')
  contentEl.addClass('js-tab-hidden')
  contentEl.removeClass('active')
  if ($('.tabset a').length > step) {
    let el = $($('.tabset a')[step])
    el.addClass('active')
    $(el.attr('href')).addClass('active')
    $(el.attr('href')).removeClass('js-tab-hidden')

  }*/
}

$('.focusedLabel').on('click', function () {
  $(this).siblings('input').focus()
  $(this).siblings('textarea.input').hide()
  $(this).siblings('textarea.input').show().focus()
})

function getCookie (name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie (name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}

function changeLanguage (language) {
  var expires = ''
  var date = new Date()
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000))
  expires = '; expires=' + date.toUTCString()
  document.cookie = 'language=' + (language || '') + expires + '; path=/'
  window.location.reload(true)
}

$(document).on('click', '.faq-accordian a', function (s) {
  s.preventDefault(),
    elm = $(this).parent(),
    $(elm).hasClass('active') ? (elm.removeClass('active'),
      $(this).next().slideUp()) : ($('.faq-accordian li').removeClass('active'),
      elm.addClass('active'),
      $('.faq-accordian .acc-content').slideUp(),
      $(this).next().slideDown())
})
;(function (document, window, index) {
  var inputs = document.querySelectorAll('.workers_image')
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling
    var labelVal = label.innerHTML

    input.addEventListener('change', function (e) {
      var fileName = ''
      if (this.files && this.files.length > 1) {
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length)
      } else {
        fileName = e.target.value.split('\\').pop()
      }

      if (fileName) {
        label.querySelector('span').innerHTML = fileName
      } else {
        label.innerHTML = labelVal
      }
    })

    // Firefox bug fix
    input.addEventListener('focus', function () {
      input.classList.add('has-focus')
    })
    input.addEventListener('blur', function () {
      input.classList.remove('has-focus')
    })
  })
}(document, window, 0))
$('body').on('hidden.bs.tooltip', function (e) {
  $(e.target).data('bs.tooltip')._activeTrigger.click = false
})
