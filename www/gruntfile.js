module.exports = function (grunt) {
	'use strict';
	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'stylesheets/screen.css': 'sass/screen.scss',
				}
			}
		},
		watch: {
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			scripts: {
				files: ['js/**/*.js']
			},
		},
		autoprefixer: {
            dist: {
                files: {
                    'stylesheets/screen.css': 'stylesheets/screen.css'
                }
            }
        },	
		cssmin: {
			release: {
				files: {
                    'stylesheets/screen.css': 'stylesheets/screen.css'
				}
			}
		}
	 });
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('styles', ['sass', 'autoprefixer']);
	grunt.registerTask('prod', ['sass', 'autoprefixer']);
	grunt.registerTask('release', ['cssmin']);
	grunt.registerTask('default', ['watch']);
};