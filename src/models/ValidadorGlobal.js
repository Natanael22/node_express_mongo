import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate",{
  validator: (valor) => valor !== "",
  message: "O campo '{PATH}' foi informado em branco"
});