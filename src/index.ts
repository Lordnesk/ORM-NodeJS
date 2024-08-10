import express, { Request, Response } from "express";
import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql", // Puedes cambiarlo a 'postgres', 'sqlite', 'mssql', etc.
  }
);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("La tabla de usuarios ha sido sincronizada.");
  })
  .catch((error) => {
    console.error("Error al sincronizar la tabla de usuarios:", error);
  });

app.use(express.json());

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await User.update(req.body, { where: { id: userId } });
    res.status(200).json({ message: "Usuario actualizado." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.status(200).json({ message: "Usuario eliminado." });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});