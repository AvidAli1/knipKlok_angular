function replaceUrlParam(url, paramName, paramValue)
{
  url = new URL(url)
  url.searchParams.delete(paramName);
  url.searchParams.append(paramName, paramValue);
  return url
}
(function($) {
  $.query = (function(paramsArray) {
    let params = {};

    for (let i = 0; i < paramsArray.length; ++i)
    {
      let param = paramsArray[i]
        .split('=', 2);

      if (param.length !== 2)
        continue;

      params[param[0]] = decodeURIComponent(param[1].replace(/\+/g, " "));
    }
    return params;
  })(window.location.search.substr(1).split('&'))
})(jQuery);


let urlHelper = {
  changeUrl(url){
    window.history.replaceState(null, null, url)
  }
}