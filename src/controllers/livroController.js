import NaoEncontrado from "../erros/NaoEncontrado.js";
import  { autor, livro }  from "../models/Index.js";

class LivroController{

  static async listarLivros(req, res, next){
    try {
      
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivroId(req, res, next){
    try {
      
      const book = await livro.findById(req.params.id);
      if(book !== null){

        res.status(200).json(book);
      }else{
        next(new NaoEncontrado("id do livro nao encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async criarLivro(req, res, next){
    const novoLivro = req.body;
    try{
      /*const autorEncontrado = await autor.findById(novoLivro.autor);
      
      if (autorEncontrado === null){
        res.status(400).send({message: "autor nao encontrado"});
        throw new Error("autor nao encontrado");        
      }
      const livroCompleto = {...novoLivro, autor: {...autorEncontrado._doc}};
      const livroCriado = await livro.create(livroCompleto);    
      res.status(201).json({mensagem : "livro criado", livro: livroCriado});*/
      

      const livroResultado = await livro.create(novoLivro);
      res.status(201).send(livroResultado.toJSON());
      
    }catch(error){
      next(error);
    }
  }

  static async atualizarLivro(req, res, next){
    try{            
      const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body);
      if(livroAtualizado !== null){

        res.status(200).json({ message: "livro atualizado"});
      }else{
        next(new NaoEncontrado("id do livro nao encontrado"));
      }
    }catch(error){
      next(error);
    }
  }

  static async deletarLivro(req, res, next){
    try{
      const livroDeletado = await livro.findByIdAndDelete(req.params.id);
      if(livroDeletado !== null){

        res.status(200).json({mensagem : "livro removido"});
      }else{
        next(new NaoEncontrado("id do livro nao encontrado"));
      }
      
    }catch(error){
      next(error);
    }
  }

  static async listarLivroPorFiltro(req, res, next){
    
    try {

      const busca = await processaBusca(req.query);    
      //populate - popula os dados do autor que ao inves de vir somente o id, vira o schema completo de autor
      const livrosEditora = await livro.find(busca).populate("autor");

      res.status(200).json(livrosEditora);
    } catch (error) {
      next(error); 
    }
  }

}

async function processaBusca(parametros) {

  //console.log(parametros);
  const { editora, titulo, nomeAutor } = parametros;
  const busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};

  if(nomeAutor){
    //console.log("nomeAutor: "+nomeAutor);
    const autorEncontrado = await autor.findOne({nome: { $regex: nomeAutor, $options: "i"}});
    //console.log("autor: "+autorEncontrado);
    const autorId = autorEncontrado._id;
    //console.log("id: " + autorId);
    busca.autor = autorId;

  }
  return busca;
}

export default LivroController;