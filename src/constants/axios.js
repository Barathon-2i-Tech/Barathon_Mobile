import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://5971-2a02-8429-5c5e-5a01-878-c879-5e49-5cfd.eu.ngrok.io/api",
    })
}