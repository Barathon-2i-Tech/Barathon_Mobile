import axios from "axios";

export default {
    api : axios.create({
        baseURL: "https://9fae-2a02-8429-5c5e-5a01-2816-facd-86c0-7d0f.eu.ngrok.io/api",
    })
}