module.exports = {
    server_port: 8080,
    local_db_url : 'mongodb://localhost:27017/xendit',
    remote_db_url : 'mongodb://user:user@ec2-3-86-69-144.compute-1.amazonaws.com:27017/xendit?AuthMechanism=SCRAM-SHA-1&AuthSource=admin',
    db_name: 'xendit',
    use_local_db: 1,
    salt_factor: 10 //bcrypt password hashing
};