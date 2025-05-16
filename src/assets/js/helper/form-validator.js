let formValidator = {
  createValidator: (element, rules, submitHandler) => {
    return formValidator.validator = element.validate({
      rules: rules,
      lang: siteData.locale,
      showErrors: function (errorMap, errorList) {
        handleErrors(this)
      },
      submitHandler: (form)=>{
        if(rules.treatment_id && rules.treatment_id.treatment){
          let treatmentId = element.find('input[name="treatment_id"]').val()
          if ((!treatmentId || treatmentId == 0) && treatmentDropdownBuilder != undefined && treatmentDropdownBuilder != null) {
            treatmentDropdownBuilder.showError( rules.treatment_id.treatment, trans('common.field_is_required'))
            return
          }
        }
        submitHandler(form)
      }
    })
  }
}
const handleErrors = (form) => {
  if (form.settings.highlight) {
    for (let i = 0; form.errorList[i]; ++i) {
      let error = form.errorList[i]
      $(error.element).parent().addClass('has-error')
      if($(error.element).parent().find('.error-msg').length === 0){
        $(error.element).parent().append('<div class="error-msg"></div>')
      }
      $(error.element).parent().find('.error-msg').show()
      $(error.element).parent().find('.error-msg').html(error.message)
    }
  }
  if (form.settings.unhighlight) {
    for (let i = 0, elements = form.validElements(); elements[i]; ++i) {
      let valid = elements[i]
      $(valid).parent().removeClass('has-error')
      $(valid).parent().find('.error-msg').hide()
      $(valid).parent().find('.error-msg').html('')
    }
  }
}