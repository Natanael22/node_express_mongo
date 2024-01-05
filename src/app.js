import express from "express";
import connectDB from "./config/dbConnect.js";
import livro from "./models/Livro.js";

const conexao = await connectDB();

conexao.on("error", (erro) =>{
    console.error("erro de conexao: ", erro);
})

conexao.once("open", () =>{
    console.log("conexao bem sucedida");
})

const app = express();
app.use(express.json());

app.get("/", (req, res) =>{    
    res.status(200).send("Curso Node JS com Express");
});

app.get("/livros", async (req, res) => {
    const listaLivros = await livro.find({});
    res.status(200).json(listaLivros);
});

app.get("/livros/:id", async (req, res) =>{
    const book = await livro.findById(req.params.id);
    res.status(200).json(book);
});

app.post("/livros", (req, res) => {
    livro.create(req.body);    
    res.status(201).json({mensagem : "livro criado"});
    
});

app.put("/livros/:id", async (req, res) =>{
    const book = await livro.findById(req.params.id);
    book.titulo = req.body.titulo;
    await livro.updateOne(book);
    res.status(200).json(book);
});

app.delete("/livros/:id", async (req, res) =>{
    const book = await livro.findById(req.params.id);
    await livro.deleteOne(book);
    res.status(200).json({mensagem : "livro removido"});
});

export default app;