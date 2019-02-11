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
      console.log(user);
      
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

const deleteContato = ({ commit }, contatoId) => {

  axios({
    url: `https://api.moskitcrm.com/v1/contacts/${contatoId}`,
    method: "DELETE",
    headers: {
      apikey: window.localStorage.getItem("token"),
    }
  })
    .then(() => {
      let teste = 'success'
      commit('DEL_CONTATO', teste)
    })
    .catch(() => {
      let teste = 'error'
      commit('DEL_CONTATO', teste)     
    });
};

export default {
  salvarContato,
  getContatos,
  getContatoById,
  deleteContato,
};