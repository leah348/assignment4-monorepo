// 1. import
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
//2.
const app = express();
app.use(express.json());
app.use(cors()); // request from anyone
dotenv.config(); // set up enviourment

//3.data base set up
const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

//4.
app.get("/", (req, res) => {
  res.send("Hello");
});

// 6.routh handler// set up get. sending back jason
app.get("/Recipes", async (req, res) => {
  const data = await db.query(`SELECT * FROM Recipes`);
  const Recipes = data.rows;
  res.status(200).json(Recipes);
});
//7.set up post
app.post("/Recipes", async (req, res) => {
  const userData = req.body;

  const dbQuery = await db.query(
    `INSERT INTO Recipes (dish, type, difficulty_level) VALUES ($1, $2, $3)`,
    [userData.dish, userData.type, userData.difficulty_level],
  );
  res.status(201).json({ message: "Recipe added" });
  // doller sign is plase holder and in array is actual value for doller sign. doller sign become whatever recipe
});

app.put("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { dish, type, difficulty_level } = req.body;

  await db.query(
    `UPDATE recipes
     SET dish=$1, type=$2, difficulty_level=$3
     WHERE id=$4`,
    [dish, type, difficulty_level, id],
  );

  res.json({ message: "Recipe updated" });
});

app.delete("/Recipes/:id", async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM Recipes WHERE id = $1", [id]);
  res.json({ message: "Recipe deleted" });
});

//5.
app.listen(8080, () => {
  console.log(`Server started on port http://localhost:8080`);
});
