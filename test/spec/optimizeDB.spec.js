(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('../../js/stardog.js'), require('../lib/async.js'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['stardog', 'async'], factory);
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.Stardog, async);
    }
}(this, function (Stardog, Async) {

	describe ("Optimize DBs Test Suite", function() {
		var conn,
			checkDone = (new Async()).done;

		beforeEach(function() {
			conn = new Stardog.Connection();
			conn.setEndpoint("http://localhost:5822/");
			conn.setCredentials("admin", "admin");
		});

		afterEach(function() {
			conn = null;
		});

		it ("should get NOT_FOUND status code trying to optimize a non-existent DB.", function(done) {
				
			conn.optimizeDB({ database: 'nodeDB_optimize' }, function (data, response) {

				expect(response.statusCode).toBe(404);
				if (done) { // node.js
					done() 
				}
			});

			waitsFor(checkDone, 5000); // does nothing in node.js
		});

		it ("should optimize an offline DB", function(done) {

			conn.offlineDB({ database: 'nodeDB', strategy: 'WAIT', timeout: 5 }, function (data, response1) {
				expect(response1.statusCode).toBe(200);

				conn.copyDB({ dbsource: 'nodeDB', dbtarget: 'nodeDB_optimize' }, function (data, response2) {
					expect(response2.statusCode).toBe(200);

					conn.optimizeDB({ database: 'nodeDB_optimize' }, function (data, response3) {
						expect(response3.statusCode).toBe(200);

						// Clean everything
						conn.dropDB({ database: 'nodeDB_optimize' }, function (data, response4) {
							expect(response4.statusCode).toBe(200);

							conn.onlineDB({ database: 'nodeDB', strategy: 'NO_WAIT' }, function (data, response5) {
								expect(response5.statusCode).toBe(200);

								if (done) { // node.js
									done() 
								}
							})
						});
					});
				})
			});

			waitsFor(checkDone, 5000); // does nothing in node.js
		});

	});

    // Just return a value to define the module export.
    return {};
}));
