/**
*	Cluster Server Task
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*	@desc Experimental Node LoadBalancer | Cluster Node based application
*	Alternative: ProxyServer via nginx (http://nginx.org/).
*
*	GOALS/ROAD MAP:
*	1) http-proxy library to handle request inside a node cluster.
*	2) Seaport library to register/unregister node instances dynamically at runtime (Should be working in conjunction with the fallback support to notify 'crashed' node instances).
*	3) Implement Multiple-core usage per node instances (Please see Cluster API: http://nodejs.org/docs/latest/api/cluster.html and check what it's possible since the API is still officially set as 'Experimental').
*	4) Research if it's possible to create balanced proxy server based on node 'memory usage' instances instead of the classic 'Round-Robin' mechanism.
*	5) Implement Fallback mechanism to re-spin 'crashed' node instances on the fly.
*	6) Cluster Logging System and Server Health Reporter.
*	7) Benchmarking / Stress tests with JMeter (or similar) to identify possible bottlenecks, time-consuming per request/response and general process load.
*	8) SSL Support for Cluster Proxy Server.
**/
module.exports = function(grunt) {
	
	var httpProxy = require('http-proxy'),
		seaport = require('seaport'),
		_ = grunt.util._,
   		env = require('../../config/env'),
        cfg = grunt.config.get('cluster.options');
	
	/**
	*	Spin Up Proxy Server with no support for SSL.
	**/
	grunt.registerTask('cluster:noSSL', 'Spin up a ProxyServer to run cluster-based application', function() {
		
		httpProxy.createServer(function (req, res, proxy) {
			
			// TODO: Memory based mechanism to proxy incoming requests.
			// Communication with between node processes to gather memory information ??? it's possible ???
			
		}).listen(cfg.clusterPort);
		
	});
	
	/**
	*	Spin Up Proxy Server with Support with SSL (Generate Certificates)
	**/
	grunt.registerTask('cluster:withSSL', 'Spin up a ProxyServer to run cluster-based application', function() {
		// TODO
	});
	
};