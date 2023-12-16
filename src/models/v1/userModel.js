const dbConnection = require('../services/dbConnectionService');

class UserModel {
  constructor({ companyId, email, password }) {
    this.companyId = companyId;
    this.email = email;
    this.password = password;
  }

  async save() {
    const client = dbConnection.getClient();

    const result = await client.query(
      'INSERT INTO "User" (companyId, email, password) VALUES ($1, $2, $3) RETURNING *',
      [this.companyId, this.email, this.password]
    );

    return result.rows[0];
  }

  static async findById(userId) {
    const client = dbConnection.getClient();

    const result = await client.query('SELECT * FROM "User" WHERE userId = $1', [userId]);

    return result.rows[0];
  }
}

module.exports = UserModel;