const MongoClient = require('./monog_connect');
const mongodb = require('mongodb')
const { uid } = require('uid');

module.exports = {
    MongoClient,
    getID: (id=null)=> new mongodb.ObjectID(id),
    getUID: _ => uid(6).toUpperCase()
}