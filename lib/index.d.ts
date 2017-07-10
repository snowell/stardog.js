// Type definitions for stardog.js 0.3.1
// Project: https://github.com/stardog-union/stardog.js
// Definitions by: Stephen Nowell <http://github.com/snowell>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

import Headers from 'fetch-ponyfill';

export namespace Stardog {

    interface ConnectionOptions {
        endpoint: string;
        database: string;
        username: string;
        password: string;
    }

    interface HTTPOptions {
        headers: Headers;
        method: string;
    }

    interface DatabaseOptions {
        name: string;
        archetypes?: string;
        connection?: timeout;
        creator?: string;
        namespaces?: string[];
        online?: boolean;
        time?: creation;
    }

    interface QueryOptions {
        query: string;
        baseURI?: string;
        limit?: number;
        offset?: number;
        reasoning?: boolean;
    }

    interface User {
        username: string;
        password: string;
        superuser?: boolean;
    }

    interface HTTPMessage {
        status: string;
        statusText: string;
    }

    interface HTTPBody extends HTTPMessage, result {}

    // Nested object interfaces
    interface timeout {
        timeout: number;
    }

    interface creation {
        creation: string;
    }

    interface result {
        result: string;
    }

    interface Params {
        [paramName: string]: any;
    }

    class Connection {
        constructor(options: ConnectionOptions);

        config(options: ConnectionOptions): void;
        headers(): Headers;
        uri(...resource: string): string;
    }

    namespace db {
        function create(conn: Connection, database: string, databaseOptions: DatabaseOptions, options: HTTPOptions, params: Params): Promise<HTTPMessage>;
        function drop(conn: Connection, database: string, params: Params) : Promise<HTTPMessage>;
        function get(conn: Connection, database: string, params: Params) : Promise<HTTPBody>;
        function getOptions(conn: Connection, database: string, params: Params) : Promise<HTTPBody>;
        function setOptions(conn: Connection, database: string, databaseOptions: DatabaseOptions, params: Params) : Promise<HTTPMessage>;
        function offline(conn: Connection, database: string, params: Params) : Promise<HTTPBody>;
        function online(conn: Connection, database: string, params: Params) : Promise<HTTPBody>;
        function optimize(conn: Connection, database: string, params: Params) : Promise<HTTPMessage>;
        function copy(conn: Connection, database: string, destination: string, params: Params) : Promise<HTTPBody>;
        function list(conn: Connection, params: Params) : Promise<HTTPBody>;
    }

    namespace query {
        function property(conn: Connection, options: HTTPOptions, params: Params) : result;
        function execute(conn: Connection, options: QueryOptions, params: Params) : Promise<HTTPBody>;
        function list(conn: Connection) : Promise<HTTPBody>;
        function kill(conn: Connection, queryId: string) : Promise<HTTPMessage>;
        function get(conn: Connection, queryId: string) : Promise<HTTPBody>;
    }

    namespace server {
        function shutdown(conn: Connection, params: Params) : Promise<Response>;
    }

    namespace user {
        function list(conn: Connection, params: Params) : Promise<HTTPBody>;
        function create(conn: Connection, user: User, params: Params) : Promise<HTTPBody>;
        function changePassword(conn: Connection, username: string, password: string, params: Params) : Promise<HTTPBody>;
        function enabled(conn: Connection, username: string, params: Params) : Promise<HTTPBody>;
        function enable(conn: Connection, username: string, enabled: boolean, params: Params) : Promise<HTTPMessage>;
    }
}