import express from "express";
import cors from "cors";

const app = express();

// Libera seu domínio da Vercel pra acessar a API
app.use(
  cors({
    origin: "https://projeto-vida-e-finan-a-2fkf-ig8pymaql-david-brenos-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());

