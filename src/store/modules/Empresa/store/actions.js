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
      console.log(user);
      
      commit("GET_EMPRESA", user);
    })
    .catch(() => {
      commit("GET_EMPRESA", {});      
    });
};

// const getContatoById = ({ commit }, contatoId) => {

//   axios({
//     url: `https://api.moskitcrm.com/v1/companies/${contatoId}`,
//     method: "GET",
//     headers: {
//       apikey: window.localStorage.getItem("token")
//     }
//   })
//     .then(r => {
//       let user = r.data;      
//       commit('GET_CONTATO_ID', user);
      
//     })
//     .catch(() => {
//       commit('GET_CONTATO_ID', {});   
//     });
// };

// const editarContato = ({ commit }, obj) => {
//   const objId = obj
//   axios({
//     url: `https://api.moskitcrm.com/v1/companies/${objId.id}`,
//     method: "PUT",
//     headers: {
//       apikey: window.localStorage.getItem("token"),
//     },
//     data: obj,
//   })
//     .then(() => {
//       let success = 'success'
//       commit('PUT_CONTATO', success)
//     })
//     .catch(() => {
//       let erro = 'error'
//       commit('PUT_CONTATO', erro);  
//     });
// };

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

export default {
  salvarEmpresa,
  getEmpresas,
  // getContatoById,
  // editarContato,
  deleteEmpresa,
};