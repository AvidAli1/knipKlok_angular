let currentStepFormIndex = 0
const stepper = {
  data: {
    stepperClass: '.steps-area'
  },
  onStepChange : null,
  init (clazz) {
    this.data.stepperClass = clazz
  },
  current : 0,
  goToStep (n, stepSelection = null) {
    let stepsIndicators = $(this.data.stepperClass + ' .list-steps li')
    let steps = $(this.data.stepperClass + ' .step')
    if (steps.length === 0 && n > steps.length - 1) return
    $(stepsIndicators[currentStepFormIndex]).parent().removeClass('current')
    for(let index=0;index<stepsIndicators.length;index++){
      let item = stepsIndicators[index]
      $(item).removeClass('current')
      let step = stepSelection == null ? n : stepSelection
      if(step == index){
        $(item).addClass('current')
      }
      if(index < step){
        $(item).addClass('completed')
        if(step==7){
         $('.list-steps li:last-child').removeClass('completed').addClass('current');
        }
      }else{
        $(item).removeClass('completed')
      }
    }
    $(steps[currentStepFormIndex]).hide()
    $(steps[n]).show()
    currentStepFormIndex = n
    stepper.current = n
    if(stepper.onStepChange){
      stepper.onStepChange(n)
    }
    $('html, body').animate({
      scrollTop: $(steps[n]).offset().top
    }, 200)
  },
  hideCurrent(){
    let steps = $(this.data.stepperClass + ' .step')
    $(steps[currentStepFormIndex]).hide()
  },
  next () {
    this.goToStep(currentStepFormIndex + 1)
  },
  prev () {
    this.goToStep(currentStepFormIndex - 1)
  }
}
