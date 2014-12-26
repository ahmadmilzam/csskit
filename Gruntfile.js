module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options:{
        loadPath: 'scss/'
      },
      dev:{
        options: {
          style: 'expanded'
        },
        files: {
          'css/app.css': 'scss/app.scss',
          'css/style.css': 'css/style.scss',
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
        },
        files: {
          'css/app.css': 'scss/app.scss',
          'css/style.css': 'css/style.scss',
        }
      }
    },

    // Auto Prefixer
    autoprefixer: {
      dist: {
        options: {
          browsers: [
            'last 2 versions',
            '> 1%',
            'ie 9'
          ],
          map: false
        },
        files: {
          'css/app.css': ['css/app.css']
        }
      }
    },

    // Minify CSS
    cssmin: {
      combine: {
        files: {
          'css/app.min.css': ['css/app.css']
        },
      },
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: [
          'scss/**/*.scss',
          'css/**/*.scss'
        ],
        tasks: ['development-task']
      }
    }
  });

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
      'autoprefixer:dist',
      'cssmin:combine'
    ]
  );

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);

}