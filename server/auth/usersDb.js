const { Pool } = require("pg");
const config = require("../__db/db-config")[process.env.NODE_ENV || "development"];

const pool = new Pool(config);

const getUserByEmail = (email) => {
  return new Promise(resolve => {
    pool.query("SELECT * FROM users where email = $1", [email], (error, result) => {
      resolve(result.rows[0]);
    });
  });
}

const createUser = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO users (email, password) values ($1, $2)",
    [email, password],
    (error, result) => {
      if (error) reject(error)
      console.log(result)
      resolve(result.rows);
    });
  });
}

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users where id = $1", [id], (error, result) => {
      if(error) {
        console.error(error)
        return reject(error)
      }
      resolve(result.rows[0]);
    });
  });
}

module.exports = {
  getUserByEmail,
  createUser,
  getUserById
};

