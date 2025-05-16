/*Confirm Modal*/
function confirmDialog (message) {
  return new Promise((resolve, reject) => {
    $('body').addClass('delete-active')
    $('.popup-delete .delete-close').on('click', () => {
      $('body').removeClass('delete-active')
      reject()
    })
    $('.popup-delete .message').html(message)
    $('.popup-delete button').on('click', () => {
      $('body').removeClass('delete-active')
      resolve()
    })
  })
}

let popup = {
  success (title, message,hideCancel, icon=null) {
    return popup.show(title, message, 'success', true, null, icon)
  },
  warning (title, message,hideCancel, icon=null) {
    return popup.show(title, message, 'warning', true, null, icon)
  },
  error (title, message,hideCancel, icon=null) {
    return popup.show(title, message, 'error', true, null, icon)
  },
  confirm (title, message, hideCancel, actionBtnText = null) {
    return popup.show(title, message, 'delete', hideCancel, actionBtnText)
  },
  show (title, message, type = 'success', hideCancel = false, actionBtnText = null, icon = null) {
    return new Promise(((resolve, reject) => {
      $('body').addClass(`${type}-active`)
      if (hideCancel) {
        $(`.popup-${type} .${type}-close`).parent().removeClass('bottom-btns')
        $(`.popup-${type} .${type}-close`).hide()
      } else {
        $(`.popup-${type} .${type}-close`).parent().addClass('bottom-btns')
        $(`.popup-${type} .${type}-close`).show()
      }
      $(`.popup-${type} .${type}-close`).on('click', () => {
        $('body').removeClass(`${type}-active`)
        reject()
      })
      if (title)
        $(`.popup-${type} .title`).html(title)
      if (message) {
        $(`.popup-${type} .message`).html(message)
        $(`.popup-${type} .error-message`).html(message)
      }

      let btnEl = $(`.popup-${type} button`)
      if(actionBtnText){
        btnEl.html(actionBtnText)
      }
      if(icon){
        $(`.popup-${type} img`).attr('src', siteData.baseUrl + "/assets/" + icon)
      }
      /*if(hideCancel){
        btnEl.parent().parent().removeClass('btns-area')
      }else{
        btnEl.parent().parent().addClass('btns-area')
      }*/
      btnEl.on('click', () => {
        $('body').removeClass(`${type}-active`)
        resolve()
      })
    }))
  }
}

function quoteAttr (s, preserveCR) {
  preserveCR = preserveCR ? '&#13;' : '\n'
  return ('' + s) /* Forces the conversion to string. */
    .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
    .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    /*
          You may add other replacements here for HTML only
          (but it's not necessary).
          Or for XML, only if the named entities are defined in its DTD.
          */
    .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
    .replace(/[\r\n]/g, preserveCR)
}

//Rating helper
const ratingBar = {
  currentRating: 0,
  onRatingChange: null,
  init: () => {
   $('.list-ratings').off('click')
    $('.list-ratings').on('click', (ev) => {
      let stars = $('.list-ratings li')
      let id = $(ev.target).parent().attr('id')
      let rated = false
      for (let i = 0; i < stars.length; i++) {
        let star = $(stars[i])
        if (!rated)
          star.addClass('active')
        else
          star.removeClass('active')

        let currentId = `rating-${i + 1}`
        if (id == currentId) {
          ratingBar.currentRating = i+1
          rated = true
        }
      }

      if (ratingBar.onRatingChange) {

        ratingBar.onRatingChange(ratingBar.currentRating)
      }
    })
  },
  setOnRatingChange (listener) {
    ratingBar.onRatingChange = listener
  }
}

$('a.mail').on('click', (ev)=>{
  let el = $(ev.target)
  var href = el.attr('href')
  el.attr('href', href.replace('badmail.',''))
})

//Input filter for tel input
$('input[pattern="[0-9]*"]').on('keyup change', (ev)=>{
  let el = $(ev.target)
  let newValue = el.val().replace(/\D/g,'')
  el.val(newValue)

})


let alertToast = {
  show : (message) =>{
    $('.change-alert .message').html(message)
    let alert = $('.change-alert')
    alert.show()
    setTimeout(()=>{
      alert.hide()
    }, 4000)

  }
}

