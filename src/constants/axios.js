import axios from "axios";

export default {
    api: axios.create({
        baseURL: "https://3a2f-2a01-cb14-18e-5800-a176-26aa-c17d-5b34.eu.ngrok.io/api",
    })
}