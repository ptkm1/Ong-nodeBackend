let connection = require("../database/connection");
const crypto = require("crypto");

//Não esquecer de por a virgula apos o termino da função
//Pois no module.exports é necessário.
module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString("HEX");
    //E aqui o await, é o comando que a função precisa esperar terinar a execução
    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  }
};
