const {
    MongoClient
} = require('mongodb');

const dbUrl = 'mongodb+srv://lion:jeny@cluster0-rmrmn.mongodb.net/test?retryWrites=true';
const dbName = 'herokuwebDB';

function checkuser(email) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dbUrl, {
                useNewUrlParser: true
            });
            const db = client.db(dbName);
            const col = await db.collection('users');
            const user = await col.findOne({
                username: email
            });
            client.close();
            return user;
        } catch (error) {
            console.log(error.message);
            client.close();
            return null;
        }

    }());
}

function addUser(email, password, callback) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dbUrl, {
                useNewUrlParser: true
            });
            const db = client.db(dbName);
            const user = await db.collection('users').findOne({username: email});
            if(user){
                client.close();
                callback (false)
            }else{
                const response = await db.collection('users').insertOne({
                    username: email,
                    password: password
                });
                //console.log(response);
                client.close();
                callback (true);
            }
        } catch (error) {
            console.log(error.message);
            client.close();
            callback (false);
        }

    }());
}


module.exports = {checkuser, addUser};