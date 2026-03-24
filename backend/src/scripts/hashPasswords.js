const bcrypt = require('bcrypt');
const { conectarDB } = require('../config/db');

async function hashPasswords() {
  let db;
  try {
    db = await conectarDB();

    // Fetch all users
    const fetchUsersQuery = 'SELECT ID_USUARIO, CLAVE FROM USUARIO';
    const users = await new Promise((resolve, reject) => {
      db.query(fetchUsersQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Hash passwords and update the database
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.CLAVE, 10);
      const updateQuery = 'UPDATE USUARIO SET CLAVE = ? WHERE ID_USUARIO = ?';

      await new Promise((resolve, reject) => {
        db.query(updateQuery, [hashedPassword, user.ID_USUARIO], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      console.log(`Password for user ID ${user.ID_USUARIO} has been hashed.`);
    }

    console.log('All passwords have been hashed successfully.');
  } catch (error) {
    console.error('Error hashing passwords:', error);
  } finally {
    if (db) db.detach();
  }
}

hashPasswords();