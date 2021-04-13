// conexao com banco de dados
const Database = require('../db/config');



//objeto do avatar/ usuarios / let aceita alteração de estado da váriavel
let data = {
  name: "Gabysx",
  avatar: "https://github.com/gabysx.png",
  "monthly-budget": 3000,
  "hours-per-day": 5,
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hour": 55,
};

module.exports = {
  async get() {
    const db = await Database();

    db.run(``)

    db.close();

    return data;
  },
  
  update(newData) {
    data = newData;
  }
}

