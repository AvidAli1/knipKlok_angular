let barberCardHelper = {
  gotobarbershop: (url) => {
    document.location.href = url
  },
  buildHtmlBarberShopsCard: (item, onSelect, parentClass = 'slide') => {
    let container = $('<div>', { class: parentClass })
    let article = $('<article>', { class: 'article-area' })

    let imageHolder = $('<div>', {
      class: 'image-holder image-loader',
      html: `<picture><source srcset="${item.profile_image_webp}" type="image/webp">
                                    <source srcset="${item.profile_image}" type="image/jpeg"><img src="${item.profile_image}" alt="${item.shopname}" class="lazyload"></picture>`
    })
    article.append(imageHolder)

    let textHolder = $('<div>', {
      class: 'text-holder',
      html: `<h3 class="text-loader"><span>${item.shopname ? item.shopname :''}</span></h3>`
    })
    let reviewList = $('<ul>', {
      class: 'list-reviews text-loader',
    })
    let rating = $('<li>', {
      html: `<span class="img"><i class="icon icon-star"></i></span><span class="text">(${item.rating ? item.rating : ''})</span>`
    })
    let review = $('<li>', {
      html: `<a href="#">${item.reviews_count} ${trans('index.reviews')}</a>`
    })
    if(item.rating){
      reviewList.append(rating)
    }
    reviewList.append(review)
    textHolder.append(reviewList)

    let area = '<div class="tag-area tag-area-' + item.barberid + '">'
    area += '<address class="text-loader"><span>'
    area += '<span class="img"><i class="icon icon-location"></i></span>'
    area += item.city ? item.city : ''
    area += '</span></address>'
    area += '<div class="tag-container text-loader">'
    /*area += item.avail ? item.avail :''*/
    if(item.shop_status == "open"){
      area +=`<span class="tag"> ${trans('index.open')} </span>`
    }
    else if(item.shop_status == "full"){
      area +=`<span class="tag full"> ${trans('index.full')} </span>`
    }
    area += '</div>'
    area += '</div>'

    textHolder.append(area)

    let link = $(`<button  class="btn-green">${trans('index.view')} <i class="icon icon-arrowo-forward"></i></button>`)
    article.on('click', ()=>{
      onSelect(item.location)
    })
    link.on('click', ()=>{
      onSelect(item.location)
    })
    textHolder.append(link)
    article.append(textHolder)
    container.append(article)
    return container
  }
}