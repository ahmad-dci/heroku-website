const {MongoClient, ObjectID} = require('mongodb');
const conf = require('../conf');
const dbUrl = conf.dbUrl;
const dbName = conf.dbName;

function getAdvs(done){
(async function mongo(){
let client;
try {
    client = await MongoClient.connect(dbUrl, {useNewUrlParser: true});;
    const db = client.db(dbName);
    const data = await db.collection('advs').find().toArray();
    client.close();
    done(true,data);
} catch (error) {
    client.close();
    done(false,error.message);
}
}());
}

module.exports = {getAdvs};