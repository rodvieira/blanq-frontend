const SALVAR_EMPRESA = (state, obj) => {
  state.addEmpresa.name = obj.name;
  state.addEmpresa.dominio = obj.dominio;
  state.addEmpresa.phones = obj.phones;
  state.addEmpresa.emails = obj.emails;
  state.addEmpresa.contatosRelacionados = obj.contatosRelacionados;

}
const GET_EMPRESA = (state, obj) => {
  state.getEmpresa = obj;
}

// const GET_CONTATO_ID = (state, obj) => {
//   state.getContatoId.name = obj.name;
//   state.getContatoId.phones = obj.phones;
//   state.getContatoId.emails = obj.emails;
//   state.getContatoId.id = obj.id;
// }

const DEL_EMPRESA = (state, obj) => {
  state.delEmpresa = obj;
}

const SAV_EMPRESA = (state, obj) => {
  state.savEmpresa = obj;
}

// const PUT_EMPRESA = (state, obj) => {
//   state.putEMPRESA = obj;
// }

export default {
  SALVAR_EMPRESA,
  GET_EMPRESA,
  // GET_EMPRESA_ID,
  DEL_EMPRESA,
  SAV_EMPRESA,
  // PUT_CONTATO,
};