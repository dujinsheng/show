// 封装缓动动画的函数;
// 在封装动画函数的时候直接将需要添加进去的对调函数名字，当作形参写入。
function animate(object, target, callback) {           //callback为添加进去回调函数的名字
    clearInterval(object.timer);
    object.timer = setInterval(function () {
        // length为定义的步长值
        var length = (target - object.offsetLeft) / 10;

        length = length > 0 ? Math.ceil(length) : Math.floor(length);       //取整，如果length是正数则往大了取整，如果length为负数，则往小了取整
        // 判断，当目标元素到达想要到的位置时清除定时器
        if (object.offsetLeft == target) {
            clearInterval(object.timer);


            // if (callback) {          //回调函数写到定时器结束里面
            //     // 回调函数
            //     callback();
            // }
            callback && callback();

        }
        // 移动的距离为：目标元素当前的位置 + 步长值；
        object.style.left = object.offsetLeft + length + 'px';
    }, [30])
}



// 注意的是，这里不用写window.addEventlistener('load',function(){});