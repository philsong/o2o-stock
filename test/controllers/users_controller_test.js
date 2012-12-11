require('../test_helper.js').controller('users', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        
    };
}

exports['users controller'] = {

    'GET new': function (test) {
        test.get('/users/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/users', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Users.find;
        Users.find = sinon.spy(function (id, callback) {
            callback(null, new Users);
        });
        test.get('/users/42/edit', function () {
            test.ok(Users.find.calledWith('42'));
            Users.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Users.find;
        Users.find = sinon.spy(function (id, callback) {
            callback(null, new Users);
        });
        test.get('/users/42', function (req, res) {
            test.ok(Users.find.calledWith('42'));
            Users.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var users = new ValidAttributes;
        var create = Users.create;
        Users.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, users);
            callback(null, users);
        });
        test.post('/users', {Users: users}, function () {
            test.redirect('/users');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var users = new ValidAttributes;
        var create = Users.create;
        Users.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, users);
            callback(new Error, users);
        });
        test.post('/users', {Users: users}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Users.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/users/1', new ValidAttributes, function () {
            test.redirect('/users/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Users.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/users/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

