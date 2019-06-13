// 添加cookie，需要制定键，值，路径，日期（天）
function addCookie(key , val, path, day) {
    let pathIndex = window.location.pathname.lastIndexOf('/');
    let cutPath = window.location.pathname.slice(0, pathIndex);
    path = path || cutPath;

    // domain = domain || document.domain;

    if(day){
        let d;
        d = new Date();
        d.setTime(d.getTime()+((day*24*60*60*1000)));
        document.cookie = key + '=' + val + ';' + 'path=' + path + ';' + 'expires=' + d.toUTCString() + ';';
    }else {
        document.cookie = key + '=' + val + ';' + 'path=' + path + ';'
    }

    // console.log(key + '=' + val + ';' + 'path=' + path + ';' + 'expires=' + d.toUTCString() + ';');
}

//遍历整个cookie从中寻找到key满足的cookie然后添加到一个数组将这个cookie作为一个数组的元素整体返回
function findCookie(key) {
    let cookies = document.cookie;
    let cookies_list = cookies.split(';');
    let ret_cookie = [];
    // console.log(cookies_list);
    for(let i in cookies_list){
        // console.log(i);
        let final_cookie = cookies_list[i].split('=');
        // console.log(final_cookie);
        // console.log(final_cookie);
        if(final_cookie[0].trim() === key){
            // console.log(final_cookie);
            ret_cookie.push(final_cookie);
        }
    }
    return ret_cookie;

}

// 默认情况下只能删除默认路径的cookie， 如果需要删除其他路径的cookie需要重新制定路径
function delCookie(key, path, day) {
    let val = findCookie(key);
    for(let i in val){
        if(val[i][0].trim() === key)
            // console.log(val[i]);
            addCookie(key, val[i][1], path, day)
    }

}