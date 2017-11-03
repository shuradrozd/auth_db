var cookieParser = require('cookie-parser');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var mssql = require('mssql');
module.exports = {
    createStore: function() {
        var config = {
            user: 'test',
            //password: 'test',
            password: 'jndbynf_11',
            server: 'localhost',
            //database: 'test',
            database: 'temp',
            port: 1433,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            }

        };
        return new MSSQLStore(config);
    }
};


