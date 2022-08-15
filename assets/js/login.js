$(function () {
  $('#goReg').on('click', function () {
    $('.reg').show()
    $('.login').hide()
  })

  $('#goLogin').on('click', function () {
    $('.reg').hide()
    $('.login').show()
  })

  $('#halfstar').on('click', function () {
    $('#iptpwd').attr('type', 'text')
    $('#star').show()
    $('#halfstar').hide()
  })

  $('#star').on('click', function () {
    $('#iptpwd').attr('type', 'password')
    $('#star').hide()
    $('#halfstar').show()
  })



  // 获取layui中的form对象
  var form = layui.form
  var layer = layui.layer
  // 通过form.verify，自定义 layui 表单验证
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 定义二次校验密码 验证规则
    repwd: function (value) {
      var revalue = $('.reg [name=password]').val()
      if (value !== revalue) {
        return '两次密码不一致'
      }
    }
  })


  // 监听注册表单的提交事件
  $('#reg-form').on('submit', function (e) {
    // 1.阻止默认事件
    e.preventDefault()
    var data = { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }
    // 2.发起post请求
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      // 注册成功后自动跳转，模拟点击“去登录”
      $('#goLogin').click()
    })
  })

  // 监听登录表单的提交事件
  $('#login-form').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    // 发起post请求
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg(res.message)
        }
        // 通过localStorage来本地存储token
        localStorage.setItem('token', res.token)
        layer.msg('登录成功')
        location.href = '/index.html'
      }
    })
  })








})