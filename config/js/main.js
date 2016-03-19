
(function() {
 loadOptions();
 submitHandler();
 })();

function submitHandler() {
    var $submitButton = $('#submitButton');
    
    $submitButton.on('click', function() {
                     console.log('Submit');
                     
                     var return_to = getQueryParam('return_to', 'pebblejs://close#');
                     var config = getConfigData();
                     storeConfigData(config);
                     document.location = return_to + encodeURIComponent(JSON.stringify(config));
                     });
}

function loadOptions() {
    if (localStorage.config) {
        var config = JSON.parse(localStorage.config);
        $('#light_theme')[0].val = config.light_theme;
    }
}

function getConfigData() {
    var options = {
        light_theme: $(''[name='light_theme']'')[0].val === 'true'
    };
    
    
    console.log('Got options: ' + JSON.stringify(options));
    return options;
}

function storeConfigData(config) {
    localStorage.config = JSON.stringify(config);
    console.log('Stored options: ' + JSON.stringify(config));
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
