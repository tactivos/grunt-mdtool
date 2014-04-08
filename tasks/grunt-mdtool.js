/*
 * grunt-mdtool
 * https://github.com/tactivos/grunt-mdtool
 * Copyright (c) 2014 Juli Racca, Santiago Montero & Johnny Halife
 */
module.exports = function(grunt) {
  grunt.registerMultiTask('mdbuild', 'Builds a MonoDevelop Solution', function() {
    var _ = grunt.util._;
    var done = this.async();
    var async = grunt.util.async;
    var options = this.options();
    var projects = options.projects.map(function(f){ return path.resolve(f); });

    async.forEach(projects, function(solution, ready) {
      var args = []; //arguments to be used for invoking mono

      if(this.data.verbose) {
        args.push('-v');
      }

      args.push('build');
      args.push('--configuration:' + this.data.target);
      args.push(solution);

      grunt.util.spawn({ cmd: options.location, args: args }, ready);
    }.bind(this), done);
  });
};
