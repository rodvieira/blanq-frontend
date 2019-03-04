import axios from "axios";

const salvarEmpresa = ({ commit }, obj) => {
  axios({
    url: "https://api.moskitcrm.com/v1/companies",
    method: "POST",
    headers: {
      apikey: window.localStorage.getItem("token")
    },
    data: obj,
  })
    .then(() => {
      const success = 'success'
      commit('SALVAR_EMPRESA', obj);
      commit('SAV_EMPRESA', success);  
    })
    .catch(() => {
      const er = 'error';
      commit('SAV_EMPRESA', er);
    });
};

const getEmpresas = ({ commit }) => {

  axios({
    url: "https://api.moskitcrm.com/v1/companies",
    method: "GET",
    headers: {
      apikey: window.localStorage.getItem("token")
    }
  })
    .then(r => {
      let user = r.data.results;      
      commit("GET_EMPRESA", user);
    })
    .catch(() => {
      commit("GET_EMPRESA", {});      
    });
};

const getEmpresaById = ({ commit }, empresaId) => {

  axios({
    url: `https://api.moskitcrm.com/v1/companies/${empresaId}`,
    method: "GET",
    headers: {
      apikey: window.localStorage.getItem("token")
    }
  })
    .then(r => {
      let user = r.data;            
      commit('GET_EMPRESA_ID', user);
    })
    .catch(() => {
      commit('GET_EMPRESA_ID', {});   
    });
};

const editarEmpresa = ({ commit }, obj) => {
  const objId = obj
  axios({
    url: `https://api.moskitcrm.com/v1/companies/${objId.id}`,
    method: "PUT",
    headers: {
      apikey: window.localStorage.getItem("token"),
    },
    data: obj,
  })
    .then(() => {
      let success = 'success'
      commit('PUT_EMPRESA', success)
    })
    .catch(() => {
      let erro = 'error'
      commit('PUT_EMPRESA', erro);  
    });
};

const deleteEmpresa = ({ commit }, empresaId) => {

  axios({
    url: `https://api.moskitcrm.com/v1/companies/${empresaId}`,
    method: "DELETE",
    headers: {
      apikey: window.localStorage.getItem("token"),
    }
  })
    .then(() => {
      let success = 'success'
      commit('DEL_EMPRESA', success);
    })
    .catch(() => {
      let erro = 'error'
      commit('DEL_EMPRESA', erro);   
    });
};

const resetMsg = ({ commit }) => {
  commit('DEL_EMPRESA', null);
  commit('SAV_EMPRESA', null);
  commit('PUT_EMPRESA', null);
};

export default {
  salvarEmpresa,
  getEmpresas,
  getEmpresaById,
  editarEmpresa,
  deleteEmpresa,
  resetMsg,
};