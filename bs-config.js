/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
  ui: false,
  files: ["**/*.css", "**/*.pug", "**/*.js"],
  watchEvents: ["change"],
  watch: false,
  ignore: ["node-modules"],
  proxy: "localhost:8886",
  port: 8886,

  reloadDelay: 10,
  notify: false,
};
