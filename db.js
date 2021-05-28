const mongoose = require('mongoose');
require('dotenv').config()
const DB_URI = process.env.MONGO_URI;
const TEST_DB_URI = process.env.TEST_MONGO_URI;

function connect() {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV === 'test') {
      // const Mockgoose = require('mockgoose').Mockgoose;
      // const mockgoose = new Mockgoose(mongoose);

      // mockgoose.prepareStorage()
      //   .then(() => {
          mongoose.connect(TEST_DB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        // })
    } else {
        mongoose.connect(DB_URI,
          { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };