module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options:{
        require: 'susy',
        loadPath: [
          'libs',
          'kits/scss'
        ]
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/css/app.min.css': 'src/scss/app.scss',
        }
      },
      dev:{
        options: {
          style: 'nested'
        },
        files: {
          'dist/css/app.css': 'src/scss/app.scss',
        }
      }
    },

    // concat: {
    //   options: {
    //     banner: '\n'
    //   },
    //   vendor: {
    //     src: [
    //       // required library script
    //       'src/js/libs/jquery.min.js',
    //       'src/js/libs/velocity.js',
    //       'libs/foundation/js/foundation/foundation.js',
    //       'libs/foundation/js/foundation/foundation.abide.js',
    //       'libs/foundation/js/foundation/foundation.interchange.js',
    //       'libs/fastclick/lib/fastclick.js',

    //       'src/js/libs/wow.js',
    //       'src/js/libs/carousel.js',
    //       'src/js/libs/clearform.js',

    //       // my script
    //       'src/js/app.js'
    //     ],
    //     dest: 'js/app.js'
    //   }
    // },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['development-task']
      },
      sass: {
        files: [
          'kits/scss/**/*.scss',
          'src/scss/**/*.scss'
        ],
        tasks: ['development-task']
      }
      // js: {
      //   files: [
      //     'kits/js/**/*.js',
      //     'src/js/**/*.js'
      //   ],
      //   tasks: ['development-task']
      // }
    },

    // uglify: {
    //   options: {
    //     mangle: true,
    //     compress: true,
    //     report: 'gzip'
    //   },
    //   target: {
    //     files: {
    //       'js/app.min.js':['js/app.js']
    //     }
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask(
    'development-task',
    [
      'sass:dev'
      // 'concat:vendor'
    ]
  );

  grunt.registerTask(
    'production-task',
    [
      'sass:dist'
      // 'concat:vendor',
      // 'uglify'
    ]
  );

  grunt.registerTask('build', ['production-task']);
  grunt.registerTask('default', ['development-task','watch']);

}