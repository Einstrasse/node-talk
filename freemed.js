#!/usr/local/bin/node

var commander = require('commander')
  , forever = require('forever');

commander.version('freemed chatting app');
commander
		.on('--help', function () {
			console.log('Detail Help:');
		});

commander
		.command('start [option]')


		.option('-d, --daemon', 'run the freemed chatting server as a daemon using the forever module...')
		.option('-p, --port [PORT NUM]', 'run the freemed chatting server with port which you want...')
		// .option('-h, --home [HOME Directory]', 'set HOME directory in server')
		// .option('-w, --workspace [WORKSPACE Directory]', 'set WORKSPACE directory in server')

		.action(function (env, options) {
			var process_options = [];
			var sso_mode = false;

			process_options.push(options.port);
			// process_options.push(options.home);
			// process_options.push(options.workspace);

			// Start Process
			//
			if (options.daemon) {							
				forever.startDaemon(__dirname+'/server.js', {
					'env': { 'NODE_ENV': 'production' },
					'spawnWith': { env: process.env },
					'args': process_options
				});
				console.log("Freemed chatting app is satred in daemon...");
			}
			else {
				forever.start(__dirname+'/server.js', {'args': process_options});
			}
		});

commander.parse(process.argv);