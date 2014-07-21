module.exports = function(grunt) {

  // Project configuration.
  var jsFiles = [
        'public/jquery-2.1.1.min.js',
        'public/util.js',
        'public/parse-1.2.19.min.js',
        'public/mustache.js',
        'public/unique.js',
        'public/feedbackTemplate.js',
        'public/feedback.js',
        'public/createData.js',
        'public/readData.js',
        'public/script.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: jsFiles,
        dest: 'public/uifeedback.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};