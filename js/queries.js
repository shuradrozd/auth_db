var mssql = require('mssql');
var connection = require('./config');

module.exports = {
    curUser: ``,
    get_users: function(req, res) {
        var request = new mssql.Request(connection);
        request.query("SELECT * FROM users", function (err, rows) {
            var user = rows.map((row) => {
                 return `<h3>${row.username}: ${row.password}</h3>`;
             });
        });
        res.send(users.join(''))
    }
}