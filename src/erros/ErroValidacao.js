import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta{

  constructor(erro){

    const mensagensErro = Object.values(erro.errors).map(erro => erro.message).join("; ");
    super({ message: `foram encontrados os seguintes erros: ${mensagensErro}`});
  }
}

export default ErroValidacao;