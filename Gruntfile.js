module.exports = function(grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('load-grunt-tasks')(grunt);

  /**
   * CSSKit Grunt config
   */
  grunt.initConfig({

    /**
     * Read package.json file
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set project info
     */
    project: {
      bower: 'libs',
      src: 'src',
      app: 'app',
      docs: 'docs',
      assets: 'assets',
      css: {
        main: [
          '<%= project.src %>/scss/sample.scss'
        ],
        docs: [
          '<%= project.docs %>/<%= project.src %>/scss/docs.scss'
        ]
      }
    },

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
              ' */\n'
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      options: {
        loadPath: 'src/scss/',
        banner: '<%= tag.banner %>',
        style: 'nested'
      },
      dev: {
        options: {
          banner: '<%= tag.banner %>',
        },
        files: {
          '<%= project.app %>/<%= project.assets %>/css/app.css' : '<%= project.css.main %>',
          '<%= project.docs %>/<%= project.assets %>/css/docs.css' : '<%= project.css.docs %>',
        }
      },
      dist: {
        options: {
          sourcemap: 'none',
          banner: ' ',
        },
        files: {
          '<%= project.app %>/<%= project.assets %>/css/app.css' : '<%= project.css.main %>',
          '<%= project.docs %>/<%= project.assets %>/css/docs.css' : '<%= project.css.docs %>',
        }
      }
    },

    /**
     * Parse CSS and add vendor-prefixed CSS properties
     * using the Can I Use database.
     * Based on Autoprefixer.
     * https://github.com/nDmitry/grunt-autoprefixer
     */
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
          '<%= project.app %>/<%= project.assets %>/css/app.prefixed.css' : ['<%= project.app %>/<%= project.assets %>/css/app.css'],
          '<%= project.docs %>/<%= project.assets %>/css/docs.prefixed.css' : ['<%= project.docs %>/<%= project.assets %>/css/docs.css']
        }
      }
    },

    /**
     * Runs tasks minify the script after prefixed with autoprefixer
     * https://github.com/gruntjs/grunt-contrib-cssmin
     */
    cssmin: {
      options:{
        report: 'gzip'
      },
      target: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/<%= project.assets %>/css',
          src: ['*.prefixed.css', '!*.min.css'],
          dest: '<%= project.app %>/<%= project.assets %>/css',
          ext: '.min.css'
        },{
          '<%= project.docs %>/<%= project.assets %>/css/docs.css' : ['<%= project.docs %>/<%= project.assets %>/css/docs.prefixed.css']
        }]
      },
    },

    /**
     * Concatenate files.
     * https://github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        banner: '<%= tag.banner %>'
      },
      target: {
        src: [
          // required library script
          '<%= project.bower %>/classie/classie.js',
          // my script
          '<%= project.docs %>/<%= project.src %>/js/topbar.js',
        ],
        dest: '<%= project.docs %>/<%= project.assets %>/js/docs.js'
      }
    },

    /**
     * Minify files with UglifyJS.
     * https://github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {
      options: {
        mangle: true,
        compress: true,
        report: 'gzip'
      },
      target: {
        files: {
          '<%= project.docs %>/<%= project.assets %>/js/docs.js':['<%= project.docs %>/<%= project.assets %>/js/docs.js']
        }
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass:dev', 'concat:target']
      },
      sass: {
        files: [
          '<%= project.src %>/scss/**/*.{scss, sass}',
          '<%= project.docs %>/<%= project.src %>/scss/**/*.{scss, sass}'
        ],
        tasks: ['sass:dev']
      },
      js: {
        files: [
          '<%= project.docs %>/<%= project.src %>/js/**/*.js'
        ],
        tasks: ['concat:target']
      }
    }
  });


  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'concat:target',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:dist',
    'autoprefixer:dist',
    'cssmin:target',
    'concat:target',
    'uglify:target'
  ]);

}