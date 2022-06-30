(function () {
    // Poll for jQuery to come into existance
    var checkReady = function (callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function () { checkReady(callback); }, 20);
        }
    };
    if (window.jQuery) {
        checkReady(function ($) {
            $(function () {
                let allLoads = document.querySelectorAll('load')
                allLoads.forEach((elem) => {
                    let url = elem.getAttribute('from')
                    $(elem).parent(elem).load(url)
                })
            });
        });
    }
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);
    // Start polling...
    checkReady(function ($) {
        $(function () {
            let allLoads = document.querySelectorAll('load')
            allLoads.forEach(async (elem) => {
                let url = elem.getAttribute('from')
                let html = await $.get(url)
                let div = $('<div></div>')
                div.html(html)
                $(elem).parent(elem).append(div)
            })
        });
    });
})();