import {MongoClient} from 'mongodb';
import {mongoConfig} from './settings.js';

let _connection = undefined;
let _db = undefined;

export const dbConnection = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl);
    // _connection = await MongoClient.connect(mongoConfig.serverUrl, {useNewUrlParser: true, useUnifiedTopology: true}); // this was in the lecture video, but not in the lab stub or code base
    _db = _connection.db(mongoConfig.database);
  }

  return _db;
};

export const closeConnection = async () => {
  await _connection.close();
};