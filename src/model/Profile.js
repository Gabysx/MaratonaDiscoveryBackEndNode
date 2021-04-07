//objeto do avatar/ usuarios
const data = {
  name: "Gabysx",
  avatar: "https://github.com/gabysx.png",
  "monthly-budget": 3000,
  "hours-per-day": 5, 
  "days-per-week": 5,
  "vacation-per-year": 4,
  "value-hour": 55,
};

module.exports = {
  get(){
    return data;
  }
}