function UpMsg() {
    let vm = new Vue({
        el:'#app' ,
        data:{
            msg_content:null,
        },
        methods:{
            update_msg(){
                let input_box = document.getElementById('input_box');
                let f = true;
                if(input_box.value.length <= 4){
                    alert('输入的消息太短！');
                    // input_box.value = '';
                    return 0;
                }else if (input_box.value.length >= 255){
                    alert('输入的消息太长！');
                    return 0;
                }
                if(this.msg_content && f){
                    document.getElementById('length_if').style = 'display:none;';
                    f = !f;
                }
                function getNowFormatDate() {
                    let date = new Date();
                    let seperator1 = "-";
                    let seperator2 = ":";
                    let month = date.getMonth() + 1;
                    let strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                        + " " + date.getHours() + seperator2 + date.getMinutes()
                        + seperator2 + date.getSeconds();
                    return currentdate;
                }
                let name = 'hwz', msg = document.getElementById('input_box').value,
                    up = 0, down = 0;

                function up_msg() {
                    ajax('PHP/PostMsg.php',
                        {
                            name:name,
                            msg:msg,
                            up:up,
                            down:down,
                        },
                        function (xml) {
                            // input_box.value = '';
                            // alert('提交成功！')
                        },
                        function () {
                            alert('提交失败！')
                        },
                        "POST",
                    )
                }up_msg();
                input_box.value = '';
                this.msg_content.push({
                    name:name,
                    msg:msg,
                    up:up,
                    down:down,
                    time:getNowFormatDate(),
                    floor:this.msg_content.length + 1,
                });
            },
        }

    });

    function load_msg() {
        ajax('PHP/GetMsg.php',{},function (xml) {
            let msg = [];
            let t =JSON.parse(xml.responseText);
            for(let i in t){
                msg.push(JSON.parse(t[i]));
            }
            if (!msg.length){
                document.getElementById('length_if').style = 'display:block;text-align:center;color:gray;'
            }

            vm.msg_content = msg;

        }, function () {
            alert('获取留言失败！');
        },"GET");
    }load_msg();

}