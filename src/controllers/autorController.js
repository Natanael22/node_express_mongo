import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/Autor.js";

class AutorController{

  static async listarAutores(req, res, next){
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);  
    } catch (error) {
      next(error);
    }
    
  }

  static async listarAutorId(req, res, next){
    try {
      
      const autorEncontrado = await autor.findById(req.params.id);
      if(autorEncontrado !== null){
        res.status(200).send(autorEncontrado);
      }else{
        next(new NaoEncontrado("autor nao encontrado"));
      }
    } catch (error) {
      next(error);      
    }
  }

  static async criarAutor(req, res, next){
    try{
      const novoAutor = await autor.create(req.body);    
      res.status(201).json({mensagem : "autor criado", autor: novoAutor});
    }catch(error){
      next(error);
    }
  }

  static async atualizarAutor(req, res, next){
    try{            
      const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body);   
      if(autorAtualizado !== null){
        res.status(200).json({ message: "autor atualizado"});
      }else{
        next(new NaoEncontrado("id do autor nao localizado"));
      }
      
    }catch(error){
      next(error);
    }
  }

  static async deletarAutor(req, res, next){
    try{
      const autorDeletado = await autor.findByIdAndDelete(req.params.id);
      if (autorDeletado !== null){

        res.status(200).json({mensagem : "autor removido"});
      }else{
        next(new NaoEncontrado("id do autor nao localizado"));
      }
    }catch(error){
      next(error);
    }
  }
}

export default AutorController;