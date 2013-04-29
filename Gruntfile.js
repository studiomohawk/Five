module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    stylus: {
      compile: {
        options: {
          paths: ['asset/style','node_modules/grunt-contrib-stylus/node_modules'],
          compress: false,
          urlfunc: 'embedurl'
        },
        files: {
          'asset/style/master.css': 'asset/style/master.styl'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site/',
          keepalive: true
        }
      }
    },
    copy: {
      css : {
        files: {
          // Copy the stylus-generated style file to
          // the _site/ folder
          '_site/asset/style/master.css': 'asset/style/master.css'
        }
      }
    },
    shell: {
      jekyll: {
        command: 'rm -rf _site/*; jekyll',
        stdout: true
      }
    },
    watch: {
      css: {
        files: ['asset/style/**/*.styl'],
        tasks: ['stylus']
      },
      jekyllSources: {
        files: [
          // capture all except css - add your own
          '*.html', '*.yml', 'asset/script/**.js',
          '_posts/**', '_includes/**'
        ],
        tasks: ['shell:jekyll']
      }
    },
    parallel: {
      assets: {
        grunt: true,
        tasks: ['watch:css', 'watch:jekyllSources']
      }
    }
  });

  // Load plugin
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-parallel');

  // Default task
  grunt.registerTask('default', ['parallel']);
  // CSS Build task
  grunt.registerTask('cssbuild', ['stylus','csso']);
};
