import { autor } from "../models/Autor.js";

class AutorController{

    static async listarAutores(req, res){
        const listaAutores = await autor.find({});
        res.status(200).json(listaAutores);
    };

    static async listarAutorId(req, res){
        const book = await autor.findById(req.params.id);
        res.status(200).json(book);
    };

    static async criarAutor(req, res){
        try{
            const novoAutor = await autor.create(req.body);    
            res.status(201).json({mensagem : "autor criado", autor: novoAutor});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha ao cadastrar autor`});
        }
    };

    static async atualizarAutor(req, res){
        try{            
            await autor.findByIdAndUpdate(req.params.id, req.body);            
            res.status(200).json({ message: "autor atualizado"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na atualizacao`});
            console.error(erro);
        }
    };

    static async deletarAutor(req, res){
        try{
            await autor.findByIdAndDelete(req.params.id);            
            res.status(200).json({mensagem : "autor removido"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na exclusao`});
        }
    };
};

export default AutorController;