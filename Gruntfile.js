module.exports = function(grunt){
	
	// Load Grunt tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	
	grunt.initConfig({
		
		mochaTest: {
			options: {
				reporter: 'spec'
			},
			unit: {
				src: ['test/**/*Spec.js']
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'app/**/*.js']
		}
		
	});
	
	grunt.registerTask('test', [
		'jshint:all',
		'mochaTest:unit'
	]);
	
	// Default task
	grunt.registerTask('default', ['test']);
};