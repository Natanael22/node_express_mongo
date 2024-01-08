import livro from "../models/Livro.js";

class LivroController{

    static async listarLivros(req, res){
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    };

    static async listarLivroId(req, res){
        const book = await livro.findById(req.params.id);
        res.status(200).json(book);
    };

    static async criarLivro(req, res){
        try{
            const novoLivro = await livro.create(req.body);    
            res.status(201).json({mensagem : "livro criado", livro: novoLivro});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro`});
        }
    };

    static async atualizarLivro(req, res){
        try{            
            await livro.findByIdAndUpdate(req.params.id, req.body);            
            res.status(200).json({ message: "livro atualizado"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na atualizacao`});
            console.error(erro);
        }
    };

    static async deletarLivro(req, res){
        try{
            await livro.findByIdAndDelete(req.params.id);            
            res.status(200).json({mensagem : "livro removido"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na exclusao`});
        }
    };
};

export default LivroController;