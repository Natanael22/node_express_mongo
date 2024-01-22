import mongoose from "mongoose";


const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  titulo: { type: String, required: [true, "campo titulo é obrigatorio"],
    validate: {
      validator: (valor) =>{
        return valor.length >= 5 && valor.length <= 20;
      },
      message: "o valor informado '{VALUE}' no titulo deve ter entre 5 a 20 caracteres"
    }},
  editora: { type: String, required: [true, "campo editora é obrigario"],
    enum:{
      values: ["abril","ei nerd", "alura"],
      message: "a editora '{VALUE}' nao é um valor valido"
    }},
  preco: { type: Number},
  paginas: { type: Number, min: [10,"o numero de paginas informado '{VALUE}' deve estar entre 10 e 5000"], 
    max: [5000,"o numero de paginas informado '{VALUE}' deve estar entre 10 e 5000"]},
  autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "campo autor é obrigatorio"]}
    
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;