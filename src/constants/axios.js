import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://4e30-90-85-237-137.eu.ngrok.io/api",
    })
}