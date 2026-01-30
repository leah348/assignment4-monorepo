import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

app.get("/", (req, res) => {
  res.send("Hello");
});

// routh handler
app.get("/Recipes", async (req, res) => {
  const data = await db.query(`SELECT * FROM Recipes`);
  const Recipes = data.rows;
  res.status(200).json(Recipes);
});

app.post("/Recipes", async (req, res) => {
  const userData = req.body;
  const dbQuery = await db.query(
    `INSERT INTO Recipes (dish, type, difficulty_level) VALUES ($1, $2 $3)`,
    [userData.dish, userData.type, userData.difficulty_level],
  );

  res.status(200).json({ " message": "recipe added" });
});

app.listen(8080, () => {
  console.log(`Server started on port http://localhost:8080`);
});
