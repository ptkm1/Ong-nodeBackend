const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const { id } = request.body;
    const ong = await connection("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) {
      return response
        .status(400)
        .json({ error: "A ong não  foi encontrada no banco de dados" });
    }

    return response.json(ong);
  }
};
