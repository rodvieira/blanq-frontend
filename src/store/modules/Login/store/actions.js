import axios from "axios";

const loadToken = ({ commit },token) => {

  axios({
    url: "https://api.moskitcrm.com/v1/users",
    method: "GET",
    headers: {
      apikey: window.localStorage.getItem("token")
    }
  })
    .then(r => {
      let user = r.data.results;
      window.localStorage.setItem('user', user[0].id)
      token = window.localStorage.getItem("token");
      commit("GET_TOKEN", token);
      
    })
    .catch((err) => {
      console.log(`Token Invalido (${err})`);
      window.localStorage.removeItem('token')
      
    });
};

export default {
  loadToken
};
