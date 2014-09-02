var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.NamedBase.extend({
	kickoff: function(){
		this.log(this.yeoman);
		this.log(chalk.magenta( 'Let\'s generate a repo, shall we?' ));
	},
	
	promptTask: function(){
		var self = this;
		var done = this.async();
		
		var prompts = [{
			type: 'input',
			name: 'title',
			message: 'Project title (Human readable): ',
			default: this.arguments[0]
		},{
			type: 'input',
			name: 'description', 
			message: 'Project description: '
		},{
			type: 'input',
			name: 'keywords',
			message: 'Project keywords: '
		},{
			type: 'input',
			name: 'git',
			message: 'GitHub Url: '
		}];
		
		this.prompt(prompts, function(answers){
			self.answers = answers;
			
			done();
		}.bind(this));
		
	},
	
	directoryCreation: function(){
		var _name = this.arguments[0];
		var _root = this.mkdir(_name);
		this.destinationRoot(_root);
		
		this.mkdir('test');
		this.mkdir('example');
	},
	
	fileGeneration: function(){
		var self = this;
		
		this.src.copy('Gruntfile.js', 'Gruntfile.js');
		this.src.copy('LICENSE', 'LICENSE');
		this.src.copy('README.md', 'README.md');
		this.src.copy('karma.conf.js', 'karma.conf.js');
		this.src.copy('bower.json', 'bower.json', {
			process: function(contents){
				return self._processBower(contents);
			}
		});
		this.src.copy('package.json', 'package.json', {
			process: function(contents){
				return self._processPackage(contents);
			}
		});
	},
	
	_processBower: function(contents){
		contents = JSON.parse(contents) || {};
		
		contents.name = this.arguments[0];
		contents.homepage = this.answers.git;
		contents.description = this.answers.description;
		contents.main = this.arguments[0] + '.js';
		
		return JSON.stringify(contents, null, '\t');
	}, 
	
	_processPackage: function(contents){
		contents = JSON.parse(contents) || {};
		
		contents.name = this.arguments[0];
		contents.title = this.answers.title;
		contents.description = this.answers.description;
		contents.main = this.arguments[0] + '.js';
		contents.repository.url = this.answers.git;
		contents.bugs.url = this.answers.git + '/issues';
		contents.homepage = this.answers.git;
		
		return JSON.stringify(contents, null, '\t');
	}
});