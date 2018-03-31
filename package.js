
Package.describe({
  name: "keplerjs:googlemaps",
  summary: "Keplerjs Goole Maps API",
  version: "1.2.5",
  git: "https://github.com/Keplerjs/keplerjs-googlemaps.git"
});

Npm.depends({
  "googlemaps": "0.1.9",
});

Package.onUse(function (api) {

  api.versionsFrom("1.5.1");

  api.use([
    'keplerjs:core@1.2.5',
  ]);

  api.addFiles([
    'plugin.js',
    'i18n/it.js',
    'i18n/en.js',
    'i18n/de.js',
    'i18n/es.js',
    'i18n/fr.js',
  ]);

  api.addFiles([
  	'client/Place_streetview.js',
    'client/views/panels.html',
    'client/views/panels.js',
  ],'client');

  api.addFiles([
    'server/Googlemaps.js',
    'server/streetview.js',
  ],'server');

});
