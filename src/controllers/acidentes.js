const connection = require("../database/connection");

//Não esquecer de por a virgula apos o termino da função
//Pois no module.exports é necessário.
module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query; //Fazendo o request da pagina obtida na query (LINK EXEMPLO: /acidentes?page=1, /acidentes?page=2 )

    const [contadorCasos] = await connection("acidentes").count();

    //Sistema de paginação | Logica do limite, e o offset
    const acidentes = await connection("acidentes")
      .join("ongs", "ong_id", "=", "acidentes.ong_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "acidentes.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ]);

    response.header("X-Total-Count", contadorCasos["count(*)"]);

    return response.json(acidentes);
  },

  async create(request, response) {
    const { titulo, descricao, value } = request.body; //requisitar corpo do json
    const ong_id = request.headers.authorization;

    const [id] = await connection("acidentes").insert({
      titulo,
      descricao,
      value,
      ong_id
    });
    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection("acidentes")
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operação nao permitida" });
    }

    await connection("acidentes")
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
