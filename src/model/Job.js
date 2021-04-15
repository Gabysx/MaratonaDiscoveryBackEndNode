const Database =  require('../db/config')

let data = [
  {
    id:1,
    name:"Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now(),
  },
  {
    id:2,
    name:"OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now(),
  },
];

module.exports = {
  async get(){
    const db = await Database()

   const data2 = await db.all(`SELECT * FROM jobs`)

    await db.close();

    return data;
  },
  update(newJob){
    data = newJob
  },
  delete(id){
    data = data.filter(job => Number(job.id) !== Number(id));

  },
  create(newJob){
    data.push(newJob)
  }
}