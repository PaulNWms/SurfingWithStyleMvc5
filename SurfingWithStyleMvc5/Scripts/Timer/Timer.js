var Timer;
(function (Timer) {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
    var TimerState;
    (function (TimerState) {
        TimerState[TimerState["stopped"] = 0] = "stopped";
        TimerState[TimerState["running"] = 1] = "running";
        TimerState[TimerState["paused"] = 2] = "paused";
    })(TimerState || (TimerState = {}));
    ;
    var timerStatus = TimerState.stopped;
    var timer;
    var timeLeft = 0;
    var body = $("body");
    var timerDisplay = $(".timer-display");
    var durationMinutes = $(".duration-minutes");
    var start = $(".timer-start");
    var audio = $("audio")[0];
    $(document).ready(function () {
        var start = $(".timer-start");
        start.removeAttr("disabled");
        timer = createTimer(timerCallback);
        start.click(function () {
            var minutes = durationMinutes.val();
            var duration = "PT".concat(minutes).concat("M");
            setTimer(duration);
        });
        $(".oneMin").click(function () { return usePreset("1-minute-timer", "1"); });
        $(".twoMin").click(function () { return usePreset("2-minute-timer", "2"); });
        $(".eggTimer").click(function () { return usePreset("egg-timer", "3"); });
        $(".fiveMin").click(function () { return usePreset("5-minute-timer", "5"); });
        $(".tenMin").click(function () { return usePreset("10-minute-timer", "10"); });
        $(".fifteenMin").click(function () { return usePreset("15-minute-timer", "15"); });
        $(".twentyMin").click(function () { return usePreset("20-minute-timer", "20"); });
        $(".tomatoTimer").click(function () { return usePreset("tomato-timer", "25"); });
        $(".thirtyMin").click(function () { return usePreset("30-minute-timer", "30"); });
        $(".fortyFiveMin").click(function () { return usePreset("45-minute-timer", "45"); });
        $(".oneHour").click(function () { return usePreset("1-hour-timer", "1:00"); });
    });
    Date.prototype["format"] = function (format) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };
    function timerCallback() {
        timeLeft--;
        if (timeLeft > 0) {
            var timeSpan = (new Date(0, 0, 0, 0, 0, timeLeft, 0));
            if (timeLeft >= 3600) {
                document.title = "Timer - " + timeSpan.format("h:mm:ss");
                timerDisplay.html(timeSpan.format("h:mm:ss"));
            }
            else {
                document.title = "Timer - " + timeSpan.format("mm:ss");
                timerDisplay.html(timeSpan.format("m:ss"));
            }
        }
        else {
            timerExpired();
        }
    }
    function timerExpired() {
        timerDisplay.html("0:00");
        body.css({ "background-color": "#001912", "color": "#009871" });
        audio.play();
        updateButton(TimerState.stopped);
        timer.stop();
    }
    function setTimer(duration) {
        switch (timerStatus) {
            case TimerState.stopped:
                if (duration !== undefined && duration !== null) {
                    var hmsRegex = /^P((\d+)D)?T((\d+)H)?((\d+)M)?((\d+)S)?$/gim;
                    duration.match(hmsRegex);
                    if (RegExp.lastMatch !== "") {
                        timeLeft = (24 * 60 * 60 * (+RegExp.$2) + 60 * 60 * (+RegExp.$4) + 60 * (+RegExp.$6) + (+RegExp.$8));
                        body.css({ "background-color": "", "color": "" });
                        updateButton(TimerState.running);
                        timer.play();
                    }
                }
                break;
            case TimerState.running:
                updateButton(TimerState.paused);
                timer.pause();
                break;
            case TimerState.paused:
                updateButton(TimerState.running);
                timer.play();
                break;
        }
    }
    function updateButton(state) {
        timerStatus = state;
        switch (timerStatus) {
            case TimerState.stopped:
            case TimerState.paused:
                start.html('<span class="glyphicon glyphicon-play" />');
                break;
            case TimerState.running:
                start.html('<span class="glyphicon glyphicon-pause" />');
                break;
        }
    }
    function usePreset(url, minutes) {
        window.history.pushState("", "", url);
        timerDisplay.html(minutes + ":00");
        durationMinutes.val(minutes);
    }
})(Timer || (Timer = {}));
//# sourceMappingURL=Timer.js.map