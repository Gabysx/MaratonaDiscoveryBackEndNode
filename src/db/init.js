const Database =  require('config');

Database();

Database.exec(`CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  avatar TEXT,
  monthy-budget INT,
  days-per-week INT,
  hours-per-day INT,
  vacation-per-year INT,
  value-hour INT,
)`);

Database.close();