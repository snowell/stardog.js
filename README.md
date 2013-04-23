Stardog.js
==========

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)  
_Current Version **0.0.4**_ 

Stardog.js JavaScript Framework for Node.js to develop apps with the [Stardog RDF Database](http://stardog.com).  

![Stardog](http://stardog.com/_/img/sdog.png)   

For detailed documentation, see the [annotated source](http://clarkparsia.github.io/stardog.js/docs/stardog.html).

## What is it? ##

This framework wraps all the functionality of a client for the Stardog DBMS, and provides access to a full set of functions such as executing SPARQL Queries, administration tasks on Stardog, and the use of the Reasoning API.

All the implementation uses the HTTP protocol, since most of Stardog functionality is available using this protocol. For more information, go to the Stardog's [Network Programming](http://stardog.com/docs/network/) documentation.

The framework is currently targeted to Node.js (the latest version) and it has not been fully tested in the browser, but future versions will be have browser compatibility.
You'll also need [npm](https://npmjs.org) to run the test cases and install the dependencies.

## Development ##

To get started, just clone the project. You'll need a local copy of Stardog to be able to run the tests. For more information on starting the Stardog DB service and how it works, go to [Stardog's documentation](http://stardog.com/docs/), where you'll find everything you need to get up and running with Stardog.

Go to [http://stardog.com](http://stardog.com), download and install the database and load the data provided in `data/` using the script in the repository. Having the Stardog service running load the data with the following command:

    $ ./load_test_data.sh

Once you have the testing database in your Stardog copy, run the following command:

    $ npm install

This will install all the dependencies using npm, once this is done, run the test cases:

    $ npm test

That will run all the test cases in `spec/`

All tests should pass.

## Version details ##

Stardog.js depends of the Stardog HTTP API, and any change in this API will be supported by Stardog.js. Here's a list of version compatibility between __Stardog__ and  __Stardog.js__:

| Stardog Version | Stardog.js Version |
| --------------- | ------------------ |
| <= 1.1.5        | <= 0.0.3           |
| 1.2             | 0.0.4              |


## Quick Example ##

### Node.js

	var stardog = require("stardog");
	 
	var conn = new stardog.Connection();
	 
	conn.setEndpoint("http://myserver:myport/");
	conn.setCredentials("username", "password");
	 
	conn.query("db-name", "select distinct * where { ?s ?p ?o } limit 5", null, 5, 0, function (data) {
		console.log(data.results.bindings);
	})
	
### Browser

    <script src="js/stardog.js" type="text/javascript"></script>
    …
    <script type="text/javascript">
        var conn = new Stardog.Connection();
        conn.setEndpoint("/stardog/endpoint/");
        conn.setReasoning("RDFS");
        conn.setCredentials("browser", "secret");
    </script>

## NOTE ##

This framework is in continuous development, please check the [issues](https://github.com/clarkparsia/stardog.js/issues) page. You're welcome to contribute.

