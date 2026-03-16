const Firebird = require('node-firebird');
require('dotenv').config();

const options = {
  host: '127.0.0.1',
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  lowercase_keys: false,
  role: null,
  pageSize: 4096,
  encoding: 'UTF8',
  wireCompression: false,
  wireCrypt: Firebird.WIRE_CRYPT_DISABLE,
  pluginName: Firebird.AUTH_PLUGIN_LEGACY
};

function conectarDB() {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(db);
    });
  });
}

module.exports = {
  conectarDB
};
