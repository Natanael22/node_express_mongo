import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId},
  nome: { type: String, required: [true, "campo nome é obrigatorio"]},
  pais: { type: String}
},{versionKey: false});

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };