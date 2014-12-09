module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options:{
      },
      dev:{
        options: {
          style: 'expanded'
        },
        files: {
          'css/app.css': 'scss/app.scss',
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/app.min.css': 'scss/app.scss',
        }
      }
    },

    autoprefixer: {
      dist: {
        options: {
          browsers: [
            'last 2 versions',
            'ie 9'
          ],
          map: false
        },
        src: 'dist/css/app.min.css',
        dest: 'dist/css/app.min.css'
      },
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: [
          'scss/**/*.scss'
        ],
        tasks: ['development-task']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask(
    'development-task',
    [
      'sass:dev'
    ]
  );

  grunt.registerTask(
    'production-task',
    [
      'sass:dist',
      'autoprefixer:dist'
    ]
  );

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);

}