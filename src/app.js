import express from "express";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorErros from "./middlewares/manipuladorErros.js";

const conexao = await connectDB();

conexao.on("error", (erro) =>{
  console.error("erro de conexao: ", erro);
});

conexao.once("open", () =>{
  console.log("conexao bem sucedida");
});

const app = express();
routes(app);

app.use(manipuladorErros);

export default app;