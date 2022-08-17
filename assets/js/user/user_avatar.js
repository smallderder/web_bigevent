$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 给上传按钮注册点击事件
  $('#btnUpload').on('click', function () {
    $('#file').click()
  })

  // 监听input file按钮的change事件
  $('#file').on('change', function (e) {
    console.log(e.target.files);
    var fileList = e.target.files
    if (fileList.length === 0) {
      return layer.msg('请选择文件')
    }

    // 更换裁剪区的文件
    var file = fileList[0]
    var imgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')   //销毁旧的裁剪区域
      .attr('src', imgURL)  //重新设置图片路径
      .cropper(options)     //重新初始化剪裁区域
  })


  // 给确定按钮添加点击事件
  $('#newImg').on('click', function () {
    // 1.先拿到修改后的图片
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // console.log(dataURL);

    // 2.调接口
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('更换头像成功')
        // 重新调用getUserinfo()方法渲染用户头像
        window.parent.getUserinfo()
      }
    })


  })









})