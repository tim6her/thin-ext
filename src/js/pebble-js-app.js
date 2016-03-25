var VERSION = "1.0";

Pebble.addEventListener('ready', function(e) {
  console.log('PebbleKit JS ready! Version: ' + VERSION);
});

Pebble.addEventListener('showConfiguration', function(e) {
  // Pebble.openURL('https://rawgit.com/silasg/thin-ext/master/config/thin-ext-config.html?version=' + VERSION);
  Pebble.openURL('https://cdn.rawgit.com/silasg/thin-ext/master/config/thin-ext-config.html?version=' + VERSION);
});

Pebble.addEventListener('webviewclosed', function(e) {
  var json = JSON.parse(decodeURIComponent(e.response));

  var options = {
    "PERSIST_KEY_DATE": '' + json.date,
    "PERSIST_KEY_DAY": '' + json.day,
    "PERSIST_KEY_BT": '' + json.bluetooth,
    "PERSIST_KEY_BATTERY": '' + json.battery,
    "PERSIST_KEY_SECOND_HAND": '' + json.second_hand,
    "PERSIST_KEY_SECOND_BATTERY": '' + json.second_battery,
    "PERSIST_KEY_SECOND_NIGHT": '' + json.second_night,
    "PERSIST_KEY_NO_MARKERS": '' + json.no_markers,
    "PERSIST_KEY_LIGHT_THEME": '' + json.light_theme
  };

  Pebble.sendAppMessage(options, function(e) {
    console.log('Settings update successful!');
  }, function(e) {
    console.log('Settings update failed: ' + JSON.stringify(e));
  });
}); 