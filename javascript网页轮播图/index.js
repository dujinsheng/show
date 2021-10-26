// 功能需求：
// 1.鼠标经过轮播图模块，左右按钮显示，离开隐藏左右按钮
// 2.点击左侧按钮一次，图片往左播放一张，以此类推，左侧按钮同理
// 3.图片播放的同时，下面小圆圈模块跟随一起变化
// 4.点击小圆圈，可以播放相应图片
// 5.鼠标不经过轮播图，轮播图也会自动播放图片
// 6.鼠标经过轮播图模块，自动播放停止

// 功能1制作：
window.addEventListener('load', function () {
    var linkLeft = document.querySelector('.link-left');
    var linkRight = this.document.querySelector('.link-right');
    var box = document.querySelector('.box');
    console.log(linkLeft);
    console.log(linkRight);
    box.addEventListener('mouseenter', function () {
        linkLeft.style.display = 'block';
        linkRight.style.display = 'block';
        clearInterval(timer);                                 //最后一个功能之当鼠标移动到box时清除定时器功能
        timer = null;                                         //清除定时器变量
    })
    box.addEventListener('mouseleave', function () {
        linkLeft.style.display = 'none';
        linkRight.style.display = 'none';
        timer = setInterval(function () {                     //最后一个功能之当鼠标离开box时启动定时器功能。
            // 手动调用事件
            linkRight.click();
        }, [2000]);

    })

    // 动态生成小圆圈，有几张图片，就生成几个小圆圈
    var ul = box.querySelector('ul');
    var ol = box.querySelector('ol');                    //获取box的宽度 
    var boxWidth = box.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li

        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);                      //使用自定属性，给每个创建的小li添加索引号
        // 我们直接在创建li的时候，将点击事件写入进去
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 滚动图片的核心算法是：点击某个小圆圈，就让图片滚动，小圆圈的索引号乘以图片的宽度作为ul的移动距离。(记录当前圆圈的索引号，这个使用自定义属性来做)
            var index = this.getAttribute('index');                  //获取自定义属性

            num = index;                      //当我们点击了，ol里的某个li时，就要把这个li的索引号给num
            circle = index;                   //当我们点击了，ol里的某个li时，就要把这个li的索引号给circle.

            animate(ul, -index * boxWidth);
        })
        ol.children[0].className = 'current';
    }

    // 制作右侧按钮的操作功能
    var first = ul.children[0].cloneNode(true);             //克隆ul里面的第一张图片
    ul.appendChild(first);                                  //，并且将其放到ul的最后面。
    var num = 0;
    var circle = 0;
    var flag = true;             //用于做节流阀
    linkRight.addEventListener('click', function () {
        if (flag) {
            flag = false
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * boxWidth, function () {
                flag = true; // 打开节流阀
            });
            // 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 先使用排它思想，清除所有小圆圈的current样式。
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';                                            //在此处解决了，ul里的li与ol里的li同步变化
            }
            ol.children[circle].className = 'current';
        }

    })

    // 制作左侧按钮的功能
    linkLeft.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果往左走到了，第一张图片，此时，我们的ul要快速到达（定位），left改为box.offsetWidth*4
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -boxWidth * (ul.children.length - 1) + 'px';               //因为前面写的是0,所以不用加px
            }
            num--;
            animate(ul, -num * boxWidth,function(){
                flag = true;
            });
            // 让小圆圈跟着图一起变化
            circle--;
            //  如果circle < 0,说明是ul里面最后克隆的一个，此时小圆圈要对应第四个。
            if (circle < 0) {
                circle = ol.children.length - 1;         //注意这里circle是后面要用的索引号。
            }
            // 先使用排它思想，清除所有小圆圈的current样式。
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';                                            //在此处解决了，ul里的li与ol里的li同步变化
            }
            ol.children[circle].className = 'current';
        }
    })


    // 最后一个功能：自动播放功能：            将开启定时器与清除定时器可以放在第一个功能里面（鼠标移动与离开box盒子时linkRight与linkLeft的显示与隐藏）
    var timer = setInterval(function () {
        // 手动调用事件
        linkRight.click();
    }, [2000])
})