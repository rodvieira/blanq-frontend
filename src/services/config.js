import axios from 'axios'

// const tokenApi = token
export const http = axios.create({

    baseURL: 'https://api.moskitcrm.com/v1/',
    headers: {
        'apikey':'70bac45c-cef6-4c36-bb33-7958a200c96a'
    }
})