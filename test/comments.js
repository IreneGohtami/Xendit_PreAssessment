//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const server = require('../server'); 
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('API Unit Testing', () => {
    before(done => { //connect to DB
        server.on("app_started", function(){
            done();
        });
    });
    beforeEach((done) => { //before each test we empty the database
        server.comCol.deleteMany({}, function(err, res) {
            if(err) throw err;
            server.memCol.deleteMany({}, function(err, res) {
                if(err) throw err;
                done();
            });
        });
    });

    /* COMMENTS */
    /* POST */
    describe('/POST comment', () => {
        it('it should not add a new comment without "comment" field', (done) => {
            let comment = {
                "text": "This is my comment."
            }
            chai.request(server)
            .post('/orgs/xendit/comments')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('Error');
                done();
            });
        });
        it('it should add a new comment', (done) => {
            let comment = {
                "comment": "This is my comment."
            }
            chai.request(server)
            .post('/orgs/xendit/comments')
            .send(comment)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('Comment');
                done();
            });
        });
    });
    /* GET */
    describe('/GET comments', () => {
        it('it should get all active comments', (done) => {
            var document = { org_name: 'xendit', comment: "This is my comment", status:1 };
		    server.comCol.insertOne(document, function(err, res2) {
                if(err) throw err;
			    chai.request(server)
                .get('/orgs/xendit/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
            });
		});
    });
    /* DELETE */
    describe('/DELETE comments', () => {
        it('it should delete all comments', (done) => {
            var document = { org_name: 'xendit', comment: "This is my comment", status:1 };
            server.comCol.insertOne(document, function(err, res2) {
                if(err) throw err;
                chai.request(server)
                .delete('/orgs/xendit/comments')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });

    /* MEMBERS */
    /* GET */
    describe('/GET member', () => {
        it('it should get all members', (done) => {
            var document = {"org_name":"xendit","username":"adam","email":"adam@email.com","password":"password123","avatar":"https://randomuser.me/api/portraits/men/97.jpg","no_followers":15,"following_no":35};
		    server.memCol.insertOne(document, function(err, res2) {
                if(err) throw err;
			    chai.request(server)
                .get('/orgs/xendit/members')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
            });
		});
    });
});

