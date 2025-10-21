import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// Configuração detalhada do CORS
app.use(
  cors({
    origin: "https://projeto-vida-e-finan-a-2fkf-ig8pymaql-david-brenos-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Garante que requisições OPTIONS recebam resposta
app.options("*", cors());

// Permite receber JSON no body
app.use(express.json());

// Rota simples pra teste
app.get("/", (req, res) => {
  res.send("API rodando com CORS configurado!");
});

// Suas rotas reais
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
