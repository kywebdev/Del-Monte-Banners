/* global TimelineMax, SlowMo, EB, EBG */

// Broadcast Events shim
// ====================================================================================================
(function () {
    if (typeof window.CustomEvent === 'function') { return false; }

    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();

// Timeline
// ====================================================================================================
var timeline = (function MasterTimeline() {

    var tl;
    var win = window;

    function doClickTag() { window.open(window.clickTag); }

    function initTimeline() {
        document.querySelector('#ad .banner').style.display = 'block';
        document.querySelector('#ad .content').style.display = 'block';
        document.getElementById('ad').addEventListener('click', doClickTag);
        createTimeline();
    }

    function createTimeline() {
        tl = new TimelineMax({ delay: 0, onStart: updateStart, onComplete: updateComplete, onUpdate: updateStats });
        // ---------------------------------------------------------------------------

        tl.add('copyright', '+=0.0')
            .to('#copyright', 0.25, { opacity: 1, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'copyright');

        tl.add('frame1', '+=0.0')
            .to('#logo', 0.65, { left: "22px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame1')
            .to('#frame1', 0.5, { top: "10px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame1+=0.5')
            .to('#frame1', 0.1, { top: 0, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame1+=1.0');

        tl.add('green', '+=1.4')
            .to('#green', 0.5, { top: 0, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'green');

        tl.add('frame2', '+=0.0')
            .to('#frame1', 0.1, { opacity: 0, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2')
            .to('#frame2', 0.4, { top: "39px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2')
            .to('#frame2', 0.1, { top: "29px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2+=0.4')
            .to('#headshot', 0.4, { left: "421px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2+=0.4')
            .to('#headshot', 0.1, { left: "431px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2+=0.8')
            .to('#tag', 0.4, { left: "564px", opacity: 1, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2+=0.9')
            .to('#tag', 0.1, { left: "574px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame2+=1.3');

        tl.add('green', '+=1.5')
            .to('#green', 0.5, { top: "-90px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'green')
            .to('#tag', 1.0, { left: "728px", ease: "cubic-bezier(0.64, 0.04, 0.35, 1)" }, 'green+=0.4')
            .to('#headshot', 1.0, { left: "728px", ease: "cubic-bezier(0.64, 0.04, 0.35, 1)" }, 'green+=0.6');

        tl.add('frame3', '+=0.0')
            .to('#frame2', 0.1, { opacity: 0, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame3')
            .to('#frame3', 0.4, { top: "39px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame3')
            .to('#frame3', 0.1, { top: "29px", ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame3+=0.4')
            .to('#button', 0.4, { opacity: 1, ease: "cubic-bezier(0.23, 1.25, 0.46, 1)" }, 'frame3+=1.2');
    }

    function updateStart() {
        var start = new CustomEvent('start', {
            'detail': { 'hasStarted': true }
        });
        win.dispatchEvent(start);
    }

    function updateComplete() {
        var complete = new CustomEvent('complete', {
            'detail': { 'hasStopped': true }
        });
        win.dispatchEvent(complete);
    }

    function updateStats() {
        var statistics = new CustomEvent('stats', {
            'detail': {
                'totalTime': tl.totalTime(), 'totalProgress': tl.totalProgress(), 'totalDuration': tl.totalDuration()
            }
        });
        win.dispatchEvent(statistics);
    }

    function getTimeline() {
        return tl;
    }

    return {
        init: initTimeline,
        get: getTimeline
    };

})();

if (Enabler.isInitialized()) {
    init();
}
else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
}

function init() {
    if (Enabler.isPageLoaded()) {
        startAd();
    }
    else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, startAd);
    }
}

function startAd() {
    document.getElementById('clickthrough-button').addEventListener('click', bgExitHandler, false);
    timeline.init();
}

var bgExitHandler = function () {
    Enabler.exit('HTML5_Background_Clickthrough');
};


(function () {
    var iterations = 1;

})();