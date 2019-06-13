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

function check_reg() {
    let prompt = document.getElementById('prompt');
    let bt = document.getElementsByClassName('bt')[0];
    let email = document.getElementsByClassName('content_input')[0];
    let name = document.getElementsByClassName('content_input')[1];
    let pwd1 = document.getElementsByClassName('content_input')[2];
    let pwd2 = document.getElementsByClassName('content_input')[3];
    bt.onclick = function () {
        if (check_email()){
            if (check_name()){
                if (check_password()){
                    register_user({
                        email: email.value,
                        name: name.value,
                        password: pwd1.value,
                    })
                    // 当用户输入全部满足时判断是否用户名重复、是否邮箱重复
                }
            }

        }
    };
    // 判断用户名是否符合要求
    function check_name() {
        if (name.value <= 2){
            prompt.innerText = '用户名长度至少2位！';
            animate(prompt);
            return false
        }
        return true
    }
    //判断用户输入的电子邮箱格式是否正确
    function check_email() {

        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(reg.test(email.value)){
            return true
        }else {
            email.value = '';
            prompt.innerText = '邮箱格式有误，请重新输入！';
            animate(prompt);

            return false
        }
    }
    // 判断用户密码是否符合要求
    function check_password() {

        if (pwd1.value.length < 7){

            prompt.innerText = '密码长度不得少于七位！';
            animate(prompt);

            return false;
        }else if (pwd1.value !== pwd2.value){
            pwd1.value = '';
            pwd2.value = '';

            prompt.innerText = '两次密码不相同，请重新输入！';
            animate(prompt);

            return false;
        }
        return true;
    }
    // 重复执行动画函数

}
function register_user(data) {
    ajax('PHP/Register.php', {
        'email':data.email,
        'name':data.name,
        'password':data.password

    }, function (xml) {
        if(Number(xml.responseText)){
            let pt = document.getElementById('prompt');
            pt.innerText = '注册成功！将在三秒后跳转到登录页面！';
            animate(document.getElementById('prompt'));
            setTimeout(() => {
                // 当用户成功注册时，跳转到登录页面
                window.location.href = 'Login.html'
            }, 3000);


        }
    }, function () {
        alert('提交失败！')
    }, "POST")
}