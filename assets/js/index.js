$(function () {
  getUserinfo()

  const layer = layui.layer
  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    // 弹出提示框
    layer.confirm('此操作将退出登录，是否继续？', { icon: 3, title: '提示' }, function (index) {
      // 清空本地存储中的token
      localStorage.removeItem('token')
      // 跳转到登录页面
      location.href = '/login.html'
      // 关闭 confirm 询问框
      layer.close(index);
    });

  })
})

function getUserinfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers 是请求头配置对象,每次请求都要写请求头很麻烦，所以写到baseAPI中
    /*  headers: {
       authorization: localStorage.getItem('token') || ''
     }, */
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message)
      }
      // 请求成功之后，要渲染用户头像
      renderAvatar(res.data)
      console.log(res);
    },
    // 每次有权限的接口都需要调用，所以写在baseAPI中
    // 浏览器在执行get请求的success或error时，会同时执行complete方法，不论请求成功与否，都会执行
    complete: function (res) {
      console.log(res);
      // 如果responseJSON.status===1&&responseJSON.message==='身份认证失败'
      if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        // 强制清除token并强制跳转
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }

  })
}

// 渲染用户头像
function renderAvatar(user) {
  // 渲染用户名
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    // 渲染图片头像
    $('.layui-nav-img').show()
    $('.text-info').hide()
  } else {
    // 渲染文字头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-info').html(first).show()
  }
}