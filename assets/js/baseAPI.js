//注意：每次调用$.get(),$.post(),$.ajax()的时候，会先调用ajaxPrefilter这个函数，在这个函数中可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url
  console.log(options.url);

  // 判断是否是包含/my/的请求地址
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      authorization: localStorage.getItem('token') || ''
    }
  }

  options.complete = function (res) {
    console.log(res);
    // 如果responseJSON.status===1&&responseJSON.message==='身份认证失败'
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清除token并强制跳转
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})