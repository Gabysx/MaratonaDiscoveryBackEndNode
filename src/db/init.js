const Database =  require('./config');

// async / await

const  initDB = {
  async init(){

    const db = await Database();

    await db.exec(`CREATE TABLE profile(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthy_budget INT,
      days_per_week INT,
      hours_per_day INT,
      vacation_per_year INT,
      value_hour INT
    )`);
    
    await db.exec(`CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours TEXT,
      total_hours INT,
      created_at DATETIME
    )`);
    
    await db.run(`INSERT INTO profile(
      name,
      avatar,
      monthy_budget,
      days_per_week,
      hours_per_day,
      vacation_per_year,
      value_hour
    ) VALUES(
      "Gabysx",
      "https://github.com/gabysx.png",
      3000,
      5,
      5,
      3,
      75
    )`);
    
    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES(
      "Pizzaria Guloso",
      2,
      1,
      1617514376018
    )`);
    
    await db.run(`INSERT INTO jobs(
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES(
      "OneTwo Projects",
      3,
      47,
      1617514376018
    )`);
    
    await db.close();
  }
}

initDB.init();