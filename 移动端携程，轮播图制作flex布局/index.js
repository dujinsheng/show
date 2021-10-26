window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // 获得focus的宽度
    var w = focus.offsetWidth;
    // 1.利用定时器自动轮播图
    var index = 0;    //用于做图片的索引号
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';          //加过渡效果
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, [2000]);

    // 2.等着我们过度完成之后，再去判断，监听过度完成的事情transitionend
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果，让ul快速回到第一张图。
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随图片变化
        // 把ol里面li带有current类名的选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号为index的li加上current这个类名。
        ol.children[index].classList.add('current');
    });

    // 4.手指滑动轮播图
    // 触摸元素，touchstart，获取手指初始坐标
    var startx = 0;
    var moveX = 0;     //手指移动距离
    ul.addEventListener('touchstart', function (e) {
        startx = e.targetTouches[0].pageX;
        clearInterval(timer);             //手指触摸时，就停止计时器
    });
    // 移动手指touchmove，计算手指的滑动距离，并且移动盒子。
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startx;
        // 移动盒子：盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        ul.style.transition = 'none';   //手指拖动的时候，不需要动画效果，所以要取消过渡。
        ul.style.transform = 'translateX(' + translatex + 'px)';
    })

    // 5.手指离开，根据移动距离去判断是回弹还是，播放上下一张
    ul.addEventListener('touchend', function (e) {
        // (1)如果移动距离大于50像素，我们就播放上一张或者是下一张。
        if (Math.abs(moveX) > 50) {
            // 如果是右滑就是 播放上一张 moveX 是正值
            if (moveX > 0) {
                index--;
            } else {
                // 如果是左滑就是 播放下一张 moveX 是负值
                index++;
            }
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else {
            // (2) 如果移动距离小于50像素我们就回弹
            var translatex = -index * w;
            ul.style.transition = 'all .1s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 手指离开的时候就重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';          //加过渡效果
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, [2000]);
    });

    // 最后一个模块：当我们滚动到一定位置时，出现一个图标点击，回到页面最上方。
    var goback = document.querySelector('.goback');
    var nav_items = document.querySelector('.nav-items');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav_items.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
        goback.addEventListener('click',function(){
            window.scroll(0,0)
        })
    });
});


