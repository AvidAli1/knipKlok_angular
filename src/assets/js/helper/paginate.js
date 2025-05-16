const paginator = {
  paginate (items, page = 1, limit = 15) {
    let result = {}
    result.total = items.length
    result.pages = Math.ceil(result.total / limit)
    let data = []
    let startIndex = ((page - 1) * limit)
    let endIndex = startIndex + limit
    if (result.total > startIndex) {
      if (endIndex >= items.length)
        endIndex = items.length
      if (startIndex > endIndex) {
        endIndex = 1
      }
      data = items.slice(startIndex, endIndex)
    }
    result.data = data
    result.currentPage = page
    let nextData = ((page + 1) * limit)
    result.nextPage = (page < result.pages) ? (page + 1) : null
    let prevData = ((page - 1) * limit)
    result.prevPage = (prevData > 0) ? (page - 1) : null
    return result
  }
}