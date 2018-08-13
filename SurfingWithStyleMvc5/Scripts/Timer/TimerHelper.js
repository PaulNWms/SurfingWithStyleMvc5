$.fn.redraw = function () {
    $(this).each(function () {
        var redraw = this.offsetHeight;
    });
    return $(this);
};

function myRedraw(element) {
    element.redraw();
}

function createTimer(callback) {
    var timer = $.timer(function () {
        callback();
    });
    timer.set({ time: 1000, autostart: false });
    return timer;
}
