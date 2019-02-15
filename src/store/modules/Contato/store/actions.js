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
      console.log(obj);
      
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
      // console.log(user);
      
    })
    .catch((err) => {
      console.log(`Erro ao buscar contatos(${err})`);      
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
      console.log(user);
      
    })
    .catch((err) => {
      console.log(`Erro ao buscar contatos(${err})`);      
    });
};

const editarContato = ({ commit }, contatoId, obj) => {
  axios({
    url: `https://api.moskitcrm.com/v1/contacts/${contatoId}`,
    method: "PUT",
    headers: {
      apikey: window.localStorage.getItem("token"),
    },
    data: obj,
  })
    .then(() => {
      console.log('entrou');  
      console.log(obj);  
      let success = 'success'
      commit('PUT_CONTATO', success)
     
    })
    .catch(() => {
      let erro = 'error'
      console.log(obj);
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