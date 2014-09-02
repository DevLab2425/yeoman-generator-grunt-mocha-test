describe('Mocha/Grunt generator test suite', function(){
	
	var yeoman = require('yeoman-generator');
	var path = require('path');
	var assert;
	var mockGen;
	var mockRepoName = 'repo-gen-test';
		
	before(function(done){
		
		assert = yeoman.assert;
		mockGen = yeoman.test;
		
		mockGen.run(path.join(__dirname, '../app'))
			.inDir(path.join(__dirname, './tmp'))
			.withArguments([mockRepoName])
			.on('end', done);
	});
	
	it('should generate a root directory', function(){
		assert.file(mockRepoName + '/');
	});
});