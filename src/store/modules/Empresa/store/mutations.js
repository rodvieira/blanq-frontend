const SALVAR_EMPRESA = (state, obj) => {
  state.addEmpresa.name = obj.name;
  state.addEmpresa.dominio = obj.dominio;
  state.addEmpresa.phones = obj.phones;
  state.addEmpresa.emails = obj.emails;
  state.addEmpresa.contact = obj.contact;

}
const GET_EMPRESA = (state, obj) => {
  state.getEmpresa = obj;
}

const GET_EMPRESA_ID = (state, obj) => {
  state.getEmpresaId.name = obj.name;
  state.getEmpresaId.phones = obj.phones;
  state.getEmpresaId.emails = obj.emails;
  state.getEmpresaId.id = obj.id;
  state.getEmpresaId.contact = obj.employees;
}

const DEL_EMPRESA = (state, obj) => {
  state.delEmpresa = obj;
}

const SAV_EMPRESA = (state, obj) => {
  state.savEmpresa = obj;
}

const PUT_EMPRESA = (state, obj) => {
  state.putEmpresa = obj;
}

export default {
  SALVAR_EMPRESA,
  GET_EMPRESA,
  GET_EMPRESA_ID,
  DEL_EMPRESA,
  SAV_EMPRESA,
  PUT_EMPRESA,
};