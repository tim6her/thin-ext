
(function() {
 loadOptions();
 submitHandler();
 getAppVersionAndNews();
 })();

function submitHandler() {
    var $submitButton = $('#submitButton');
    
    $submitButton.on('click', function() {
                     console.log('Submit');
                     
                     var return_to = getQueryParam('return_to', 'pebblejs://close#');
                     var config = getConfigData();
                     var configString = JSON.stringify(config);
                     storeConfigData(configString);
                     console.log('Updated config: ' + configString);
                     document.location = return_to + encodeURIComponent(configString);
                     });
}

function loadOptions() {
    if (localStorage.config) {
        var config = JSON.parse(localStorage.config);
        $('[name="light_theme"]').removeClass("active");
        $('[name="light_theme"][value="' + config.light_theme + '"]').addClass("active");
        $('#second_hand')[0].checked = config.second_hand;
        $('#second_night')[0].checked = config.second_night;
        $('#second_battery')[0].checked = config.second_battery;
        $('#date')[0].checked = config.date;
        $('#day')[0].checked = config.day;
        $('#bluetooth')[0].checked = config.bluetooth;
        $('#battery')[0].checked = config.battery;
    }
}

function getConfigData() {
    var options = {
        light_theme: $('[name="light_theme"].active')[0].attributes.value.value === 'true',
        second_hand: $('#second_hand')[0].checked,
        second_night: $('#second_night')[0].checked,
        second_battery: $('#second_battery')[0].checked,
        date: $('#date')[0].checked,
        bluetooth: $('#bluetooth')[0].checked,
        day: $('#day')[0].checked,
        battery: $('#battery')[0].checked
    };
    
    return options;
}

function storeConfigData(configString) {
    localStorage.config = configString;
}

function getQueryParam(variable, defaultValue) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue || false;
}

function ajax(url, type, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        callback(this.responseText);
    };
    xhr.open(type, url);
    xhr.send();
};

function getAppVersionAndNews() {
    ajax(
         'https://rawgit.com/silasg/thin-ext/latest-release/config/app_versions.json',
         'GET',
         function(responseText) {
         var json = JSON.parse(responseText);
         $('#latest_version')[0].innerHTML = '' + json.thin_ext;
         $('#latest_news')[0].innerHTML = '' + json.thin_ext_news;
         }
         );
    
    var version = getQueryParam('version', 'unknown');
    if(version === 'unknown') {
        $('#current_version')[0].innerHTML = 'Error determining version. Running in the emulator?';
    } else {
        $('#current_version')[0].innerHTML = '' + version;
    }
}
