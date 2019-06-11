<?php
// 连接数据库
$link = mysqli_connect('192.168.2.170', 'root', '123');
// 设置字符编码
mysqli_set_charset($link, 'utf8');
// 连接指定数据库
mysqli_select_db($link, 'test1');

// 向指定表插入数据
//$query = 'insert into table1(name, age, sex) values ("kmr", 26, "man")';
//mysqli_query($link, $query);

// 查询某一段数据
$query = 'select * from table1';
// $query = 'select name from table1';
$result = mysqli_query($link, $query);
// 索引方式获取全部数据
//while ($data = mysqli_fetch_row($result)){
//    var_dump($data);
//}

// 键值方式获取所有数据
while ($data = mysqli_fetch_array($result, MYSQLI_ASSOC)){

    var_dump($data);
}

// 索引方式获取全部数据
//while ($data = mysqli_fetch_array($result, MYSQLI_NUM)){
//    var_dump($data);
//}

// 关闭连接
mysqli_close($link);