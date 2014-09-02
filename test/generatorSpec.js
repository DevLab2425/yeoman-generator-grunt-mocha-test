describe('Mocha/Grunt generator test suite', function(){
	
	var yeoman = require('yeoman-generator');
	var path = require('path');
	var assert;
	var mockGen;
	var mockRepoName = 'repo-gen-test';
		
	before(function(done){
		
		assert = yeoman.assert;
		mockGen = yeoman.test;
		
		var mockPrompt = { 
			title: 'Repo Gen Test', 
			description: 'Unit Test Gen',
			keywords: 'AngularJS Yeoman GitHub',
			git: 'http://github.com'
		};
		
		mockGen.run(path.join(__dirname, '../app'))
			.inDir(path.join(__dirname, './tmp'))
			.withArguments(['repo-gen-test'])
			.withPrompt( mockPrompt )
			.on('end', done);
	});
	
	describe('Directory Creation', function(){
		it('should generate a Root directory', function(){
			assert.file('../' + mockRepoName + '/');
		});
		it('should generate a Test directory', function(){
			assert.file('test/');
		});
		
		it('should generate an Example directory', function(){
			assert.file('example');
		});
	});
	
	describe('File Creation', function(){
		it('should generate "bower.json"', function(){
			assert.file('bower.json');
		});
		
		it('should generate "Gruntfile.js"', function(){
			assert.file('Gruntfile.js');
		});
		
		it('should generate "karma.conf.js"', function(){
			assert.file('karma.conf.js');
		});
		
		it('should generate "package.json"', function(){
			assert.file('package.json');
		});
		
		it('should generate "LICENSE"', function(){
			assert.file('LICENSE');
		});
		
		it('should generate "README.md"', function(){
			assert.file('README.md');
		});
	});
	
	describe('File Customization', function(){
		
		it('should update bower.js with prompt data', function(){
			assert.fileContent('bower.json', /['|"]*name['|"]*[ ]*:[ ]*['|"]repo-gen-test['|"]/);
			assert.fileContent('bower.json', /['|"]*description['|"]*[ ]*:[ ]*['|"]Unit Test Gen['|"]/);
			assert.fileContent('bower.json', /['|"]*homepage['|"]*[ ]*:[ ]*['|"]http:\/\/github.com['|"]/);
			assert.fileContent('bower.json', /['|"]*main['|"]*[ ]*:[ ]*['|"]repo-gen-test.js['|"]/);
		});

		it('should update package.json with prompt data', function(){
			assert.fileContent('package.json', /['|"]*name['|"]*[ ]*:[ ]*['|"]repo-gen-test['|"]/);
			assert.fileContent('package.json', /['|"]*title['|"]*[ ]*:[ ]*['|"]Repo Gen Test['|"]/);
			assert.fileContent('package.json', /['|"]*description['|"]*[ ]*:[ ]*['|"]Unit Test Gen['|"]/);
			assert.fileContent('package.json', /['|"]*main['|"]*[ ]*:[ ]*['|"]repo-gen-test.js['|"]/);
			assert.fileContent('package.json', /['|"]*url['|"]*[ ]*:[ ]*['|"]http:\/\/github.com['|"]/);
			assert.fileContent('package.json', /['|"]*url['|"]*[ ]*:[ ]*['|"]http:\/\/github.com\/issues['|"]/);
			assert.fileContent('package.json', /['|"]*homepage['|"]*[ ]*:[ ]*['|"]http:\/\/github.com['|"]/);
		});
		
	});
});