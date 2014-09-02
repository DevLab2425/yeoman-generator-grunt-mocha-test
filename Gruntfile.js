module.exports = function(grunt){
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	
	grunt.initConfig({
		mochaTest: {
			unit: {
				src: [
					'test/**/*Spec.js'
				]
			}
		},
		
		jshint: {
			all: [
				'Gruntfile.js'
			]
		}
	});
	
	grunt.registerTask('test', [
		'jshint:all',
		'mochaTest:unit'
	]);
	
	// default task
	grunt.registerTask('default', ['test']);
};