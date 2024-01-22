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
        res.status(404).send( {message: "autor nao encontrado"});
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
      await autor.findByIdAndUpdate(req.params.id, req.body);            
      res.status(200).json({ message: "autor atualizado"});
    }catch(error){
      next(error);
    }
  }

  static async deletarAutor(req, res, next){
    try{
      await autor.findByIdAndDelete(req.params.id);            
      res.status(200).json({mensagem : "autor removido"});
    }catch(error){
      next(error);
    }
  }
}

export default AutorController;