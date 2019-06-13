const {MongoClient, ObjectID} = require('mongodb');
const conf = require('../conf');
const dbUrl = conf.dbUrl;
const dbName = conf.dbName;


// get all advertisements from database
function getAdvs(done){
(async function mongo(){
let client;
try {
    client = await MongoClient.connect(dbUrl, {useNewUrlParser: true});
    const db = client.db(dbName);
    let data = await db.collection('advs').find().toArray();
    for (let i = 0; i < data.length; i++) {
        console.log( data[i].category);
       let category = await db.collection('categories').findOne({_id: new ObjectID(data[i].category)});
       console.log( category);
       data[i].category = category.title;
    }
    client.close();
    done(true,data);
} catch (error) {
    client.close();
    done(false,error.stack);
}
}());
}

module.exports = {getAdvs};