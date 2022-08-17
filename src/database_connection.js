const mysql = require("mysql2");
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = require("./config");

/**
 * @property {mysql.Connection} _connection instance of the connection object with database.
 */
class ApiService {
  constructor() {
    this._connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
    });
  }

  getStudents() {
    const query = `select * from student`;
    this._connection.connect();
    const result = this._connection.execute(query);
    this._connection.end();
    return result;
  }

  async getStudentById(id) {
    const query = `select * from student where ID=${id}`;
    this._connection.connect();
    const result = this._connection.execute(query);
    this._connection.end();
    return result;
  }

  getSchoolById(id) {
    const query = `select * from school where ID=${id}`;
    this._connection.connect();
    const result = this._connection.execute(query);
    this._connection.end();
    return result;
  }

  getSchools() {
    const query = `select * from school`;
    this._connection.connect();
    const result = this._connection.execute(query);
    this._connection.end();
    return result;
  }
}

const poolService = mysql.createPool({
  connectionLimit : 10,
  host            : DB_HOST,
  user            : DB_USERNAME,
  password        : DB_PASSWORD,
  database        : DB_NAME
});

const apiService = new ApiService(); // initiate a api
Object.freeze(apiService);


module.exports = {
  apiService,
  poolService
}