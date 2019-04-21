var imm = true

function debounce(func, wait) {
    var timeout
    var debounced = function () {
        var context = this;			//保存this，否则在回调函数中访问的将会是window
        var args = arguments;　　//获取事件对象
        if (imm) {
            func.apply(context, args)
            imm = false
        }
        if (timeout) clearTimeout(timeout);　　//只要没有停止触发实践，就会不断清除定时器
        timeout = setTimeout(function(){
            func.apply(context, args)　　//调用回调函数，并改变this指向，传入事件对象
        }, wait);
    };

    return debounced;
}

export default debounce