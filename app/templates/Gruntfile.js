module.exports = function(grunt){
	
	// Load Grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({
		filepaths: {
			filebase: '',
			test: 'test',
			dist: 'example'
		},
		
		watch: {
			karma: {
				files: ['<%= filepaths.filebase %>.js', '<%= filepaths.test %>/{,**/}*.js'],
				tasks: ['karma:unit']
			}
		},

		bump: {
			options: {
				commitMessage: 'chore: release v%VERSION%',
				commitFiles: ['package.json', 'bower.json', '<%= filepaths.filebase %>.min.js'],
				files: ['package.json', 'bower.json'],
				pushTo: 'origin'
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			},
		},

		jshint: {
			all: ['Gruntfile.js', '<%= filepaths.filebase %>.js', 'test/<%= filepaths.filebase %>.spec.js']
		},

		ngmin: {
			dist: {
				files: {
					'<%= filepaths.filebase %>.min.js': ['<%= filepaths.filebase %>.js']
				}
			}
		},

		'npm-contributors': {
			options: {
				commitMessage: 'chore: update contributors'
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'<%= filepaths.filebase %>.min.js': ['<%= filepaths.filebase %>.min.js']
				}
			}
		},
		
		copy: {
			example: {
				src: ['<%= filepaths.filebase %>.js', '<%= filepaths.filebase %>.css'],
				dest: 'example/',
			}
		}
		
	});
	
	grunt.registerTask('test', [
		'jshint:all',
		'karma:unit'
	]);
	
	grunt.registerTask('build', [
		'jshint:all',
		'ngmin',
		'uglify',
		'copy:example'
	]);
	
	// Default task
	grunt.registerTask('default', ['watch']);
};