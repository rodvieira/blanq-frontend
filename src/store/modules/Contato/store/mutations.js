const SALVAR_CONTATO = (state, obj) => {
  state.addContato.name = obj.name;
  state.addContato.phones = obj.phones;
  state.addContato.emails = obj.emails;
  // state.addContato.nome = obj.nome;

}
const GET_CONTATO = (state, obj) => {
  state.getContato = obj;
}

const GET_CONTATO_ID = (state, obj) => {
  state.getContatoId.name = obj.name;
  state.getContatoId.phones = obj.phones;
  state.getContatoId.emails = obj.emails;
}

const DEL_CONTATO = (state, obj) => {
  state.delContato = obj;
}

const SAV_CONTATO = (state, obj) => {
  state.savContato = obj;
}

export default {
  SALVAR_CONTATO,
  GET_CONTATO,
  GET_CONTATO_ID,
  DEL_CONTATO,
  SAV_CONTATO,
};