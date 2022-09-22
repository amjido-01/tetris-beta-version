let timerInterval

Swal.fire({
  title: 'Auto close alert!',
  html:
    'I will close in <strong></strong> seconds.<br/><br/>' +
    '<button id="increase" class="btn btn-warning">' +
      'I need 5 more seconds!' +
    '</button><br/><br/>' +
    '<button id="toggle" class="btn btn-primary">' +
      'Toggle' +
    '</button>',
  timer: 10000,
  didOpen: () => {
    const content = Swal.getHtmlContainer()
    const $ = content.querySelector.bind(content)



    Swal.showLoading()

    resume.addEventListener('click', () => {
      Swal.resumeTimer()
      toggleButtons()
    })


    timerInterval = setInterval(() => {
      Swal.getHtmlContainer().querySelector('strong')
        .textContent = (Swal.getTimerLeft() / 1000)
          .toFixed(0)
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
})