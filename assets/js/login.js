$(function(){
  $("#link_reg").on('click',function(){
    $(".login_box").hide();
    $(".reg_box").show();
  })

  $("#link_login").on('click',function(){
    $(".reg_box").hide();
    $(".login_box").show();
  })

  // 自定义一个叫pwd的校验规则
  var form=layui.form
  var layer=layui.layer
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'],

    repwd :function(value){
      var pwd=$('.reg_box [name=password]').val();
      if(pwd!==value){
        return '两次密码不一样!'
      }
    }
  })


  // 监听表单注册提交事件
  $("#form_reg").on('submit',function(e){
    e.preventDefault()
    var data={username:$("#form_reg [name=username]").val(), password:$("#form_reg [name=password]").val()}
    $.post('http://api-breakingnews-web.itheima.net//api/reguser',data,
    function(res){
      if(res.status!==0){
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录！')
      $("#link_login").click();
    })
  })

  // 监听登录表单提交事件
  $("#form_login").submit(function(e){
    e.preventDefault()
    $.ajax({
      url:'http://ajax.frontend.itheima.net/api/login',
      method:'POST',
      data:$(this).serialize(),
      success:function(res) {
        if(res.status!==0){
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
          // 将登录成功得到的 token 字符串，保存到 localStorage 中
          localStorage.setItem('token', res.token)
          // 跳转到后台主页
        location.href='/index.html'
      }
    })
  })


  
})