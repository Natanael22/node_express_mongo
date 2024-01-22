import mongoose from "mongoose";


const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  titulo: { type: String, required: [true, "campo titulo é obrigatorio"]},
  editora: { type: String, required: [true, "campo editora é obrigario"]},
  preco: { type: Number},
  paginas: { type: Number},
  autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "campo autor é obrigatorio"]}
    
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;