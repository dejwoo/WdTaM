var should = require("should");
var mongoose = require('mongoose');
var Account = require("../models/account.js");
var db;

describe('Account', function() {

    before(function(done) {
        var options = {
            user: "webUser",
            pass: "4z!WXiMr^J"
        };
        db = mongoose.connect('mongodb://dejwoo.com:28001/wdtam', options);
        done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var account = new Account({
            username: '12345',
            password: 'testy'
        });

        account.save(function(error) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });

    it('find a user by username', function(done) {
        Account.findOne({ username: '12345' }, function(err, account) {
            account.username.should.eql('12345');
            console.log("   username: ", account.username);
            done();
        });
    });

    afterEach(function(done) {
        Account.remove({}, function() {
            done();
        });
    });

});