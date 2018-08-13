module Timer {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
    }

    enum TimerState { stopped, running, paused };

    let timerStatus = TimerState.stopped;
    let timer;
    let timeLeft = 0;

    let body = $("body");
    let timerDisplay = $(".timer-display");
    let durationMinutes = $(".duration-minutes");
    let start = $(".timer-start")
    let audio = <HTMLMediaElement>$("audio")[0];

    declare function createTimer(callback);
    declare function myRedraw(element);

    interface IMyDate extends Date {
        format(format: string): string;
    }

    $(document).ready(() => {
        let start = $(".timer-start");
        start.removeAttr("disabled");
        timer = createTimer(timerCallback);
        start.click(() => {
            let minutes = durationMinutes.val();
            let duration = "PT".concat(minutes).concat("M");
            setTimer(duration);
        });
        $(".oneMin").click(() => usePreset("1-minute-timer", "1"));
        $(".twoMin").click(() => usePreset("2-minute-timer", "2"));
        $(".eggTimer").click(() => usePreset("egg-timer", "3"));
        $(".fiveMin").click(() => usePreset("5-minute-timer", "5"));
        $(".tenMin").click(() => usePreset("10-minute-timer", "10"));
        $(".fifteenMin").click(() => usePreset("15-minute-timer", "15"));
        $(".twentyMin").click(() => usePreset("20-minute-timer", "20"));
        $(".tomatoTimer").click(() => usePreset("tomato-timer", "25"));
        $(".thirtyMin").click(() => usePreset("30-minute-timer", "30"));
        $(".fortyFiveMin").click(() => usePreset("45-minute-timer", "45"));
        $(".oneHour").click(() => usePreset("1-hour-timer", "1:00"));
    });

    Date.prototype["format"] = function (format) {
        let o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
            "S": this.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }

    function timerCallback() {
        timeLeft--;
        if (timeLeft > 0) {
            let timeSpan = <IMyDate>(new Date(0, 0, 0, 0, 0, timeLeft, 0));
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
        timer.stop()
    }

    function setTimer(duration) {
        switch (timerStatus) {
            case TimerState.stopped:
                if (duration !== undefined && duration !== null) {
                    let hmsRegex = /^P((\d+)D)?T((\d+)H)?((\d+)M)?((\d+)S)?$/gim
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

    function updateButton(state: TimerState) {
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

    function usePreset(url: string, minutes: string) {
        window.history.pushState("", "", url);
        timerDisplay.html(minutes + ":00");
        durationMinutes.val(minutes);
    }
}