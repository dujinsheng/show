window.addEventListener('load',function(){
    // 先做第一步：鼠标经过小图片盒子，黄色的遮挡层与大图片盒子显示出来，离开隐藏两个盒子的功能
    var product = document.querySelector('.product');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    
    // 先封装函数，里面写鼠标移动到product盒子时的事件处理程序。
    function move () {
        mask.style.display = 'block';
        big.style.display = 'block';
    }
    // 注册事件当鼠标移动到product上时，调用事件处理程序。
    product.addEventListener('mouseover',move);










    // 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    product.addEventListener('mousemove',function(e){
        // 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop; 
        // 让盒子的定位left与top的值分别等于鼠标在盒子内的坐标，然后再将left与top值分别减去盒子高度和宽度的一半
        var maskx =  x - mask.offsetWidth / 2 ;
        var masky = y - mask.offsetHeight / 2;
        // 加上限制条件，将mask这个黄色遮罩盒子限制在product这个大盒子里面。
        if (maskx <= 0) {
            maskx = 0;
        } else if(maskx >= product.offsetWidth - mask.offsetWidth) {      // product.offsetWidth - mask.offsetWidth = 100;  这是遮罩层横轴最大移动距离
            maskx = 100;
        }                                   //注意：重点是，黄色的遮罩盒子的位置是取决于，盒子的left值与top值的。
        if(masky <= 0) {
            masky = 0;
        } else if(masky >= product.offsetHeight - mask.offsetHeight) {       //product.offsetHeight - mask.offsetHeight = 100   这是遮罩层横轴最大移动距离
            masky = 100;
        }
        mask.style.left = maskx + 'px';
        mask.style.top =  masky + 'px';
        

        // 遮罩层移动的时候，让旁边的盒子里的图也跟着移动起来。
        
        var b = document.querySelector('.b');     //获取旁边盒子里大图片元素
        var bMax = b.offsetWidth - big.offsetWidth;    //大图的最大移动距离为 = 大图的实际宽度 - 装着大图的盒子的宽度；

        // 以下两个是大图片的移动距离X与Y                // 大图片的移动距离 = 遮罩层移动距离*大图片最大移动距离 / 遮罩层的最大移动距离
        var bx = maskx * bMax / (product.offsetWidth - mask.offsetWidth);
        var by = masky * bMax / (product.offsetHeight - mask.offsetHeight);
        b.style.left = -bx + 'px';                  //由于遮罩层的移动与旁边大盒子里的图片的移动，方向是相反的，所以，因该在大盒子图片的left与top值前面加负号
        b.style.top = -by + 'px';
    })


















    // 封装函数，鼠标离开product上时，的事件处理程序
    function over () {
        mask.style.display = 'none';
        big.style.display = 'none';
    }
    // 注册事件当鼠标离开product盒子时，调用事件处理程序。
    product.addEventListener('mouseout',over)
})




