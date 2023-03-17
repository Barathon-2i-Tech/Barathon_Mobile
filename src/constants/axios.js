import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://c13b-2a01-cb14-18e-5800-df60-ef6b-7239-bf7e.eu.ngrok.io/api",
    })
}