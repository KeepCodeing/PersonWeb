function animate(el) {
    let el_parent = el.parentNode;
    el_parent.style.animation = "prompt_move_up 1s";
    el_parent.addEventListener("animationend", function () {
        el_parent.style = '';
        el_parent.style.animation = 'prompt_move_down 1s';
        el_parent.addEventListener("animationend", function () {
            el_parent.style = '';
        })

    });
}

function check_login() {
    // 当用户点击按钮时将用户名和密码使用ajax交给PHP，使用PHP从DB里查找用户信息
    let bt = document.getElementsByClassName('bt')[0];
    let prompt = document.getElementById('prompt');
    let user_name = document.getElementsByClassName('content_input')[0];
    let password = document.getElementsByClassName('content_input')[1];
    bt.onclick = function () {
        // 判断用户名或邮箱或密码是否为空
        if (user_name.value.length <= 0){
            prompt.innerText = '用户名或邮箱不能为空！';
            animate(prompt);
            return false
        }else if (password.value.length <= 0){
            prompt.innerText = '请输入密码！';
            animate(prompt);
        }else {
            ajax('PHP/Login.php', {
                'user_name':user_name.value,
                'password':password.value,
            }, function (xml) {
                // 用户名或邮箱不存在返回 0， 密码错误返回 -1， 登录成功返回 1
                let ret = Number(xml.responseText);
                if (ret === 1){
                    prompt.innerText = '登陆成功！将在三秒后跳转到主页面！';
                    animate(prompt);
                    setTimeout(() => {
                        // 注意这里的***index1***只是暂时文件
                        // 登录成功进行一些操作，如存入cookie等
                        window.location.href = 'index1.html';
                    }, 3000)
                }else if (ret === -1){
                    // 密码错误进行提示
                    prompt.innerText = '登陆失败！请检查您的密码！';
                    animate(prompt);

                }else {
                    // 用户不存在进行提示
                    prompt.innerText = '登陆失败！请检查您的用户名或邮箱！';
                    animate(prompt);
                }

            }, function () {
                alert('登录失败！');
            }, "POST")
        }
    }
}