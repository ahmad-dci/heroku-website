const {MongoClient, ObjectID} = require('mongodb');
const dbUrl = 'mongodb+srv://lion:jeny@cluster0-rmrmn.mongodb.net/test?retryWrites=true';
const dbName = 'herokuwebDB';

function checkUser(email, password, callback) {
    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(dbUrl, {
                useNewUrlParser: true
            });
            const db = client.db(dbName);
            const col = await db.collection('users');
            const user = await col.findOne({
                username: email,
                password: password
            });
            client.close();
            callback(user);
        } catch (error) {
            console.log(error.message);
            client.close();
            callback(null);
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

function changePassword(id, newPassword,done){
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(dbUrl,{ useNewUrlParser:true });
            const db = client.db(dbName);
            const response = await db.collection('users').updateOne(
                {
                    _id:new ObjectID(id)
            },
            {
                $set:{
                    password: newPassword
                }
            });
            done(response);
        } catch (error) {
            done(error.message)
        }
        client.close();
    }());

}
function newAdv(title, keyWords, description, category, imgUrl, done ){
(async function mongo(){
let client;
try {
    client = await MongoClient.connect(dbUrl, {useNewUrlParser: true});
    const db = client.db(dbName);
    const response = await db.collection('advs').insertOne({
        title: title,
        keyWords: keyWords,
        description: description,
        category: category,
        imgUrl: imgUrl
    });
    client.close();
    done(response);
} catch (error) {
    client.close();
    done(error.message);
}
}());
}

module.exports = {checkUser, addUser, changePassword, newAdv};