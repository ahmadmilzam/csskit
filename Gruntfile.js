module.exports = function(grunt) {

  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
      src: 'src',
      app: 'app',
      docs: 'docs',
      assets: 'assets',
      css: {
        main: [
          '<%= project.src %>/scss/app.scss'
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
      compile:{
        options: {
          loadPath: 'src/scss/',
          banner: '<%= tag.banner %>',
          style: 'nested'
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
          '<%= project.docs %>/<%= project.assets %>/css/docs.min.css' : ['<%= project.docs %>/<%= project.assets %>/css/docs.prefixed.css']
        }]
      },
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Watching development files and run concat/compile tasks
     */
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass:compile']
      },
      sass: {
        files: [
          '<%= project.src %>/scss/**/*.{scss, sass}',
          '<%= project.docs %>/<%= project.src %>/scss/**/*.{scss, sass}'
        ],
        tasks: ['sass:compile']
      }
    }
  });


  /**
   * Default task
   * Run `grunt` on the command line
   */
  grunt.registerTask('default', [
    'sass:compile',
    'watch'
  ]);

  /**
   * Build task
   * Run `grunt build` on the command line
   * Then compress all JS/CSS files
   */
  grunt.registerTask('build', [
    'sass:compile',
    'autoprefixer:dist',
    'cssmin:target'
  ]);

}