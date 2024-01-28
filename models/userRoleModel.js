const pool = require('../models/index');

class UserRoleModel {
  getAllUserRoles() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM user_roles', (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  }

  getUserRoleById(userRoleId) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM user_roles WHERE id = ?', [userRoleId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      });
    });
  }

  saveOrUpdateUserRole(userRole) {
    return new Promise((resolve, reject) => {
      if (userRole.id) {
        // Update user role
        pool.query('UPDATE user_roles SET ? WHERE id = ?', [userRole, userRole.id], (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(userRole);
        });
      } else {
        // Insert new user role
        pool.query('INSERT INTO user_roles SET ?', userRole, (error, results) => {
          if (error) {
            return reject(error);
          }
          userRole.id = results.insertId;
          resolve(userRole);
        });
      }
    });
  }

  deleteUserRole(userRoleId) {
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM user_roles WHERE id = ?', [userRoleId], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  }
}

module.exports = new UserRoleModel();
