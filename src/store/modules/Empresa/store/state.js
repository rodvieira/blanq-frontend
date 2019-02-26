export default {
    getEmpresa: [],
    addEmpresa: {
        user: window.localStorage.getItem('user'),
        name: '',
        dominio: '',
        phones: [],
        emails: [],
        contact: [],
    },
    getEmpresaId: {
        name: '',
        phones: [],
        emails: [],
        id: 0,
        contact: [],
    },
    delEmpresa: '',
    savEmpresa: '',
    putEmpresa: '',
};