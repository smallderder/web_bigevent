$(function () {
  // 昵称验证
  const form = layui.form
  const layer = layui.layer
  form.verify = ({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称必须在1-6个字符之内！'
      }
    }
  })

  initUserInfo()


  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        /* var name = res.data.username
        var nickname = res.data.nickname
        var email = res.data.email
        $('[name=username]').val(name)
        $('[name=nickname]').val(nickname)
        $('[name=email]').val(email) */
        // form.val()快速为表单赋值
        form.val('formUserInfo', res.data)
        console.log(res);
      }
    })
  }

  // 点击重置
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    // 重新初始化用户信息
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改用户信息失败')
        }
        // console.log(res);
        layer.msg('修改用户信息成功')
        // 调用父页面中的方法，同步修改欢迎信息和头像部分
        window.parent.getUserinfo()
      }
    })
  })
})


