var mssql = require('mssql');
var connection = require('./config');

module.exports = {
    curr_user: ``,
    get_users: function(req, res) {
        var request = new mssql.Request(connection);
        request.query("SELECT * FROM users", function (err, rows) {
            if (err) console.log(err);

            var users = rows.recordset.map((item) => {
                 return `<h3>${item.username}:${item.password}</h3>`;
             });
            console.log(users);

            res.setHeader("Content-Type", "text/html");
            res.send(users.join(''));
        });

    },
    check_user: function(req, res, next) {
        var self = this;
        var ps = new mssql.PreparedStatement(connection);
        var inserts = {
            username: req.body.username
        };
        ps.input('username', mssql.Text);
        ps.prepare("SELECT * FROM users WHERE username LIKE @username", function(err) {
            if (err) console.log(err);
            ps.execute(inserts, function(err, rows) {
                if (err) console.log(err);

                if (rows.recordset.length > 0) {
                    self.curr_user = rows.recordset[0].username;

                    console.log(self.curr_user);
                    //res.send(self.curr_user);
                    next();
                } else {
                    res.status(404).send('user not found!');
                }


            });
            ps.unprepare();
        }) ;
    },

    check_pass: function(req, res) {
        var self = this;
        var ps = new mssql.PreparedStatement(connection);
        var inserts = {
            password: req.body.password
        };
        ps.input('password', mssql.Text);
        ps.prepare("SELECT * FROM users WHERE password LIKE @password", function(err) {
            if (err) console.log(err);
            ps.execute(inserts, function(err, rows) {
                if (err) console.log(err);

                if (rows.recordset.length > 0) {
                    //self.curr_pass = rows.recordset[0].password;
                    console.log(self.curr_pass);
                    req.session.username = self.curr_user;
                    res.status(200).send('user ' + req.session.username);

                } else {
                    res.status(404).send('wrong password');
                }


            });
            ps.unprepare();
        }) ;
    }
}