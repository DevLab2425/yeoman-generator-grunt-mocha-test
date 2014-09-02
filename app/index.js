var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.NamedBase.extend({
	kickoff: function(){
		this.log(this.yeoman);
		this.log(chalk.magenta( 'Let\'s generate a repo, shall we?' ));
	},
	
	directoryCreation: function(){
		var _name = this.arguments[0];
		this.mkdir(_name);
	}
});