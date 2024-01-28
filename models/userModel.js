const pool = require('../models/index');

class UserModel {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  saveOrUpdateUser(user) {
    return new Promise((resolve, reject) => {
      if (user.id) {
        // Update user
        pool.query('UPDATE users SET ? WHERE id = ?', [user, user.id], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(user);
        });
      } else {
        // Insert new user
        pool.query('INSERT INTO users SET ?', user, (error, results) => {
          if (error) {
            return reject(error);
          }
          user.id = results.insertId;
          resolve(user);
        });
      }
    });
  }

  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}

module.exports = new UserModel();
