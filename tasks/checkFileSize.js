/*
 * grunt-checkFileSize
 * https://github.com/danyal14/grunt-check-filesize-plugin
 *
 * Copyright (c) 2016 Danyal Ali Butt
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  function dumpDebugInformation(options) {
    if (options.debug !== undefined) {
      grunt.log.writeflags(options, 'Options');
    }
  }

  function verifyFolderExists(folderPath) {
    if (folderPath === "" || folderPath === undefined) {
      grunt.fail.fatal("The provided folderToScan was empty or not provided");
    }
    if (!grunt.file.exists(folderPath)) {
      grunt.fail.fatal("The provided folderToScan was not found");
    }
    if (!grunt.file.isDir(folderPath)) {
      grunt.fail.fatal("The provided folderToScan was not a folder");
    }
  }

  function checkFileSizes(options) {
    grunt.file.recurse(options.folderToScan, function(abspath, rootdir, subdir, filename) {
        if (grunt.file.isFile(abspath)) {
          var stats = fs.statSync(abspath);
          var asBytes = stats.size / 1024;
          grunt.log.writeln("Found file %s with size of %s kb", filename, asBytes);
        }
    });
  }

  grunt.registerTask('checkFileSize', 'The best Grunt plugin ever.', function() {
    var options = this.options({
      folderToScan : './tasks',
      debug: false
    });

    // debug
    dumpDebugInformation(options);
    // validation
    verifyFolderExists(options.folderToScan);
    // action
    checkFileSizes(options);

  });

};
