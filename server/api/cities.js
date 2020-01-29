const express = require("express");
const Cities = require("../models/cities");

// const CONNECTION_STRING =
//   process.env.DATABASE_URL ||
//   "postgresql://amrad:arridha@localhost:5432/weather-db";
// const SSL = process.env.NODE_ENV === "production";
// const Pool = require("pg").Pool;
// const pool = new Pool({
//   connectionString: CONNECTION_STRING,
//   ssl: SSL
// });

const router = express.Router();

router.get("/", (req, res) => {
  Cities.retrieveAll((cities, err) => {
    if (err) {
      return res.json(err);
    }
    return res.json(cities);
  });
});

// router.get("/", (req, res) => {
//   pool.query("SELECT * from cities", (err, result) => {
//     if (err) throw err;
//     return res.json(result.rows);
//   });
// });

router.post("/", (req, res) => {
  const city = req.body.city;
  Cities.insert(city, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

module.exports = router;
