import axios from "axios";

const salvarContato = ({ commit }, obj) => {
  axios({
    url: "https://api.moskitcrm.com/v1/contacts",
    method: "POST",
    headers: {
      apikey: window.localStorage.getItem("token")
    },
    data: obj,
  })
    .then(() => {
      const success = 'success'
      commit('SALVAR_CONTATO', obj);
      commit('SAV_CONTATO', success);      
    })
    .catch(() => {
      const er = 'error';
      commit('SAV_CONTATO', er);
    });
};

const getContatos = ({ commit }) => {

  axios({
    url: "https://api.moskitcrm.com/v1/contacts",
    method: "GET",
    headers: {
      apikey: window.localStorage.getItem("token")
    }
  })
    .then(r => {
      let user = r.data.results;
      commit("GET_CONTATO", user);
    })
    .catch(() => {
      commit("GET_CONTATO", {});      
    });
};

const getContatoById = ({ commit }, contatoId) => {

  axios({
    url: `https://api.moskitcrm.com/v1/contacts/${contatoId}`,
    method: "GET",
    headers: {
      apikey: window.localStorage.getItem("token")
    }
  })
    .then(r => {
      let user = r.data;      
      commit('GET_CONTATO_ID', user);
      
    })
    .catch(() => {
      commit('GET_CONTATO_ID', {});   
    });
};

const editarContato = ({ commit }, obj) => {
  const objId = obj
  axios({
    url: `https://api.moskitcrm.com/v1/contacts/${objId.id}`,
    method: "PUT",
    headers: {
      apikey: window.localStorage.getItem("token"),
    },
    data: obj,
  })
    .then(() => {
      let success = 'success'
      commit('PUT_CONTATO', success)
    })
    .catch(() => {
      let erro = 'error'
      commit('PUT_CONTATO', erro);  
    });
};

const deleteContato = ({ commit }, contatoId) => {

  axios({
    url: `https://api.moskitcrm.com/v1/contacts/${contatoId}`,
    method: "DELETE",
    headers: {
      apikey: window.localStorage.getItem("token"),
    }
  })
    .then(() => {
      let success = 'success'
      commit('DEL_CONTATO', success)
    })
    .catch(() => {
      let erro = 'error'
      commit('DEL_CONTATO', erro)     
    });
};

export default {
  salvarContato,
  getContatos,
  getContatoById,
  editarContato,
  deleteContato,
};