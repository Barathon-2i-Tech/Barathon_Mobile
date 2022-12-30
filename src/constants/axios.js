import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://a1c6-2a02-8429-5c5e-5a01-64d0-e969-e4d8-7682.eu.ngrok.io/api",
    })
}