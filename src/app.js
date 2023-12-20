import express from "express";

const app = express();
app.use(express.json());

const livros = [
    {
        id:1,
        nome:"livro de programacao"
    },
    {
        id:2,
        nome:"livro de culinaria"
    }
]

function buscaLivro(id){
    return livros.findIndex(livros => {
        return livros.id === Number(id);
    })
}

app.get("/", (req, res) =>{
    res.status(200).send("Curso Node JS com Express");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json({mensagem : "livro criado"});
    
});

app.put("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros[index].nome = req.body.nome;
    res.status(200).json(livros[index]);
});

app.delete("/livros/:id", (req, res) =>{
    const index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).json({mensagem : "livro removido"});
});

export default app;